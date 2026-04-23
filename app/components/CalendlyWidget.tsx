'use client';

import { Calendar } from 'lucide-react';

export default function CalendlyWidget() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  const handleBooking = () => {
    if (!calendlyUrl) return;
    const newWindow = window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="text-accent" size={28} />
        <div>
          <h3 className="text-xl font-bold text-white font-mono">Schedule a Call</h3>
          <p className="text-sm text-gray-400 font-mono">Let&apos;s discuss your project</p>
        </div>
      </div>
      
      <p className="text-gray-300 font-mono text-sm mb-4">
        Book a free 30-minute consultation to discuss:
      </p>
      
      <ul className="text-sm text-gray-400 font-mono space-y-2 mb-6">
        <li className="flex items-center gap-2">
          <span className="text-accent">✓</span> DevOps & Cloud Architecture
        </li>
        <li className="flex items-center gap-2">
          <span className="text-accent">✓</span> CI/CD Pipeline Setup
        </li>
        <li className="flex items-center gap-2">
          <span className="text-accent">✓</span> Technical Consulting
        </li>
        <li className="flex items-center gap-2">
          <span className="text-accent">✓</span> Career Advice
        </li>
      </ul>

      <button
        onClick={handleBooking}
        disabled={!calendlyUrl}
        className="w-full bg-accent text-black font-mono px-6 py-3 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Calendar size={18} />
        Book a Meeting
      </button>
      
      <p className="text-xs text-gray-500 font-mono mt-3 text-center">
        {calendlyUrl ? 'Free 30-minute consultation call.' : 'Calendly link is not configured yet.'}
      </p>
    </div>
  );
}
