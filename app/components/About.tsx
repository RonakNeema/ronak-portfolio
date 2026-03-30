'use client';

import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Download, User, Mail, MapPin } from 'lucide-react';

export default function About() {
  const { ref, isVisible } = useScrollAnimation(0.85);

  return (
    <section id="about" className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16" ref={ref}>
        {/* Section Header */}
        <div className={`mb-12 animate-in ${isVisible ? 'show' : ''}`}>
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// section'}</p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> cat <span className="text-cyan-400">about.md</span>
          </h3>
        </div>

        {/* Terminal Card */}
        <div className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden animate-in ${isVisible ? 'show' : ''}`} style={{ transitionDelay: '100ms' }}>
          {/* Terminal Header */}
          <div className="bg-[#252525] px-4 py-2 flex items-center gap-2 border-b border-[#2a2a2a]">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400 text-sm font-mono">about.md</span>
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-12 gap-8">
              {/* Info Column */}
              <div className="md:col-span-4 space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3 text-gray-300">
                  <User size={16} className="text-cyan-400" />
                  <span className="text-gray-500">name:</span>
                  <span>Ronak Neema</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={16} className="text-cyan-400" />
                  <span className="text-gray-500">email:</span>
                  <span>ronak.neema@ucdenver.edu</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={16} className="text-cyan-400" />
                  <span className="text-gray-500">location:</span>
                  <span>Denver, CO</span>
                </div>
              </div>

              {/* Bio Column */}
              <div className="md:col-span-8">
                <h4 className="text-xl md:text-2xl font-bold mb-4 text-white font-mono">
                  <span className="text-cyan-400">#</span> Hello World!
                </h4>
                <p className="text-gray-300 leading-relaxed mb-6 font-mono text-sm">
                  <span className="text-gray-500">{'>'}</span> I'm a <span className="text-cyan-400">DevOps Engineer</span> and <span className="text-cyan-400">Full Stack Developer</span> with a passion for creating seamless, efficient solutions.
                  <br /><br />
                  <span className="text-gray-500">{'>'}</span> Recently completed my <span className="text-green-400">Master's in Computer Science</span> at University of Colorado, Denver (May 2025).
                  <br /><br />
                  <span className="text-gray-500">{'>'}</span> Expertise in AWS, CI/CD, TypeScript, AngularJS, and NodeJS. Led critical projects across multiple organizations.
                </p>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-sm rounded-lg transition-all duration-300 hover:scale-105">
                  <Download size={18} />
                  download resume.pdf
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
