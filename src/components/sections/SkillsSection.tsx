
import React from 'react';
import { Github, Database, Shield, MessageCircle, Lightbulb, Users, Zap, Crown, Shuffle, Clock, Palette, Eye } from 'lucide-react';
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
import AnimatedSkillBar from '@/components/AnimatedSkillBar';
import { useScrollTrigger } from '@/hooks/useScrollAnimations';

const SkillsSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollTrigger(0.1);
  const { elementRef: softSkillsRef, isVisible: softSkillsVisible } = useScrollTrigger(0.2);

  const getSkillIcon = (skillName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Python': <SiPython className="w-5 h-5 text-blue-500" />,
      'JavaScript': <SiJavascript className="w-5 h-5 text-yellow-500" />,
      'React': <SiReact className="w-5 h-5 text-blue-400" />,
      'HTML/CSS': <div className="flex gap-1"><SiHtml5 className="w-4 h-4 text-orange-500" /><SiCss3 className="w-4 h-4 text-blue-500" /></div>,
      'SQL': <SiMysql className="w-5 h-5 text-blue-600" />,
      'Java': <SiOpenjdk className="w-5 h-5 text-red-500" />,
      'Flask': <SiFlask className="w-5 h-5 text-gray-600" />,
      'Git': <SiGit className="w-5 h-5 text-orange-600" />,
      'Linux': <SiLinux className="w-5 h-5 text-black dark:text-white" />,
      'TensorFlow': <SiTensorflow className="w-5 h-5 text-orange-500" />,
      'NumPy/Pandas': <div className="flex gap-1"><SiNumpy className="w-4 h-4 text-blue-500" /><SiPandas className="w-4 h-4 text-purple-600" /></div>,
      'Cybersecurity': <Shield className="w-5 h-5 text-red-600" />,
    };
    return iconMap[skillName] || <Database className="w-5 h-5" />;
  };

  const getSoftSkillIcon = (skillName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Communication': <MessageCircle className="w-5 h-5 text-blue-500" />,
      'Problem-Solving': <Lightbulb className="w-5 h-5 text-yellow-500" />,
      'Teamwork': <Users className="w-5 h-5 text-green-500" />,
      'Quick Learner': <Zap className="w-5 h-5 text-purple-500" />,
      'Leadership': <Crown className="w-5 h-5 text-amber-500" />,
      'Adaptability': <Shuffle className="w-5 h-5 text-pink-500" />,
      'Time Management': <Clock className="w-5 h-5 text-indigo-500" />,
      'Creativity': <Palette className="w-5 h-5 text-orange-500" />,
      'Attention to Detail': <Eye className="w-5 h-5 text-cyan-500" />,
    };
    return iconMap[skillName] || <Shield className="w-5 h-5" />;
  };

  const technicalSkills = [
    { name: 'Python', level: 90, color: 'from-yellow-400 to-yellow-600' },
    { name: 'JavaScript', level: 80, color: 'from-yellow-500 to-orange-500' },
    { name: 'React', level: 80, color: 'from-blue-400 to-blue-600' },
    { name: 'HTML/CSS', level: 90, color: 'from-orange-400 to-red-500' },
    { name: 'SQL', level: 85, color: 'from-blue-500 to-indigo-600' },
    { name: 'Java', level: 65, color: 'from-red-500 to-red-700' },
    { name: 'Flask', level: 75, color: 'from-blue-600 to-gray-800' },
    { name: 'Git', level: 85, color: 'from-orange-500 to-red-600' },
    { name: 'Linux', level: 75, color: 'from-yellow-600 to-black' },
    { name: 'TensorFlow', level: 60, color: 'from-orange-400 to-orange-600' },
    { name: 'NumPy/Pandas', level: 80, color: 'from-blue-600 to-purple-600' },
    { name: 'Cybersecurity', level: 75, color: 'from-red-600 to-pink-600' },
  ];

  const softSkills = [
    'Communication',
    'Problem-Solving',
    'Teamwork',
    'Quick Learner',
    'Leadership',
    'Adaptability',
    'Time Management',
    'Creativity',
    'Attention to Detail',
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="clouds"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A comprehensive skill set spanning modern web technologies, programming languages, and soft skills
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Technical Skills with Enhanced Animations */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">Technical Skills</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalSkills.map((skill, index) => (
                <AnimatedSkillBar
                  key={skill.name}
                  skillName={skill.name}
                  percentage={skill.level}
                  color={skill.color}
                  icon={getSkillIcon(skill.name)}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>

          {/* Soft Skills with Icons */}
          <div 
            ref={softSkillsRef}
            className={`mb-16 transition-all duration-700 ${
              softSkillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-foreground">Soft Skills</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {softSkills.map((skill, index) => (
                <div 
                  key={skill} 
                  className={`glass-card px-6 py-4 hover:scale-105 transition-all duration-500 hover:bg-primary/10 flex items-center gap-3 ${
                    softSkillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {getSoftSkillIcon(skill)}
                  <span className="text-foreground font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Highlight */}
          <div className={`mt-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="glass-card p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Key Achievements</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl">🏆</div>
                  <h4 className="font-semibold text-foreground">AWS AI & ML Scholarship</h4>
                  <p className="text-sm text-foreground/70">Winter Cohort - Selected for Udacity Nanodegree</p>
                </div>
                <div className="space-y-2 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl">💻</div>
                  <h4 className="font-semibold text-foreground">TCS CodeVita Qualified</h4>
                  <p className="text-sm text-foreground/70">Rank 1786 (2024), Rank 772 (2025)</p>
                </div>
                <div className="space-y-2 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl">📚</div>
                  <h4 className="font-semibold text-foreground">Multiple Certifications</h4>
                  <p className="text-sm text-foreground/70">Google, AWS, IBM Z, Rice University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
