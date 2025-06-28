import React, { useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

interface WelcomeLoaderProps {
  onComplete: () => void;
}

const WelcomeLoader: React.FC<WelcomeLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const loadingTexts = [
    'Initializing portfolio...',
    'Loading awesome projects...',
    'Preparing interactive experience...',
    'Almost ready...',
    'Welcome!'
  ];

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const steps = duration / interval;
    const progressIncrement = 100 / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(currentStep * progressIncrement, 100);
      setProgress(newProgress);

      const textIndex = Math.floor((newProgress / 100) * (loadingTexts.length - 1));
      setCurrentText(loadingTexts[textIndex]);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 transition-opacity duration-500 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>

      {/* Floating Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: 'transparent'
          },
          particles: {
            number: { value: 60 },
            color: { value: ['#3B82F6', '#8B5CF6'] },
            shape: { type: 'circle' },
            opacity: { value: 0.2 },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: 0.3,
              direction: 'none',
              outModes: { default: 'out' },
              random: true
            },
            links: {
              enable: true,
              distance: 100,
              color: '#8B5CF6',
              opacity: 0.2,
              width: 1
            }
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              resize: true
            },
            modes: {
              repulse: { distance: 60 }
            }
          },
          detectRetina: true
        }}
        className="absolute inset-0 z-0"
      />

      {/* Existing Animated Loader Content */}
      <div className="text-center space-y-8 relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold gradient-text animate-pulse">Aryan Singh</h1>
          <p className="text-xl text-foreground/70 mt-2 animate-slide-in-left">Full Stack Developer</p>
        </div>

        <div className="animate-slide-in-right">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={351.86}
                strokeDashoffset={351.86 - (351.86 * progress) / 100}
                className="transition-all duration-300 ease-out"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold gradient-text">{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="h-6">
            <p className="text-foreground/70 animate-pulse">{currentText}</p>
          </div>

          <div className="flex justify-center space-x-2 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-8 animate-fade-in">
          {['⚛️', '🔧', '🚀', '💻', '⚡'].map((icon, i) => (
            <div
              key={i}
              className="text-2xl animate-bounce hover:scale-125 transition-transform duration-200"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeLoader;
