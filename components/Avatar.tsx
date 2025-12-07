interface AvatarProps {
  username: string;
  size?: number;
  className?: string;
  role?: "admin" | "user";
}

export default function Avatar({ username, size = 40, className = "", role }: AvatarProps) {
  // Use sorcerer logo for admin users
  if (role === "admin" || username.toLowerCase() === "sorcerer") {
    return (
      <div
        className={`rounded-full overflow-hidden flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src="/sorcerer-logo.png"
          alt="Sorcerer"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  const initial = username.charAt(0).toUpperCase();
  
  // Generate a consistent color based on username
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
  ];
  
  const colorIndex = username.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  
  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-semibold ${bgColor} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {initial}
    </div>
  );
}
