import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const ParticleSystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();

  useEffect(() => {
    const sketch = (p: p5) => {
      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        lifespan: number;
        color: p5.Color;
        size: number;

        constructor(position: p5.Vector) {
          this.pos = position.copy();
          this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
          this.acc = p.createVector(0, 0.05);
          this.lifespan = 255;
          
          // Dynamic color based on position
          const hue = p.map(this.pos.x, 0, p.width, 180, 240);
          this.color = p.color(hue, 80, 80, this.lifespan);
          
          this.size = p.random(4, 8);
        }

        update() {
          this.vel.add(this.acc);
          this.pos.add(this.vel);
          this.lifespan -= 2;
          
          // Update color alpha based on lifespan
          this.color.setAlpha(this.lifespan);
        }

        display() {
          p.noStroke();
          p.fill(this.color);
          p.ellipse(this.pos.x, this.pos.y, this.size);
        }

        isDead() {
          return this.lifespan < 0;
        }
      }

      class ParticleEmitter {
        origin: p5.Vector;
        particles: Particle[];

        constructor(position: p5.Vector) {
          this.origin = position.copy();
          this.particles = [];
        }

        addParticle() {
          // Random position around origin
          const pos = this.origin.copy().add(p.random(-10, 10), p.random(-10, 10));
          this.particles.push(new Particle(pos));
        }

        update() {
          // Add new particles
          for (let i = 0; i < 2; i++) {
            this.addParticle();
          }

          // Update particles and remove dead ones
          for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            
            if (particle.isDead()) {
              this.particles.splice(i, 1);
            }
          }
        }

        display() {
          for (const particle of this.particles) {
            particle.display();
          }
        }

        setPosition(x: number, y: number) {
          this.origin.set(x, y);
        }
      }

      let emitter: ParticleEmitter;
      
      p.setup = () => {
        const container = containerRef.current;
        const width = container?.clientWidth || 400;
        const height = container?.clientHeight || 400;
        
        p.createCanvas(width, height);
        p.colorMode(p.HSB, 360, 100, 100, 255);
        
        // Create emitter in center
        emitter = new ParticleEmitter(p.createVector(p.width / 2, p.height / 2));
      };

      p.draw = () => {
        p.clear();
        
        // Move emitter in a circular pattern
        const t = p.frameCount * 0.02;
        const x = p.width/2 + p.cos(t) * (p.width * 0.25);
        const y = p.height/2 + p.sin(t) * (p.height * 0.25);
        emitter.setPosition(x, y);
        
        emitter.update();
        emitter.display();
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

export default ParticleSystem;