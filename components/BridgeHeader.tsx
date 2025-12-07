'use client';

import React from 'react';

interface BridgeHeaderProps {
  remainingTime: string;
  onCtaClick?: () => void;
}

export default function BridgeHeader({ remainingTime, onCtaClick }: BridgeHeaderProps) {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      window.location.href = 'https://t.me/YOUR_BOT_HERE';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#0D1B2A] to-[#111827] border-b border-[#1E3A5F] shadow-lg shadow-[#4CC9F0]/10">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Section - Brand */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#4CC9F0] to-[#00E5A4] flex items-center justify-center shadow-lg shadow-[#4CC9F0]/30">
              <span className="text-[#001219] font-bold text-sm md:text-base">FQ</span>
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col">
              <h1 className="text-[#E0E6F1] font-bold text-lg md:text-xl tracking-tight">
                Freya Quinn
              </h1>
              <p className="text-[#4CC9F0] text-xs md:text-sm font-medium glow-text">
                Money-Glitch Live Signals
              </p>
            </div>
          </div>

          {/* Center Section - Status Info */}
          <div className="flex flex-col items-center gap-1 text-center md:flex-1 md:max-w-md">
            {/* Live Preview Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E3A5F]/50 rounded-full border border-[#4CC9F0]/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5A4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5A4]"></span>
              </span>
              <span className="text-[#E0E6F1] text-xs md:text-sm font-semibold">Live Preview</span>
            </div>
            
            {/* Info Text */}
            <p className="text-[#E0E6F1]/80 text-xs md:text-sm">
              You're viewing a 3-minute preview of real automated signals
            </p>
            <p className="text-[#E0E6F1]/50 text-[10px] md:text-xs">
              No India • No VPN/Proxy • Real-time feed
            </p>
          </div>

          {/* Right Section - Timer + CTA */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Timer */}
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[#E0E6F1]/60 text-[10px] md:text-xs uppercase tracking-wider">Preview</span>
              <span className="text-[#4CC9F0] text-xl md:text-2xl font-mono font-bold tabular-nums glow-text">
                {remainingTime}
              </span>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={handleCtaClick}
                className="group relative px-4 md:px-6 py-2.5 md:py-3 bg-[#00E5A4] hover:bg-[#00FFB8] text-[#001219] font-bold text-sm md:text-base rounded-lg transition-all duration-300 shadow-lg shadow-[#00E5A4]/30 hover:shadow-[#00E5A4]/50 hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <span>🔮</span>
                  <span>Join 3-Day Trial on Telegram</span>
                </span>
              </button>
              <p className="text-[#E0E6F1]/50 text-[10px] md:text-xs whitespace-nowrap">
                Includes 3-day free trial • No card required
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(76, 201, 240, 0.5);
        }
      `}</style>
    </header>
  );
}
