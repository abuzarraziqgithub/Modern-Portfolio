import Backdrop from './Backdrop';
import Fireflies from './Fireflies';
import { IMAGES } from '../config/images';
import { PROFILE } from '../data/profile';

export default function Hero() {
  return (
    <Backdrop
      id="hero"
      image={IMAGES.hero}
      gradient="to bottom"
      overlay="transparent"
      overlayEnd="rgba(7,10,18,0.95)"
      minHeight="min-h-[100dvh]"
      className="flex flex-col items-center justify-center text-center"
    >
      <Fireflies className="absolute inset-0 z-0 opacity-70" density={0.00007} />

      {/* Radial vignette for text legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 55%, rgba(7,10,18,0.72), transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 pt-16">
        <p className="mb-5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold-soft/80">
          {PROFILE.role}
        </p>

        <h1 className="font-display text-5xl font-medium leading-[1.05] text-ink glow sm:text-7xl md:text-8xl">
          {PROFILE.name}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {PROFILE.tagline}
        </p>

        <div
          className="cue mt-16 flex flex-col items-center gap-2 text-muted"
          aria-hidden="true"
        >
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-gold/60">
            Scroll
          </span>
          <span className="text-gold text-xl leading-none">✦</span>
        </div>
      </div>
    </Backdrop>
  );
}