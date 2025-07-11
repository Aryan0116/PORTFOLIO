
import React, { useState, useEffect, useRef } from 'react';
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
  SiPandas,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiKubernetes,
  SiAws,
  SiMongodb
} from 'react-icons/si';
import { 
  Brain, 
  Lightbulb, 
  Users, 
  MessageCircle, 
  Target, 
  Clock,
  Sparkles,
  Code,
  Database,
  Server,
  Globe
} from 'lucide-react';

interface WelcomeLoader2Props {
  onComplete: () => void;
}

const WelcomeLoader2: React.FC<WelcomeLoader2Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: particles, 1: formation, 2: logo reveal, 3: completion
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const techIcons = [
    { icon: SiPython, color: '#3776AB', name: 'Python' },
    { icon: SiJavascript, color: '#F7DF1E', name: 'JavaScript' },
    { icon: SiReact, color: '#61DAFB', name: 'React' },
    { icon: SiHtml5, color: '#E34F26', name: 'HTML5' },
    { icon: SiCss3, color: '#1572B6', name: 'CSS3' },
    { icon: SiMysql, color: '#4479A1', name: 'MySQL' },
    { icon: SiOpenjdk, color: '#ED8B00', name: 'Java' },
    { icon: SiFlask, color: '#000000', name: 'Flask' },
    { icon: SiGit, color: '#F05032', name: 'Git' },
    { icon: SiLinux, color: '#FCC624', name: 'Linux' },
    { icon: SiTensorflow, color: '#FF6F00', name: 'TensorFlow' },
    { icon: SiNumpy, color: '#013243', name: 'NumPy' },
    { icon: SiPandas, color: '#150458', name: 'Pandas' },
    { icon: SiNodedotjs, color: '#339933', name: 'Node.js' },
    { icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
    { icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind' },
    { icon: SiDocker, color: '#2496ED', name: 'Docker' },
    { icon: SiKubernetes, color: '#326CE5', name: 'Kubernetes' },
    { icon: SiAws, color: '#FF9900', name: 'AWS' },
    { icon: SiMongodb, color: '#47A248', name: 'MongoDB' }
  ];

  const softSkills = [
    { icon: Brain, color: '#8B5CF6', name: 'Problem Solving' },
    { icon: Lightbulb, color: '#F59E0B', name: 'Innovation' },
    { icon: Users, color: '#10B981', name: 'Team Work' },
    { icon: MessageCircle, color: '#3B82F6', name: 'Communication' },
    { icon: Target, color: '#EF4444', name: 'Goal Oriented' },
    { icon: Clock, color: '#6B7280', name: 'Time Management' }
  ];

  // Particle system for canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
        alpha: Math.random() * 0.8 + 0.2,
        life: Math.random() * 100 + 50
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Reset particle if life is over
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = Math.random() * 100 + 50;
        }
        
        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Draw connections
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach(particle2 => {
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (100 - distance) / 100 * 0.2;
            ctx.strokeStyle = '#3B82F6';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Progress and phase management
  useEffect(() => {
    const duration = 8000; // 8 seconds total
    const interval = 50;
    const steps = duration / interval;
    const progressIncrement = 100 / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(currentStep * progressIncrement, 100);
      setProgress(newProgress);

      // Phase transitions
      if (newProgress >= 25 && phase < 1) setPhase(1);
      if (newProgress >= 50 && phase < 2) setPhase(2);
      if (newProgress >= 85 && phase < 3) setPhase(3);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 1000);
        }, 1500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 0: return 'Initializing Neural Networks...';
      case 1: return 'Loading Quantum Algorithms...';
      case 2: return 'Synchronizing Matrix...';
      case 3: return 'Welcome to the Future...';
      default: return 'Entering Portfolio...';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-1000 ${!isVisible ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0.9) 70%)'
        }}
      />
      
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <div
              className={`w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-sm`}
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Tech Icons Constellation */}
          <div className="relative w-96 h-96 mx-auto mb-12">
            {/* Orbiting Tech Icons */}
            {techIcons.map((tech, index) => {
              const IconComponent = tech.icon;
              const angle = (index * (360 / techIcons.length)) + (progress * (phase >= 1 ? 2 : 4));
              const radius = phase >= 1 ? 120 - (progress * 0.5) : 140 + Math.sin(Date.now() * 0.002 + index) * 20;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${phase >= 2 ? 0.7 : 1}) rotate(${progress * 2}deg)`,
                    opacity: phase >= 2 ? 0.4 : 0.8,
                    filter: `hue-rotate(${progress * 2}deg)`
                  }}
                >
                  <div className="relative group">
                    <IconComponent 
                      className="w-8 h-8 transition-all duration-500 group-hover:scale-125" 
                      style={{ color: tech.color }}
                    />
                    <div className="absolute inset-0 rounded-full animate-ping"
                         style={{ 
                           backgroundColor: tech.color,
                           opacity: 0.2,
                           animationDuration: `${2 + Math.random()}s`
                         }} 
                    />
                  </div>
                </div>
              );
            })}

            {/* Soft Skills Inner Circle */}
            {softSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              const angle = (index * (360 / softSkills.length)) - (progress * (phase >= 1 ? 1 : 2));
              const radius = phase >= 1 ? 60 + (progress * 0.3) : 70;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${phase >= 2 ? 0.5 : 0.8})`,
                    opacity: phase >= 2 ? 0.3 : 0.6
                  }}
                >
                  <IconComponent 
                    className="w-6 h-6" 
                    style={{ color: skill.color }}
                  />
                </div>
              );
            })}

            {/* Central AS Logo Formation */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ${phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="relative">
                {/* Holographic AS Logo */}
                <div 
                  className="text-9xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse"
                  style={{
                    textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                    fontFamily: 'Arial Black, sans-serif',
                    transform: `perspective(1000px) rotateY(${Math.sin(Date.now() * 0.001) * 10}deg) rotateX(${Math.cos(Date.now() * 0.001) * 5}deg)`
                  }}
                >
                  AS
                </div>
                
                {/* Glowing Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-spin"
                     style={{ 
                       animation: 'spin 8s linear infinite',
                       filter: 'blur(1px)'
                     }} 
                />
                
                {/* Energy Pulses */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-ping"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Holographic Grid */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${phase >= 1 ? 'opacity-30' : 'opacity-0'}`}>
              <div className="w-full h-full"
                   style={{
                     backgroundImage: `
                       linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
                     `,
                     backgroundSize: '40px 40px',
                     animation: 'mesh-shift 4s ease-in-out infinite'
                   }}
              />
            </div>
          </div>

          {/* Name and Title Animation */}
          <div className={`transition-all duration-1500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Aryan Singh
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 mb-8 font-light">
              Full Stack Developer & AI Enthusiast
            </p>
          </div>

          {/* Futuristic Progress Ring */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
              {/* Background Ring */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={439.82}
                strokeDashoffset={439.82 - (439.82 * progress) / 100}
                className="transition-all duration-300 ease-out"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.7))'
                }}
              />
              {/* Inner Glow Ring */}
              <circle
                cx="80"
                cy="80"
                r="60"
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="2"
                fill="transparent"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Progress Percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {Math.round(progress)}%
                </span>
                <div className="text-xs text-white/60 mt-1">LOADING</div>
              </div>
            </div>
          </div>

          {/* Phase Text */}
          <div className="h-8 mb-8">
            <p className="text-white/80 text-lg font-medium animate-pulse">
              {getPhaseText()}
            </p>
          </div>

          {/* Matrix Rain Effect */}
          <div className="flex justify-center space-x-2">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-b from-green-400 to-transparent animate-pulse"
                style={{
                  height: `${Math.random() * 100 + 20}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%)'
           }}
      />
    </div>
  );
};

export default WelcomeLoader2;
