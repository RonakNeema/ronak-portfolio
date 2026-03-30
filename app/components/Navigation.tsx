'use client';

import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

export default function Navigation() {
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === 'undefined') return;
      const progress = window.scrollY / window.innerHeight;
      setHeroProgress(progress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visibleProgress = Math.max(0, Math.min(1, (heroProgress - 0.80) / 0.20));
  const navStyle = {
    opacity: visibleProgress,
    transform: `translateY(${(1 - visibleProgress) * -10}px)`,
    pointerEvents: visibleProgress > 0 ? 'auto' : 'none',
    background: 'rgba(13, 13, 13, 0.9)',
    backdropFilter: 'blur(8px)',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    borderBottom: '1px solid #2a2a2a',
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={navStyle as React.CSSProperties}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Terminal size={20} className="text-cyan-400" />
          <h1 className="text-lg md:text-xl font-bold text-white font-mono">
            ronak<span className="text-cyan-400">@</span>portfolio
          </h1>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden md:flex gap-6 text-sm font-mono">
            <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-all duration-200">./about</a>
            <a href="#journey" className="text-gray-400 hover:text-cyan-400 transition-all duration-200">./journey</a>
            <a href="#skills" className="text-gray-400 hover:text-cyan-400 transition-all duration-200">./skills</a>
            <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-all duration-200">./projects</a>
            <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-all duration-200">./contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
