"use client";

import React from "react";

interface FeatureStepProps {
  number: number;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureStep({ number, title, description, delay = 0 }: FeatureStepProps) {
  return (
    <div 
      className="bg-steel border-2 border-cyan/30 rounded-2xl p-6 hover:border-green/50 transition-all duration-300 animate-slide-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-green text-navy flex items-center justify-center font-bold text-xl flex-shrink-0">
          {number}
        </div>
        <div>
          <h3 className="text-light font-bold text-xl mb-2">{title}</h3>
          <p className="text-light/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
