
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
import { Shield } from 'lucide-react';

interface WelcomeLoaderProps {
  onComplete: () => void;
}

const WelcomeLoader: React.FC<WelcomeLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  const loadingTexts = [
    'Initializing portfolio...',
    'Loading awesome projects...',
    'Preparing interactive experience...',
    'Almost ready...',
    'Welcome!'
  ];

  const techIcons = [
    { icon: SiPython, color: 'text-blue-500', delay: 0 },
    { icon: SiJavascript, color: 'text-yellow-500', delay: 100 },
    { icon: SiReact, color: 'text-blue-400', delay: 200 },
    { icon: SiHtml5, color: 'text-orange-500', delay: 300 },
    { icon: SiCss3, color: 'text-blue-500', delay: 400 },
    { icon: SiMysql, color: 'text-blue-600', delay: 500 },
    { icon: SiOpenjdk, color: 'text-red-500', delay: 600 },
    { icon: SiFlask, color: 'text-gray-600', delay: 700 },
    { icon: SiGit, color: 'text-orange-600', delay: 800 },
    { icon: SiLinux, color: 'text-black dark:text-white', delay: 900 },
    { icon: SiTensorflow, color: 'text-orange-500', delay: 1000 },
    { icon: SiNumpy, color: 'text-blue-500', delay: 1100 },
  ];

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const progressIncrement = 100 / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(currentStep * progressIncrement, 100);
      setProgress(newProgress);

      // Update text based on progress
      const textIndex = Math.floor((newProgress / 100) * (loadingTexts.length - 1));
      setCurrentText(loadingTexts[textIndex]);

      // Show logo formation at 60% progress
      if (newProgress >= 60) {
        setShowLogo(true);
      }

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500); // Wait for fade out animation
        }, 800);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 transition-opacity duration-500 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
      {/* Animated Background */}
      <div className="stars absolute inset-0"></div>
      <div className="clouds absolute inset-0"></div>
      
      <div className="text-center space-y-8 relative z-10">
        {/* Floating Tech Icons that form AS logo */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          {/* Floating tech icons */}
          {techIcons.map((tech, index) => {
            const IconComponent = tech.icon;
            const angle = (index * 30) + (progress * 3); // Rotating movement
            const radius = showLogo ? 80 : 120 + Math.sin(Date.now() * 0.001 + index) * 20;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            return (
              <div
                key={index}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out ${tech.color}`}
                style={{
                  transform: `translate(${x}px, ${y}px) scale(${showLogo ? 0.8 : 1})`,
                  transitionDelay: `${tech.delay}ms`,
                  opacity: showLogo ? 0.6 : 1,
                }}
              >
                <IconComponent className="w-8 h-8 animate-pulse" />
              </div>
            );
          })}

          {/* AS Logo Formation */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="text-8xl font-bold gradient-text animate-pulse">
              AS
            </div>
          </div>

          {/* Central Glow Effect */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-1000 ${showLogo ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
        </div>

        {/* Name Animation */}
        <div className={`transition-all duration-700 ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">
            Aryan Singh
          </h1>
          <p className="text-xl text-foreground/70 animate-fade-in">
            Full Stack Developer
          </p>
        </div>

        {/* Progress Ring */}
        <div className="relative w-24 h-24 mx-auto">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progress) / 100}
              className="transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Progress Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold gradient-text">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="h-6">
          <p className="text-foreground/70 animate-pulse text-lg">
            {currentText}
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-3 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeLoader;



//final
// import React, { useState, useEffect } from 'react';

// interface WelcomeLoaderProps {
//   onComplete: () => void;
// }

// const WelcomeLoader: React.FC<WelcomeLoaderProps> = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [currentText, setCurrentText] = useState('');
//   const [isVisible, setIsVisible] = useState(true);

//   const loadingTexts = [
//     'Initializing portfolio...',
//     'Loading awesome projects...',
//     'Preparing interactive experience...',
//     'Almost ready...',
//     'Welcome!'
//   ];

//   useEffect(() => {
//     const duration = 3000; // 3 seconds
//     const interval = 50; // Update every 50ms
//     const steps = duration / interval;
//     const progressIncrement = 100 / steps;

//     let currentStep = 0;
//     const timer = setInterval(() => {
//       currentStep++;
//       const newProgress = Math.min(currentStep * progressIncrement, 100);
//       setProgress(newProgress);

//       // Update text based on progress
//       const textIndex = Math.floor((newProgress / 100) * (loadingTexts.length - 1));
//       setCurrentText(loadingTexts[textIndex]);

//       if (newProgress >= 100) {
//         clearInterval(timer);
//         setTimeout(() => {
//           setIsVisible(false);
//           setTimeout(onComplete, 500); // Wait for fade out animation
//         }, 500);
//       }
//     }, interval);

//     return () => clearInterval(timer);
//   }, [onComplete]);

//   if (!isVisible) return null;

//   return (
//     <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 transition-opacity duration-500 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
//       {/* Animated Background */}
//       <div className="stars absolute inset-0"></div>
//       <div className="clouds absolute inset-0"></div>
      
//       <div className="text-center space-y-8 relative z-10">
//         {/* Logo/Name Animation */}
//         <div className="animate-fade-in">
//           <h1 className="text-5xl md:text-7xl font-bold gradient-text animate-pulse">
//             Aryan Singh
//           </h1>
//           <p className="text-xl text-foreground/70 mt-2 animate-slide-in-left">
//             Full Stack Developer
//           </p>
//         </div>

//         {/* Loading Animation */}
//         <div className="animate-slide-in-right">
//           {/* Circular Progress */}
//           <div className="relative w-32 h-32 mx-auto mb-6">
//             <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
//               <circle
//                 cx="64"
//                 cy="64"
//                 r="56"
//                 stroke="currentColor"
//                 strokeWidth="8"
//                 fill="transparent"
//                 className="text-muted"
//               />
//               <circle
//                 cx="64"
//                 cy="64"
//                 r="56"
//                 stroke="url(#gradient)"
//                 strokeWidth="8"
//                 fill="transparent"
//                 strokeDasharray={351.86}
//                 strokeDashoffset={351.86 - (351.86 * progress) / 100}
//                 className="transition-all duration-300 ease-out"
//                 strokeLinecap="round"
//               />
//               <defs>
//                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#3B82F6" />
//                   <stop offset="100%" stopColor="#8B5CF6" />
//                 </linearGradient>
//               </defs>
//             </svg>
            
//             {/* Progress Percentage */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-2xl font-bold gradient-text">
//                 {Math.round(progress)}%
//               </span>
//             </div>
//           </div>

//           {/* Loading Text */}
//           <div className="h-6">
//             <p className="text-foreground/70 animate-pulse">
//               {currentText}
//             </p>
//           </div>

//           {/* Animated Dots */}
//           <div className="flex justify-center space-x-2 mt-4">
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce"
//                 style={{ animationDelay: `${i * 0.2}s` }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Tech Stack Icons Animation */}
//         <div className="flex justify-center space-x-6 mt-8 animate-fade-in">
//           {['⚛️', '🔧', '🚀', '💻', '⚡'].map((icon, i) => (
//             <div
//               key={i}
//               className="text-2xl animate-bounce hover:scale-125 transition-transform duration-200"
//               style={{ animationDelay: `${i * 0.3}s` }}
//             >
//               {icon}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeLoader;
