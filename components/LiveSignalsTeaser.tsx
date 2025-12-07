"use client";

import React, { useState } from "react";

interface LiveSignalsTeaserProps {
  className?: string;
}

export default function LiveSignalsTeaser({ className = "" }: LiveSignalsTeaserProps) {
  const [activeChannel, setActiveChannel] = useState("Money-Glitch");

  const teaserMessages = [
    {
      sender: "freya",
      text: "🎯 New Signal Alert!",
      time: "2:15 PM",
    },
    {
      sender: "sorcerer",
      text: "Signal: XAUUSD Buy @ 2048.50\nTP1: 2052.30 | TP2: 2056.10 | TP3: 2059.90\nSL: 2042.70",
      time: "2:16 PM",
    },
    {
      sender: "sorcerer",
      text: "Signal: EURUSD Sell @ 1.0875\nTP1: 1.0860 | TP2: 1.0845 | TP3: 1.0830\nSL: 1.0895",
      time: "2:45 PM",
    },
  ];

  const sidebarChannels = [
    { name: "Welcome", icon: "👋", lastMsg: "Welcome to Your 3-Day Trial", locked: true },
    { name: "Money-Glitch", icon: "💰", lastMsg: "sorcerer: XAUUSD Position : BUY...", locked: false },
    { name: "Reviews", icon: "⭐", lastMsg: "You: Photo", locked: true },
    { name: "Sneak-peek", icon: "👀", lastMsg: "You: 👀", locked: true },
    { name: "Let me in", icon: "🔓", lastMsg: "You: 💯", locked: true },
    { name: "general", icon: "#", lastMsg: "Let me in removed Chinu", locked: true },
  ];

  const getChannelIcon = (channelName: string) => {
    const channel = sidebarChannels.find(ch => ch.name === channelName);
    return channel?.icon || "💰";
  };

  const getChannelMessageCount = (channelName: string) => {
    const counts: Record<string, string> = {
      "Welcome": "12 messages",
      "Money-Glitch": "258 messages",
      "Reviews": "45 messages",
      "Sneak-peek": "89 messages",
      "Let me in": "34 messages",
      "general": "156 messages",
    };
    return counts[channelName] || "0 messages";
  };

  const isChannelLocked = (channelName: string) => {
    const channel = sidebarChannels.find(ch => ch.name === channelName);
    return channel?.locked ?? true;
  };

  return (
    <section className={`py-20 px-6 bg-steel ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Live Signals Preview
        </h2>
        <p className="text-center text-cyan text-xl mb-12">
          See what you'll receive in your Telegram channel
        </p>

        {/* Telegram-style Container with Sidebar */}
        <div className="relative bg-navy border-2 border-cyan/30 rounded-3xl overflow-hidden flex">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:block w-80 bg-[#1A1A1A] border-r border-cyan/20">
            {/* Sidebar Header */}
            <div className="bg-steel border-b border-cyan/30 px-4 py-4">
              <h3 className="text-white font-semibold text-lg">The Preview Hub</h3>
              <p className="text-light/60 text-xs">3 members</p>
            </div>

            {/* Channel List */}
            <div className="overflow-y-auto max-h-[500px]">
              {sidebarChannels.map((channel, index) => (
                <div
                  key={index}
                  onClick={() => setActiveChannel(channel.name)}
                  className={`px-4 py-3 border-b border-cyan/10 hover:bg-steel/50 cursor-pointer transition-colors ${
                    activeChannel === channel.name ? "bg-steel/70" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple/30 flex items-center justify-center text-xl flex-shrink-0">
                      {channel.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium text-sm">{channel.name}</span>
                        {activeChannel === channel.name && (
                          <span className="text-cyan text-xs">Fri</span>
                        )}
                      </div>
                      <p className="text-light/60 text-xs truncate">{channel.lastMsg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 relative">
            {/* Chat Header */}
            <div className="bg-steel border-b border-cyan/30 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple flex items-center justify-center text-white font-bold text-xl">
                  {getChannelIcon(activeChannel)}
                </div>
                <div>
                  <div className="text-light font-semibold">{activeChannel}</div>
                  <div className="text-green text-xs">{getChannelMessageCount(activeChannel)}</div>
                </div>
              </div>
              <div className="text-light/60 text-sm hidden sm:block">
                Pinned message
              </div>
            </div>

            {/* Messages - Only show for Money-Glitch */}
            {activeChannel === "Money-Glitch" ? (
              <div className="p-6 space-y-4 bg-[#1A1A1A] min-h-[400px]">
                {teaserMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === "freya" ? "justify-start" : "justify-end"} animate-slide-in`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                        message.sender === "freya"
                          ? "bg-steel text-light border border-cyan/20"
                          : "bg-cyan text-navy"
                      }`}
                    >
                      {message.sender === "sorcerer" && (
                        <div className="text-xs font-bold mb-1 opacity-80">🔮 sorcerer</div>
                      )}
                      <div className="text-sm leading-relaxed whitespace-pre-line font-mono">
                        {message.text}
                      </div>
                      {message.time && (
                        <div className="text-xs opacity-60 mt-1">{message.time}</div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Blurred Additional Messages */}
                <div className="relative">
                  <div className="blur-sm opacity-50 space-y-4 pointer-events-none">
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl px-5 py-3 bg-cyan text-navy">
                        <div className="text-xs font-bold mb-1 opacity-80">🔮 sorcerer</div>
                        <div className="text-sm leading-relaxed font-mono">
                          Signal: BTC/USD Long @ 42,150
                          <br />
                          TP1: 42,800 | TP2: 43,450
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl px-5 py-3 bg-steel text-light border border-cyan/20">
                        <div className="text-sm">✅ TP1 Hit! +2.3% profit</div>
                      </div>
                    </div>
                  </div>

                  {/* Blur Overlay with CTA */}
                  <div className="absolute inset-0 backdrop-blur-md bg-navy/40 flex items-center justify-center">
                    <div className="text-center space-y-4 px-6">
                      <p className="text-white text-lg font-semibold">
                        🔒 Unlock Full Access to Live Signals
                      </p>
                      <a
                        href="https://live.freyatrades.page"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green text-navy font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(0,229,164,0.8)] transition-all duration-300 text-lg"
                      >
                        Join Free Trial →
                      </a>
                      <p className="text-light/70 text-sm">
                        Get 3 days of premium signals, completely free
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Locked Channel View - Full Blur Overlay */
              <div className="relative bg-[#1A1A1A] min-h-[400px]">
                {/* Blurred Background Content */}
                <div className="absolute inset-0 blur-md opacity-30 p-6 space-y-4">
                  <div className="flex justify-start">
                    <div className="max-w-[70%] rounded-2xl px-5 py-3 bg-steel text-light">
                      <div className="text-sm">Locked content preview...</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[70%] rounded-2xl px-5 py-3 bg-cyan text-navy">
                      <div className="text-sm">More locked content...</div>
                    </div>
                  </div>
                </div>

                {/* Full Blur Overlay with CTA */}
                <div className="absolute inset-0 backdrop-blur-lg bg-gradient-to-br from-navy/60 via-steel/40 to-navy/60 flex items-center justify-center">
                  <div className="text-center space-y-6 px-6 animate-fade-in">
                    <div className="text-6xl mb-4">🔒</div>
                    <p className="text-white text-2xl font-bold">
                      Unlock Full Access to Live Signals
                    </p>
                    <a
                      href="https://live.freyatrades.page"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green text-navy font-bold px-10 py-5 rounded-xl hover:shadow-[0_0_40px_rgba(0,229,164,0.8)] transition-all duration-300 text-xl"
                    >
                      Join Free Trial →
                    </a>
                    <p className="text-light/80 text-base">
                      Get 3 days of premium signals, completely free
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

