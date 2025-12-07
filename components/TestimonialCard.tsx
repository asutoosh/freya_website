"use client";

import React from "react";

interface TestimonialCardProps {
  text: string;
  author?: string;
  delay?: number;
}

export default function TestimonialCard({ text, author, delay = 0 }: TestimonialCardProps) {
  return (
    <div 
      className="bg-steel border border-cyan/20 rounded-2xl p-6 animate-slide-in hover:border-green/50 transition-all duration-300"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-light text-lg mb-3 leading-relaxed">
        "{text}"
      </div>
      {author && (
        <div className="text-cyan text-sm font-semibold">
          — {author}
        </div>
      )}
    </div>
  );
}
