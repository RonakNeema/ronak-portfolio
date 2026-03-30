'use client';

import { Github, GitCommit, GitPullRequest, Star, Users, Calendar } from 'lucide-react';

// Static stats - in production, you'd fetch from GitHub API
const stats = {
  repos: 24,
  stars: 67,
  commits: 1243,
  contributions: 892,
  followers: 45,
  following: 32,
};

const languages = [
  { name: 'TypeScript', percentage: 35, color: '#3178c6' },
  { name: 'Python', percentage: 25, color: '#3572A5' },
  { name: 'Go', percentage: 20, color: '#00ADD8' },
  { name: 'Shell', percentage: 12, color: '#89e051' },
  { name: 'Other', percentage: 8, color: '#6b7280' },
];

// Static contribution graph data (seeded pattern to avoid hydration mismatch)
const contributionData = [
  [2, 1, 4, 0, 3, 2, 1],
  [0, 3, 1, 2, 4, 1, 3],
  [4, 2, 0, 3, 1, 4, 2],
  [1, 0, 3, 4, 2, 0, 1],
  [3, 4, 2, 1, 0, 3, 4],
  [2, 1, 4, 3, 2, 1, 0],
  [0, 2, 1, 4, 3, 2, 1],
  [4, 3, 0, 2, 1, 4, 3],
  [1, 4, 3, 0, 2, 1, 4],
  [3, 0, 2, 1, 4, 3, 2],
  [2, 1, 4, 3, 0, 2, 1],
  [4, 3, 1, 2, 3, 4, 0],
  [0, 2, 3, 4, 1, 0, 3],
  [3, 1, 0, 2, 4, 3, 2],
  [1, 4, 2, 3, 0, 1, 4],
  [4, 0, 3, 1, 2, 4, 1],
  [2, 3, 1, 4, 3, 2, 0],
  [0, 1, 4, 0, 1, 3, 2],
  [3, 2, 0, 3, 4, 0, 4],
  [1, 4, 3, 2, 1, 2, 3],
];

const contributionColors = [
  'bg-[#1a1a1a]',
  'bg-cyan-900/50',
  'bg-cyan-700/60',
  'bg-cyan-500/70',
  'bg-cyan-400',
];

export default function GitHubStats() {
  return (
    <section id="github-stats" className="py-20 px-6 md:px-12 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// github'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> git log <span className="text-cyan-400">--stat</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-4">
            <StatCard icon={<Github size={20} />} label="Repositories" value={stats.repos} />
            <StatCard icon={<Star size={20} />} label="Stars" value={stats.stars} />
            <StatCard icon={<GitCommit size={20} />} label="Commits" value={stats.commits} />
            <StatCard icon={<GitPullRequest size={20} />} label="Contributions" value={stats.contributions} />
            <StatCard icon={<Users size={20} />} label="Followers" value={stats.followers} />
            <StatCard icon={<Calendar size={20} />} label="This Year" value={stats.contributions} />
          </div>

          {/* Contribution Graph */}
          <div className="lg:col-span-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div className="bg-[#252525] px-4 py-2 flex items-center gap-2 border-b border-[#2a2a2a]">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-400 text-sm font-mono">contribution_graph.svg</span>
            </div>
            
            <div className="p-6">
              <h3 className="text-white font-mono text-sm mb-4 flex items-center gap-2">
                <span className="text-gray-500">&gt;</span>
                Contribution Activity
              </h3>
              
              {/* Contribution Grid */}
              <div className="flex gap-1 overflow-x-auto pb-2">
                {contributionData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((level, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`w-3 h-3 rounded-sm ${contributionColors[level]} border border-[#2a2a2a]`}
                        title={`${level} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500 font-mono">
                <span>Less</span>
                {contributionColors.map((color, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${color} border border-[#2a2a2a]`} />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="mt-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
          <div className="bg-[#252525] px-4 py-2 flex items-center gap-2 border-b border-[#2a2a2a]">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400 text-sm font-mono">languages.json</span>
          </div>
          
          <div className="p-6">
            <h3 className="text-white font-mono text-sm mb-4 flex items-center gap-2">
              <span className="text-gray-500">&gt;</span>
              Most Used Languages
            </h3>

            {/* Language Bar */}
            <div className="flex h-3 rounded-full overflow-hidden mb-4">
              {languages.map((lang, i) => (
                <div
                  key={i}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  className="first:rounded-l-full last:rounded-r-full"
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Language Labels */}
            <div className="flex flex-wrap gap-4">
              {languages.map((lang, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-gray-300 text-sm font-mono">{lang.name}</span>
                  <span className="text-gray-500 text-xs">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View Profile */}
        <div className="mt-8 text-center">
          <a
            href="https://github.com/Ronakneema"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 font-mono text-sm"
          >
            <Github size={18} />
            View Full Profile
          </a>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-cyan-500/30 transition-colors">
      <div className="text-cyan-400 mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white font-mono">{value.toLocaleString()}</div>
      <div className="text-xs text-gray-500 font-mono">{label}</div>
    </div>
  );
}
