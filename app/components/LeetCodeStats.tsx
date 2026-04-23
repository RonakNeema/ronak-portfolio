'use client';

import { useEffect, useState } from 'react';
import { Trophy, CheckCircle, Award } from 'lucide-react';

interface LeetCodeStats {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number;
}

export default function LeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, you'd fetch from LeetCode API or use a proxy
    // LeetCode doesn't have an official public API, so this uses mock data
    // You can use services like: https://github.com/alfaarghya/alfa-leetcode-api
    
    const fetchLeetCodeData = async () => {
      try {
        // Mock data - replace with actual API call
        // Example: const response = await fetch('https://leetcode-api.com/user/username');
        setTimeout(() => {
          setStats({
            totalSolved: 247,
            easy: 112,
            medium: 98,
            hard: 37,
            ranking: 45234,
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch LeetCode stats:', error);
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// leetcode'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> leetcode stats
          </h2>
        </div>
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <p className="text-cyan-400 font-mono text-sm mb-2">{'// leetcode'}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
          <span className="text-gray-500">$</span> leetcode stats
        </h2>
      </div>

      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 hover:border-accent/50 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="text-accent" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-white font-mono">Problem Solving</h3>
              <p className="text-sm text-gray-400">Ranking: #{stats.ranking.toLocaleString()}</p>
            </div>
          </div>
          <Award className="text-yellow-500" size={28} />
        </div>

        {/* Total Solved */}
        <div className="mb-6 text-center">
          <div className="text-6xl font-bold text-accent font-mono mb-2">{stats.totalSolved}</div>
          <div className="text-gray-400 font-mono">Problems Solved</div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0d0d0d] rounded-lg p-4 text-center">
            <CheckCircle size={20} className="text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400 font-mono">{stats.easy}</div>
            <div className="text-xs text-gray-400 font-mono">Easy</div>
          </div>
          <div className="bg-[#0d0d0d] rounded-lg p-4 text-center">
            <CheckCircle size={20} className="text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400 font-mono">{stats.medium}</div>
            <div className="text-xs text-gray-400 font-mono">Medium</div>
          </div>
          <div className="bg-[#0d0d0d] rounded-lg p-4 text-center">
            <CheckCircle size={20} className="text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-400 font-mono">{stats.hard}</div>
            <div className="text-xs text-gray-400 font-mono">Hard</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              style={{ width: '65%' }}
            />
          </div>
          <p className="text-xs text-gray-500 font-mono text-center">
            Keep solving! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
