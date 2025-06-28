import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Projects = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'Real-time Multiplayer Tic-Tac-Toe with Chat',
      description: 'A real-time multiplayer game with private rooms and integrated chat functionality for engaging user experience.',
      fullDescription: 'Designed and implemented a real-time multiplayer Tic-Tac-Toe game application featuring private rooms and integrated chat functionality, providing an engaging user experience. Users can create or join game rooms, play with friends, and communicate through real-time chat.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop',
      technologies: ['Node.js', 'Express.js', 'Socket.io', 'HTML', 'CSS', 'JavaScript'],
      category: 'web',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'COA Hub: Interactive Teaching Learning Web Application',
      description: 'An interactive web platform for Computer Organization and Architecture with study modules, quizzes, and AI chatbot.',
      fullDescription: 'Developed "COA Hub," an interactive web application designed for teaching and learning Computer Organization and Architecture. The platform includes study modules, quizzes, progress tracking, discussion forums, and an AI-powered chatbot for doubt resolution.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=300&fit=crop',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Express.js'],
      category: 'web',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Deepfake Detection Web Application',
      description: 'Advanced CNN-based web application for accurate deepfake image detection using computer vision techniques.',
      fullDescription: 'Developed a robust web application leveraging Convolutional Neural Networks (CNNs) and computer vision techniques for accurate deepfake image detection. Enhanced accuracy and reliability by training the model on a self-curated dataset sourced from multiple authentic sources.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop',
      technologies: ['Python', 'NumPy', 'Pandas', 'TensorFlow', 'Flask', 'JavaScript'],
      category: 'ml',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Automated Waste Classification System',
      description: 'Machine learning system for waste type classification and automated disposal bin identification.',
      fullDescription: 'Engineered an image recognition system utilizing machine learning algorithms to classify waste types and automate the identification of appropriate disposal bins, promoting efficient waste management.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Computer Vision'],
      category: 'ml',
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'E-Commerce Platform with Payment Integration',
      description: 'Full-stack e-commerce solution with secure payment processing and admin dashboard.',
      fullDescription: 'Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, secure payment integration, order management, and admin dashboard for inventory and sales tracking.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=300&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'JWT'],
      category: 'web',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      title: 'Social Media Analytics Dashboard',
      description: 'Data visualization dashboard for social media metrics and engagement analytics.',
      fullDescription: 'Created an interactive dashboard for analyzing social media performance across multiple platforms, featuring real-time data visualization, engagement metrics, and trend analysis with customizable reporting.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop',
      technologies: ['React', 'D3.js', 'Python', 'Flask', 'PostgreSQL'],
      category: 'data',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      title: 'Stock Price Prediction Model',
      description: 'Machine learning model for predicting stock prices using historical data and market indicators.',
      fullDescription: 'Developed a sophisticated machine learning model using LSTM neural networks to predict stock prices based on historical data, technical indicators, and market sentiment analysis.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Scikit-learn'],
      category: 'ml',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      title: 'Task Management Progressive Web App',
      description: 'Cross-platform PWA for task management with offline capabilities and real-time sync.',
      fullDescription: 'Built a Progressive Web App for task management featuring offline functionality, real-time collaboration, push notifications, and cross-platform compatibility with native app-like experience.',
      image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=500&h=300&fit=crop',
      technologies: ['React', 'Service Workers', 'IndexedDB', 'WebSocket', 'PWA'],
      category: 'web',
      github: '#',
      demo: '#',
      featured: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web', label: 'Web Development' },
    { value: 'ml', label: 'Machine Learning' },
    { value: 'data', label: 'Data Science' },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
  }, [filteredProjects]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="stars fixed inset-0 z-0"></div>
      <div className="clouds fixed inset-0 z-0"></div>
      
      <Navigation />
      
      <div className="pt-20 relative z-10">
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">All Projects</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
              <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
                Explore my complete portfolio of projects spanning web development, machine learning, 
                and innovative solutions. Each project represents a unique challenge and learning experience.
              </p>
            </div>

            {/* Filters and Controls */}
            <div className="max-w-4xl mx-auto">
              <div className="glass-card p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="flex-1 max-w-md">
                    <Input
                      placeholder="Search projects, technologies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="glass border-foreground/20"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.value)}
                        className={selectedCategory === category.value ? 
                          "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0" : 
                          "glass border-foreground/20"
                        }
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>

                  {/* View Toggle */}
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'grid' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 
                        "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0" : 
                        "glass border-foreground/20"
                      }
                    >
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 
                        "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0" : 
                        "glass border-foreground/20"
                      }
                    >
                      List
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-center mb-8">
                <p className="text-foreground/70">
                  Showing {filteredProjects.length} of {projects.length} projects
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid/List */}
        <section ref={projectsRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
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
                        {project.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-foreground/70 mb-4 text-sm line-clamp-3">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-1 bg-muted text-foreground/80 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-muted text-foreground/80 text-xs rounded-full">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Project Links */}
                        <div className="flex space-x-4">
                          <a 
                            href={project.github}
                            className="text-foreground/60 hover:text-primary transition-colors duration-200 text-sm"
                          >
                            GitHub
                          </a>
                          <a 
                            href={project.demo}
                            className="text-foreground/60 hover:text-primary transition-colors duration-200 text-sm"
                          >
                            Demo
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProjects.map((project, index) => (
                    <div 
                      key={index} 
                      className="animate-on-scroll glass-card p-6 hover:scale-[1.02] transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Project Image */}
                        <div className="md:w-64 h-40 overflow-hidden rounded-lg">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Project Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-foreground">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full">
                                Featured
                              </span>
                            )}
                          </div>

                          <p className="text-foreground/70 mb-4">
                            {project.fullDescription}
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
                          <div className="flex space-x-6">
                            <a 
                              href={project.github}
                              className="text-foreground/60 hover:text-primary transition-colors duration-200 font-medium"
                            >
                              View on GitHub
                            </a>
                            <a 
                              href={project.demo}
                              className="text-foreground/60 hover:text-primary transition-colors duration-200 font-medium"
                            >
                              Live Demo
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">No projects found</h3>
                  <p className="text-foreground/70">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
