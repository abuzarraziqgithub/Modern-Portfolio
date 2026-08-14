import { GlassCard, CardIcon, SectionHeading } from './ui';
import { ABOUT } from '../data/portfolio';
import Reveal from './Reveal';

export default function About() {
  return (
    <section className="section-shell about-section" id="about">
      <Reveal>
        <SectionHeading icon="code" tone="cyan" eyebrow="About me">
          An engineer who loves <span className="text-cyan">building</span>,{' '}
          <span className="text-violet">securing</span> and{' '}
          <span className="gradient-text">learning</span>.
        </SectionHeading>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {ABOUT.map((a, i) => (
          <Reveal
            key={a.title}
            className={`h-full ${i === 2 ? 'sm:col-span-2 lg:col-span-6' : 'lg:col-span-3'}`}
          >
            <GlassCard tone={`bruta-${a.tone}`} className="grid h-full p-6">
              <div className={`flex items-start gap-4 ${i === 2 ? 'lg:flex-row lg:items-center' : ''}`}>
                <CardIcon name={a.icon} tone={a.tone} className="flex-none" />
                <div className="grid gap-2">
                  <h3 className="font-display text-[1.25rem] font-bold tracking-tight">
                    {a.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-muted">{a.text}</p>
                  <p className="border-t border-dashed border-white/12 pt-3 font-mono text-[0.8rem] text-ink">
                    {a.foot}
                  </p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
