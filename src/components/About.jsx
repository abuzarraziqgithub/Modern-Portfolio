import { GlassCard, CardIcon, SectionHeading } from './ui';
import { ABOUT } from '../data/portfolio';
import Reveal from './Reveal';

export default function About() {
  return (
    <section className="section-shell about-section" id="about">
      <Reveal>
        <SectionHeading icon="code" tone="cyan" eyebrow="About me">
          An engineer who loves <span className="gradient-text">building</span> and{' '}
          <span className="gradient-text">learning</span>.
        </SectionHeading>
      </Reveal>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {ABOUT.map((a, i) => (
          <Reveal key={a.title} delay={i * 80} className="h-full">
            <GlassCard tone={`bruta-${a.tone}`} className="h-full">
              <CardIcon name={a.icon} />
              <h3 className="font-display text-[1.25rem] font-bold tracking-tight">{a.title}</h3>
              <p className="mt-2 text-[0.97rem] text-muted">{a.text}</p>
              <p
                className="mt-[14px] border-t-2 border-dashed border-white/[0.14] pt-3 font-mono text-[0.8rem] text-ink"
              >
                {a.foot}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
