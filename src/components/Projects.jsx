import { ExternalLink } from 'lucide-react';
import { Github } from './Icon';
import { GlassCard, CardIcon, SectionHeading, Tag } from './ui';
import { PROJECTS } from '../data/portfolio';
import Reveal from './Reveal';

export default function Projects() {
  return (
    <section className="section-shell projects-section" id="projects">
      <Reveal>
        <SectionHeading icon="layers" tone="pink" eyebrow="Projects">
          Things I've <span className="gradient-text">built</span> while learning and shipping.
        </SectionHeading>
      </Reveal>

      <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 80} className="h-full">
            <GlassCard tone={`bruta-${p.tone}`} className="grid h-full content-start gap-[14px]">
              <div className="flex items-center justify-between gap-3">
                <CardIcon name={p.icon} />
                <span className="rounded-full border-[1.5px] bg-white/[0.06] px-3 py-[6px] font-mono text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-ink">
                  {p.badge}
                </span>
              </div>
              <h3 className="font-display text-[1.35rem] font-bold tracking-tight">{p.title}</h3>
              <p className="text-[0.97rem] text-muted">{p.text}</p>
              <div className="flex flex-wrap gap-[9px]">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-[6px] flex flex-wrap gap-[10px]">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-[14px] border-2 border-white/[0.14] bg-white/[0.06] px-4 py-2.5 text-sm font-bold text-ink shadow-[4px_4px_0_0_rgba(255,255,255,0.14)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white/[0.11] hover:shadow-[7px_7px_0_0_rgba(255,255,255,0.2)] active:translate-x-0.5 active:translate-y-[3px]"
                >
                  <Github size={15} /> Repo
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-[14px] border-2 border-white/[0.14] bg-white/[0.06] px-4 py-2.5 text-sm font-bold text-ink shadow-[4px_4px_0_0_rgba(255,255,255,0.14)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white/[0.11] hover:shadow-[7px_7px_0_0_rgba(255,255,255,0.2)] active:translate-x-0.5 active:translate-y-[3px]"
                >
                  <ExternalLink size={15} /> Demo
                </a>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
