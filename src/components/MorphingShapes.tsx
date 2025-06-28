
import React, { useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MorphingShapes: React.FC = () => {
  const { scrollY } = useScrollAnimation();
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shapesRef.current) {
      const shapes = shapesRef.current.querySelectorAll('.morphing-shape');
      shapes.forEach((shape, index) => {
        const element = shape as HTMLElement;
        const rotation = (scrollY * 0.1 * (index + 1)) % 360;
        const scale = 1 + Math.sin(scrollY * 0.005 + index) * 0.2;
        
        element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      });
    }
  }, [scrollY]);

  return (
    <div ref={shapesRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="morphing-shape absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm"></div>
      <div className="morphing-shape absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rotate-45 blur-sm"></div>
      <div className="morphing-shape absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
      <div className="morphing-shape absolute top-1/2 right-1/3 w-18 h-18 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-sm"></div>
      <div className="morphing-shape absolute bottom-20 right-10 w-14 h-14 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rotate-12 blur-sm"></div>
    </div>
  );
};

export default MorphingShapes;
