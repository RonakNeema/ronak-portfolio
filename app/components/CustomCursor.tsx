'use client';

import { useEffect, useState } from 'react';

// CURSOR STYLE: Change this to switch between styles
// Options: 'crosshair' | 'ring'
const CURSOR_STYLE: 'crosshair' | 'ring' = 'ring';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(
          computedStyle.cursor === 'pointer' ||
          hoveredElement.tagName === 'A' ||
          hoveredElement.tagName === 'BUTTON' ||
          hoveredElement.closest('a') !== null ||
          hoveredElement.closest('button') !== null
        );
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', updateCursorType);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button').forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', updateCursorType);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = '';
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  // CROSSHAIR STYLE
  if (CURSOR_STYLE === 'crosshair') {
    return (
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Vertical line */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 w-px bg-cyan-400 transition-all duration-150 ${
            isPointer ? 'h-6 opacity-100' : 'h-4 opacity-70'
          }`}
          style={{ top: isPointer ? -12 : -8 }}
        />
        {/* Horizontal line */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 h-px bg-cyan-400 transition-all duration-150 ${
            isPointer ? 'w-6 opacity-100' : 'w-4 opacity-70'
          }`}
          style={{ left: isPointer ? -12 : -8 }}
        />
        {/* Center dot */}
        <div 
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 transition-all duration-150 ${
            isPointer ? 'w-2 h-2' : 'w-1 h-1'
          }`}
        />
      </div>
    );
  }

  // RING STYLE
  return (
    <>
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`rounded-full bg-cyan-400 transition-all duration-150 ${
          isPointer ? 'w-2 h-2' : 'w-1.5 h-1.5'
        }`} />
      </div>
      {/* Outer ring */}
      <div
        className={`fixed pointer-events-none z-[9998] rounded-full border-2 border-cyan-400 transition-all duration-200 ${
          isPointer ? 'w-10 h-10 opacity-100' : 'w-6 h-6 opacity-60'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
