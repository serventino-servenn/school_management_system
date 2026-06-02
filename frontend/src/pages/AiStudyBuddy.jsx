import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Trash2, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export default function AiStudyBuddy() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Alex! I've analyzed your current academic records. I noticed your grade in Java Programming (55%) is below the institutional benchmark. Would you like me to construct a personalized 4-week recovery study plan targeting Multithreading and OOP?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // Keeps the streaming text interface anchored to the bottom screen view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userQuery = input;
    setInput('');

    // 1. Render User message bubble
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: userQuery }]);
    setIsTyping(true);

    // 2. Set up streaming text placeholder bubble
    const aiMsgId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: aiMsgId, sender: 'ai', text: '' }]);

    // 3. Simulated Token Stream (Swap this block with EventSource / Fetch for Spring Boot Flux)
    let mockResponse = `I have cross-referenced your profile records regarding "${userQuery}". Let's prioritize your Java Programming modules. I highly recommend spending 45 minutes reviewing the Runnable Interface documentation tonight before your upcoming midterm evaluation.`;
    let currentText = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < mockResponse.length) {
        currentText += mockResponse.charAt(index);
        setMessages((prev) =>
          prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: currentText } : msg))
        );
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-fadeIn">
      
      {/* 🤖 Chat Workspace Sub-Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md">
              <Sparkles size={16} />
            </div>
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${isTyping ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Personal AI Study Buddy</h3>
            <p className="text-[11px] text-slate-400 font-medium">Isolated Context Window • ID: 10429</p>
          </div>
        </div>
        
        <button 
          onClick={() => setMessages([{ id: Date.now(), sender: 'ai', text: "Chat history cleared. How can I assist you with your academic milestones today?" }])}
          className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200/50 rounded-xl transition duration-150"
          title="Clear Conversation"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* 💬 Conversation Stream Track */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
        
        {/* Security / Architecture Context Reminder Tag */}
        <div className="flex items-center gap-2.5 bg-indigo-50/60 border border-indigo-100 p-3.5 rounded-xl text-xs text-indigo-700 max-w-xl mx-auto mb-2 shadow-sm">
          <ShieldCheck size={16} className="shrink-0 text-indigo-600" />
          <span><strong>Secure Implementation Sandbox:</strong> This assistant leverages Spring AI Function Calling. The LLM interacts securely with standard Java service APIs without writing raw SQL.</span>
        </div>

        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div 
              key={msg.id} 
              className={`flex items-start gap-3 max-w-2xl ${!isAi ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Profile Avatar Graphics */}
              <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 border shadow-sm ${
                isAi 
                  ? 'bg-slate-900 border-slate-800 text-indigo-400' 
                  : 'bg-indigo-50 border-indigo-100 text-indigo-600'
              }`}>
                {isAi ? '🤖' : 'AM'}
              </div>

              {/* Message Bubble Structure */}
              <div className={`p-4 rounded-2xl text-sm leading-relaxed border shadow-sm ${
                isAi 
                  ? 'bg-white border-slate-200 text-slate-700 rounded-tl-none' 
                  : 'bg-indigo-600 border-indigo-700 text-white rounded-tr-none'
              }`}>
                {msg.text ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 italic font-medium py-0.5">
                    <RefreshCw size={14} className="animate-spin text-indigo-500" />
                    <span>Analyzing academic logs...</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* 📥 Message Dispatch Dock Form */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-3 max-w-4xl mx-auto">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder={isTyping ? "Generating analytical feedback..." : "Ask questions regarding specific grades or low module performance..."}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-800 placeholder-slate-400 transition shadow-inner disabled:opacity-60"
            required
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400 text-white font-bold text-xs px-5 rounded-xl border border-transparent transition shadow-sm flex items-center gap-2 shrink-0"
          >
            <span>Send Message</span>
            <Send size={12} />
          </button>
        </form>
      </div>

    </div>
  );
}
