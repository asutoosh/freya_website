"use client";

import React from "react";

interface Message {
  sender: "freya" | "sorcerer";
  text: string;
  time?: string;
}

interface ChatPreviewProps {
  messages: Message[];
  className?: string;
}

export default function ChatPreview({ messages, className = "" }: ChatPreviewProps) {
  return (
    <div className={`bg-navy border-2 border-steel rounded-2xl overflow-hidden ${className}`}>
      {/* Chat Header */}
      <div className="bg-steel border-b border-cyan/30 px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple flex items-center justify-center text-white font-bold">
          F
        </div>
        <div>
          <div className="text-light font-semibold">Freya Quinn</div>
          <div className="text-green text-xs">● Active now</div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "freya" ? "justify-start" : "justify-end"} animate-slide-in`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                message.sender === "freya"
                  ? "bg-steel text-light"
                  : "bg-cyan text-navy"
              }`}
            >
              {message.sender === "sorcerer" && (
                <div className="text-xs font-bold mb-1 opacity-80">🔮 Sorcerer</div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {message.text}
              </div>
              {message.time && (
                <div className="text-xs opacity-60 mt-1">{message.time}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
