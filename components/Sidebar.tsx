"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Channel } from "@/lib/types";
import { getMemberCount } from "@/lib/memberCount";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const channels: { name: string; path: Channel; icon: string; preview?: string }[] = [
  { name: "Welcome", path: "welcome", icon: "👋", preview: "Start here" },
  { name: "Money-Glitch", path: "money-glitch", icon: "💰", preview: "Live signals" },
  { name: "How It Works", path: "how-it-works", icon: "⚙️", preview: "System explained" },
  { name: "Live Results", path: "live-results", icon: "📈", preview: "80% win rate" },
  { name: "Reviews", path: "reviews", icon: "⭐", preview: "Member feedback" },
  { name: "Sneak Peek", path: "sneak-peek", icon: "👀", preview: "Real trades" },
  { name: "FAQ", path: "faq", icon: "❓", preview: "Common questions" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const memberCount = getMemberCount();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-sidebar border-r border-gray-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col
        `}
      >
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">The Preview Hub</h1>
          <p className="text-gray-400 text-sm">{memberCount} members</p>
        </div>
        
        <nav className="p-2 flex-1 overflow-y-auto custom-scrollbar">
          {channels.map((channel) => {
            const isActive = pathname === `/${channel.path}`;
            
            return (
              <Link
                key={channel.path}
                href={`/${channel.path}`}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg mb-1
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-bubble text-white"
                      : "text-gray-400 hover:bg-bubble/50 hover:text-white"
                  }
                `}
              >
                <span className="text-2xl">{channel.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{channel.name}</div>
                  {channel.preview && (
                    <div className="text-xs text-gray-500">
                      {channel.preview}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
        
        {/* Get Access Button */}
        <div className="p-4 border-t border-gray-800">
          <a
            href="https://t.me/YOUR_BOT_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            <span className="text-xl">📱</span>
            <span>Join 3-Day Trial</span>
          </a>
          <p className="text-gray-500 text-xs text-center mt-2">
            Free access • No credit card
          </p>
        </div>
      </aside>
    </>
  );
}
