import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const InteractiveMesh: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();

  useEffect(() => {
    const sketch = (p: p5) => {
      const cols = 20;
      const rows = 20;
      let points: p5.Vector[][] = [];
      let angle = 0;
      
      p.setup = () => {
        const container = containerRef.current;
        const width = container?.clientWidth || 400;
        const height = container?.clientHeight || 400;
        
        p.createCanvas(width, height);
        p.strokeWeight(1.5);
        
        // Initialize grid of points
        for (let x = 0; x < cols; x++) {
          points[x] = [];
          for (let y = 0; y < rows; y++) {
            // Calculate grid position
            const xPos = p.map(x, 0, cols - 1, 0, width);
            const yPos = p.map(y, 0, rows - 1, 0, height);
            points[x][y] = p.createVector(xPos, yPos, 0);
          }
        }
      };

      p.draw = () => {
        p.clear();
        
        // Update angle for animation
        angle += 0.03;
        
        // Calculate mouse influence
        const mouseXRatio = p.mouseX / p.width;
        const mouseYRatio = p.mouseY / p.height;
        const mouseInfluence = p.dist(p.mouseX, p.mouseY, p.width/2, p.height/2) / (p.width/2);
        
        // Draw connecting lines
        for (let x = 0; x < cols - 1; x++) {
          for (let y = 0; y < rows - 1; y++) {
            // Update z-coordinate based on noise and mouse position
            const noiseVal = p.noise(x * 0.1, y * 0.1, angle * 0.1);
            
            // Apply distortion to points
            const distX = p.map(x, 0, cols - 1, 0, p.width);
            const distY = p.map(y, 0, rows - 1, 0, p.height);
            
            // Calculate distance from mouse
            const d = p.dist(distX, distY, p.mouseX, p.mouseY);
            const maxDist = 100;
            
            // Apply mouse influence
            let zOffset = 0;
            if (d < maxDist && p.mouseX > 0 && p.mouseY > 0) {
              zOffset = p.map(d, 0, maxDist, 30, 0) * p.sin(angle * 2);
            }
            
            // Apply animated wave
            const waveVal = 20 * p.sin(x * 0.3 + angle) * p.cos(y * 0.3 + angle);
            
            points[x][y].z = noiseVal * 30 + waveVal + zOffset;
            
            // Draw lines between adjacent points
            const a = points[x][y];
            const b = points[x + 1][y];
            const c = points[x][y + 1];
            
            // Calculate color based on z-height and position
            const colorVal = p.map(a.z, -30, 30, 0, 1);
            const gradient = p.lerpColor(
              p.color(50, 100, 200, 150), 
              p.color(100, 200, 255, 150), 
              colorVal
            );
            
            p.stroke(gradient);
            p.line(a.x, a.y, b.x, b.y);
            p.line(a.x, a.y, c.x, c.y);
          }
        }
      };

      p.windowResized = () => {
        const container = containerRef.current;
        const width = container?.clientWidth || 400;
        const height = container?.clientHeight || 400;
        p.resizeCanvas(width, height);
        
        // Reinitialize grid on resize
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            const xPos = p.map(x, 0, cols - 1, 0, width);
            const yPos = p.map(y, 0, rows - 1, 0, height);
            points[x][y] = p.createVector(xPos, yPos, 0);
          }
        }
      };
    };

    if (containerRef.current) {
      sketchRef.current = new p5(sketch, containerRef.current);
    }

    return () => {
      sketchRef.current?.remove();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[300px] rounded-lg overflow-hidden border border-blue-700 shadow-lg" />;
};

export default InteractiveMesh;