import { NextRequest, NextResponse } from "next/server";
import { getClientIP } from "@/lib/ip";
import { readIPSessions, writeIPSessions } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    // DEV_MODE: Skip during development
    if (process.env.DEV_MODE === "true") {
      console.log("🔧 DEV_MODE: Skipping IP session update");
      return NextResponse.json({
        success: true,
      });
    }

    const ip = getClientIP(request);
    console.log(`📝 Updating IP session for: ${ip}`);
    
    const sessions = await readIPSessions();
    const now = Date.now();
    
    // Set 24-hour expiry
    const expiresAt = now + 24 * 60 * 60 * 1000;
    
    // Check if session already exists
    const existingSession = sessions[ip];
    
    if (existingSession) {
      // Increment request count for existing session
      sessions[ip] = {
        ...existingSession,
        requestCount: existingSession.requestCount + 1,
        lastRequestTime: now,
        previewExpiry: expiresAt, // Extend expiry
      };
      console.log(`📊 Updated session: ${sessions[ip].requestCount} requests`);
    } else {
      // Create new session
      sessions[ip] = {
        ip,
        previewExpiry: expiresAt,
        requestCount: 1,
        firstRequestTime: now,
        lastRequestTime: now,
      };
      console.log(`✨ Created new session`);
    }
    
    await writeIPSessions(sessions);
    
    return NextResponse.json({
      success: true,
      expiresAt,
      requestCount: sessions[ip].requestCount,
    });
  } catch (error) {
    console.error("❌ Update IP session error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update session" },
      { status: 500 }
    );
  }
}
