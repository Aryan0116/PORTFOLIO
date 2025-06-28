
import React, { useEffect, useRef } from 'react';

const AboutSection = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

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

    const elements = aboutRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image Placeholder */}
            <div className="animate-on-scroll">
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center glass-card">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"
                    alt="Aryan Singh"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="animate-on-scroll space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Computer Science Engineer & React Developer
              </h3>
              
              <p className="text-foreground/80 leading-relaxed">
                I'm a passionate Computer Science Engineering student at RCC Institute of Information Technology 
                with a CGPA of 8.68/10. Currently pursuing my B.Tech degree (2021-2025), I specialize in 
                web development, machine learning, and creating innovative solutions.
              </p>

              <p className="text-foreground/80 leading-relaxed">
                My journey in technology started with curiosity and has evolved into expertise across multiple 
                domains including React development, Python programming, cybersecurity, and AI/ML. I've completed 
                internships, built real-world projects, and earned certifications that demonstrate my commitment 
                to continuous learning.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">8.68</div>
                  <div className="text-sm text-foreground/60">CGPA</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">15+</div>
                  <div className="text-sm text-foreground/60">Projects</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">10+</div>
                  <div className="text-sm text-foreground/60">Technologies</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">5+</div>
                  <div className="text-sm text-foreground/60">Certifications</div>
                </div>
              </div>

              {/* Education */}
              <div className="glass-card p-6 mt-6">
                <h4 className="text-lg font-semibold mb-3 text-foreground">Education</h4>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    CS
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">B.TECH - Computer Science and Engineering</h5>
                    <p className="text-foreground/70">RCC Institute of Information Technology</p>
                    <p className="text-sm text-foreground/60">CGPA: 8.68/10 • 2021 - June 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
