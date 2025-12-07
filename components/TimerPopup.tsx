"use client";

interface TimerPopupProps {
  show: boolean;
}

export default function TimerPopup({ show }: TimerPopupProps) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center blur-overlay animate-blur-in">
      <div className="bg-sidebar border border-gray-700 rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-fade-in">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-accent mx-auto"
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
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">
            Preview Has Ended
          </h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Your 3-minute preview has expired. Join our 3-Day Trial Telegram
            Channel to continue receiving automated trading signals!
          </p>
          
          <a
            href="https://t.me/Letttttmeeeeeeiiiiiiinbot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-accent hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Join 3-Day Trial →
          </a>
          
          <p className="text-gray-500 text-sm mt-4">
            Get access to Gold, USOIL, USDJPY, DJI30, NASDAQ, GER40, BTC & ETH signals
          </p>
        </div>
      </div>
    </div>
  );
}
