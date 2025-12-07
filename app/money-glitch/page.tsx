"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ChatBubble from "@/components/ChatBubble";
import TimerPopup from "@/components/TimerPopup";
import BlockingScreen from "@/components/BlockingScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { moneyGlitchMessages } from "@/lib/sampleMessages";
import { Message } from "@/lib/types";

const PREVIEW_DURATION = 180; // 3 minutes in seconds
const STORAGE_KEY = "mg_preview_expired";

export default function MoneyGlitchPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(moneyGlitchMessages);
  const [timer, setTimer] = useState(PREVIEW_DURATION);
  const [showPopup, setShowPopup] = useState(false);
  const [blocked, setBlocked] = useState<"vpn" | "blocked_country" | "rate_limit" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSignalCheck, setLastSignalCheck] = useState(Date.now());
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Check IP and session on mount
  useEffect(() => {
    async function checkAccess() {
      try {
        // DEV_MODE: Skip all checks during development
        if (process.env.NEXT_PUBLIC_DEV_MODE === "true") {
          console.log("🔧 DEV_MODE: All blocking features disabled");
          setIsLoading(false);
          return;
        }
        
        console.log("🔍 Starting access checks...");
        
        // Step 1: Check IP verification (VPN/Proxy/Country)
        console.log("📡 Checking IP verification...");
        const ipResponse = await fetch("/api/verify-ip");
        const ipData = await ipResponse.json();
        
        if (!ipData.allowed) {
          console.log(`🚫 IP verification failed: ${ipData.reason}`);
          setBlocked(ipData.reason);
          setIsLoading(false);
          return;
        }
        console.log("✅ IP verification passed");
        
        // Step 2: Check localStorage (immediate feedback for same browser)
        const expired = localStorage.getItem(STORAGE_KEY);
        if (expired === "true") {
          console.log("🔒 LocalStorage indicates preview expired");
          setShowPopup(true);
          setIsLoading(false);
          return;
        }
        console.log("✅ LocalStorage check passed");
        
        // Step 3: Check IP session (blocks incognito/different browsers)
        console.log("📡 Checking IP session...");
        const sessionResponse = await fetch("/api/check-ip-session");
        const sessionData = await sessionResponse.json();
        
        // Check for rate limiting
        if (sessionData.rateLimited) {
          console.log("🚫 Rate limit exceeded");
          setBlocked("rate_limit");
          setIsLoading(false);
          return;
        }
        
        // Check if session is locked (after grace period)
        if (sessionData.locked) {
          console.log("🔒 IP session locked");
          localStorage.setItem(STORAGE_KEY, "true");
          setShowPopup(true);
          setIsLoading(false);
          return;
        }
        
        console.log("✅ All access checks passed - starting preview");
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Access check failed:", error);
        setIsLoading(false);
      }
    }
    
    checkAccess();
  }, []);
  
  // Timer countdown
  useEffect(() => {
    // DEV_MODE: Skip timer in development
    if (process.env.NEXT_PUBLIC_DEV_MODE === "true") {
      return;
    }
    
    if (showPopup) return;
    
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimerExpiry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [showPopup]);
  
  // Poll for new signals
  useEffect(() => {
    if (showPopup) return;
    
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/get-signals?channel=money-glitch&since=${lastSignalCheck}`
        );
        const data = await response.json();
        
        if (data.signals && data.signals.length > 0) {
          const newMessages: Message[] = data.signals.map(
            (signal: any, index: number) => ({
              id: `signal-${Date.now()}-${index}`,
              username: "sorcerer",
              role: "admin" as const,
              text: signal.text,
              image: signal.image,
              timestamp: signal.timestamp,
              avatar: "F",
            })
          );
          
          setMessages((prev) => [...prev, ...newMessages]);
          setLastSignalCheck(Date.now());
        }
      } catch (error) {
        console.error("Signal polling failed:", error);
      }
    }, 5000); // Poll every 5 seconds
    
    return () => clearInterval(pollInterval);
  }, [showPopup, lastSignalCheck]);
  
  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  async function handleTimerExpiry() {
    console.log("⏰ Timer expired - locking preview");
    localStorage.setItem(STORAGE_KEY, "true");
    setShowPopup(true);
    
    // Update IP session
    try {
      await fetch("/api/update-ip-session", { method: "POST" });
      console.log("📝 IP session updated");
    } catch (error) {
      console.error("Failed to update IP session:", error);
    }
  }
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (blocked) {
    return <BlockingScreen reason={blocked} />;
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header
          channelName="Money-Glitch"
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
      
      <TimerPopup show={showPopup} />
    </div>
  );
}
