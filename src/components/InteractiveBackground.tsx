
import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const drawGeometry = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient based on mouse position
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 300
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      // Draw grid with mouse interaction
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distance = Math.sqrt(
            (mouseRef.current.x - x) ** 2 + (mouseRef.current.y - y) ** 2
          );
          
          const opacity = Math.max(0, 1 - distance / 200);
          if (opacity > 0) {
            ctx.globalAlpha = opacity * 0.3;
            ctx.beginPath();
            ctx.rect(x - 25, y - 25, 50, 50);
            ctx.stroke();
            
            // Draw connecting lines
            if (opacity > 0.5) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.1})`;
              ctx.stroke();
            }
          }
        }
      }

      // Draw mouse follower circle
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 150, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(drawGeometry);
    };

    drawGeometry();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default InteractiveBackground;
