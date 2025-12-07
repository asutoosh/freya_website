"use client";

import React, { useEffect, useState, useRef } from "react";

interface Stat {
  label: string;
  value: string;
  color?: "green" | "cyan" | "purple";
  type?: "circular" | "sparkline" | "bar";
}

interface StatsDisplayProps {
  stats: Stat[];
  className?: string;
}

// Circular Progress Component
function CircularProgress({ percentage, delay = 0 }: { percentage: number; delay?: number }) {
  const [progress, setProgress] = useState(0);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      <svg className="transform -rotate-90 w-32 h-32">
        {/* Background circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-steel/50"
        />
        {/* Progress circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-cyan transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-green">{progress}%</span>
      </div>
    </div>
  );
}

// Sparkline Chart Component
function SparklineChart({ delay = 0 }: { delay?: number }) {
  const [animate, setAnimate] = useState(false);
  const points = [8, 10, 9, 12, 11, 13, 12.4]; // Monthly return trend
  const width = 120;
  const height = 60;
  const max = Math.max(...points);
  const min = Math.min(...points);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const pathData = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / (max - min)) * height;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="w-32 h-20 mx-auto mb-4 relative">
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="currentColor" strokeWidth="0.5" className="text-steel/30" />
        
        {/* Gradient fill */}
        <defs>
          <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00BFA6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00BFA6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area under line */}
        <path
          d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
          fill="url(#sparklineGradient)"
          className={animate ? "opacity-100" : "opacity-0"}
          style={{ transition: "opacity 0.5s ease-out" }}
        />
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-cyan ${animate ? "opacity-100" : "opacity-0"}`}
          style={{ 
            transition: "opacity 0.5s ease-out",
            strokeDasharray: animate ? "none" : "200",
            strokeDashoffset: animate ? "0" : "200",
          }}
        />
        
        {/* Dots */}
        {points.map((point, index) => {
          const x = (index / (points.length - 1)) * width;
          const y = height - ((point - min) / (max - min)) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="currentColor"
              className={`text-cyan ${animate ? "opacity-100" : "opacity-0"}`}
              style={{ transition: `opacity 0.5s ease-out ${index * 0.1}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

// Bar Chart Component
function BarChart({ value, max = 50, delay = 0 }: { value: number; max?: number; delay?: number }) {
  const [height, setHeight] = useState(0);
  const percentage = (value / max) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeight(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="w-32 h-24 mx-auto mb-4 flex items-end justify-center gap-2">
      {Array.from({ length: 5 }).map((_, index) => {
        const barHeight = Math.min(100, Math.max(0, height - index * 20));
        return (
          <div
            key={index}
            className="w-4 bg-cyan rounded-t transition-all duration-700 ease-out"
            style={{
              height: `${barHeight}%`,
              transitionDelay: `${index * 0.1}s`,
            }}
          />
        );
      })}
    </div>
  );
}

// Count-up Animation Hook
function useCountUp(end: number, duration: number = 1500, delay: number = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return count;
}

export default function StatsDisplay({ stats, className = "" }: StatsDisplayProps) {
  const getColorClass = (color?: string) => {
    switch (color) {
      case "green": return "text-green";
      case "cyan": return "text-cyan";
      case "purple": return "text-purple";
      default: return "text-green";
    }
  };

  const parseValue = (value: string) => {
    return parseFloat(value.replace(/[^0-9.]/g, ""));
  };

  const formatValue = (value: string, count: number) => {
    if (value.includes("%")) return `${count}%`;
    if (value.includes(".")) return `${count.toFixed(1)}%`;
    return count.toString();
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {stats.map((stat, index) => {
        const numericValue = parseValue(stat.value);
        const animatedCount = useCountUp(numericValue, 1500, index * 200);
        const chartType = stat.type || (index === 0 ? "circular" : index === 1 ? "sparkline" : "bar");

        return (
          <div
            key={index}
            className="group bg-steel border border-cyan/30 rounded-2xl p-6 text-center animate-slide-in hover:border-cyan/60 hover:shadow-[0_0_30px_rgba(0,191,166,0.3)] transition-all duration-300 relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              {/* Chart */}
              {chartType === "circular" && (
                <CircularProgress percentage={numericValue} delay={index * 200} />
              )}
              {chartType === "sparkline" && (
                <SparklineChart delay={index * 200} />
              )}
              {chartType === "bar" && (
                <BarChart value={numericValue} delay={index * 200} />
              )}

              {/* Value */}
              <div className={`text-4xl font-bold mb-2 ${getColorClass(stat.color)} transition-transform group-hover:scale-110 duration-300`}>
                {formatValue(stat.value, animatedCount)}
              </div>

              {/* Label */}
              <div className="text-light/70 text-sm uppercase tracking-wide font-semibold">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
