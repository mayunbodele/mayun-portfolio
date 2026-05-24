import { useEffect, useRef, useState } from "react";

interface AnimatedBackgroundProps {
  isDark: boolean;
}

export default function AnimatedBackground({ isDark }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? 30 : 85;
    const connectionDistance = isMobile ? 80 : 120;

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      radius: number = 0;
      alpha: number = 0;

      constructor(w: number, h: number) {
        this.reset(w, h, true);
      }

      reset(w: number, h: number, initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : -10;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() * 0.4) + 0.15; // drift downwards slowly
        this.radius = Math.random() * 1.5 + 0.8;
        this.alpha = Math.random() * 0.4 + 0.2;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap left/right
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;

        // Reset if goes off bottom
        if (this.y > h) {
          this.reset(w, h, false);
        }
      }

      draw(c: CanvasRenderingContext2D, dark: boolean) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = dark 
          ? `rgba(52, 211, 153, ${this.alpha})` // emerald-400
          : `rgba(16, 185, 129, ${this.alpha * 0.7})`; // emerald-500 with calibrated opacity
        c.fill();
      }
    }

    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Re-initialize particles to avoid dead zones
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
          particles.push(new Particle(canvas.width, canvas.height));
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw faint connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(canvas.width, canvas.height);
        p1.draw(ctx, isDark);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(110, 231, 183, ${alpha})` // emerald-300
              : `rgba(16, 185, 129, ${alpha * 0.9})`; // emerald-500
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion, isDark]);

  return (
    <div 
      className="absolute inset-0 -z-50 overflow-hidden pointer-events-none transition-colors duration-1000"
      style={{
        background: isDark
          ? "radial-gradient(circle at 10% 20%, rgba(6, 26, 27, 1) 0%, rgba(3, 7, 10, 1) 90%)"
          : "radial-gradient(circle at 10% 20%, rgba(244, 252, 249, 1) 0%, rgba(230, 245, 241, 1) 90%)"
      }}
    >
      {/* Soft gradient mesh glows */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(0, 0, 0, 0) 70%)"
            : "radial-gradient(circle, rgba(110, 231, 183, 0.4) 0%, rgba(0, 0, 0, 0) 70%)"
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, rgba(0, 0, 0, 0) 70%)"
            : "radial-gradient(circle, rgba(165, 243, 252, 0.3) 0%, rgba(0, 0, 0, 0) 70%)"
        }}
      />

      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block opacity-75"
        />
      )}
    </div>
  );
}
