'use client';

import { useEffect, useState } from 'react';
import { GitCommit, GitPullRequest, Star } from 'lucide-react';

interface Activity {
  type: 'commit' | 'pr' | 'star';
  repo: string;
  message: string;
  time: string;
}

interface GitHubEvent {
  type: string;
  repo?: {
    name?: string;
  };
  payload?: {
    commits?: Array<{ message?: string }>;
    action?: string;
    pull_request?: {
      title?: string;
    };
  };
  created_at?: string;
}

export default function GitHubActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        // Fetch recent events from GitHub API
        const response = await fetch('https://api.github.com/users/RonakNeema/events/public?per_page=10');
        if (!response.ok) {
          throw new Error(`GitHub activity request failed with status ${response.status}`);
        }
        const data = (await response.json()) as GitHubEvent[];

        if (Array.isArray(data)) {
          const parsed: Activity[] = data.slice(0, 5).map((event) => {
            let type: 'commit' | 'pr' | 'star' = 'commit';
            let message = '';

            switch (event.type) {
              case 'PushEvent':
                type = 'commit';
                message = event.payload?.commits?.[0]?.message || 'Pushed commits';
                break;
              case 'PullRequestEvent':
                type = 'pr';
                message = `${event.payload?.action} PR: ${event.payload?.pull_request?.title}`;
                break;
              case 'WatchEvent':
                type = 'star';
                message = 'Starred repository';
                break;
              default:
                message = event.type.replace('Event', '');
            }

            return {
              type,
              repo: event.repo?.name || 'Unknown',
              message: message.substring(0, 100),
              time: event.created_at ? new Date(event.created_at).toLocaleString() : 'Unknown time',
            };
          });

          setActivities(parsed);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub activity:', error);
        setError('Unable to load recent GitHub activity right now.');
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'commit': return <GitCommit size={16} className="text-green-400" />;
      case 'pr': return <GitPullRequest size={16} className="text-purple-400" />;
      case 'star': return <Star size={16} className="text-yellow-400" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
        <h3 className="text-sm font-mono text-gray-400 mb-3">Recent Activity</h3>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse h-12 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-accent/30 transition-colors">
      <h3 className="text-sm font-mono text-gray-400 mb-3">Recent Activity</h3>
      {error && <p className="text-xs text-amber-400 font-mono mb-2">{error}</p>}
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={`${activity.type}-${activity.repo}-${activity.time}`} className="flex items-start gap-3 text-xs">
            <div className="mt-0.5">{getIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-mono truncate">{activity.message}</p>
              <p className="text-gray-500 font-mono text-xs mt-0.5">{activity.repo}</p>
              <p className="text-gray-600 font-mono text-xs mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
        {activities.length === 0 && !error && (
          <p className="text-xs text-gray-500 font-mono">No recent public activity found.</p>
        )}
      </div>
    </div>
  );
}
