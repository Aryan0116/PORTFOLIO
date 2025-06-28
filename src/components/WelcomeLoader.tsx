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
  Globe,
  Zap,
  Shield
} from 'lucide-react';

interface WelcomeLoader2Props {
  onComplete: () => void;
}

const WelcomeLoader2: React.FC<WelcomeLoader2Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const techStack = [
    { icon: SiPython, color: '#3776AB', name: 'Python', category: 'backend' },
    { icon: SiJavascript, color: '#F7DF1E', name: 'JavaScript', category: 'frontend' },
    { icon: SiReact, color: '#61DAFB', name: 'React', category: 'frontend' },
    { icon: SiHtml5, color: '#E34F26', name: 'HTML5', category: 'frontend' },
    { icon: SiCss3, color: '#1572B6', name: 'CSS3', category: 'frontend' },
    { icon: SiTypescript, color: '#3178C6', name: 'TypeScript', category: 'frontend' },
    { icon: SiNodedotjs, color: '#339933', name: 'Node.js', category: 'backend' },
    { icon: SiMysql, color: '#4479A1', name: 'MySQL', category: 'database' },
    { icon: SiMongodb, color: '#47A248', name: 'MongoDB', category: 'database' },
    { icon: SiTensorflow, color: '#FF6F00', name: 'TensorFlow', category: 'ai' },
    { icon: SiDocker, color: '#2496ED', name: 'Docker', category: 'devops' }
  ];

  const skills = [
    { icon: Brain, color: '#8B5CF6', name: 'Problem Solving', level: 95 },
    { icon: Code, color: '#3B82F6', name: 'Full Stack Dev', level: 92 },
    { icon: Database, color: '#10B981', name: 'Data Science', level: 88 },
    { icon: Zap, color: '#F59E0B', name: 'Performance', level: 90 },
    { icon: Shield, color: '#EF4444', name: 'Security', level: 85 },
    { icon: Globe, color: '#6366F1', name: 'Cloud Native', level: 87 }
  ];

  // Enhanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
      maxLife: number;
      type: 'data' | 'energy' | 'code';
    }> = [];

    // Create diverse particles
    for (let i = 0; i < 100; i++) {
      const types = ['data', 'energy', 'code'] as const;
      const type = types[Math.floor(Math.random() * types.length)];
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: type === 'data' ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
        color: type === 'data' ? '#3B82F6' : type === 'energy' ? '#8B5CF6' : '#10B981',
        alpha: Math.random() * 0.8 + 0.2,
        life: Math.random() * 200 + 100,
        maxLife: Math.random() * 200 + 100,
        type
      });
    }

    const animateParticles = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Reset particle
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = particle.maxLife;
        }
        
        // Dynamic alpha based on life and phase
        const lifeRatio = particle.life / particle.maxLife;
        particle.alpha = lifeRatio * (0.3 + phase * 0.2);
        
        // Draw particle based on type
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        
        if (particle.type === 'data') {
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
        } else if (particle.type === 'energy') {
          ctx.shadowBlur = 15;
          ctx.shadowColor = particle.color;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.size, particle.y);
          ctx.lineTo(particle.x + particle.size, particle.y);
          ctx.moveTo(particle.x, particle.y - particle.size);
          ctx.lineTo(particle.x, particle.y + particle.size);
          ctx.stroke();
        }
        ctx.restore();
      });
      
      // Draw neural network connections
      if (phase >= 1) {
        particles.forEach((particle1, i) => {
          particles.slice(i + 1, i + 4).forEach(particle2 => {
            const dx = particle1.x - particle2.x;
            const dy = particle1.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              ctx.save();
              ctx.globalAlpha = (120 - distance) / 120 * 0.15;
              const gradient = ctx.createLinearGradient(particle1.x, particle1.y, particle2.x, particle2.y);
              gradient.addColorStop(0, particle1.color);
              gradient.addColorStop(1, particle2.color);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particle1.x, particle1.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.stroke();
              ctx.restore();
            }
          });
        });
      }
      
      animationRef.current = requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase]);

  // Progress and phase management
  useEffect(() => {
    const duration = 10000; // 10 seconds
    const interval = 60;
    const steps = duration / interval;
    const progressIncrement = 100 / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(currentStep * progressIncrement, 100);
      setProgress(newProgress);

      // Phase transitions with overlaps
      if (newProgress >= 20 && phase < 1) setPhase(1);
      if (newProgress >= 45 && phase < 2) setPhase(2);
      if (newProgress >= 70 && phase < 3) setPhase(3);
      if (newProgress >= 90 && phase < 4) setPhase(4);

      // Trigger glitch effects
      if (newProgress >= 95 && !glitchActive) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 800);
      }

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 1200);
        }, 1000);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, phase, glitchActive]);

  const getPhaseData = () => {
    const phases = [
      { text: 'Initializing Quantum Systems...', color: 'from-blue-400 to-cyan-400' },
      { text: 'Loading Neural Networks...', color: 'from-purple-400 to-pink-400' },
      { text: 'Compiling Tech Stack...', color: 'from-green-400 to-emerald-400' },
      { text: 'Synchronizing Matrix...', color: 'from-orange-400 to-red-400' },
      { text: 'Welcome to the Digital Realm...', color: 'from-indigo-400 to-purple-400' }
    ];
    return phases[phase] || phases[0];
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-1000 ${!isVisible ? 'opacity-0 scale-110' : 'opacity-100 scale-100'} ${glitchActive ? 'animate-pulse' : ''}`}>
      
      {/* Dynamic Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%)
          `
        }}
      />

      {/* Holographic Grid Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-2000 ${phase >= 1 ? 'opacity-40' : 'opacity-0'}`}>
        <div 
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)
            `,
            backgroundSize: '50px 50px, 50px 50px, 200px 200px',
            animation: 'grid-flow 8s ease-in-out infinite'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Tech Constellation */}
          <div className="relative w-[500px] h-[500px] mx-auto mb-16">
            
            {/* Outer Tech Ring */}
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon;
              const totalTech = techStack.length;
              const baseAngle = (index * (360 / totalTech));
              const rotationSpeed = phase >= 2 ? 0.5 : 1;
              const angle = baseAngle + (progress * rotationSpeed);
              const radius = phase >= 2 ? 180 - (progress * 0.3) : 200;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <div
                  key={tech.name}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out group"
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${phase >= 3 ? 0.8 : 1}) rotate(${angle}deg)`,
                    opacity: phase >= 3 ? 0.6 : 1,
                    zIndex: 10
                  }}
                >
                  <div className="relative">
                    <IconComponent 
                      className="w-10 h-10 transition-all duration-500 group-hover:scale-125 drop-shadow-lg" 
                      style={{ 
                        color: tech.color,
                        filter: `drop-shadow(0 0 8px ${tech.color})`
                      }}
                    />
                    {/* Tech category indicator */}
                    <div 
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-white/60 whitespace-nowrap"
                      style={{ transform: `translateX(-50%) rotate(-${angle}deg)` }}
                    >
                      {tech.name}
                    </div>
                    {/* Pulsing ring */}
                    <div 
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ 
                        backgroundColor: tech.color,
                        animationDuration: `${2 + Math.random()}s`
                      }} 
                    />
                  </div>
                </div>
              );
            })}

            {/* Skills Inner Hexagon */}
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              const angle = (index * 60) - (progress * 0.3);
              const radius = phase >= 2 ? 90 : 100;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <div
                  key={skill.name}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1500"
                  style={{
                    transform: `translate(${x}px, ${y}px) scale(${phase >= 3 ? 0.7 : 0.9})`,
                    opacity: phase >= 3 ? 0.5 : 0.8
                  }}
                >
                  <div className="relative group">
                    <IconComponent 
                      className="w-8 h-8 transition-all duration-300" 
                      style={{ color: skill.color }}
                    />
                    {/* Skill level indicator */}
                    <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-12 h-1 bg-gray-700 rounded">
                        <div 
                          className="h-1 rounded transition-all duration-2000"
                          style={{ 
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Central Logo Formation */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-3000 ${phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
              <div className="relative">
                
                {/* Main AS Logo */}
                <div 
                  className={`text-8xl font-black bg-gradient-to-r ${getPhaseData().color} bg-clip-text text-transparent transition-all duration-1000 ${glitchActive ? 'animate-pulse filter blur-sm' : ''}`}
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
                    transform: `perspective(1000px) rotateY(${Math.sin(Date.now() * 0.001) * 5}deg)`
                  }}
                >
                  AS
                </div>
                
                {/* Orbital Rings */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border border-white/20"
                    style={{
                      animation: `spin ${8 + i * 2}s linear infinite`,
                      transform: `scale(${1 + i * 0.3})`,
                      borderColor: i === 0 ? '#3B82F6' : i === 1 ? '#8B5CF6' : '#10B981',
                      opacity: 0.3 - i * 0.1
                    }}
                  />
                ))}
                
                {/* Energy Field */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 animate-spin"
                     style={{ animation: 'spin 12s linear infinite reverse' }} 
                />
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className={`transition-all duration-2000 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className={`text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${getPhaseData().color} bg-clip-text text-transparent transition-all duration-1000 ${glitchActive ? 'animate-bounce' : ''}`}>
              Aryan Singh
            </h1>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl text-white/90 font-light">
                Full Stack Developer
              </p>
              <p className="text-lg text-white/70">
                AI Enthusiast • Cloud Architect • Problem Solver
              </p>
            </div>
          </div>

          {/* Advanced Progress Display */}
          <div className="relative w-64 h-64 mx-auto my-12">
            
            {/* Multi-layer Progress Ring */}
            <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 200 200">
              
              {/* Outer Ring */}
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="url(#outerGradient)"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={534.07}
                strokeDashoffset={534.07 - (534.07 * progress) / 100}
                className="transition-all duration-300"
                strokeLinecap="round"
              />
              
              {/* Middle Ring */}
              <circle
                cx="100"
                cy="100"
                r="70"
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={439.82}
                strokeDashoffset={439.82 - (439.82 * progress) / 100}
                className="transition-all duration-500"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))' }}
              />
              
              {/* Inner Ring */}
              <circle
                cx="100"
                cy="100"
                r="55"
                stroke="rgba(16, 185, 129, 0.4)"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={345.58}
                strokeDashoffset={345.58 - (345.58 * progress) / 100}
                className="transition-all duration-700"
                strokeLinecap="round"
              />
              
              <defs>
                <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${getPhaseData().color} bg-clip-text text-transparent`}>
                  {Math.round(progress)}%
                </div>
                <div className="text-sm text-white/60 font-mono tracking-wider">
                  LOADING...
                </div>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-2" />
              </div>
            </div>
          </div>

          {/* Phase Status */}
          <div className="h-12 mb-8">
            <p className={`text-white/80 text-xl font-light transition-all duration-1000 ${glitchActive ? 'animate-pulse text-red-400' : ''}`}>
              {getPhaseData().text}
            </p>
          </div>

          {/* Data Stream Visualization */}
          <div className={`flex justify-center space-x-1 transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-cyan-400/50 to-transparent animate-pulse"
                style={{
                  height: `${20 + Math.sin((progress + i * 10) * 0.1) * 40}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${1 + Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-2000"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.8) 100%),
            linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%, rgba(139, 92, 246, 0.05) 100%)
          `,
          opacity: phase >= 2 ? 1 : 0.5
        }}
      />

      {/* Global Styles */}
      <style jsx>{`
        @keyframes grid-flow {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(5px, -5px); }
          50% { transform: translate(-5px, 5px); }
          75% { transform: translate(-5px, -5px); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default WelcomeLoader2;