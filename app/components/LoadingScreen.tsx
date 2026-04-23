'use client';

import { useEffect, useState } from 'react';

const terminalLines = [
  { text: '$ initializing portfolio...', delay: 0 },
  { text: '> loading skills.config', delay: 300 },
  { text: '> fetching experience.json', delay: 600 },
  { text: '> compiling projects...', delay: 900 },
  { text: '✓ ready', delay: 1200, isSuccess: true },
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typing effect
  useEffect(() => {
    if (visibleLines >= terminalLines.length) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setIsLoading(false), 400);
      }, 300);
      return;
    }

    const line = terminalLines[visibleLines];
    let charIndex = 0;
    setCurrentText('');

    const typeInterval = setInterval(() => {
      if (charIndex < line.text.length) {
        setCurrentText(line.text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setVisibleLines(v => v + 1), 150);
      }
    }, 20); // Faster typing

    return () => clearInterval(typeInterval);
  }, [visibleLines]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 400);
    return () => clearInterval(cursorInterval);
  }, []);

  if (!isLoading) return null;

  const textColor = 'text-gray-300';
  const successColor = 'text-cyan-400';
  const promptColor = 'text-cyan-500';

  return (
    <div 
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-400 bg-[#1a1a1a] ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-lg px-6">
        {/* Terminal window */}
        <div className="bg-[#0d0d0d] rounded-lg border border-[#333] overflow-hidden shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#333]">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-gray-500 font-mono">ronak@portfolio ~ </span>
          </div>
          
          {/* Terminal content */}
          <div className="p-4 font-mono text-sm space-y-1 min-h-[160px]">
            {terminalLines.slice(0, visibleLines).map((line, idx) => (
              <div key={idx} className={line.isSuccess ? successColor : textColor}>
                {line.text}
              </div>
            ))}
            
            {visibleLines < terminalLines.length && (
              <div className={textColor}>
                {currentText}
                <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} ${promptColor}`}>▋</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-1 bg-[#333] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${(visibleLines / terminalLines.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
