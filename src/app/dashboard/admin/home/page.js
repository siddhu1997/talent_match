"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { format } from "date-fns";
import { toast } from "sonner";
import ScrollToBottom from "react-scroll-to-bottom";

export default function AdminHome() {
  const user = useUser();
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you find talent today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsTyping(true);

    const userMsg = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    const botPlaceholder = {
      sender: "bot",
      text: "",
      timestamp: new Date(),
    };

    // Append user message + bot placeholder
    setMessages((prev) => [...prev, userMsg, botPlaceholder]);
    const sentInput = input; // preserve for retry
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: sentInput }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok || !res.body) {
        toast.error("⚠️ Unable to connect to chat server");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let botMsg = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        botMsg += decoder.decode(value);

        // Update last message only (bot message)
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: botMsg,
          };
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Unable to connect. Retrying...",
          timestamp: new Date(),
        },
      ]);
      setTimeout(() => sendMessage(sentInput), 1500); // retry with preserved input
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ScrollToBottom>
      <div className="flex flex-col min-h-screen bg-slate-50">
        {/* Centered Chat Box */}
        <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto">
          {/* Title */}
          <h2 className="text-xl font-bold text-black text-center mt-6 mb-4">
            TalentMatcher Chatbot
          </h2>

          {/* Chat messages (scrollable area) */}
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {messages
              .filter((msg) => msg.text)
              .map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "bot" ? "items-start" : "justify-end"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="mr-2 mt-1">
                      <img
                        src="/bot-avatar.png"
                        alt="Bot"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] p-3 rounded-lg relative text-sm leading-relaxed ${
                      msg.sender === "bot"
                        ? "bg-gray-200 text-black"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {msg.text}
                    <div className="text-xs text-gray-400 mt-1">
                      {format(new Date(msg.timestamp), "p")}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="ml-2 mt-1">
                      <img
                        src={user?.dpURL || "/user-avatar.png"}
                        alt="You"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            {isTyping && (
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <img
                    src="/bot-avatar.png"
                    alt="Bot"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="bg-gray-200 text-black text-sm px-4 py-2 rounded-lg">
                  <span className="animate-pulse">Bot is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input area – always at bottom */}
          <div className="sticky bottom-0 bg-slate-50 border-t px-6 py-4 flex gap-3 z-10">
            <input
              className="flex-1 border px-4 py-2 rounded-lg text-gray-700"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </ScrollToBottom>
  );
}
