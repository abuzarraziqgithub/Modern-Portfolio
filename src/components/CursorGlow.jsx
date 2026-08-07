import { useEffect, useRef, useState } from 'react';
import { useIsCoarsePointer, useReducedMotion } from '../hooks/useMediaQuery';

export default function CursorGlow() {
  const ref = useRef(null);
  const coarse = useIsCoarsePointer();
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (coarse || reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = -1000;
    let y = -1000;

    const move = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = 0;
    };

    const onPointerMove = (e) => {
      x = e.clientX - 260;
      y = e.clientY - 260;
      setOn(true);
      if (!raf) raf = requestAnimationFrame(move);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [coarse, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[-1] h-[520px] w-[520px] rounded-full transition-opacity duration-[600ms] will-change-transform"
      style={{
        opacity: coarse || reduced ? 0 : on ? 1 : 0,
        background:
          'radial-gradient(circle, rgba(34,211,238,0.09), rgba(167,139,250,0.05) 40%, transparent 70%)',
      }}
    />
  );
}
