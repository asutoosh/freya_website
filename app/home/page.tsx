"use client";

import React from "react";
import TelegramButton from "@/components/TelegramButton";
import StatsDisplay from "@/components/StatsDisplay";
import TestimonialCard from "@/components/TestimonialCard";
import ChatPreview from "@/components/ChatPreview";
import FeatureStep from "@/components/FeatureStep";
import FAQAccordion from "@/components/FAQAccordion";
import LandingHeader from "@/components/LandingHeader";
import LiveSignalsTeaser from "@/components/LiveSignalsTeaser";
import Link from "next/link";

export default function LandingPage() {
  const stats = [
    { label: "Win Rate", value: "78%", color: "green" as const, type: "circular" as const },
    { label: "Avg Monthly Return", value: "12.4%", color: "cyan" as const, type: "sparkline" as const },
    { label: "Trades This Month", value: "45", color: "purple" as const, type: "bar" as const },
  ];

  const chatMessages = [
    {
      sender: "freya" as const,
      text: "Welcome to your 3-Day Trial! I'm Freya Quinn 👋",
      time: "10:23 AM",
    },
    {
      sender: "sorcerer" as const,
      text: "Signal: XAUUSD Buy @ 4197.78\nTP1: 4201.47 | TP2: 4205.16 | TP3: 4208.85\nSL: 4191.62",
      time: "10:45 AM",
    },
    {
      sender: "sorcerer" as const,
      text: "Signal: EURUSD Buy @ 1.16483\nTP1: 1.16586 | TP2: 1.16689 | TP3: 1.16792\nSL: 1.16311",
      time: "11:12 AM",
    },
  ];

  const faqItems = [
    {
      question: "Is this beginner friendly?",
      answer: "Absolutely! Our signals are clear and easy to follow. Each signal includes entry price, take profit levels, and stop loss. You don't need to be an expert trader to benefit from our automated system.",
    },
    {
      question: "Are signals manual or automated?",
      answer: "100% automated. Our proprietary signal engine analyzes markets 24/7 using algorithmic rules inspired by quantitative finance. No human emotion, just data-driven decisions.",
    },
    {
      question: "What brokers can I use?",
      answer: "Our signals work with any broker that offers the assets we trade (XAUUSD, USOIL, DJ30, EURUSD, BTC, ETH). Popular choices include IC Markets, Pepperstone, and OANDA.",
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes! We offer a 7-day money-back guarantee on premium subscriptions. If you're not satisfied with the service, simply contact us within 7 days for a full refund.",
    },
    {
      question: "How does the 3-day trial work?",
      answer: "Click the 'Join Free Trial' button, join our Telegram channel, and you'll immediately start receiving live signals. No credit card required. After 3 days, you can choose to upgrade to premium or cancel anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-navy text-light">
      {/* Sticky Header */}
      <LandingHeader />
      
      {/* 1. Hero Section */}
      <section className="min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center px-6 py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-slide-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get High-Probability Trading Signals
          </h1>
          <p className="text-3xl md:text-4xl text-cyan font-light mb-8">
            3-Day Free Trial
          </p>
          <h2 className="text-xl md:text-2xl text-light/90 max-w-3xl mx-auto leading-relaxed">
            Join Hundreds of traders receiving automated, data-driven signals directly to Telegram. 
            No guesswork, just results.
          </h2>
          <div className="mt-12">
            <a
              href="https://t.me/Letttttmeeeeeeiiiiiiinbot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green text-navy font-bold px-12 py-5 rounded-xl text-xl hover:shadow-[0_0_40px_rgba(0,229,164,0.8)] transition-all duration-300 animate-pulse-glow"
            >
              Join Free Trial →
            </a>
          </div>
          <p className="text-light/60 text-sm mt-6">
            No credit card required. Trusted by traders worldwide.
          </p>
        </div>
      </section>

      {/* 2. Who Is Freya Quinn */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="bg-steel border-2 border-purple/50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center animate-slide-in">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple flex items-center justify-center flex-shrink-0">
              <img 
                src="/freya-avatar.jpg" 
                alt="Freya Quinn" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Meet Freya Quinn — UK-Based Trader & Systems Builder
              </h2>
              <p className="text-light/90 text-lg leading-relaxed mb-6">
                Freya has spent 6+ years developing automated, rule-based trading systems 
                inspired by quantitative finance. Her mission: to bring transparent, reliable 
                signals directly to your Telegram — no fluff, just results.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-cyan text-2xl">✓</span>
                  <span className="text-light/80">Built 2 automated signal engines</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan text-2xl">✓</span>
                  <span className="text-light/80">Inspired by structured thinkers & quants</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan text-2xl">✓</span>
                  <span className="text-light/80">Focused on consistent profits & risk control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How The System Works */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            How The System Works
          </h2>
          <p className="text-center text-cyan text-xl mb-12">
            Four steps to automated trading success
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureStep
              number={1}
              title="Automated Signal Engine"
              description="Generates signals based on strict algorithmic rules."
              delay={0}
            />
            <FeatureStep
              number={2}
              title="Risk Filters"
              description="Prevents low probability trades, managing your risk."
              delay={0.1}
            />
            <FeatureStep
              number={3}
              title="Clear Take Profit Targets"
              description="Multiple TP levels for flexible profit-taking."
              delay={0.2}
            />
            <FeatureStep
              number={4}
              title="Delivered to Telegram"
              description="Real-time alerts sent to your private Telegram channel."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* 4. Live Results & Proof */}
      <section className="py-20 px-6 bg-[#2A2A2A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-green mb-12">
            Real-Time Performance
          </h2>
          <StatsDisplay stats={stats} className="mb-12" />
          <div className="text-center text-light/60 text-sm">
            *Past performance does not guarantee future results. Trading involves risk.
          </div>
        </div>
      </section>

      {/* 5. No Telegram? Whop Alternative Section */}
      <section className="py-20 px-6 bg-[#2A2A2A] border-y border-cyan/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-cyan/10 border border-cyan/30 rounded-full px-4 py-2 mb-6">
              <span className="text-cyan text-sm font-semibold">✨ Telegram Alternative</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              No Telegram? No Problem!
            </h2>
            <p className="text-xl text-light/80 max-w-3xl mx-auto">
              Join via Whop and enjoy the same 3-day free trial — all signals delivered directly to your account.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green mb-6">
                Why Choose Whop?
              </h3>
              {[
                "📱 Access signals in browser or app — no Telegram needed",
                "⚡ Real-time signals with all entries, TPs, and SLs",
                "🎁 Same 3-day free trial as Telegram users",
                "🔄 Upgrade seamlessly to full paid subscription",
                "💻 Accessible from any device, anywhere",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-green text-2xl flex-shrink-0">✓</span>
                  <span className="text-light text-lg">{item}</span>
                </div>
              ))}
            </div>

            {/* Right: Visual Card */}
            <div className="relative">
              <div className="bg-navy border-2 border-green/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,229,164,0.2)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center text-navy font-bold text-xl">
                    W
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Whop Access</div>
                    <div className="text-green text-sm">Premium Signals Dashboard</div>
                  </div>
                </div>

                {/* Mock Signal Display */}
                <div className="bg-steel/50 border border-cyan/20 rounded-xl p-4 mb-4">
                  <div className="text-cyan text-xs font-bold mb-2">🔮 LATEST SIGNAL</div>
                  <div className="text-light text-sm font-mono leading-relaxed">
                    XAUUSD Buy @ 2048.50
                    <br />
                    <span className="text-green">TP1: 2052.30 ✅</span>
                    <br />
                    TP2: 2056.10 | TP3: 2059.90
                  </div>
                </div>

                <div className="text-center pt-4">
                  <a
                    href="https://whop.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green text-navy font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(0,229,164,0.8)] transition-all duration-300 text-lg w-full"
                  >
                    Join via Whop — Free Trial →
                  </a>
                  <p className="text-light/60 text-xs mt-3">
                    You can still join Telegram later if you change your mind
                  </p>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green/20 to-cyan/20 rounded-3xl blur-2xl -z-10 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. What You Get in the 3-Day Trial */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
            What You Get in the 3-Day Trial
          </h2>
          <div className="bg-steel border-2 border-cyan/30 rounded-3xl p-8 md:p-12 space-y-6">
            {[
              "Automated signals on major assets (XAUUSD, USOIL, DJ30, EURUSD, BTC, ETH)",
              "Clear entries, multiple TPs, and SL levels",
              "Transparent performance updates",
              "Premium member support during trial",
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-green text-3xl flex-shrink-0">✓</span>
                <span className="text-light text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Live Signals Teaser with Blur Overlay */}
      <LiveSignalsTeaser />


      {/* 8. Reviews & Testimonials */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
            What Traders Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              text="+9.4% this week 🔥 Love the automated approach."
              author="Sarah M."
              delay={0}
            />
            <TestimonialCard
              text="Hit TP3 in 20 minutes 😳"
              author="James K."
              delay={0.1}
            />
            <TestimonialCard
              text="Best signals I've used — joined premium after trial."
              author="Alex R."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* 10. About Premium Plan */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-4xl mx-auto">
          <div className="bg-steel border-2 border-purple/50 rounded-3xl p-8 md:p-12 text-center animate-slide-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready for More?
            </h2>
            <p className="text-light/90 text-lg leading-relaxed">
              Upgrade to Premium for full access to all signals, daily updates, 
              exclusive insights, and priority support. Our community grows stronger 
              every day — don't miss out.
            </p>
          </div>
        </div>
      </section>

      {/* 11. Bottom CTA Section */}
      <section className="py-32 px-6 bg-navy border-t border-cyan/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Start Your 3-Day Free Trial?
          </h2>
          <p className="text-xl text-light/80 mb-8">
            Join our community and start receiving high-probability trading signals today
          </p>
          <a
            href="https://t.me/Letttttmeeeeeeiiiiiiinbot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green text-navy font-bold px-12 py-5 rounded-xl text-2xl hover:shadow-[0_0_40px_rgba(0,229,164,0.8)] transition-all duration-300"
          >
            Start Trial Now →
          </a>
          <p className="text-light/60 text-sm mt-6">
            Limited spots available due to server load
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-steel border-t border-cyan/20 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-navy border border-cyan/30 flex items-center justify-center text-cyan hover:bg-cyan hover:text-navy transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-navy border border-cyan/30 flex items-center justify-center text-cyan hover:bg-cyan hover:text-navy transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://whop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-navy border border-cyan/30 flex items-center justify-center text-cyan hover:bg-cyan hover:text-navy transition-all duration-300 hover:scale-110 font-bold text-lg"
              aria-label="Whop"
            >
              W
            </a>
          </div>

          {/* Copyright and Links */}
          <div className="text-center">
            <p className="text-light/60 mb-4">
              © 2025 Freya Quinn Trading Signals. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 text-sm text-cyan flex-wrap">
              <Link href="https://live.freyatrades.page/" className="hover:text-green transition-colors">
                Dashboard
              </Link>
              <Link href="/faq" className="hover:text-green transition-colors">
                FAQ
              </Link>
              <a href="https://t.me/Letttttmeeeeeeiiiiiiinbot" target="_blank" rel="noopener noreferrer" className="hover:text-green transition-colors">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
