'use client';

import { useEffect, useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Navigation() {
  const { theme } = useTheme();
  const [heroProgress, setHeroProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    // Prevent scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const visibleProgress = Math.max(0, Math.min(1, (heroProgress - 0.80) / 0.20));
  const navStyle = {
    opacity: visibleProgress,
    transform: `translateY(${(1 - visibleProgress) * -10}px)`,
    pointerEvents: visibleProgress > 0 ? 'auto' : 'none',
    background: theme === 'dark' ? 'rgba(13, 13, 13, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    borderBottom: theme === 'dark' ? '1px solid #2a2a2a' : '1px solid #e5e7eb',
  } as React.CSSProperties;

  const menuLinks = [
    { href: '#about', label: './about' },
    { href: '#journey', label: './journey' },
    { href: '#skills', label: './skills' },
    { href: '#projects', label: './projects' },
    { href: '#contact', label: './contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50" style={navStyle}>
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-cyan-400" />
            <h1 className="text-lg md:text-xl font-bold text-white font-mono">
              ronak<span className="text-cyan-400">@</span>portfolio
            </h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-sm font-mono">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-cyan-400 transition-all duration-200 press-effect"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors press-effect"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#1a1a1a] border-l border-[#2a2a2a] z-50 md:hidden transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="bg-[#252525] px-4 py-3 flex items-center justify-between border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="p-4 space-y-2 font-mono">
          {menuLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-[#252525] rounded-lg transition-all duration-200 animate-in animate-in-right"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="text-cyan-400">$</span> {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
