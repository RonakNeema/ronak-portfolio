'use client';

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
import CustomCursor from './CustomCursor';
import CommandPalette from './CommandPalette';
import EasterEgg from './EasterEgg';

export default function HomeContent() {
  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <EasterEgg />
      <LoadingScreen />
      <main 
        className="w-full relative bg-[#0d0d0d]" 
        style={{ 
          background: 'linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)'
        }}
      >
        <Navigation />
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <GitHubStats />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
