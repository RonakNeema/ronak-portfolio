'use client';

import { useState, useEffect, useRef } from 'react';
import { Award, Trophy, Star, Shield, Zap, Target, Medal, Crown, CheckCircle, Lock } from 'lucide-react';

const achievements = [
  { 
    id: 1,
    title: 'AWS Developer Associate', 
    description: 'Cloud infrastructure & services mastery',
    icon: Award, 
    unlocked: true,
    rarity: 'legendary',
    date: '2024',
  },
  { 
    id: 2,
    title: 'CTO Appreciation Award', 
    description: 'Recognition for exceptional contributions at ForwardAI',
    icon: Trophy, 
    unlocked: true,
    rarity: 'epic',
    date: '2024',
  },
  { 
    id: 3,
    title: 'Star of the Quarter', 
    description: 'Outstanding performance recognition at TCS',
    icon: Star, 
    unlocked: true,
    rarity: 'rare',
    date: '2023',
  },
  { 
    id: 4,
    title: 'Master\'s Degree', 
    description: 'M.S. Computer Science - University of Texas at Arlington',
    icon: Crown, 
    unlocked: true,
    rarity: 'legendary',
    date: '2025',
  },
  { 
    id: 5,
    title: 'First 1000 Commits', 
    description: 'Reached 1,000 commits milestone on GitHub',
    icon: Zap, 
    unlocked: true,
    rarity: 'rare',
    date: '2023',
  },
  { 
    id: 6,
    title: 'Open Source Contributor', 
    description: 'Contributed to popular open source projects',
    icon: Target, 
    unlocked: true,
    rarity: 'common',
    date: '2022',
  },
  { 
    id: 7,
    title: 'Kubernetes Certified', 
    description: 'CKA Certification (In Progress)',
    icon: Shield, 
    unlocked: false,
    rarity: 'legendary',
    date: 'Coming Soon',
  },
  { 
    id: 8,
    title: 'Tech Lead', 
    description: 'Lead a team of engineers',
    icon: Medal, 
    unlocked: false,
    rarity: 'epic',
    date: 'Future',
  },
];

const rarityColors: { [key: string]: { bg: string; border: string; text: string; glow: string } } = {
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
          // Reveal achievements one by one
          achievements.forEach((achievement, index) => {
            setTimeout(() => {
              setVisibleAchievements(prev => [...prev, achievement.id]);
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

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <section id="certifications" className="py-20 px-6 md:px-12 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// achievements'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> cat <span className="text-cyan-400">achievements.log</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
              <CheckCircle size={16} className="text-green-400" />
              <span>{unlockedCount}/{totalCount} Unlocked</span>
            </div>
            <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden max-w-xs">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-1000"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
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
                } ${achievement.unlocked ? colors.border : 'border-[#2a2a2a]'} ${
                  achievement.unlocked && isHovered ? colors.glow : ''
                } ${achievement.unlocked ? 'hover:scale-105' : 'opacity-60'}`}
                onMouseEnter={() => setHoveredId(achievement.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Terminal Header */}
                <div className="bg-[#252525] px-3 py-1.5 flex items-center justify-between border-b border-[#2a2a2a]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className={`text-xs font-mono uppercase ${colors.text}`}>
                    {achievement.rarity}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 text-center">
                  <div className={`${colors.bg} ${colors.text} p-3 rounded-lg inline-block mb-3 relative`}>
                    {achievement.unlocked ? (
                      <IconComponent className="w-6 h-6" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                    {achievement.unlocked && isHovered && (
                      <div className="absolute inset-0 rounded-lg animate-ping opacity-30 bg-current" />
                    )}
                  </div>
                  <h3 className={`font-mono text-sm font-bold mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {achievement.unlocked ? achievement.title : '???'}
                  </h3>
                  <p className="text-gray-500 text-xs font-mono mb-2">
                    {achievement.unlocked ? achievement.description : 'Keep working to unlock!'}
                  </p>
                  <span className={`text-xs font-mono ${colors.text}`}>
                    {achievement.date}
                  </span>
                </div>

                {/* Unlocked Badge */}
                {achievement.unlocked && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle size={14} className="text-green-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Rarity Legend */}
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
