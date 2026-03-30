'use client';

import { useEffect, useState } from 'react';

const terminalLines = [
  { text: '$ initializing portfolio...', delay: 0 },
  { text: '> loading skills.config', delay: 400 },
  { text: '> fetching experience.json', delay: 800 },
  { text: '> compiling projects...', delay: 1200 },
  { text: '✓ ready', delay: 1600, isSuccess: true },
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
        setTimeout(() => setIsLoading(false), 500);
      }, 400);
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
        setTimeout(() => setVisibleLines(v => v + 1), 200);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [visibleLines]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  if (!isLoading) return null;

  const textColor = 'text-gray-300';
  const successColor = 'text-cyan-400';
  const promptColor = 'text-cyan-500';

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 bg-[#1a1a1a] ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-lg mx-4">
        {/* Terminal Window */}
        <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400 text-sm font-mono">ronak@portfolio ~ </span>
          </div>
          
          {/* Terminal Body */}
          <div className="bg-[#1e1e1e] p-4 min-h-[200px] font-mono text-sm">
            {/* Completed lines */}
            {terminalLines.slice(0, visibleLines).map((line, idx) => (
              <div key={idx} className={`mb-1 ${line.isSuccess ? successColor : textColor}`}>
                {line.text.startsWith('$') ? (
                  <span><span className={promptColor}>$</span>{line.text.slice(1)}</span>
                ) : line.text.startsWith('>') ? (
                  <span><span className="text-gray-500">›</span>{line.text.slice(1)}</span>
                ) : (
                  line.text
                )}
              </div>
            ))}
            
            {/* Currently typing line */}
            {visibleLines < terminalLines.length && (
              <div className={`mb-1 ${terminalLines[visibleLines]?.isSuccess ? successColor : textColor}`}>
                {currentText.startsWith('$') ? (
                  <span><span className={promptColor}>$</span>{currentText.slice(1)}</span>
                ) : currentText.startsWith('>') ? (
                  <span><span className="text-gray-500">›</span>{currentText.slice(1)}</span>
                ) : (
                  currentText
                )}
                <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} ${promptColor}`}>▋</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
