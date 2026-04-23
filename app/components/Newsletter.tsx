'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    setStatus('submitting');

    // In production, send to your email service (Mailchimp, ConvertKit, etc.)
    // For now, just save to localStorage
    try {
      const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        setStatus('error');
        setMessage('You\'re already subscribed!');
        return;
      }

      subscribers.push(email);
      localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));

      setStatus('success');
      setMessage('Thanks for subscribing! 🎉');
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-[#111111]">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/30 rounded-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-accent" size={32} />
            <h2 className="text-2xl md:text-3xl font-bold text-white font-mono">
              Stay Updated
            </h2>
          </div>
          
          <p className="text-gray-300 font-mono mb-6">
            Get notified about new projects, blog posts, and tech insights.
            No spam, unsubscribe anytime.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-[#0d0d0d] border border-[#2a2a2a] rounded px-4 py-3 text-white font-mono focus:border-accent focus:outline-none"
              disabled={status === 'submitting' || status === 'success'}
            />
            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className="bg-accent text-black font-mono px-6 py-3 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {status === 'success' ? (
                <>
                  <CheckCircle size={18} />
                  Subscribed!
                </>
              ) : status === 'submitting' ? (
                'Subscribing...'
              ) : (
                'Subscribe'
              )}
            </button>
          </form>

          {message && (
            <p className={`mt-3 text-sm font-mono ${
              status === 'error' ? 'text-red-400' : 'text-green-400'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
