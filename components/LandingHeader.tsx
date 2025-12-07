"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface LandingHeaderProps {
  className?: string;
}

export default function LandingHeader({ className = "" }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // On mobile: hide initially, show with transparent bg on scroll
  // On desktop: always show with solid bg
  const headerClasses = isMobile
    ? isScrolled
      ? "translate-y-0 opacity-100 bg-navy/80 backdrop-blur-lg"
      : "-translate-y-full opacity-0"
    : "translate-y-0 opacity-100 bg-navy";

  return (
    <header 
      className={`sticky top-0 z-50 border-b border-cyan/20 px-6 py-4 transition-all duration-300 ${headerClasses} ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple flex items-center justify-center transition-transform group-hover:scale-110">
            <img 
              src="/freya-avatar.jpg" 
              alt="Freya Quinn" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-bold text-xl hidden sm:block">Freya Quinn</span>
        </Link>

        {/* CTA Button */}
        <a
          href="https://live.freyatrades.page"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green text-navy font-semibold px-6 py-2.5 rounded-lg hover:shadow-[0_0_30px_rgba(0,229,164,0.6)] transition-all duration-300 animate-pulse-glow text-sm sm:text-base"
        >
          Lunch Live Demo
        </a>
      </div>
    </header>
  );
}
