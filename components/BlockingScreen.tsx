interface BlockingScreenProps {
  reason: "vpn" | "blocked_country" | "rate_limit";
}

export default function BlockingScreen({ reason }: BlockingScreenProps) {
  const content = {
    vpn: {
      icon: "🔒",
      title: "VPN/Proxy Detected",
      message: "Please turn off your VPN or proxy to access this preview.",
    },
    blocked_country: {
      icon: "🌍",
      title: "Service Not Available",
      message: "This service is not allowed in this region.",
    },
    rate_limit: {
      icon: "⚠️",
      title: "Request Limit Exceeded",
      message: "We have detected more than 10 requests from your IP. Please try after 1 day.",
    },
  };
  
  const { icon, title, message } = content[reason];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-4">
        <div className="text-6xl mb-6">{icon}</div>
        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
        <p className="text-gray-400 text-lg mb-8">{message}</p>
        
        {/* Telegram Link */}
        <a
          href="https://t.me/Letttttmeeeeeeiiiiiiinbot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mb-4"
        >
          Join Free Trial on Telegram →
        </a>
        
        <p className="text-gray-500 text-sm">
          Get 3-day free access to premium trading signals
        </p>
      </div>
    </div>
  );
}
