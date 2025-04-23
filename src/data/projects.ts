import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'particle-system',
    title: 'Particle System',
    description: 'An interactive particle system with dynamic motion and color effects',
    features: [
      'Dynamic particle generation and lifecycle management',
      'Physics-based motion with acceleration and velocity',
      'Color transitions based on particle lifetime and position',
      'Efficient particle system with pooling for better performance'
    ],
    codeSnippet: `class Particle {
  constructor(position) {
    this.pos = position.copy();
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0.05);
    this.lifespan = 255;
    this.color = color(random(180, 240), 80, 80, this.lifespan);
    this.size = random(4, 8);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 2;
    this.color.setAlpha(this.lifespan);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}`,
    category: 'animation'
  },
  {
    id: 'circle-wave',
    title: 'Circular Wave Animation',
    description: 'Beautiful oscillating circles with dynamic wave patterns',
    features: [
      'Procedural wave generation using sine functions',
      'Dynamic color mapping based on wave phase',
      'Layered animations with varying frequencies',
      'Smooth transitions and fluid motion'
    ],
    codeSnippet: `function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  waves = [];
  
  for (let i = 0; i < 5; i++) {
    waves[i] = random(0, TWO_PI);
  }
}

function draw() {
  background(0, 0, 10);
  translate(width/2, height/2);
  
  const maxRadius = min(width, height) * 0.4;
  
  for (let w = 0; w < waves.length; w++) {
    let wave = waves[w];
    waves[w] = (wave + 0.02) % TWO_PI;
    
    const hue = (w * 40 + frameCount * 0.2) % 360;
    stroke(hue, 80, 70, 0.5);
    noFill();
    strokeWeight(2);
    
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      const noiseVal = noise(a * 0.5, wave * 0.5);
      const waveR = sin(a * 3 + wave) * 0.2;
      const r = maxRadius * (0.6 + noiseVal * 0.2 + waveR) * ((w + 1) / waves.length);
      const x = cos(a) * r;
      const y = sin(a) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}`,
    category: 'animation'
  },
  {
    id: 'interactive-mesh',
    title: 'Interactive 3D Mesh',
    description: 'A responsive 3D mesh that reacts to mouse movement and creates dynamic patterns',
    features: [
      'Interactive response to mouse position and movement',
      'Procedural 3D-like effect using 2D rendering',
      'Dynamic color mapping based on height values',
      'Animated wave patterns that combine for complex visualization'
    ],
    codeSnippet: `let cols = 20;
let rows = 20;
let points = [];
let angle = 0;

function setup() {
  createCanvas(400, 400);
  strokeWeight(1.5);
  
  // Initialize grid
  for (let x = 0; x < cols; x++) {
    points[x] = [];
    for (let y = 0; y < rows; y++) {
      points[x][y] = createVector(
        map(x, 0, cols-1, 0, width),
        map(y, 0, rows-1, 0, height),
        0
      );
    }
  }
}

function draw() {
  background(10, 15, 30);
  angle += 0.03;
  
  for (let x = 0; x < cols-1; x++) {
    for (let y = 0; y < rows-1; y++) {
      // Update z coordinate
      const noiseVal = noise(x * 0.1, y * 0.1, angle * 0.1);
      const waveVal = 20 * sin(x * 0.3 + angle) * cos(y * 0.3 + angle);
      
      // Add mouse influence
      const d = dist(points[x][y].x, points[x][y].y, mouseX, mouseY);
      const maxDist = 100;
      let zOffset = 0;
      
      if (d < maxDist && mouseX > 0) {
        zOffset = map(d, 0, maxDist, 30, 0) * sin(angle * 2);
      }
      
      points[x][y].z = noiseVal * 30 + waveVal + zOffset;
      
      // Draw connections
      const a = points[x][y];
      const b = points[x+1][y];
      const c = points[x][y+1];
      
      const colorVal = map(a.z, -30, 30, 0, 1);
      const gradient = lerpColor(
        color(50, 100, 200, 150),
        color(100, 200, 255, 150),
        colorVal
      );
      
      stroke(gradient);
      line(a.x, a.y, b.x, b.y);
      line(a.x, a.y, c.x, c.y);
    }
  }
}`,
    category: 'interaction'
  },
  {
    id: 'particle-background',
    title: 'Flowing Particle Network',
    description: 'A beautiful flowing network of particles that connect to create an organic background',
    features: [
      'Dynamic flow fields for natural movement',
      'Connection lines between nearby particles',
      'Color and opacity based on distance',
      'Optimized performance for background usage'
    ],
    codeSnippet: `class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-0.2, 0.2), random(-0.2, 0.2));
    this.acc = createVector(0, 0);
    this.color = color(random(100, 200), random(100, 200), 255, random(100, 200));
    this.maxSpeed = random(0.5, 1.5);
    this.size = random(1, 3);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    // Wrap around edges
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  applyForce(force) {
    this.acc.add(force);
  }
}

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  clear();
  
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    
    // Apply flow field
    const flowForce = createVector(
      noise(particle.pos.x * 0.005, particle.pos.y * 0.005, frameCount * 0.002) * 0.1 - 0.05,
      noise(particle.pos.x * 0.005, particle.pos.y * 0.005, frameCount * 0.002 + 1000) * 0.1 - 0.05
    );
    
    particle.applyForce(flowForce);
    particle.update();
    particle.display();
    
    // Connect particles
    for (let j = i + 1; j < particles.length; j++) {
      const other = particles[j];
      const d = dist(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
      const maxDist = 100;
      
      if (d < maxDist) {
        const alpha = map(d, 0, maxDist, 100, 0);
        stroke(100, 150, 255, alpha);
        line(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
      }
    }
  }
}`,
    category: 'visualization'
  }
];