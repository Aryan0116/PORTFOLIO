
import React, { useEffect, useRef } from 'react';

const ExperienceSection = () => {
  const experienceRef = useRef<HTMLDivElement>(null);

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

    const elements = experienceRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: 'React Developer Intern',
      company: 'Indian Institute of Internship',
      duration: 'Recent',
      type: 'Internship',
      description: [
        'Developed interactive and dynamic user interfaces using React.js',
        'Implemented reusable components, state management, and API integration',
        'Gained hands-on experience in debugging and optimizing React applications',
        'Acquired deeper understanding of React concepts and best practices',
        'Created several projects showcasing proficiency in frontend development'
      ],
      technologies: ['React.js', 'JavaScript', 'HTML/CSS', 'API Integration'],
      icon: '💻'
    },
    {
      title: 'Event Coordinator',
      company: 'BIHAAN College Festival, RCCIIT',
      duration: 'January 2023',
      type: 'Leadership',
      description: [
        'Contributed to a 35-member team in planning and execution of BIHAAN cultural fest',
        'Managed event logistics for 700+ students attendance',
        'Demonstrated exceptional organizational and teamwork skills',
        'Coordinated multiple event activities and vendor management',
        'Gained valuable experience in project management and team leadership'
      ],
      technologies: ['Project Management', 'Team Leadership', 'Event Planning'],
      icon: '🎯'
    }
  ];

  return (
    <section id="experience" ref={experienceRef} className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="animate-on-scroll text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Professional experiences and leadership roles that have shaped my technical and soft skills
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>

            {experiences.map((exp, index) => (
              <div key={index} className={`animate-on-scroll mb-12 flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-background"></div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{exp.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                          <p className="text-foreground/80 font-medium">{exp.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-primary text-sm rounded-full">
                          {exp.type}
                        </span>
                        <p className="text-sm text-foreground/60 mt-1">{exp.duration}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="text-foreground/70 flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-muted text-foreground/80 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Current Status */}
          <div className="animate-on-scroll text-center mt-16">
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Currently Seeking</h3>
              <p className="text-foreground/80 mb-6">
                I'm actively looking for opportunities in full-stack development, React development, 
                and AI/ML roles where I can contribute to innovative projects and continue growing 
                my technical expertise.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-primary rounded-full">
                  Full-Stack Developer
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-primary rounded-full">
                  React Developer
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-primary rounded-full">
                  AI/ML Engineer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
