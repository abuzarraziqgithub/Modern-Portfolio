import { useEffect, useRef } from 'react';

/**
 * Canvas overlay of slow-drifting, softly glowing specks — fireflies /
 * stardust. Pauses when offscreen and fully disabled for reduced motion.
 */
export default function Fireflies({ className = '', density = 0.00006, palette = ['#f0d0a0', '#cfc3ff', '#a9e6dd'] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    let w = 0;
    let h = 0;
    let particles = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const rand = (a, b) => a + Math.random() * (b - a);

    const spawn = (initial = false) => {
      const count = Math.max(12, Math.round(w * h * density));
      particles = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: initial ? rand(0, h) : -10 - rand(0, h * 0.3),
        r: rand(0.4, 1.6),
        color: palette[(Math.random() * palette.length) | 0],
        vy: rand(0.05, 0.32),
        vx: rand(-0.08, 0.08),
        tw: rand(0.5, Math.PI * 2),
        ts: rand(0.004, 0.016),
        o: rand(0.15, 0.6),
      }));
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn(true);
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.tw) * 0.04;
        p.tw += p.ts;
        if (p.y > h + 8 || p.x < -10 || p.x > w + 10) {
          p.y = -10 - rand(0, 40);
          p.x = rand(0, w);
        }
        const alpha = p.o * (0.55 + 0.45 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    };

    const inView = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
      }
    });
    inView.observe(canvas);

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      inView.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [density, palette]);

  return <canvas ref={canvasRef} className={`fireflies ${className}`.trim()} aria-hidden="true" />;
}