'use client';

import { useEffect, useState } from 'react';
import { Github, ExternalLink, Folder, Star, GitFork } from 'lucide-react';
import { ProjectSkeleton } from './LoadingSkeleton';

const projects = [
  {
    title: 'Cloud Infrastructure Automation',
    description: 'Terraform modules for AWS/GCP infrastructure with CI/CD pipelines',
    tech: ['Terraform', 'AWS', 'GitHub Actions', 'Python'],
    github: 'https://github.com/Ronakneema/cloud-infra',
    demo: null,
    stars: 12,
    forks: 3,
  },
  {
    title: 'Kubernetes Monitoring Stack',
    description: 'Full observability stack with Prometheus, Grafana, and custom dashboards',
    tech: ['Kubernetes', 'Prometheus', 'Grafana', 'Helm'],
    github: 'https://github.com/Ronakneema/k8s-monitoring',
    demo: null,
    stars: 8,
    forks: 2,
  },
  {
    title: 'Portfolio Website',
    description: 'This terminal-themed portfolio built with Next.js and TypeScript',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/Ronakneema/ronak-portfolio',
    demo: 'https://ronakneema.dev',
    stars: 5,
    forks: 1,
  },
  {
    title: 'DevOps CLI Toolkit',
    description: 'Custom CLI tools for deployment automation and log analysis',
    tech: ['Go', 'Cobra', 'Docker', 'Shell'],
    github: 'https://github.com/Ronakneema/devops-cli',
    demo: null,
    stars: 15,
    forks: 4,
  },
  {
    title: 'API Gateway Service',
    description: 'Microservice API gateway with rate limiting and auth middleware',
    tech: ['Node.js', 'Express', 'Redis', 'JWT'],
    github: 'https://github.com/Ronakneema/api-gateway',
    demo: null,
    stars: 6,
    forks: 2,
  },
  {
    title: 'CI/CD Pipeline Templates',
    description: 'Reusable pipeline templates for various frameworks and languages',
    tech: ['GitHub Actions', 'Jenkins', 'Docker', 'YAML'],
    github: 'https://github.com/Ronakneema/cicd-templates',
    demo: null,
    stars: 20,
    forks: 8,
  },
];

export default function Projects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for skeletons
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="projects" className="py-20 px-6 md:px-12 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// projects'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> ls <span className="text-cyan-400">./projects/</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm mt-2">
            &gt; Found {projects.length} repositories
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProjectSkeleton key={i} />
              ))}
            </>
          ) : (
            projects.map((project, index) => (
              <div
                key={index}
                className="group bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,211,0.1)]"
              >
              {/* Card Header */}
              <div className="bg-[#252525] px-4 py-2 flex items-center justify-between border-b border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <Folder size={16} className="text-cyan-400" />
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white font-mono mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2 py-1 bg-[#252525] text-cyan-400 rounded border border-[#2a2a2a]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats & Links */}
                <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={14} />
                      {project.forks}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={18} />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>

        {/* View More */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/Ronakneema?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 font-mono text-sm"
          >
            <Github size={18} />
            View all repositories
          </a>
        </div>
      </div>
    </section>
  );
}
