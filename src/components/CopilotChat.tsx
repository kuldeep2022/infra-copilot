'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Loader } from 'lucide-react';
import { useInfraStore } from '@/lib/store';
import { parseQuery, generateMockAnswer } from '@/lib/mockData';

const SUGGESTED_QUERIES = [
  'Show me the most expensive resources',
  'Which EC2 instances have high CPU?',
  'Check production security posture',
  'List all stopped instances',
  'What is my total monthly spend?',
];

// Simple markdown renderer without external dep
function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="text-xs text-slate-300 space-y-1 leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
          return <p key={i} className="font-bold text-white">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith('• ') || line.startsWith('- ')) {
          const content = line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1');
          return <p key={i} className="pl-3 relative"><span className="absolute left-0 text-indigo-400">•</span>{content}</p>;
        }
        if (/^\d+\./.test(line)) {
          return <p key={i} className="pl-4">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
        }
        if (line.trim() === '') return <br key={i} />;
        // Replace **bold** inline
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i}>
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}
          </p>
        );
      })}
    </div>
  );
}

export default function CopilotChat() {
  const { chatMessages, isQuerying, showChat, addMessage, setIsQuerying } = useInfraStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  const sendQuery = async (query: string) => {
    if (!query.trim() || isQuerying) return;
    setInput('');
    setIsQuerying(true);

    addMessage({ id: Date.now().toString(), role: 'user', content: query, timestamp: Date.now() });

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      addMessage({ id: (Date.now() + 1).toString(), role: 'assistant', content: data.response ?? data.error ?? 'Error', timestamp: Date.now() });
    } catch {
      const parsed = parseQuery(query);
      await new Promise(r => setTimeout(r, 800));
      addMessage({ id: (Date.now() + 1).toString(), role: 'assistant', content: generateMockAnswer(parsed), timestamp: Date.now() });
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <AnimatePresence>
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex flex-col border-t border-slate-800 bg-slate-950/50"
          style={{ height: '320px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bot size={14} className="text-indigo-400" />
              <span className="text-xs font-semibold text-white">Infra Copilot</span>
              <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded-full">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-indigo-600/30' : 'bg-slate-700'}`}>
                  {msg.role === 'assistant' ? <Bot size={10} className="text-indigo-400" /> : <span className="text-xs">K</span>}
                </div>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl ${msg.role === 'assistant' ? 'bg-slate-800/60 border border-slate-700/50' : 'bg-indigo-600/20 border border-indigo-600/30'}`}
                >
                  {msg.role === 'assistant' ? <SimpleMarkdown text={msg.content} /> : <p className="text-xs text-slate-200">{msg.content}</p>}
                </div>
              </div>
            ))}
            {isQuerying && (
              <div className="flex gap-2">
                <div className="w-5 h-5 rounded bg-indigo-600/30 flex items-center justify-center">
                  <Loader size={10} className="text-indigo-400 animate-spin" />
                </div>
                <div className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <p className="text-xs text-slate-500 animate-pulse">Analyzing infrastructure...</p>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested queries */}
          {chatMessages.length <= 2 && (
            <div className="px-3 pb-2 flex gap-1 flex-wrap">
              {SUGGESTED_QUERIES.slice(0, 3).map(q => (
                <button key={q} onClick={() => sendQuery(q)} className="text-xs px-2 py-1 rounded-lg bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700/50 truncate max-w-[45%]">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-slate-800">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendQuery(input)}
              placeholder="Ask about your infrastructure..."
              className="flex-1 bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              disabled={isQuerying}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendQuery(input)}
              disabled={isQuerying || !input.trim()}
              className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 hover:bg-indigo-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send size={12} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
