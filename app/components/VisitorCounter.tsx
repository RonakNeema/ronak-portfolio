'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState<number | null>(null);
  const [todayVisitors, setTodayVisitors] = useState<number | null>(null);

  useEffect(() => {
    // Simple localStorage-based counter for demo
    // In production, use an analytics service like Google Analytics, Plausible, or custom API
    
    const getVisitorCount = () => {
      const total = parseInt(localStorage.getItem('portfolio-total-visitors') || '0');
      const today = localStorage.getItem('portfolio-last-visit');
      const todayCount = parseInt(localStorage.getItem('portfolio-today-visitors') || '0');
      const currentDate = new Date().toDateString();
      
      if (today !== currentDate) {
        // New day, reset today counter
        localStorage.setItem('portfolio-today-visitors', '1');
        localStorage.setItem('portfolio-last-visit', currentDate);
        setTodayVisitors(1);
      } else {
        setTodayVisitors(todayCount);
      }
      
      // Increment total
      localStorage.setItem('portfolio-total-visitors', String(total + 1));
      setVisitors(total + 1);
    };

    getVisitorCount();
  }, []);

  if (visitors === null) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Eye className="text-accent" size={18} />
          <div className="text-xs font-mono">
            <div className="text-gray-400">
              Total: <span className="text-accent font-semibold">{visitors.toLocaleString()}</span>
            </div>
            <div className="text-gray-400">
              Today: <span className="text-accent font-semibold">{todayVisitors}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
