'use client';

import { useEffect, useState } from 'react';
import { FolderGit2, Star, Users, UserPlus, FileCode2 } from 'lucide-react';

interface GitHubStatsData {
  repos: number;
  stars: number;
  followers: number;
  following: number;
  publicGists: number;
}

interface Language {
  name: string;
  percentage: number;
  color: string;
}

interface GitHubUserResponse {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface GitHubRepoResponse {
  stargazers_count: number;
  language: string | null;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setError(null);

        const [userResponse, reposResponse] = await Promise.all([
          fetch('https://api.github.com/users/RonakNeema'),
          fetch('https://api.github.com/users/RonakNeema/repos?per_page=100'),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error(`GitHub API request failed (${userResponse.status}/${reposResponse.status})`);
        }

        const userData = (await userResponse.json()) as GitHubUserResponse;
        const reposData = (await reposResponse.json()) as GitHubRepoResponse[];

        if (!Array.isArray(reposData)) {
          throw new Error('Invalid GitHub repositories response');
        }

        const totalStars = reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

        setStats({
          repos: userData.public_repos,
          stars: totalStars,
          followers: userData.followers,
          following: userData.following,
          publicGists: userData.public_gists,
        });

        const languageCounts: Record<string, number> = {};
        for (const repo of reposData) {
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
          }
        }

        const totalLanguageRepos = Object.values(languageCounts).reduce((count, value) => count + value, 0);
        const languageColors: Record<string, string> = {
          TypeScript: '#3178c6',
          JavaScript: '#f1e05a',
          Python: '#3572A5',
          Go: '#00ADD8',
          Java: '#b07219',
          Shell: '#89e051',
          HTML: '#e34c26',
          CSS: '#563d7c',
        };

        if (totalLanguageRepos === 0) {
          setLanguages([]);
        } else {
          const topLanguages = Object.entries(languageCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([name, count]) => ({
              name,
              percentage: Math.round((count / totalLanguageRepos) * 100),
              color: languageColors[name] || '#6b7280',
            }));

          setLanguages(topLanguages);
        }
      } catch (fetchError) {
        console.error('Failed to fetch GitHub data:', fetchError);
        setError('Unable to load live GitHub stats right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section id="github-stats">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-cyan-400 font-mono text-sm mb-2">{'// github'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
              <span className="text-gray-500">$</span> git log <span className="text-cyan-400">--stat</span>
            </h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section id="github-stats">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-cyan-400 font-mono text-sm mb-2">{'// github'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
              <span className="text-gray-500">$</span> git log <span className="text-cyan-400">--stat</span>
            </h2>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 font-mono text-sm text-gray-400">
            {error}
          </div>
        </div>
      </section>
    );
  }

  const statCards = [
    { label: 'Repositories', value: stats.repos, icon: FolderGit2 },
    { label: 'Stars', value: stats.stars, icon: Star },
    { label: 'Followers', value: stats.followers, icon: Users },
    { label: 'Following', value: stats.following, icon: UserPlus },
    { label: 'Public Gists', value: stats.publicGists, icon: FileCode2 },
  ];

  return (
    <section id="github-stats">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// github'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> git log <span className="text-cyan-400">--stat</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div className="bg-[#2a2a2a] px-4 py-2 flex items-center justify-between border-b border-[#333]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 font-mono">profile.json</span>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
              {statCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="text-cyan-400" size={14} />
                      <span className="text-gray-500 text-xs font-mono">{item.label}</span>
                    </div>
                    <div className="text-white font-mono text-lg font-bold">{item.value.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div className="bg-[#2a2a2a] px-4 py-2 flex items-center justify-between border-b border-[#333]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 font-mono">languages.json</span>
            </div>

            <div className="p-4">
              {languages.length === 0 ? (
                <p className="text-gray-500 font-mono text-sm">No language data available.</p>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                        className="transition-all hover:opacity-80"
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <div key={lang.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: lang.color }} />
                        <span className="text-gray-300 font-mono truncate">{lang.name}</span>
                        <span className="text-gray-500 font-mono ml-auto">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
