"use client";

import { useState, useEffect, useRef } from "react";
import { BotIcon } from "../icons/BotIcon";
import { SendIcon } from "../icons/SendIcon";
import { UserIcon } from "../icons/UserIcon";
import { Message } from "../hooks/useFormChat";
import { Input } from "./Input";

interface AIAgentProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export const AIAgent = ({
  messages,
  isLoading,
  onSendMessage,
}: AIAgentProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[390px] w-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-center gap-3 ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isUser && <BotIcon />}
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.isUser
                  ? "text-white border border-border/50 border-white/20"
                  : "bg-white border text-black"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
            {message.isUser && <UserIcon />}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start items-center gap-3">
            <BotIcon />
            <div className="bg-white border text-black p-3 rounded-lg max-w-xs">
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2 px-4 border-white/20">
        <div className="flex-1">
          <Input
            width="full"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="p-2 rounded-lg transition-colors mt-2 border bg-white border-white/20 border-border/50 cursor-pointer hover:bg-white/80 duration-300"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
