import { NextRequest, NextResponse } from "next/server";
import { readSignals, writeSignals } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { channel, message } = body;
    
    if (!channel || !message || !message.text) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }
    
    const signals = await readSignals();
    
    const newSignal = {
      channel,
      message,
      timestamp: Date.now(),
    };
    
    signals.push(newSignal);
    
    // Keep only last 100 signals
    if (signals.length > 100) {
      signals.splice(0, signals.length - 100);
    }
    
    await writeSignals(signals);
    
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Push signal error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to push signal" },
      { status: 500 }
    );
  }
}
