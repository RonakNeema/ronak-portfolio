'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(offset: number = 0.85) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0,
        rootMargin: `-${(1 - offset) * 100}% 0px 0px 0px`,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible, offset]);

  return { ref, isVisible };
}
