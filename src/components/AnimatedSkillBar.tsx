
import React from 'react';
import { useScrollTrigger, useCountUp } from '@/hooks/useScrollAnimations';

interface AnimatedSkillBarProps {
  skillName: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
  delay?: number;
}

const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({
  skillName,
  percentage,
  color,
  icon,
  delay = 0
}) => {
  const { elementRef, isVisible } = useScrollTrigger(0.3);
  const animatedPercentage = useCountUp(percentage, 2000 + delay, isVisible);

  return (
    <div 
      ref={elementRef}
      className={`glass-card p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <h4 className="font-semibold text-foreground">{skillName}</h4>
        </div>
        <div className="text-2xl font-bold gradient-text">
          {animatedPercentage}%
        </div>
      </div>
      
      <div className="relative w-full bg-muted rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out relative`}
          style={{ 
            width: isVisible ? `${percentage}%` : '0%',
            transitionDelay: `${delay + 200}ms`
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          <div className="absolute right-0 top-0 h-full w-1 bg-white/60 animate-pulse"></div>
        </div>
      </div>
      
      {/* Skill level indicator */}
      <div className="mt-2 text-sm text-foreground/60">
        {percentage >= 90 ? 'Expert' : percentage >= 75 ? 'Advanced' : percentage >= 60 ? 'Intermediate' : 'Learning'}
      </div>
    </div>
  );
};

export default AnimatedSkillBar;
