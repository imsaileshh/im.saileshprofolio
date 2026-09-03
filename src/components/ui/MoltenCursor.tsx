'use client';

import { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.life = 1.0;
    this.color = color;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Upward drift for ember physics
    this.speedY -= 0.08;
    // Horizontal sway
    this.speedX += (Math.random() - 0.5) * 0.1;
    this.life -= 0.015;
    this.size *= 0.96;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.size < 0.1) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export function MoltenCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Only enable on desktop
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    if (!mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouseX = -100;
    let mouseY = -100;

    const getThemeAccentColor = () => {
      if (typeof window === 'undefined') return '#2DD4BF';
      const rootStyle = getComputedStyle(document.documentElement);
      const accent = rootStyle.getPropertyValue('--accent').trim();
      return accent || '#2DD4BF';
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const accentColor = getThemeAccentColor();
      // Burst a few particles on mouse move
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouseX, mouseY, accentColor));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      
      particles = particles.filter(p => p.life > 0 && p.size > 0.1);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block"
      aria-hidden="true"
    />
  );
}
