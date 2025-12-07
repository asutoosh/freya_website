import { NextRequest, NextResponse } from "next/server";
import { getClientIP } from "@/lib/ip";
import { readIPSessions, writeIPSessions } from "@/lib/storage";

const GRACE_PERIOD = 3 * 60 * 1000; // 3 minutes in milliseconds
const MAX_REQUESTS = 10;
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(request: NextRequest) {
  try {
    // DEV_MODE: Skip all checks during development
    if (process.env.DEV_MODE === "true") {
      console.log("🔧 DEV_MODE: Skipping IP session check");
      return NextResponse.json({
        locked: false,
      });
    }

    const ip = getClientIP(request);
    console.log(`🔍 Checking IP session for: ${ip}`);
    
    const sessions = await readIPSessions();
    const session = sessions[ip];
    
    // Clean up expired sessions
    const now = Date.now();
    let sessionsModified = false;
    for (const [sessionIp, sessionData] of Object.entries(sessions)) {
      if (sessionData.previewExpiry < now) {
        delete sessions[sessionIp];
        sessionsModified = true;
        console.log(`🧹 Cleaned up expired session for IP: ${sessionIp}`);
      }
    }
    if (sessionsModified) {
      await writeIPSessions(sessions);
    }
    
    if (!session) {
      console.log("✅ No existing session found");
      return NextResponse.json({
        locked: false,
      });
    }
    
    // Check if we're still in grace period (first 3 minutes)
    const timeSinceFirstRequest = now - session.firstRequestTime;
    if (timeSinceFirstRequest < GRACE_PERIOD) {
      console.log(`⏱️ Still in grace period (${Math.floor((GRACE_PERIOD - timeSinceFirstRequest) / 1000)}s remaining)`);
      return NextResponse.json({
        locked: false,
        requestCount: session.requestCount,
      });
    }
    
    // Check if session has expired (24 hours)
    if (session.previewExpiry < now) {
      console.log("✅ Session expired, allowing new preview");
      delete sessions[ip];
      await writeIPSessions(sessions);
      return NextResponse.json({
        locked: false,
      });
    }
    
    // Check rate limiting (10 requests per 24 hours)
    if (session.requestCount >= MAX_REQUESTS) {
      console.log(`🚫 Rate limit exceeded: ${session.requestCount} requests`);
      return NextResponse.json({
        locked: true,
        expiresAt: session.previewExpiry,
        requestCount: session.requestCount,
        rateLimited: true,
      });
    }
    
    // Session exists and is still valid
    console.log(`🔒 Session locked until ${new Date(session.previewExpiry).toISOString()}`);
    return NextResponse.json({
      locked: true,
      expiresAt: session.previewExpiry,
      requestCount: session.requestCount,
    });
  } catch (error) {
    console.error("❌ Check IP session error:", error);
    return NextResponse.json(
      { locked: false },
      { status: 200 }
    );
  }
}
