import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();

  useEffect(() => {
    // Define the p5 sketch
    const sketch = (p: p5) => {
      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        color: p5.Color;
        maxSpeed: number;
        size: number;

        constructor() {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p.createVector(p.random(-0.2, 0.2), p.random(-0.2, 0.2));
          this.acc = p.createVector(0, 0);
          this.color = p.color(p.random(100, 200), p.random(100, 200), 255, p.random(100, 200));
          this.maxSpeed = p.random(0.5, 1.5);
          this.size = p.random(1, 3);
        }

        update() {
          this.vel.add(this.acc);
          this.vel.limit(this.maxSpeed);
          this.pos.add(this.vel);
          this.acc.mult(0);

          // Check edges
          if (this.pos.x > p.width) this.pos.x = 0;
          if (this.pos.x < 0) this.pos.x = p.width;
          if (this.pos.y > p.height) this.pos.y = 0;
          if (this.pos.y < 0) this.pos.y = p.height;
        }

        display() {
          p.noStroke();
          p.fill(this.color);
          p.ellipse(this.pos.x, this.pos.y, this.size);
        }

        applyForce(force: p5.Vector) {
          this.acc.add(force);
        }
      }

      const particles: Particle[] = [];
      const particleCount = 150;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      };

      p.draw = () => {
        p.clear();
        
        // Update and display particles
        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          
          // Add a slight flow effect
          const flowForce = p.createVector(
            p.noise(particle.pos.x * 0.005, particle.pos.y * 0.005, p.frameCount * 0.002) * 0.1 - 0.05,
            p.noise(particle.pos.x * 0.005, particle.pos.y * 0.005, p.frameCount * 0.002 + 1000) * 0.1 - 0.05
          );
          
          particle.applyForce(flowForce);
          particle.update();
          particle.display();
          
          // Connect nearby particles with lines
          for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];
            const d = p.dist(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
            const maxDist = 100;
            
            if (d < maxDist) {
              const alpha = p.map(d, 0, maxDist, 100, 0);
              p.stroke(100, 150, 255, alpha);
              p.line(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
            }
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    // Initialize the sketch
    if (containerRef.current) {
      sketchRef.current = new p5(sketch, containerRef.current);
    }

    // Cleanup on component unmount
    return () => {
      sketchRef.current?.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
};

export default ParticleBackground;