'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send, Trash2 } from 'lucide-react';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

function getInitialEntries(): GuestbookEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const saved = localStorage.getItem('portfolio-guestbook');
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((entry): entry is GuestbookEntry => {
        return (
          typeof entry === 'object' &&
          entry !== null &&
          typeof entry.id === 'string' &&
          typeof entry.name === 'string' &&
          typeof entry.message === 'string' &&
          typeof entry.timestamp === 'number'
        );
      })
      .slice(0, 50);
  } catch {
    localStorage.removeItem('portfolio-guestbook');
    return [];
  }
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(getInitialEntries);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const saveEntry = () => {
    if (!name.trim() || !message.trim()) return;

    const timestamp = Date.now();
    const newEntry: GuestbookEntry = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${timestamp}`,
      name: name.trim(),
      message: message.trim(),
      timestamp,
    };

    const updated = [newEntry, ...entries].slice(0, 50); // Keep last 50
    setEntries(updated);
    localStorage.setItem('portfolio-guestbook', JSON.stringify(updated));
    
    setName('');
    setMessage('');
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('portfolio-guestbook', JSON.stringify(updated));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      saveEntry();
      setSubmitting(false);
    }, 500);
  };

  const formatTime = (timestamp: number) => {
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <section id="guestbook" className="py-20 px-6 md:px-12 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-accent font-mono text-sm mb-2">{'// guestbook'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> cat <span className="text-accent">messages.txt</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm mt-2">
            &gt; Leave a message! ✨
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden mb-8">
          <div className="bg-[#2a2a2a] px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-400 font-mono ml-2">new_message.txt</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label className="block text-sm text-gray-400 font-mono mb-2">
                <span className="text-accent">$</span> whoami
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={50}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-4 py-2 text-white font-mono focus:border-accent focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 font-mono mb-2">
                <span className="text-accent">$</span> echo &quot;message&quot;
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                maxLength={500}
                rows={4}
                className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded px-4 py-2 text-white font-mono focus:border-accent focus:outline-none resize-none"
                required
              />
              <div className="text-xs text-gray-500 font-mono mt-1 text-right">
                {message.length}/500
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !name.trim() || !message.trim()}
              className="w-full bg-accent text-black font-mono px-6 py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send size={18} />
                  Post Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-mono">
              No messages yet. Be the first! 👋
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-accent" />
                    <span className="text-white font-mono font-semibold">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-mono">
                      {formatTime(entry.timestamp)}
                    </span>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                      aria-label="Delete message"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                  {entry.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
