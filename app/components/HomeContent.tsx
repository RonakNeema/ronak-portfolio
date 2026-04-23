'use client';

import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Journey from './Journey';
import Skills from './Skills';
import Projects from './Projects';
import GitHubStats from './GitHubStats';
import Certifications from './Certifications';
import Contact from './Contact';
import Footer from './Footer';
import CommandPalette from './CommandPalette';
import EasterEgg from './EasterEgg';
import LeetCodeStats from './LeetCodeStats';
import Guestbook from './Guestbook';
import Newsletter from './Newsletter';
import VisitorCounter from './VisitorCounter';
import GitHubActivity from './GitHubActivity';
import CalendlyWidget from './CalendlyWidget';
import TouchGestures from './TouchGestures';

export default function HomeContent() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CommandPalette />
      <EasterEgg />
      <TouchGestures />
      <LoadingScreen />
      <main className="w-full relative bg-[#0d0d0d]">
        <Navigation />
        <Hero />
        <About />
        <Journey />
        <Skills />
        {/* <Projects /> */}
        
        {/* GitHub Stats */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <GitHubStats />
          </div>
        </section>

        {/* LeetCode Stats - Full Width */}
        {/* <section className="py-20 px-6 md:px-12 bg-[#111111]">
          <div className="max-w-4xl mx-auto">
            <LeetCodeStats />
          </div>
        </section> */}

        {/* Certifications - Full Width */}
        <Certifications />

        {/* Calendly - Full Width */}
        {/* <section className="py-20 px-6 md:px-12 bg-[#111111]">
          <div className="max-w-2xl mx-auto">
            <CalendlyWidget />
          </div>
        </section> */}

        {/* Guestbook - Commented out for now */}
        {/* <Guestbook /> */}
        
        {/* Newsletter - Commented out for now */}
        {/* <Newsletter /> */}
        <Contact />
        <Footer />
      </main>
      {/* VisitorCounter commented out - was overlapping with theme controls */}
      {/* <VisitorCounter /> */}
    </>
  );
}
