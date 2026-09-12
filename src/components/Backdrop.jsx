import { useRef } from 'react';
import useParallax from './useParallax';

/**
 * Full-bleed image background for a section. Wraps children with a dark
 * gradient overlay for text legibility. Responsive object-position is
 * handled per-section via an `<style>` scoped to the section's `id`.
 */
export default function Backdrop({
  id,
  image,
  children,
  className = '',
  gradient = 'to bottom',
  overlay = 'rgba(7,10,18,0.56)',
  overlayEnd = 'rgba(7,10,18,0.92)',
  parallax = true,
  minHeight = 'min-h-[88vh]',
}) {
  const imgRef = useRef(null);
  useParallax(imgRef, { strength: 0.07 });

  const pos = image?.objectPosition?.default || '50% 50%';
  const posMobile = image?.objectPosition?.mobile || pos;

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${minHeight} ${className}`.trim()}
    >
      {/* Parallax image wrapper — extra inset so translating doesn't show gaps */}
      <div
        ref={imgRef}
        className="absolute inset-[-80px] sm:inset-[-60px]"
        style={{ willChange: parallax ? 'transform' : undefined }}
      >
        <img
          src={image.src}
          alt={image.alt}
          fetchPriority={image.fetchpriority}
          className="h-full w-full object-cover"
          style={{ objectPosition: pos }}
        />
      </div>

      {/* Mobile object-position override */}
      <style>{`
        @media (max-width: 639px) {
          #${id} > div:first-child > img {
            object-position: ${posMobile} !important;
          }
        }
      `}</style>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(${gradient}, ${overlay}, ${overlayEnd})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}