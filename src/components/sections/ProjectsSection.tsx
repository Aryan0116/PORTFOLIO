
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

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

    const elements = projectsRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const featuredProjects = [
    {
      title: 'Real-time Multiplayer Tic-Tac-Toe with Chat',
      description: 'A real-time multiplayer game with private rooms and integrated chat functionality for engaging user experience.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop',
      technologies: ['Node.js', 'Express.js', 'Socket.io', 'JavaScript'],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'COA Hub: Interactive Teaching Learning App',
      description: 'An interactive web platform for Computer Organization and Architecture with study modules, quizzes, and AI chatbot.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=300&fit=crop',
      technologies: ['React', 'Express.js', 'JavaScript', 'HTML/CSS'],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Deepfake Detection Web Application',
      description: 'Advanced CNN-based web application for accurate deepfake image detection using computer vision techniques.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop',
      technologies: ['Python', 'TensorFlow', 'Flask', 'NumPy'],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Automated Waste Classification System',
      description: 'Machine learning system for waste type classification and automated disposal bin identification.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Computer Vision'],
      github: '#',
      demo: '#',
      featured: true
    }
  ];

  return (
    <section id="projects" ref={projectsRef} className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="animate-on-scroll text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Showcase of my best work spanning web development, machine learning, and innovative solutions
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div 
                key={index} 
                className="animate-on-scroll glass-card overflow-hidden hover:scale-105 transition-all duration-300 group"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-muted text-foreground/80 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4">
                    <a 
                      href={project.github}
                      className="text-foreground/60 hover:text-primary transition-colors duration-200"
                    >
                      GitHub
                    </a>
                    <a 
                      href={project.demo}
                      className="text-foreground/60 hover:text-primary transition-colors duration-200"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="animate-on-scroll text-center">
            <Link to="/projects">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
