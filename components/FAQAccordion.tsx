"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="mb-3 bg-bubble rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-200 hover:border-gray-600">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors duration-200 hover:bg-bubble/80"
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-accent transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 py-4 pt-0 text-gray-300 leading-relaxed whitespace-pre-wrap">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items }: { items?: { question: string; answer: string }[] }) {
  const faqs = items || [
    {
      question: "Is this real?",
      answer: "Yes. These are real signals from a quantitative trading system I've built over 3+ years. The preview shows actual signal format and quality.",
    },
    {
      question: "What is the minimum capital?",
      answer: "Recommended minimum is $500 for forex/commodities, $1,000 for crypto. This allows proper risk management (1-2% per trade).",
    },
    {
      question: "Are the signals manual or automated?",
      answer: "Fully automated. The system scans markets 24/7 and sends signals when conditions are met. No human delay.",
    },
    {
      question: "Is there a refund policy?",
      answer: "The 3-day trial is free. After that, if you're not satisfied within the first 7 days of paid membership, full refund. No questions asked.",
    },
    {
      question: "Is this legal in my country?",
      answer: "Trading signals are legal in most countries. However, you're responsible for checking your local regulations. We don't provide financial advice—just automated signals.",
    },
    {
      question: "How many signals per day?",
      answer: "Typically 3-8 signals per day across all assets. Quality over quantity. We don't spam entries.",
    },
    {
      question: "Do I need trading experience?",
      answer: "No. Signals are clear and easy to follow. However, basic understanding of how to place orders on your broker is recommended.",
    },
    {
      question: "What broker do you recommend?",
      answer: "Any reputable broker works. We don't endorse specific brokers. Use one you trust with good spreads and execution.",
    },
    {
      question: "Can I automate the trades?",
      answer: "Yes. Advanced members use copy trading or APIs to automate execution. We provide guidance in the full channel.",
    },
  ];
  
  return (
    <div className="space-y-0">
      {!items && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-3xl">❓</span>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know before joining the trial
          </p>
        </div>
      )}
      
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          defaultOpen={index === 0}
        />
      ))}
    </div>
  );
}
