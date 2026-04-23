'use client';

import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  title?: string;
  text?: string;
  url?: string;
}

export default function ShareButtons({ 
  title = "Check out Ronak Neema's Portfolio",
  text = "Amazing terminal-themed portfolio by a DevOps Engineer & Full Stack Developer",
  url = typeof window !== 'undefined' ? window.location.href : ''
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={nativeShare}
        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 font-mono text-sm press-effect"
        aria-label="Share"
      >
        <Share2 size={16} />
        <span>Share</span>
      </button>

      {/* Share Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 z-50 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl overflow-hidden animate-in animate-in-scale">
            <div className="bg-[#252525] px-4 py-2 border-b border-[#2a2a2a]">
              <span className="text-xs font-mono text-gray-400">Share via</span>
            </div>
            <div className="p-2 space-y-1">
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-[#252525] rounded transition-all"
              >
                <Twitter size={16} />
                <span className="font-mono text-sm">Twitter</span>
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-[#252525] rounded transition-all"
              >
                <Linkedin size={16} />
                <span className="font-mono text-sm">LinkedIn</span>
              </a>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-[#252525] rounded transition-all"
              >
                <Facebook size={16} />
                <span className="font-mono text-sm">Facebook</span>
              </a>
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-[#252525] rounded transition-all"
              >
                {copied ? <Check size={16} /> : <Link2 size={16} />}
                <span className="font-mono text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
