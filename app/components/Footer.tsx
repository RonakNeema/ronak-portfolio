'use client';

import { Github, Linkedin, Code, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#2a2a2a] py-12">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-cyan-400" />
            <span className="text-white font-mono">ronak<span className="text-cyan-400">@</span>portfolio</span>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4">
            <a href="https://github.com/Ronakneema/" target="_blank" rel="noopener noreferrer" 
               className="p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/ronak-neema/" target="_blank" rel="noopener noreferrer"
               className="p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
              <Linkedin size={18} />
            </a>
            <a href="https://leetcode.com/RonakNeema/" target="_blank" rel="noopener noreferrer"
               className="p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
              <Code size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-[#2a2a2a] text-center">
          <p className="text-gray-500 font-mono text-sm">
            <span className="text-cyan-400">$</span> echo "© 2025 Ronak Neema. All rights reserved."
          </p>
        </div>
      </div>
    </footer>
  );
}
