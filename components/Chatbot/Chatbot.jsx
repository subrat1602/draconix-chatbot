"use client";

import React, { useState, useEffect, useRef } from "react";
import "./chatbot.css";
import {
  initialWelcomeMessage,
  defaultQuickQuestions,
  fallbackQuickActions,
  findChatbotResponse,
  fallbackResponse
} from "./chatbotData";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      ...initialWelcomeMessage,
      time: getCurrentTime()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom whenever messages or typing indicator changes
  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      // Focus input on open for immediate keyboard interaction
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("smooth");
    }
  }, [messages, isTyping]);

  // Handle keyboard shortcuts (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Send a user question and trigger bot response
  const handleSendMessage = (textToSend) => {
    const messageText = (textToSend !== undefined ? textToSend : input).trim();
    if (!messageText || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: messageText,
      time: getCurrentTime()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Typing delay between 450ms and 550ms
    const delay = 480;
    setTimeout(() => {
      const match = findChatbotResponse(messageText);

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: match.answer,
        time: getCurrentTime(),
        showFallbackActions: match.isFallback
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, delay);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleReset = () => {
    setMessages([
      {
        ...initialWelcomeMessage,
        id: `welcome-${Date.now()}`,
        time: getCurrentTime()
      }
    ]);
    setInput("");
    setIsTyping(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="draconix-chatbot-root">
      {/* Floating Launcher Button */}
      <button
        type="button"
        className="chat-launcher-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close Draconix Assistant chat" : "Open Draconix Assistant chat"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <span className="chat-launcher-pulse" aria-hidden="true"></span>
        <div className="chat-launcher-icon">
          {isOpen ? (
            // Close X Icon
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Modern Chat / Robot Icon
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
              <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
            </svg>
          )}
        </div>
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <section
          className="chat-window"
          role="dialog"
          aria-label="Draconix Assistant Chatbot"
          aria-modal="false"
        >
          {/* Header */}
          <header className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar-wrapper">
                {/* Robot Assistant Icon */}
                <svg className="chat-avatar-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <circle cx="12" cy="5" r="2"></circle>
                  <path d="M12 7v4"></path>
                  <line x1="8" y1="16" x2="8" y2="16.01"></line>
                  <line x1="16" y1="16" x2="16.01" y2="16"></line>
                </svg>
                <span className="chat-status-dot" aria-hidden="true"></span>
              </div>
              <div className="chat-header-text">
                <span className="chat-header-title">Draconix Assistant</span>
                <span className="chat-header-status">
                  <span className="chat-status-indicator" aria-hidden="true"></span>
                  Online
                </span>
              </div>
            </div>

            <div className="chat-header-actions">
              {/* Reset Chat Button */}
              <button
                type="button"
                className="chat-action-btn"
                onClick={handleReset}
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                </svg>
              </button>

              {/* Close Button */}
              <button
                type="button"
                className="chat-action-btn"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </header>

          {/* Message Thread */}
          <div className="chat-body" tabIndex={0} aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message-row ${msg.sender === "user" ? "user" : "bot"}`}
              >
                <div className="chat-bubble">
                  {msg.text}

                  {/* Initial Quick Question Chips */}
                  {msg.showQuickQuestions && (
                    <div className="chat-quick-container">
                      <span className="chat-quick-title">Quick Questions</span>
                      {defaultQuickQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="chat-quick-btn"
                          onClick={() => handleSendMessage(q)}
                        >
                          <span>{q}</span>
                          <span className="chat-quick-arrow">➔</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Fallback Quick Action Chips */}
                  {msg.showFallbackActions && (
                    <div className="chat-fallback-chips">
                      {fallbackQuickActions.map((action, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="chat-fallback-chip-btn"
                          onClick={() => handleSendMessage(action.query)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="chat-message-time">{msg.time}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-typing-container" aria-live="assertive">
                <span className="chat-typing-label">Draconix Assistant is typing...</span>
                <div className="chat-typing-bubble">
                  <span className="chat-typing-dot"></span>
                  <span className="chat-typing-dot"></span>
                  <span className="chat-typing-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <footer className="chat-footer">
            <form className="chat-input-form" onSubmit={handleInputSubmit}>
              <input
                ref={inputRef}
                type="text"
                className="chat-input-field"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Type your question"
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={!input.trim() || isTyping}
                aria-label="Send question"
              >
                <svg className="chat-send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </footer>
        </section>
      )}
    </div>
  );
}
