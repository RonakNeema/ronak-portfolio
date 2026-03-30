'use client';

import { useEffect, useState } from 'react';

export default function useScrollProgress(threshold = 200) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY;
      let progressValue = 0;
      if (scrollY >= threshold) {
        progressValue = 1;
      } else {
        progressValue = scrollY / threshold;
      }
      setProgress(progressValue);
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return { progress };
}
