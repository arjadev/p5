import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const CircleWave: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();

  useEffect(() => {
    const sketch = (p: p5) => {
      let waves: number[] = [];
      let waveCount = 5;
      
      p.setup = () => {
        const container = containerRef.current;
        const width = container?.clientWidth || 400;
        const height = container?.clientHeight || 400;
        
        p.createCanvas(width, height);
        p.smooth();
        
        // Initialize waves with random phases
        for (let i = 0; i < waveCount; i++) {
          waves[i] = p.random(0, p.TWO_PI);
        }
      };

      p.draw = () => {
        p.clear();
        p.translate(p.width / 2, p.height / 2);
        
        const maxRadius = p.min(p.width, p.height) * 0.4;
        
        // Draw multiple wave circles
        for (let w = 0; w < waveCount; w++) {
          let wave = waves[w];
          
          // Update wave phase
          waves[w] = (wave + 0.02) % p.TWO_PI;
          
          // Set colors based on wave
          const hue = (w * 40 + p.frameCount * 0.2) % 360;
          p.stroke(p.color(`hsla(${hue}, 80%, 70%, 0.5)`));
          p.noFill();
          p.strokeWeight(2);
          
          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += 0.1) {
            // Create wave effect
            const noiseVal = p.noise(a * 0.5, wave * 0.5);
            const waveR = p.sin(a * 3 + wave) * 0.2;
            
            // Calculate point on circle with wave effect
            const r = maxRadius * (0.6 + noiseVal * 0.2 + waveR) * ((w + 1) / waveCount);
            const x = p.cos(a) * r;
            const y = p.sin(a) * r;
            
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
        }
      };

      p.windowResized = () => {
        const container = containerRef.current;
        const width = container?.clientWidth || 400;
        const height = container?.clientHeight || 400;
        p.resizeCanvas(width, height);
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

export default CircleWave;