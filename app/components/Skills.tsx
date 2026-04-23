'use client';

import { Code2, Cloud, Database, Wrench, Terminal, GitBranch, Server, Box } from 'lucide-react';

const skillsData = [
  {
    category: "Frontend",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "AngularJS", "React", "HTML5", "CSS3", "Tailwind"]
  },
  {
    category: "Backend", 
    icon: Server,
    skills: ["NodeJS", "Express", "Java", "RESTful APIs", "Microservices"]
  },
  {
    category: "Cloud/DevOps",
    icon: Cloud,
    skills: ["AWS", "EC2", "RDS", "VPC", "Lambda", "S3", "CloudWatch"]
  },
  {
    category: "Database",
    icon: Database,
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Redis"]
  },
  {
    category: "CI/CD",
    icon: GitBranch,
    skills: ["Jenkins", "GitHub Actions", "Terraform", "Docker"]
  },
  {
    category: "SysAdmin",
    icon: Terminal,
    skills: ["Linux", "Bash", "Server Mgmt", "Monitoring"]
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: ["Git", "VS Code", "Postman", "Jira", "Sentry"]
  },
  {
    category: "Languages",
    icon: Box,
    skills: ["JavaScript", "TypeScript", "Java", "Python", "C++", "Bash"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// skills'}</p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> ls <span className="text-cyan-400">./skills/</span>
          </h3>
          <p className="text-gray-400 font-mono text-sm mt-4">
            {'>'} listing all installed packages and tools...
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillsData.map((skillGroup) => {
            const IconComponent = skillGroup.icon;
            return (
              <div 
                key={skillGroup.category}
                className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-cyan-500/30 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                {/* Terminal Header */}
                <div className="bg-[#252525] px-3 py-1.5 flex items-center gap-1.5 border-b border-[#2a2a2a]">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-gray-500 text-xs font-mono">{skillGroup.category.toLowerCase()}/</span>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-cyan-600/20 text-cyan-400 p-2 rounded-lg">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="text-white font-mono text-sm font-semibold">{skillGroup.category}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="bg-[#252525] text-gray-400 px-2 py-1 rounded text-xs font-mono hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
