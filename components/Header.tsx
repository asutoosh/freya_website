"use client";

interface HeaderProps {
  channelName: string;
  onMenuClick: () => void;
  timer?: number; // seconds remaining
}

export default function Header({ channelName, onMenuClick, timer }: HeaderProps) {
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  return (
    <header className="sticky top-0 z-30 bg-sidebar border-b border-gray-800 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between pl-[52px] pr-12 relative">
        {/* Hamburger menu button - mobile only, positioned on the left */}
        <button
          onClick={onMenuClick}
          className="md:hidden absolute left-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        
        {/* Left side - Channel name (aligned with chat bubble content) */}
        <h2 className="text-white font-semibold text-lg">{channelName}</h2>
        
        {/* Right side - Timer */}
        {timer !== undefined && timer > 0 && (
          <div className="flex items-center gap-2 bg-bubble px-3 py-1.5 rounded-lg">
            <svg
              className="w-4 h-4 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-white font-mono text-sm">
              {formatTimer(timer)}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
