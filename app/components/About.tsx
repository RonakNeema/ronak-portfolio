'use client';

import { Download, User, Mail, MapPin, Briefcase, GraduationCap, Coffee } from 'lucide-react';
import ShareButtons from './ShareButtons';

export default function About() {
  return (
    <section id="about" className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// about'}</p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> cat <span className="text-cyan-400">about.md</span>
          </h3>
        </div>

        {/* Terminal Card */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-[#252525] px-4 py-2 flex items-center justify-between border-b border-[#2a2a2a]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-400 text-sm font-mono">about.md</span>
            </div>
            <ShareButtons />
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-12 gap-8">
              {/* Info Column */}
              <div className="md:col-span-4 space-y-4 font-mono text-sm">
                <div className="flex items-start gap-3 text-gray-300">
                  <User size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <span className="text-gray-500">name:</span>
                    <p className="text-white">Ronak Neema</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <Briefcase size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <span className="text-gray-500">role:</span>
                    <p className="text-white">DevOps Engineer</p>
                    <p className="text-white">Full Stack Developer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <GraduationCap size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <span className="text-gray-500">education:</span>
                    <p className="text-white">M.S. Computer Science</p>
                    <p className="text-gray-400 text-xs">Univ. of Colorado Denver</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <Mail size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <span className="text-gray-500">email:</span>
                    <a href="mailto:ronak.neema@ucdenver.edu" className="text-cyan-400 hover:underline break-all">
                      ronak.neema@ucdenver.edu
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <span className="text-gray-500">location:</span>
                    <p className="text-white">Denver, CO</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <Coffee size={16} className="text-cyan-400 mt-0.5" />
                  <div>
                    <span className="text-gray-500">status:</span>
                    <p className="text-green-400">Open to opportunities</p>
                  </div>
                </div>
              </div>

              {/* Bio Column */}
              <div className="md:col-span-8">
                <h4 className="text-xl md:text-2xl font-bold mb-4 text-white font-mono">
                  <span className="text-cyan-400">#</span> Hello World! 👋
                </h4>
                <div className="space-y-4 text-gray-300 leading-relaxed font-mono text-sm">
                  <p>
                    <span className="text-gray-500">{'>'}</span> I'm a <span className="text-cyan-400">DevOps Engineer</span> and <span className="text-cyan-400">Full Stack Developer</span> passionate about building scalable, efficient systems that make a difference.
                  </p>
                  <p>
                    <span className="text-gray-500">{'>'}</span> Recently completed my <span className="text-green-400">Master's in Computer Science</span> at University of Colorado, Denver (May 2025), while working full-time as a DevOps Engineer at TCS.
                  </p>
                  <p>
                    <span className="text-gray-500">{'>'}</span> I specialize in <span className="text-amber-400">AWS</span>, <span className="text-amber-400">CI/CD pipelines</span>, <span className="text-amber-400">TypeScript</span>, <span className="text-amber-400">React</span>, and <span className="text-amber-400">Node.js</span>. I've led critical projects across multiple organizations, from startups to enterprise.
                  </p>
                  <p>
                    <span className="text-gray-500">{'>'}</span> When I'm not coding, I'm exploring new technologies, contributing to open source, or turning <span className="text-green-400">coffee</span> into <span className="text-cyan-400">code</span>. ☕
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a 
                    href="/resume.pdf" 
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-400 font-mono text-sm rounded-lg transition-all duration-300 hover:scale-105 press-effect"
                  >
                    <Download size={18} />
                    Download Resume
                  </a>
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#252525] border border-[#2a2a2a] hover:border-cyan-500/50 text-gray-300 hover:text-cyan-400 font-mono text-sm rounded-lg transition-all duration-300 hover:scale-105 press-effect"
                  >
                    <Mail size={18} />
                    Get In Touch
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
