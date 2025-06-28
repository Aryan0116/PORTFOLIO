
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Mail, MapPin, Phone, ChevronDown } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const heroRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const titles = ['Full Stack Developer', 'ML Enthusiast'];
  const typingSpeed = 120;
  const deletingSpeed = 80;
  const pauseTime = 2000;

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced typing effect
  useEffect(() => {
    const currentTitleText = titles[currentTitle];
    
    if (!isDeleting && displayText === currentTitleText) {
      setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTitle((prev) => (prev + 1) % titles.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentTitleText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentTitleText.substring(0, displayText.length + 1));
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitle, titles]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleDownloadResume = () => {
    const resumeUrl = "/resume.pdf";
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Aryan_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef} 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30"
    >
      {/* Enhanced Interactive Background with Morphing Shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Interactive Morphing Shapes */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-bounce"
            style={{
              transform: `translate(${Math.sin(scrollY * 0.01) * 20}px, ${Math.cos(scrollY * 0.01) * 10}px)`,
              animationDelay: '0s',
              animationDuration: '6s'
            }}
          />
          <div 
            className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-bounce"
            style={{
              transform: `translate(${Math.cos(scrollY * 0.008) * 15}px, ${Math.sin(scrollY * 0.008) * 12}px)`,
              animationDelay: '2s',
              animationDuration: '8s'
            }}
          />
          <div 
            className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full animate-pulse"
            style={{
              transform: `translate(${Math.sin(scrollY * 0.012) * 25}px, ${Math.cos(scrollY * 0.012) * 8}px)`,
              animationDelay: '4s',
              animationDuration: '10s'
            }}
          />
          <div 
            className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full animate-pulse"
            style={{
              transform: `translate(${Math.cos(scrollY * 0.009) * 18}px, ${Math.sin(scrollY * 0.009) * 15}px)`,
              animationDelay: '1s',
              animationDuration: '7s'
            }}
          />
        </div>

        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.02}px)`,
          }}
        />
      </div>

      {/* Moving Clouds with Enhanced Transparency */}
      <div 
        className="clouds absolute inset-0 opacity-15" 
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/10 dark:bg-white/20 rounded-full blur-sm animate-float"></div>
        <div className="absolute top-40 right-20 w-48 h-20 bg-white/15 dark:bg-white/25 rounded-full blur-sm animate-float-reverse"></div>
        <div className="absolute bottom-40 left-1/3 w-40 h-18 bg-white/8 dark:bg-white/18 rounded-full blur-sm animate-float-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced Logo */}
          <div className="animate-on-scroll mb-8 opacity-0 transform translate-y-8 transition-all duration-800 ease-out" style={{animationDelay: '0s'}}>
            <div className="logo-container w-40 h-40 mx-auto mb-6 relative">
              <div className="w-full h-full rounded-full overflow-hidden hover-glow">
                <img 
                  src="/logo1.png"
                  alt="Aryan Singh Logo" 
                  className="logo-image w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Name with enhanced animation */}
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-800 ease-out" style={{animationDelay: '0.1s'}}>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 gradient-text hover:scale-105 transition-transform duration-300">
              ARYAN SINGH
            </h1>
            <div className="w-40 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 mx-auto mb-8 rounded-full">
              <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Enhanced Typing Effect */}
          <div className="animate-on-scroll typing-container opacity-0 transform translate-y-8 transition-all duration-800 ease-out" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl md:text-4xl font-bold mb-6 typing-text">
              {displayText.split('').map((char, index) => (
                <span key={index} className="char">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              <span className="typing-cursor"></span>
            </div>
          </div>

          {/* Description */}
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-800 ease-out" style={{animationDelay: '0.3s'}}>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-8 leading-relaxed">
              Passionate about creating innovative solutions with modern technologies. 
              Specializing in web development, machine learning, and creating impactful digital experiences.
            </p>
          </div>

          {/* Contact Info with enhanced effects */}
          <div className="animate-on-scroll flex flex-wrap justify-center gap-6 mb-8 text-foreground/70 opacity-0 transform translate-y-8 transition-all duration-800 ease-out" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2 hover:text-primary hover:scale-110 transition-all duration-300 cursor-pointer group glass p-3 rounded-full">
              <Mail className="w-4 h-4 group-hover:animate-bounce" />
              <span className="text-sm">16aryansin@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 hover:text-primary hover:scale-110 transition-all duration-300 cursor-pointer group glass p-3 rounded-full">
              <Phone className="w-4 h-4 group-hover:animate-bounce" />
              <span className="text-sm">+91 9123339637</span>
            </div>
            <div className="flex items-center gap-2 hover:text-primary hover:scale-110 transition-all duration-300 cursor-pointer group glass p-3 rounded-full">
              <MapPin className="w-4 h-4 group-hover:animate-bounce" />
              <span className="text-sm">Kolkata, India</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="animate-on-scroll flex flex-col sm:flex-row gap-4 justify-center mb-8 opacity-0 transform translate-y-8 transition-all duration-800 ease-out" style={{animationDelay: '0.5s'}}>
            <Button 
              onClick={handleDownloadResume}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group px-8 py-4 text-lg font-semibold"
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="glass border-foreground/20 hover:bg-primary/10 hover:scale-110 hover:shadow-xl transition-all duration-300 group px-8 py-4 text-lg font-semibold"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="animate-on-scroll flex justify-center gap-6 mb-12 opacity-0 transform translate-y-8 transition-all duration-800 ease-out" style={{animationDelay: '0.6s'}}>
            <a 
              href="https://github.com/Aryan0116" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 glass rounded-full hover:bg-primary/10 hover:scale-125 hover:rotate-12 transition-all duration-300 group hover:shadow-xl hover-glow"
            >
              <Github className="w-6 h-6 text-foreground/60 group-hover:text-primary group-hover:animate-pulse" />
            </a>
            <a 
              href="https://linkedin.com/in/aryansingh16" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 glass rounded-full hover:bg-primary/10 hover:scale-125 hover:rotate-12 transition-all duration-300 group hover:shadow-xl hover-glow"
            >
              <Linkedin className="w-6 h-6 text-foreground/60 group-hover:text-primary group-hover:animate-pulse" />
            </a>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-800 ease-out" style={{animationDelay: '0.7s'}}>
            <button 
              onClick={scrollToAbout}
              className="flex flex-col items-center text-foreground/60 hover:text-primary transition-all duration-300 animate-bounce hover:scale-110 group"
            >
              <span className="text-sm mb-2 group-hover:animate-pulse font-medium">Explore More</span>
              <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
