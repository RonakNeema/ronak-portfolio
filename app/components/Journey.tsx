'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Experience from './Experience';

export default function Journey() {
  const { ref, isVisible } = useScrollAnimation(0.85);

  return (
    <section id="journey" className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16" ref={ref}>
        {/* Section Header */}
        <div className={`mb-12 animate-in ${isVisible ? 'show' : ''}`}>
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// experience'}</p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> git log <span className="text-cyan-400">--oneline</span>
          </h3>
          <p className="text-gray-400 font-mono text-sm mt-4">
            {'>'} A timeline of commits to my professional journey
          </p>
        </div>
        
        <Experience />
      </div>
    </section>
  );
}

