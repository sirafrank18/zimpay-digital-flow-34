
import React, { useRef, useEffect } from 'react';

interface ThanosEffectProps {
  onComplete?: () => void;
  duration?: number;
  children: React.ReactNode;
  active?: boolean;
}

const ThanosEffect: React.FC<ThanosEffectProps> = ({ 
  children, 
  onComplete, 
  duration = 1500,
  active = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!active || !containerRef.current || !particlesRef.current || !childrenRef.current) return;
    
    const container = containerRef.current;
    const canvas = particlesRef.current;
    const childrenContainer = childrenRef.current;
    
    // Get the position and dimensions of the children content
    const rect = childrenContainer.getBoundingClientRect();
    
    // Set the canvas dimensions to match the children
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Create image from the content
    html2canvas(childrenContainer).then(contentCanvas => {
      // Hide the original content once we have its image
      childrenContainer.style.opacity = '0';
      
      // Draw the content to our canvas initially
      ctx.drawImage(contentCanvas, 0, 0);
      
      // Create particles from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const particles: Particle[] = [];
      
      // Create particles only from non-transparent pixels (skip some pixels for performance)
      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          const i = (y * canvas.width + x) * 4;
          const alpha = imageData.data[i + 3];
          
          if (alpha > 128) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            
            particles.push({
              x,
              y,
              size: Math.random() * 2 + 1,
              color: `rgba(${r}, ${g}, ${b}, ${alpha / 255})`,
              velocity: {
                x: (Math.random() - 0.5) * 3,
                y: (Math.random() - 0.5) * 3
              },
              opacity: 1
            });
          }
        }
      }
      
      // Clear the canvas now that we've created our particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Animation timing
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        let stillVisible = false;
        
        for (const particle of particles) {
          // Update particle position and opacity
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;
          particle.opacity = Math.max(0, 1 - progress * 1.5);
          
          if (particle.opacity > 0) {
            stillVisible = true;
            ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgba', 'rgba');
            ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
          }
        }
        
        // Continue animation if there are still visible particles and we haven't reached the end
        if (stillVisible && progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Animation complete
          if (onComplete) {
            setTimeout(onComplete, 100);
          }
        }
      };
      
      // Start animation
      animate();
    });
    
    // Required for the html2canvas functionality
    function html2canvas(element: HTMLElement): Promise<HTMLCanvasElement> {
      return new Promise(resolve => {
        const canvas = document.createElement('canvas');
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(canvas);
          return;
        }
        
        // Simple version - draw background color
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create a temporary img element
        const img = new Image();
        const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              ${element.outerHTML}
            </div>
          </foreignObject>
        </svg>`;
        
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          resolve(canvas);
        };
        
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
      });
    }
    
  }, [active, duration, onComplete]);
  
  return (
    <div ref={containerRef} className="thanos-effect-container relative">
      <div ref={childrenRef} className={`thanos-content ${active ? 'invisible' : ''}`}>
        {children}
      </div>
      {active && (
        <canvas 
          ref={particlesRef} 
          className="absolute top-0 left-0 pointer-events-none"
          style={{ zIndex: 10 }}
        />
      )}
    </div>
  );
};

// Type for particles
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  opacity: number;
}

export default ThanosEffect;
