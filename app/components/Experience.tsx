'use client';

import { useState } from 'react';
import { Briefcase, GraduationCap, Code, Users, ExternalLink } from 'lucide-react';

const workData = [
  {
    title: "Can/Am Technologies",
    period: "June 2025 - Present",
    role: "DevOps Engineer",
    description: "Leading cloud infrastructure and automation initiatives, managing AWS services, and implementing CI/CD pipelines for seamless deployments.",
    achievements: [
      "Architected and deployed scalable AWS infrastructure using EC2, RDS, and VPC",
      "Implemented automated CI/CD pipelines reducing deployment time by 60%",
      "Managed server infrastructure and monitoring systems for high availability"
    ],
    website: "#",
    icon: Briefcase,
    side: 'right'
  },
  {
    title: "Can/Am Technologies",
    period: "2024 - May 2025",
    role: "Intern - DevOps Engineer",
    description: "Worked on cloud infrastructure, server management, and automation tasks while learning industry best practices in DevOps.",
    achievements: [
      "Assisted in managing AWS infrastructure including EC2, RDS, and S3",
      "Contributed to CI/CD pipeline development and maintenance",
      "Gained hands-on experience with Linux server administration"
    ],
    website: "#",
    icon: Code,
    side: 'left'
  },
  {
    title: "University of Colorado, Denver",
    period: "2023 - 2023",
    role: "Graduate Teaching Assistant",
    description: "Supported students in learning game development concepts, AR/VR technologies, and provided mentorship on course projects.",
    achievements: [
      "Assisted 50+ students with game development and AR/VR projects",
      "Conducted lab sessions on Unity, Unreal Engine, and VR development",
      "Provided one-on-one mentoring for complex technical concepts"
    ],
    website: "https://www.ucdenver.edu/",
    icon: Users,
    side: 'right'
  },
  {
    title: "ForwardAI",
    period: "2022 - 2023",
    role: "Software Developer",
    description: "Developed full-stack web applications using modern technologies, focusing on scalable architecture and clean code practices.",
    achievements: [
      "Built responsive web applications using AngularJS and NodeJS",
      "Designed and implemented RESTful APIs for multiple projects",
      "Optimized database queries improving application performance by 40%"
    ],
    website: "#",
    icon: Code,
    side: 'left'
  },
  {
    title: "Tata Consultancy Services (TCS)",
    period: "2020 - 2022",
    role: "Assistant Software Developer",
    description: "Started my professional journey developing enterprise applications and working with diverse technologies in a large-scale environment.",
    achievements: [
      "Developed and maintained enterprise-level web applications",
      "Worked with AngularJS, NodeJS, and SQL databases",
      "Received Star of the Quarter award for critical project contributions"
    ],
    website: "https://www.tcs.com/",
    icon: Briefcase,
    side: 'right'
  }
];

const educationData = [
  {
    title: "University of Colorado, Denver",
    period: "2023 - May 2025",
    role: "Master's in Computer Science",
    description: "Completed advanced coursework in software engineering, distributed systems, cloud computing, and artificial intelligence.",
    achievements: [
      "Graduated with Master's degree in Computer Science",
      "Teaching Assistant for Computer Game Design & AR/VR course",
      "Specialized in DevOps, Cloud Computing, and Full-Stack Development"
    ],
    website: "https://www.ucdenver.edu/",
    icon: GraduationCap,
    side: 'right'
  },
  {
    title: "Chameli Devi Group of Institutions",
    period: "2016 - 2020",
    role: "Bachelor's in Computer Science",
    description: "Built a strong foundation in computer science fundamentals including data structures, algorithms, database management, and software engineering principles.",
    achievements: [
      "Completed Bachelor's degree in Computer Science and Engineering",
      "Developed multiple full-stack web applications as academic projects",
      "Participated in technical events and coding competitions"
    ],
    website: "#",
    icon: GraduationCap,
    side: 'left'
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  const data = activeTab === 'work' ? workData : educationData;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-1.5 flex gap-2 font-mono">
          <button
            onClick={() => setActiveTab('work')}
            className={`px-6 py-3 rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 ${
              activeTab === 'work' 
                ? 'bg-cyan-600 text-white' 
                : 'text-gray-400 hover:text-cyan-400 hover:bg-[#252525]'
            }`}
          >
            <Briefcase size={18} />
            work.log
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-6 py-3 rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 ${
              activeTab === 'education' 
                ? 'bg-cyan-600 text-white' 
                : 'text-gray-400 hover:text-cyan-400 hover:bg-[#252525]'
            }`}
          >
            <GraduationCap size={18} />
            education.log
          </button>
        </div>
      </div>
      
      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center Line */}
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-cyan-500/20"></div>
        
        {/* Timeline Items */}
        <div className="space-y-8">
          {data.map((item, idx) => {
            const IconComponent = item.icon;
            const isRight = item.side === 'right';
            
            return (
              <div 
                key={`${activeTab}-${idx}`}
                className="relative animate-in show"
              >
                {/* Timeline Dot */}
                <div className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 p-4 rounded-full flex justify-center items-center bg-cyan-500/20">
                  <div className="absolute w-4 h-4 rounded-full bg-cyan-500"></div>
                </div>
                
                {/* Card */}
                <div 
                  className={`
                    group cursor-pointer
                    transition-all duration-300 
                    ml-16 md:ml-0
                    ${isRight ? 'md:ml-auto md:w-[calc(50%-40px)]' : 'md:mr-auto md:w-[calc(50%-40px)]'}
                    bg-[#1a1a1a] border border-[#2a2a2a] hover:border-cyan-500/30
                    rounded-lg overflow-hidden
                    hover:scale-[1.02]
                  `}
                >
                  {/* Terminal Header */}
                  <div className="bg-[#252525] px-4 py-2 flex items-center gap-2 border-b border-[#2a2a2a]">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-gray-500 text-xs font-mono">{item.role.toLowerCase().replace(/ /g, '_')}.sh</span>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-cyan-600/20 text-cyan-400 p-2 rounded-lg">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-mono font-semibold">{item.title}</h3>
                        <p className="text-gray-500 text-xs font-mono">{item.period}</p>
                      </div>
                    </div>
                    
                    {/* Expandable Content */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
                      <div className="overflow-hidden">
                        <div className="pt-3 border-t border-[#2a2a2a] mt-3">
                          <p className="text-gray-400 text-sm font-mono mb-3">
                            <span className="text-gray-500">{'>'}</span> {item.description}
                          </p>
                          <ul className="space-y-1 mb-3">
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-400 text-xs font-mono">
                                <span className="text-green-400">✓</span> {achievement}
                              </li>
                            ))}
                          </ul>
                          {item.website !== '#' && (
                            <a 
                              href={item.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-mono"
                              onClick={(e) => e.stopPropagation()}
                            >
                              open_link()
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
