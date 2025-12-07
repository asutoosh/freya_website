"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ChatBubble from "@/components/ChatBubble";
import BlockingScreen from "@/components/BlockingScreen";
import { sneakPeekMessages } from "@/lib/sampleMessages";
import { Message } from "@/lib/types";

export default function SneakPeekPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages] = useState<Message[]>(sneakPeekMessages);
  const [blocked, setBlocked] = useState<"vpn" | "blocked_country" | "rate_limit" | null>(null);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Check IP on mount
  useEffect(() => {
    async function checkIP() {
      try {
        const response = await fetch("/api/verify-ip");
        const data = await response.json();
        
        if (!data.allowed) {
          setBlocked(data.reason);
        }
      } catch (error) {
        console.error("IP check failed:", error);
      }
    }
    
    checkIP();
  }, []);
  
  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    
    const interval = setInterval(() => {
      setTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timer]);
  
  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  if (blocked) {
    return <BlockingScreen reason={blocked} />;
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header
          channelName="Sneak Peek"
          onMenuClick={() => setSidebarOpen(true)}
          timer={timer}
        />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            <div ref={chatEndRef} />
          </div>
        </main>
      </div>
    </div>
  );
}
