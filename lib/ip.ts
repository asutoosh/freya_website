import { NextRequest } from "next/server";

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return "127.0.0.1";
}

interface IP2LocationResponse {
  ip: string;
  country_code: string;
  country_name: string;
  is_proxy: boolean;
  proxy?: {
    is_vpn: boolean;
    is_tor: boolean;
    is_data_center: boolean;
    is_public_proxy: boolean;
    is_web_proxy: boolean;
    is_residential_proxy: boolean;
  };
}

// Real VPN/Proxy detection using IP2Location.io API
export async function isVPN(ip: string): Promise<boolean> {
  try {
    // Skip localhost
    if (ip === "127.0.0.1" || ip === "::1") {
      console.log("🔍 IP Check: Localhost detected, skipping VPN check");
      return false;
    }

    const apiKey = process.env.IP2LOCATION_API_KEY;
    const url = apiKey
      ? `https://api.ip2location.io/?key=${apiKey}&ip=${ip}`
      : `https://api.ip2location.io/?ip=${ip}`;

    console.log(`🔍 Checking VPN/Proxy for IP: ${ip}`);
    const response = await fetch(url);
    const data: IP2LocationResponse = await response.json();

    console.log(`📊 IP2Location Response:`, {
      ip: data.ip,
      country: data.country_code,
      is_proxy: data.is_proxy,
      proxy_details: data.proxy
    });

    // Check if it's a proxy or VPN
    if (data.is_proxy) {
      console.log("🚫 VPN/Proxy detected: is_proxy=true");
      return true;
    }

    if (data.proxy?.is_vpn || data.proxy?.is_tor || data.proxy?.is_public_proxy || data.proxy?.is_web_proxy) {
      console.log("🚫 VPN/Proxy detected via proxy details");
      return true;
    }

    console.log("✅ No VPN/Proxy detected");
    return false;
  } catch (error) {
    console.error("❌ IP2Location VPN check error:", error);
    // On error, allow access (fail open)
    return false;
  }
}

// Real country detection using IP2Location.io API
export async function getCountry(ip: string): Promise<string> {
  try {
    // Skip localhost
    if (ip === "127.0.0.1" || ip === "::1") {
      console.log("🔍 IP Check: Localhost detected, returning US");
      return "US";
    }

    const apiKey = process.env.IP2LOCATION_API_KEY;
    const url = apiKey
      ? `https://api.ip2location.io/?key=${apiKey}&ip=${ip}`
      : `https://api.ip2location.io/?ip=${ip}`;

    console.log(`🔍 Checking country for IP: ${ip}`);
    const response = await fetch(url);
    const data: IP2LocationResponse = await response.json();

    console.log(`🌍 Country detected: ${data.country_code} (${data.country_name})`);
    return data.country_code || "US";
  } catch (error) {
    console.error("❌ IP2Location country check error:", error);
    // On error, return US (fail open)
    return "US";
  }
}
