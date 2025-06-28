import React, { useState, useEffect } from 'react';
import { 
  SiPython, 
  SiJavascript, 
  SiReact, 
  SiHtml5, 
  SiCss3, 
  SiMysql, 
  SiOpenjdk, 
  SiFlask, 
  SiGit, 
  SiLinux, 
  SiTensorflow, 
  SiNumpy, 
  SiPandas 
} from 'react-icons/si';

interface WelcomeLoaderProps {
  onComplete: () => void;
}

const WelcomeLoader: React.FC<WelcomeLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  const loadingTexts = [
    'Initializing portfolio...',
    'Loading awesome projects...',
    'Assembling technologies...',
    'Creating magic...',
    'Almost ready...',
    'Welcome!'
  ];

  const techIcons = [
    { icon: SiPython, color: '#3776AB' },
    { icon: SiJavascript, color: '#F7DF1E' },
    { icon: SiReact, color: '#61DAFB' },
    { icon: SiHtml5, color: '#E34F26' },
    { icon: SiCss3, color: '#1572B6' },
    { icon: SiMysql, color: '#4479A1' },
    { icon: SiOpenjdk, color: '#ED8B00' },
    { icon: SiFlask, color: '#000000' },
    { icon: SiGit, color: '#F05032' },
    { icon: SiLinux, color: '#FCC624' },
    { icon: SiTensorflow, color: '#FF6F00' },
    { icon: SiNumpy, color: '#013243' },
  ];

  useEffect(() => {
    const duration = 5000; // 5 seconds for smoother experience
    const interval = 16; // ~60fps for smooth animation
    const steps = duration / interval;
    const progressIncrement = 100 / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(currentStep * progressIncrement, 100);
      setProgress(newProgress);

      // Smooth text transitions
      const textIndex = Math.min(
        Math.floor((newProgress / 100) * loadingTexts.length), 
        loadingTexts.length - 1
      );
      setCurrentText(loadingTexts[textIndex]);

      // Animation phases for different effects
      if (newProgress < 30) {
        setAnimationPhase(0); // Floating phase
      } else if (newProgress < 60) {
        setAnimationPhase(1); // Converging phase
      } else if (newProgress < 85) {
        setAnimationPhase(2); // Formation phase
      } else {
        setAnimationPhase(3); // Final phase
      }

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800);
        }, 1000);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const getIconPosition = (index: number, totalIcons: number) => {
    const baseAngle = (360 / totalIcons) * index;
    const time = Date.now() * 0.001;
    
    switch (animationPhase) {
      case 0: // Floating randomly
        const floatRadius = 100 + Math.sin(time + index) * 20;
        const floatAngle = baseAngle + Math.sin(time * 0.5 + index) * 30;
        return {
          x: Math.cos((floatAngle * Math.PI) / 180) * floatRadius,
          y: Math.sin((floatAngle * Math.PI) / 180) * floatRadius,
          scale: 1 + Math.sin(time + index) * 0.15,
          opacity: 0.8 + Math.sin(time + index) * 0.2,
        };
      
      case 1: // Converging to circle
        const convergRadius = 100 - (progress - 30) * 1.5;
        const convergAngle = baseAngle + Math.sin(time * 0.3) * 8;
        return {
          x: Math.cos((convergAngle * Math.PI) / 180) * convergRadius,
          y: Math.sin((convergAngle * Math.PI) / 180) * convergRadius,
          scale: 1,
          opacity: 0.9,
        };
      
      case 2: // Perfect circle formation
        const formationRadius = 70;
        const formationAngle = baseAngle + time * 15; // Slow rotation
        return {
          x: Math.cos((formationAngle * Math.PI) / 180) * formationRadius,
          y: Math.sin((formationAngle * Math.PI) / 180) * formationRadius,
          scale: 0.8,
          opacity: 0.7,
        };
      
      case 3: // Final compact circle
        const finalRadius = 55;
        const finalAngle = baseAngle + time * 8;
        return {
          x: Math.cos((finalAngle * Math.PI) / 180) * finalRadius,
          y: Math.sin((finalAngle * Math.PI) / 180) * finalRadius,
          scale: 0.6,
          opacity: 0.5,
        };
      
      default:
        return { x: 0, y: 0, scale: 1, opacity: 1 };
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-800 ${!isVisible ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="text-center space-y-6 relative z-10 max-w-md mx-auto px-4">
        {/* Tech Icons Circle Animation */}
        <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
          {techIcons.map((tech, index) => {
            const IconComponent = tech.icon;
            const position = getIconPosition(index, techIcons.length);
            
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
                  opacity: position.opacity,
                }}
              >
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg backdrop-blur-sm border border-white/20"
                  style={{
                    backgroundColor: `${tech.color}20`,
                    borderColor: tech.color,
                    boxShadow: `0 0 15px ${tech.color}40`,
                  }}
                >
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: tech.color }}
                  />
                </div>
              </div>
            );
          })}

          {/* Central Logo */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 z-20 ${
            animationPhase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="relative flex items-center justify-center">
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                AS
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 text-6xl md:text-7xl font-bold text-blue-400 opacity-30 blur-sm flex items-center justify-center">
                AS
              </div>
            </div>
          </div>

          {/* Orbital rings */}
          <div className={`absolute inset-0 transition-all duration-1000 ${
            animationPhase >= 1 ? 'opacity-40' : 'opacity-0'
          }`}>
            {[1, 2, 3].map((ring) => (
              <div
                key={ring}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-gradient-to-r from-blue-500/20 to-purple-500/20"
                style={{
                  width: `${ring * 120}px`,
                  height: `${ring * 120}px`,
                  borderColor: `rgba(59, 130, 246, ${0.1 / ring})`,
                  animation: `spin ${10 + ring * 5}s linear infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Name and Title */}
        <div className={`transition-all duration-700 ${
          animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Aryan Singh
          </h1>
          <p className="text-lg text-white/70">
            Full Stack Developer
          </p>
        </div>

        {/* Enhanced Progress Ring */}
        <div className="relative w-24 h-24 mx-auto">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={263.89}
              strokeDashoffset={263.89 - (263.89 * progress) / 100}
              className="transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
            {/* Glow effect */}
            <circle
              cx="48"
              cy="48"
              r="42"
              stroke="url(#glowGradient)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={263.89}
              strokeDashoffset={263.89 - (263.89 * progress) / 100}
              className="transition-all duration-300 ease-out opacity-30 blur-sm"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Progress Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="h-8">
          <p className="text-white/70 text-lg transition-all duration-500">
            {currentText}
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-4 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce shadow-lg"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeLoader;