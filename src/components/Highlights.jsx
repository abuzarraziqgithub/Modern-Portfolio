import { GlassCard, CardIcon } from './ui';
import { HIGHLIGHTS } from '../data/portfolio';
import Reveal from './Reveal';

export default function Highlights() {
  return (
    <section className="section-shell strip" aria-label="Highlights">
      {HIGHLIGHTS.map((h, i) => (
        <Reveal key={h.title} delay={i * 80} className="h-full">
          <GlassCard tone={`bruta-${h.tone}`} className="h-full">
            <CardIcon name={h.icon} />
            <h3 className="mt-1 font-display text-[1.25rem] font-bold tracking-tight">{h.title}</h3>
            <p className="mt-2 text-[0.97rem] text-muted">{h.text}</p>
          </GlassCard>
        </Reveal>
      ))}
    </section>
  );
}
