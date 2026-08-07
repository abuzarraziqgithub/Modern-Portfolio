import { useEffect, useRef, useState } from 'react';
import { useIsCoarsePointer, useReducedMotion } from './useMediaQuery';

/**
 * Smooth, buttery 3D tilt driven by a rAF lerp loop.
 * - Fine pointers (mouse): tilt follows the cursor.
 * - Coarse pointers (touch): device-orientation gyroscope tilt (iOS-safe
 *   permission request exposed via `requestOrientation`), with a gentle
 *   idle sway as fallback so the card never feels dead.
 * - Never animates when prefers-reduced-motion is set.
 */
export default function useTilt3D({ max = 12, perspective = 900, scale = 1.04 } = {}) {
  const reduced = useReducedMotion();
  const coarse = useIsCoarsePointer();
  const targetRef = useRef(null);
  const glareRef = useRef(null);
  const [orientationOn, setOrientationOn] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el || reduced) return;

    const rect = () => el.getBoundingClientRect();
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let interacting = false;
    let idleT = Math.random() * 100;

    const setGlare = (x, y) => {
      const glare = glareRef.current;
      if (!glare) return;
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.32), rgba(167,139,250,0.12) 45%, transparent 70%)`;
    };

    const tick = () => {
      if (!interacting && coarse) {
        idleT += 0.005;
        targetX = Math.sin(idleT) * 2.5;
        targetY = Math.cos(idleT * 1.3) * 3.5;
      }

      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;

      if (Math.abs(targetX - curX) < 0.01) curX = targetX;
      if (Math.abs(targetY - curY) < 0.01) curY = targetY;

      el.style.transform = `perspective(${perspective}px) rotateX(${curX.toFixed(2)}deg) rotateY(${curY.toFixed(2)}deg) scale(${interacting ? scale : 1})`;

      if (glareRef.current) {
        glareRef.current.style.opacity = interacting ? '1' : '0';
      }

      raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (e) => {
      const r = rect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      targetX = -py * max;
      targetY = px * max;
      interacting = true;
      setGlare(((px + 0.5) * 100), ((py + 0.5) * 100));
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      interacting = false;
    };

    const onOrientation = (e) => {
      if (e.gamma == null && e.beta == null) return;
      const gamma = e.gamma || 0;
      const beta = e.beta || 0;
      const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
      targetX = clamp(((beta - 45) / 45) * -1, -1, 1) * max * 0.6;
      targetY = clamp(gamma / 45, -1, 1) * max * 0.6;
      interacting = true;
    };

    if (coarse) {
      window.addEventListener('deviceorientation', onOrientation, { passive: true });
    } else {
      el.addEventListener('pointermove', onPointerMove, { passive: true });
      el.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      if (coarse) {
        window.removeEventListener('deviceorientation', onOrientation);
      } else {
        el.removeEventListener('pointermove', onPointerMove);
        el.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, [reduced, coarse, max, perspective, scale]);

  const requestOrientation = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
      try {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res === 'granted') setOrientationOn(true);
      } catch {
        setOrientationOn(true);
      }
    } else {
      setOrientationOn(true);
    }
  };

  return { targetRef, glareRef, requestOrientation, orientationOn, enabled: !reduced };
}
