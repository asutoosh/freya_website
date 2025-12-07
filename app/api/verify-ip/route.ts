import { NextRequest, NextResponse } from "next/server";
import { getClientIP, isVPN, getCountry } from "@/lib/ip";

export async function GET(request: NextRequest) {
  try {
    // DEV_MODE: Skip all IP checks during development
    if (process.env.DEV_MODE === "true") {
      console.log("🔧 DEV_MODE: Skipping IP verification");
      return NextResponse.json({
        allowed: true,
        reason: "ok",
      });
    }
    
    const ip = getClientIP(request);
    console.log(`🔍 Verifying IP: ${ip}`);
    
    // Check VPN/Proxy
    const vpnDetected = await isVPN(ip);
    if (vpnDetected) {
      console.log("🚫 Access denied: VPN/Proxy detected");
      return NextResponse.json({
        allowed: false,
        reason: "vpn",
        message: "Please turn off your VPN or proxy to access this preview.",
      });
    }
    
    // Check country
    const country = await getCountry(ip);
    
    // Get blocked country from env (default to IN if not set)
    const blockedCountry = process.env.BLOCKED_COUNTRY_CODE || "IN";
    
    // Bypass country check if BYPASS_COUNTRY_CODE matches
    const bypassCountry = process.env.BYPASS_COUNTRY_CODE;
    
    if (country === blockedCountry && bypassCountry !== blockedCountry) {
      console.log(`🚫 Access denied: Country ${country} is blocked`);
      return NextResponse.json({
        allowed: false,
        reason: "blocked_country",
        message: `This service is not available in your region.`,
      });
    }
    
    console.log("✅ IP verification passed");
    return NextResponse.json({
      allowed: true,
      reason: "ok",
    });
  } catch (error) {
    console.error("❌ IP verification error:", error);
    return NextResponse.json(
      { allowed: true, reason: "ok" },
      { status: 200 }
    );
  }
}
