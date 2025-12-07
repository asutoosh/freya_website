import { NextRequest, NextResponse } from "next/server";
import { readSignals } from "@/lib/storage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const channel = searchParams.get("channel");
    const since = parseInt(searchParams.get("since") || "0");
    
    if (!channel) {
      return NextResponse.json(
        { error: "Channel parameter required" },
        { status: 400 }
      );
    }
    
    const allSignals = await readSignals();
    
    // Filter by channel and timestamp
    const signals = allSignals
      .filter((s) => s.channel === channel && s.timestamp > since)
      .map((s) => ({
        text: s.message.text,
        image: s.message.image,
        timestamp: s.timestamp,
      }));
    
    return NextResponse.json({ signals });
  } catch (error) {
    console.error("Get signals error:", error);
    return NextResponse.json(
      { signals: [] },
      { status: 200 }
    );
  }
}
