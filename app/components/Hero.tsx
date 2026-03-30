'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Github, Linkedin, Code, Terminal } from 'lucide-react';

const bioLines = [
  '// Passionate engineer building scalable systems.',
  '// Turning coffee into code since 2019.',
];

// Matrix rain characters
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ロナク'.split('');

interface Drop {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
}

function MatrixAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const animationRef = useRef<number>(0);

  const initDrops = useCallback((width: number, height: number) => {
    const columns = Math.floor(width / 14);
    const drops: Drop[] = [];
    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * 14,
        y: Math.random() * height,
        speed: 2 + Math.random() * 3,
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
        opacity: 0.5 + Math.random() * 0.5,
      });
    }
    dropsRef.current = drops;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 180;
    const height = 180;
    canvas.width = width;
    canvas.height = height;

    initDrops(width, height);

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '12px monospace';

      dropsRef.current.forEach((drop, i) => {
        // Random char change
        if (Math.random() > 0.95) {
          drop.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        }

        // Draw character
        ctx.fillStyle = `rgba(34, 211, 211, ${drop.opacity})`;
        ctx.fillText(drop.char, drop.x, drop.y);

        // Move drop
        drop.y += drop.speed;

        // Reset if off screen
        if (drop.y > height) {
          drop.y = 0;
          drop.speed = 2 + Math.random() * 3;
          drop.opacity = 0.5 + Math.random() * 0.5;
        }

        dropsRef.current[i] = drop;
      });

      // Draw initials in center
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 48px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('RN', width / 2, height / 2);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initDrops]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="rounded-full border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,211,0.3)]"
        style={{ width: 180, height: 180 }}
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function Hero() {
  const [bioVisible, setBioVisible] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const bioRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for bio
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !bioVisible) {
          setBioVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (bioRef.current) {
      observer.observe(bioRef.current);
    }

    return () => observer.disconnect();
  }, [bioVisible]);

  // Typing effect for bio
  useEffect(() => {
    if (!bioVisible || currentLineIndex >= bioLines.length) return;

    const currentLine = bioLines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setTypedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [bioVisible, currentLineIndex, currentCharIndex]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0d0d0d]">
      {/* Grid background effect */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#22d3d3 1px, transparent 1px), linear-gradient(90deg, #22d3d3 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full h-full px-6 md:px-12 py-16 flex flex-col items-center justify-center text-center min-h-screen">
        {/* Matrix Avatar */}
        <div className="mb-8">
          <MatrixAvatar />
        </div>

        {/* Terminal-style name */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-mono mb-2">
            <Terminal size={16} />
            <span>~/ronak-neema</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-white tracking-tight leading-tight font-mono font-bold">
            Ronak <span className="text-cyan-400">Neema</span>
          </h1>
        </div>

        <p className="text-base md:text-xl text-gray-400 font-mono tracking-wide mb-8">
          <span className="text-cyan-400">$</span> echo &quot;DevOps Engineer | Full Stack Developer&quot;
        </p>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-10">
          <a href="https://github.com/Ronakneema/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" 
             className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/ronak-neema/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" 
             className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110">
            <Linkedin size={24} />
          </a>
          <a href="https://leetcode.com/RonakNeema/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" 
             className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110">
            <Code size={24} />
          </a>
        </div>

        {/* Terminal-style bio */}
        <div ref={bioRef} className="max-w-2xl bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 md:p-6 text-left font-mono text-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#2a2a2a]">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-gray-500 text-xs">bio.sh</span>
          </div>
          <div className="text-gray-300 leading-relaxed min-h-[3rem]">
            {typedLines.map((line, idx) => {
              if (idx === 0) {
                // First line: "// Passionate engineer building scalable systems."
                return (
                  <div key={idx}>
                    <span className="text-gray-500">// </span>
                    <span className="text-cyan-400">Passionate engineer</span>
                    <span> building scalable systems.</span>
                  </div>
                );
              } else if (idx === 1) {
                // Second line: "// Turning coffee into code since 2019."
                const text = line;
                const beforeCoffee = text.substring(0, text.indexOf('coffee'));
                const afterCoffee = text.substring(text.indexOf('coffee') + 6, text.indexOf('code'));
                const afterCode = text.substring(text.indexOf('code') + 4);
                
                return (
                  <div key={idx}>
                    <span className="text-gray-500">// </span>
                    <span>Turning </span>
                    <span className="text-green-400">coffee</span>
                    <span> into </span>
                    <span className="text-cyan-400">code</span>
                    <span> since 2019.</span>
                  </div>
                );
              }
              return null;
            })}
            {currentLineIndex < bioLines.length && (
              <span className="text-cyan-400 animate-pulse">▋</span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <p className="text-sm text-gray-500 font-mono">scroll_down<span className="text-cyan-400">()</span></p>
      </div>
    </section>
  );
}
