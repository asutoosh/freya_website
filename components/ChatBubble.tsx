import { Message } from "@/lib/types";
import Avatar from "./Avatar";
import { format } from "date-fns";

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div className="flex gap-3 mb-4 animate-fade-in">
      <Avatar username={message.username} size={40} role={message.role} />
      
      <div className="flex-1 max-w-[700px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-semibold text-sm">
            {message.username}
          </span>
          {message.role === "admin" && (
            <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full font-medium">
              admin
            </span>
          )}
          <span className="text-gray-400 text-xs">
            {format(message.timestamp, "HH:mm")}
          </span>
        </div>
        
        <div className="bg-bubble rounded-xl rounded-tl-none p-4">
          <p className="text-white whitespace-pre-wrap leading-relaxed">
            {message.text}
          </p>
          {message.image && (
            <img
              src={message.image}
              alt="Message attachment"
              className="mt-3 rounded-lg max-w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}
