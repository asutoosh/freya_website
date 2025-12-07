"use client";

import React from "react";

interface TelegramButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function TelegramButton({ 
  children, 
  href, 
  onClick, 
  variant = "primary",
  className = "" 
}: TelegramButtonProps) {
  const baseStyles = "px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2";
  
  const variantStyles = variant === "primary" 
    ? "bg-green text-navy hover:bg-opacity-90 animate-pulse-glow" 
    : "bg-steel text-light border-2 border-cyan hover:bg-cyan hover:text-navy";

  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
    >
      {children}
      <span className="text-2xl">🔮</span>
    </Component>
  );
}
