export interface Message {
  id: string;
  username: string;
  role?: "admin" | "user";
  text: string;
  image?: string;
  timestamp: number;
  avatar?: string;
}

export interface Signal {
  channel: string;
  message: {
    text: string;
    image?: string;
  };
  timestamp: number;
}

export interface IPSession {
  ip: string;
  previewExpiry: number;
  requestCount: number;
  firstRequestTime: number;
  lastRequestTime: number;
}

export type Channel = "welcome" | "money-glitch" | "how-it-works" | "live-results" | "reviews" | "sneak-peek" | "faq";

export interface VerifyIPResponse {
  allowed: boolean;
  reason: "vpn" | "blocked_country" | "rate_limit" | "ok";
  message?: string;
}

export interface IPSessionResponse {
  locked: boolean;
  expiresAt?: number;
  requestCount?: number;
  rateLimited?: boolean;
}
