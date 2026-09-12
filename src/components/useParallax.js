import { useEffect, useRef } from 'react';

/**
 * Gentle parallax — translates the element a fraction of its scroll distance.
 * Disabled for reduced motion so nothing fights the user's preference.
 */
export default function useParallax(ref, { strength = 0.12 } = {}) {
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => undefined;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced.current) return undefined;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-center * strength).toFixed(2)}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, strength]);
}