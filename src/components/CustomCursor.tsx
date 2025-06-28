
import React, { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailIdRef = useRef(0);
  const rafRef = useRef<number>();
  const outerRafRef = useRef<number>();

  // Smooth position updates with requestAnimationFrame
  const updatePosition = useCallback((e: MouseEvent) => {
    const newPos = { x: e.clientX, y: e.clientY };
    setPosition(newPos);
    setIsVisible(true);
    
    // Cancel previous frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Smooth trail creation
    rafRef.current = requestAnimationFrame(() => {
      const newTrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++
      };
      
      setTrail(prev => {
        const newTrail = [...prev, newTrailPoint];
        return newTrail.slice(-8); // Keep last 8 points for better trail
      });
    });
  }, []);

  // Separate smooth animation for outer ring
  useEffect(() => {
    const animateOuter = () => {
      setOuterPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.12,
        y: prev.y + (position.y - prev.y) * 0.12
      }));
      outerRafRef.current = requestAnimationFrame(animateOuter);
    };
    
    if (isVisible) {
      outerRafRef.current = requestAnimationFrame(animateOuter);
    }
    
    return () => {
      if (outerRafRef.current) {
        cancelAnimationFrame(outerRafRef.current);
      }
    };
  }, [position, isVisible]);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseEnterElement = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, .cursor-pointer, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeaveElement = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, .cursor-pointer, [role="button"], input, textarea, select')) {
        setIsHovering(false);
      }
    };

    // Add listeners to document for global coverage
    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseover', handleMouseEnterElement, { passive: true });
    document.addEventListener('mouseout', handleMouseLeaveElement, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseEnterElement);
      document.removeEventListener('mouseout', handleMouseLeaveElement);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (outerRafRef.current) {
        cancelAnimationFrame(outerRafRef.current);
      }
    };
  }, [updatePosition]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
      {/* Enhanced trail with better visibility */}
      {trail.map((point, index) => {
        const progress = (index + 1) / trail.length;
        const size = 2 + progress * 8;
        const opacity = progress * 0.6;
        
        return (
          <div
            key={point.id}
            className="absolute rounded-full"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, rgba(99, 102, 241, ${opacity}) 0%, rgba(168, 85, 247, ${opacity * 0.7}) 100%)`,
              transform: `scale(${progress})`,
              transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        );
      })}
      
      {/* Main cursor dot */}
      <div
        className="absolute"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          transform: `scale(${isHovering ? 1.5 : isClicking ? 0.8 : 1})`,
          transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="w-3 h-3 bg-white rounded-full shadow-lg border border-black/20">
          <div className="w-1 h-1 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Outer ring */}
      <div
        className="absolute"
        style={{
          left: outerPosition.x - 15,
          top: outerPosition.y - 15,
          transform: `scale(${isHovering ? 1.3 : 1}) rotate(${isClicking ? '45deg' : '0deg'})`,
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="w-8 h-8 border-2 border-indigo-400/60 rounded-full"></div>
      </div>
    </div>
  );
};

export default CustomCursor;
