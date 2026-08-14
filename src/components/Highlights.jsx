import { GlassCard, CardIcon } from './ui';
import { HIGHLIGHTS } from '../data/portfolio';
import Reveal from './Reveal';

export default function Highlights() {
  return (
    <section className="section-shell strip grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Highlights">
      {HIGHLIGHTS.map((h, i) => (
        <Reveal key={h.title} className={`h-full ${i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
          <GlassCard tone={`bruta-${h.tone}`} className="grid h-full content-start p-6">
            <CardIcon name={h.icon} tone={h.tone} className="mb-4" />
            <h3 className="mt-1 font-display text-[1.25rem] font-bold tracking-tight">{h.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{h.text}</p>
          </GlassCard>
        </Reveal>
      ))}
    </section>
  );
}
