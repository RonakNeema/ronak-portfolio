'use client';

import { useEffect } from 'react';

export default function TouchGestures() {
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleGesture();
    };

    const handleGesture = () => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipeDistance = 50;

      // Horizontal swipe (navigate sections)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        const sections = ['hero', 'about', 'projects', 'github-stats', 'certifications', 'guestbook', 'contact'];
        const currentSection = sections.find(id => {
          const element = document.getElementById(id);
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });

        if (currentSection) {
          const currentIndex = sections.indexOf(currentSection);
          let targetIndex = currentIndex;

          if (deltaX > 0) {
            // Swipe right - go to previous section
            targetIndex = Math.max(0, currentIndex - 1);
          } else {
            // Swipe left - go to next section
            targetIndex = Math.min(sections.length - 1, currentIndex + 1);
          }

          if (targetIndex !== currentIndex) {
            const targetElement = document.getElementById(sections[targetIndex]);
            targetElement?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }

      // Vertical swipe up from bottom - show command palette
      if (deltaY < -100 && touchStartY > window.innerHeight * 0.8) {
        // Trigger command palette (Ctrl+K equivalent)
        const event = new KeyboardEvent('keydown', {
          key: 'k',
          code: 'KeyK',
          ctrlKey: true,
          bubbles: true
        });
        document.dispatchEvent(event);
      }
    };

    // Only add listeners on touch devices
    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if ('ontouchstart' in window) {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
