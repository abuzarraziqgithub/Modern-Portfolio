import { GlassCard, SectionHeading, SkillTag } from './ui';
import { SKILL_GROUPS } from '../data/portfolio';
import { TechIcon } from './Icon';
import Reveal from './Reveal';

function SkillCard({ group, index }) {
  const headIcon =
    group.icon === 'node' ? (
      <TechIcon slug="nodedotjs" color="5fa04e" size={24} />
    ) : group.icon === 'react' ? (
      <TechIcon slug="react" color="61dafb" size={24} />
    ) : null;

  return (
    <Reveal delay={(index % 3) * 80} className="h-full">
      <GlassCard tone={`bruta-${group.tone}`} className="grid h-full content-start gap-4">
        <header className="flex items-center gap-[14px]">
          <div className="grid h-[50px] w-[50px] place-items-center rounded-2xl border-2 shadow-[3px_3px_0_0_rgba(0,0,0,0.4)]" style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.14)' }}>
            {headIcon}
          </div>
          <h3 className="font-display text-[1.25rem] font-bold tracking-tight">{group.title}</h3>
        </header>
        <div className="flex flex-wrap gap-[9px]">
          {group.tags.map((tag) => (
            <SkillTag key={tag.label} tag={tag} />
          ))}
        </div>
      </GlassCard>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section className="section-shell skills-section" id="skills">
      <Reveal>
        <SectionHeading icon="cpu" tone="violet" eyebrow="Technical skills">
          A stack built for <span className="gradient-text">backend depth</span>, with everything
          needed to ship.
        </SectionHeading>
      </Reveal>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, i) => (
          <SkillCard key={group.title} group={group} index={i} />
        ))}
      </div>
    </section>
  );
}
