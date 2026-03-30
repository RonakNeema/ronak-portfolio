'use client';

import { useEffect, useState, useCallback } from 'react';
import { 
  Command, Search, Home, User, Briefcase, Code, Award, Mail, 
  Github, Linkedin, ExternalLink, X, Folder
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'navigation' | 'social' | 'action';
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    // Navigation
    { id: 'home', label: 'Go to Home', shortcut: 'H', icon: <Home size={16} />, action: () => scrollTo('hero'), category: 'navigation' },
    { id: 'about', label: 'Go to About', shortcut: 'A', icon: <User size={16} />, action: () => scrollTo('about'), category: 'navigation' },
    { id: 'journey', label: 'Go to Journey', shortcut: 'J', icon: <Briefcase size={16} />, action: () => scrollTo('journey'), category: 'navigation' },
    { id: 'skills', label: 'Go to Skills', shortcut: 'S', icon: <Code size={16} />, action: () => scrollTo('skills'), category: 'navigation' },
    { id: 'projects', label: 'Go to Projects', shortcut: 'P', icon: <Folder size={16} />, action: () => scrollTo('projects'), category: 'navigation' },
    { id: 'certifications', label: 'Go to Certifications', shortcut: 'C', icon: <Award size={16} />, action: () => scrollTo('certifications'), category: 'navigation' },
    { id: 'contact', label: 'Go to Contact', icon: <Mail size={16} />, action: () => scrollTo('contact'), category: 'navigation' },
    // Social
    { id: 'github', label: 'Open GitHub', icon: <Github size={16} />, action: () => window.open('https://github.com/Ronakneema', '_blank'), category: 'social' },
    { id: 'linkedin', label: 'Open LinkedIn', icon: <Linkedin size={16} />, action: () => window.open('https://linkedin.com/in/ronak-neema', '_blank'), category: 'social' },
    // Actions
    { id: 'resume', label: 'Download Resume', icon: <ExternalLink size={16} />, action: () => window.open('/resume.pdf', '_blank'), category: 'action' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Open palette with Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(prev => !prev);
      setSearch('');
      setSelectedIndex(0);
    }

    if (!isOpen) return;

    // Close with Escape
    if (e.key === 'Escape') {
      setIsOpen(false);
    }

    // Navigate with arrows
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    }

    // Execute with Enter
    if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
      setIsOpen(false);
    }
  }, [isOpen, filteredCommands, selectedIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 shadow-lg group"
        aria-label="Open command palette"
      >
        <Command size={20} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#252525] border border-[#2a2a2a] rounded text-xs font-mono text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Ctrl+K
        </span>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg mx-4">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-[#252525] px-4 py-2 flex items-center justify-between border-b border-[#2a2a2a]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-400 text-sm font-mono">command_palette</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b border-[#2a2a2a]">
            <div className="flex items-center gap-3">
              <Search size={18} className="text-cyan-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command..."
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 font-mono text-sm"
              />
              <span className="text-cyan-400 animate-pulse">▋</span>
            </div>
          </div>

          {/* Commands List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 font-mono text-sm">
                No commands found
              </div>
            ) : (
              <>
                {['navigation', 'social', 'action'].map(category => {
                  const categoryCommands = filteredCommands.filter(c => c.category === category);
                  if (categoryCommands.length === 0) return null;

                  return (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-1 text-xs font-mono text-gray-500 uppercase">
                        {category}
                      </div>
                      {categoryCommands.map((cmd) => {
                        const globalIndex = filteredCommands.indexOf(cmd);
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => {
                              cmd.action();
                              setIsOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-mono text-sm transition-all ${
                              selectedIndex === globalIndex
                                ? 'bg-cyan-500/10 text-cyan-400'
                                : 'text-gray-300 hover:bg-[#252525]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={selectedIndex === globalIndex ? 'text-cyan-400' : 'text-gray-500'}>
                                {cmd.icon}
                              </span>
                              <span>{cmd.label}</span>
                            </div>
                            {cmd.shortcut && (
                              <span className="text-xs text-gray-600 px-2 py-0.5 bg-[#252525] rounded">
                                {cmd.shortcut}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-[#2a2a2a] flex items-center justify-between text-xs text-gray-600 font-mono">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </div>
      </div>
    </>
  );
}
