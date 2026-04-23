'use client';

import { useState, useEffect, useRef } from 'react';
import { Award, Trophy, Star, Crown } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'AWS Developer Associate',
    description: 'Cloud infrastructure and services certification.',
    icon: Award,
    rarity: 'legendary',
    date: '2024',
  },
  {
    id: 2,
    title: 'CTO Appreciation Award',
    description: 'Recognition for high-impact contributions at ForwardAI.',
    icon: Trophy,
    rarity: 'epic',
    date: '2024',
  },
  {
    id: 3,
    title: 'Star of the Quarter',
    description: 'Performance recognition at TCS.',
    icon: Star,
    rarity: 'rare',
    date: '2023',
  },
  {
    id: 4,
    title: "Master's Degree",
    description: 'M.S. Computer Science - University of Colorado Denver.',
    icon: Crown,
    rarity: 'legendary',
    date: '2025',
  },
];

const rarityColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  common: { bg: 'bg-gray-600/20', border: 'border-gray-500/30', text: 'text-gray-400', glow: '' },
  rare: { bg: 'bg-blue-600/20', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' },
  epic: { bg: 'bg-purple-600/20', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-[0_0_20px_rgba(147,51,234,0.3)]' },
  legendary: { bg: 'bg-amber-600/20', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-[0_0_25px_rgba(245,158,11,0.4)]' },
};

export default function Certifications() {
  const [visibleAchievements, setVisibleAchievements] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          achievements.forEach((achievement, index) => {
            setTimeout(() => {
              setVisibleAchievements((prev) => [...prev, achievement.id]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// achievements'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> cat <span className="text-cyan-400">achievements.log</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            const colors = rarityColors[achievement.rarity];
            const isVisible = visibleAchievements.includes(achievement.id);
            const isHovered = hoveredId === achievement.id;

            return (
              <div
                key={achievement.id}
                className={`relative bg-[#1a1a1a] border rounded-lg overflow-hidden transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } ${colors.border} ${isHovered ? colors.glow : ''} hover:scale-105`}
                onMouseEnter={() => setHoveredId(achievement.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="bg-[#252525] px-3 py-1.5 flex items-center justify-between border-b border-[#2a2a2a]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className={`text-xs font-mono uppercase ${colors.text}`}>{achievement.rarity}</span>
                </div>

                <div className="p-4 text-center">
                  <div className={`${colors.bg} ${colors.text} p-3 rounded-lg inline-block mb-3 relative`}>
                    <IconComponent className="w-6 h-6" />
                    {isHovered && <div className="absolute inset-0 rounded-lg animate-ping opacity-30 bg-current" />}
                  </div>
                  <h3 className="font-mono text-sm font-bold mb-1 text-white">{achievement.title}</h3>
                  <p className="text-gray-500 text-xs font-mono mb-2">{achievement.description}</p>
                  <span className={`text-xs font-mono ${colors.text}`}>{achievement.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-mono">
          {Object.entries(rarityColors).map(([rarity, colors]) => (
            <div key={rarity} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${colors.bg} ${colors.border} border`} />
              <span className={colors.text}>{rarity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
