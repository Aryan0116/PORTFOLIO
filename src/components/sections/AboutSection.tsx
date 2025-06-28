import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection = () => {
  const aboutRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image with Hover + Scroll Animation */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex justify-center"
            >
              <div className="relative group w-full max-w-lg rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center glass-card overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                <img
                  src="me1.jpg"
                  alt="Aryan Singh"
                  className="w-full h-full object-cover rounded-2xl transition-all duration-700 ease-in-out transform hover:scale-110"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Floating icon */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg">
                  <span className="text-2xl animate-pulse">🚀</span>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-bounce"></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400 rounded-full opacity-30 group-hover:opacity-60 transition-all duration-500 animate-ping"></div>
                <div className="absolute top-1/4 -right-6 w-6 h-6 bg-purple-400 rounded-full opacity-25 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
              </div>
            </motion.div>

            {/* About Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Computer Science Engineer & React Developer
              </h3>

              <p className="text-foreground/80 leading-relaxed">
                I'm a passionate Computer Science Engineering student at RCC Institute of Information Technology
                with a CGPA of 8.68/10. Currently pursuing my B.Tech degree (2021–2025), I specialize in
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
                <div className="glass-card p-4 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold gradient-text">8.68</div>
                  <div className="text-sm text-foreground/60">CGPA</div>
                </div>
                <div className="glass-card p-4 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold gradient-text">15+</div>
                  <div className="text-sm text-foreground/60">Projects</div>
                </div>
                <div className="glass-card p-4 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold gradient-text">10+</div>
                  <div className="text-sm text-foreground/60">Technologies</div>
                </div>
                <div className="glass-card p-4 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold gradient-text">5+</div>
                  <div className="text-sm text-foreground/60">Certifications</div>
                </div>
              </div>

              {/* Education */}
              <div className="glass-card p-6 mt-6 hover:shadow-xl transition-shadow duration-300">
                <h4 className="text-lg font-semibold mb-3 text-foreground">Education</h4>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold hover:rotate-6 transition-transform duration-300">
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
