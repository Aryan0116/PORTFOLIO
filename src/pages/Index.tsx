
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection from '@/components/sections/ContactSection';
import WelcomeLoader from '@/components/WelcomeLoader';
import ParticleSystem from '@/components/ParticleSystem';
import InteractiveBackground from '@/components/InteractiveBackground';
import MorphingShapes from '@/components/MorphingShapes';
import CustomCursor from '@/components/CustomCursor';

// Lazy load ThreeJS component to prevent blocking
const ThreeJSBackground = React.lazy(() => import('@/components/ThreeJSBackground'));

const Index = () => {
  const [showLoader, setShowLoader] = useState(false);

  // Check if this is a fresh page load (not navigation)
  useEffect(() => {
    // Check if this is a fresh page load by looking at navigation type
    const isPageReload = window.performance.navigation?.type === 1;
    
    // Also check navigation entries for more modern browsers
    const navigationEntries = window.performance.getEntriesByType('navigation');
    const isReloadFromEntry = navigationEntries.length > 0 && 
                             (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload';
    
    // Also check if user is coming from external source or direct URL
    const isDirectAccess = !document.referrer || 
                          !document.referrer.includes(window.location.origin);

    // Show loader only on page reload or direct access
    if (isPageReload || isReloadFromEntry || isDirectAccess) {
      setShowLoader(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && <WelcomeLoader onComplete={handleLoaderComplete} />}
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      <div className={`min-h-screen bg-background transition-opacity duration-500 ${showLoader ? 'opacity-0' : 'opacity-100'}`}>
        {/* Interactive Background Elements with error boundaries */}
        <ParticleSystem />
        <React.Suspense fallback={null}>
          <ThreeJSBackground />
        </React.Suspense>
        <InteractiveBackground />
        <MorphingShapes />
        
        <Navigation />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        
        {/* Footer */}
        <footer className="py-8 bg-muted/30 text-center relative z-10">
          <div className="container mx-auto px-4">
            <p className="text-foreground/60">
              © 2024 Aryan Singh. Built with React, TypeScript, Tailwind CSS, and Three.js.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
