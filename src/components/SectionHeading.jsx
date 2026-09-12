import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, intro, accent = 'var(--color-gold)' }) {
  return (
    <div style={{ '--section-accent': accent }} className="mb-12">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl">
          <span className="glow">{title}</span>
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={2}>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}