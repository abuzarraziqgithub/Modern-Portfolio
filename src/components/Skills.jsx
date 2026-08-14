import { GlassCard, SectionHeading, SkillTag } from './ui';
import { SKILL_GROUPS } from '../data/portfolio';
import { TechIcon } from './Icon';
import Icon from './Icon';
import Reveal from './Reveal';

function SkillCard({ group }) {
  const isTechIcon = group.icon === 'node' || group.icon === 'react';
  const headIcon = isTechIcon ? (
    <TechIcon slug={group.icon} color={group.icon === 'react' ? '61dafb' : '5fa04e'} size={22} />
  ) : (
    <Icon name={group.icon} size={22} />
  );

  const toneText = {
    cyan: 'text-cyan',
    pink: 'text-pink',
    violet: 'text-violet',
    lime: 'text-lime',
    yellow: 'text-yellow',
    orange: 'text-orange',
  };

  return (
    <Reveal className="h-full">
      <GlassCard tone={`bruta-${group.tone}`} className="grid h-full content-start gap-4 p-6">
        <header className="flex items-center gap-3">
          <div
            className={`grid h-11 w-11 flex-none place-items-center rounded-xl border border-white/10 bg-white/[0.05] ${toneText[group.tone] || ''}`}
          >
            {headIcon}
          </div>
          <h3 className="font-display text-[1.15rem] font-bold tracking-tight">{group.title}</h3>
        </header>
        <div className="flex flex-wrap gap-2">
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
          A stack built for <span className="text-violet">backend depth</span>, with everything
          needed to <span className="gradient-text">ship</span>.
        </SectionHeading>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <SkillCard key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}
