"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { format } from "date-fns";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ScrollToBottom from "react-scroll-to-bottom";

import { parseMessage } from "@lib/parseMessage";
import EmployeeCardGrid from "../components/EmployeeCardGrid";

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
      <div className="flex flex-col min-h-screen bg-slate-50 w-full">
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
              .map((msg, i) => {
                const parsed =
                  msg.sender === "bot" ? parseMessage(msg.text) : [msg.text];

                return (
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
                      {parsed.map((part, idx) =>
                        typeof part === "string" ? (
                          <div id={idx} className="prose prose-sm">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({ children }) => (
                                  <h1 className="text-lg font-bold mt-4 mb-2">
                                    {children}
                                  </h1>
                                ),
                                h2: ({ children }) => (
                                  <h2 className="text-base font-bold mt-3 mb-2">
                                    {children}
                                  </h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-base font-bold mt-2 mb-2">
                                    {children}
                                  </h3>
                                ),
                                h4: ({ children }) => (
                                  <h4 className="text-base font-bold mt-1 mb-2">
                                    {children}
                                  </h4>
                                ),
                                p: ({ children }) => (
                                  <p className="text-sm mb-2">{children}</p>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-semibold">
                                    {children}
                                  </strong>
                                ),
                                em: ({ children }) => (
                                  <em className="italic">{children}</em>
                                ),
                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                  >
                                    {children}
                                  </a>
                                ),
                                ul: ({ children }) => (
                                  <ul className="list-disc pl-6 mb-2">
                                    {children}
                                  </ul>
                                ),
                                li: ({ children }) => (
                                  <li className="mb-1">{children}</li>
                                ),
                                table: ({ children }) => (
                                  <table className="border-collapse w-full text-sm mb-4">
                                    {children}
                                  </table>
                                ),
                                thead: ({ children }) => (
                                  <thead className="bg-gray-100">
                                    {children}
                                  </thead>
                                ),
                                th: ({ children }) => (
                                  <th className="border px-2 py-1 text-left font-medium">
                                    {children}
                                  </th>
                                ),
                                td: ({ children }) => (
                                  <td className="border px-2 py-1">
                                    {children}
                                  </td>
                                ),
                                code: ({ children }) => (
                                  <code className="bg-gray-100 text-pink-600 px-1 py-0.5 rounded text-xs">
                                    {children}
                                  </code>
                                ),
                              }}
                            >
                              {part}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <EmployeeCardGrid key={idx} empIDs={part.empIDs} />
                        )
                      )}
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
                );
              })}
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
