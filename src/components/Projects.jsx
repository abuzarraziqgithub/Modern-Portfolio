import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Github } from './Icon';
import { GlassCard, CardIcon, SectionHeading, Tag } from './ui';
import { PROJECTS, LINKS } from '../data/portfolio';
import Reveal from './Reveal';

export default function Projects() {
  return (
    <section className="section-shell projects-section" id="projects">
      <Reveal>
        <SectionHeading icon="layers" tone="pink" eyebrow="Projects">
          Things I've <span className="text-pink">built</span> while{' '}
          <span className="gradient-text">learning</span> and shipping.
        </SectionHeading>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.title}
            className={`h-full ${i === 0 ? 'lg:col-span-2' : ''}`}
          >
            <GlassCard tone={`bruta-${p.tone}`} className="grid h-full content-start gap-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <CardIcon name={p.icon} tone={p.tone} />
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-[6px] font-mono text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-faint">
                  {p.badge}
                </span>
              </div>
              <h3 className="font-display text-[1.35rem] font-bold tracking-tight">{p.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-muted">{p.text}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2">
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-ink transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.1]"
                  >
                    <Github size={15} /> Source
                  </a>
                )}
                <a
                  href={LINKS.email}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-ink transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.1]"
                >
                  <ExternalLink size={15} /> Ask for demo <ArrowUpRight size={14} />
                </a>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
