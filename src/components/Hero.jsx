import { ArrowDown } from 'lucide-react';
import ProfileCard from './ProfileCard';
import { Button } from './ui';
import Icon, { Github, Linkedin } from './Icon';
import { LINKS, HERO_STATS } from '../data/portfolio';
import Reveal from './Reveal';

const STAT_TONES = {
  Backend: 'text-cyan',
  Security: 'text-pink',
  Setup: 'text-violet',
};

function HeroStats() {
  return (
    <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {HERO_STATS.map((s) => (
        <div
          key={s.title}
          className="bento grid gap-1 p-[16px_18px] transition-colors duration-200 hover:border-white/[0.18]"
        >
          <Icon name={s.icon} size={16} className={STAT_TONES[s.title]} />
          <strong className="font-display text-[0.95rem]">{s.title}</strong>
          <span className="text-[0.78rem] leading-snug text-muted">{s.sub}</span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="section-shell grid grid-cols-1 items-center gap-10 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-[34px]">
      <Reveal className="grid gap-[18px]">
        <p className="inline-flex w-fit items-center gap-[9px] rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[0.82rem] font-bold uppercase tracking-[0.04em] text-cyan">
          <span className="h-[9px] w-[9px] rounded-full bg-lime" />
          Open to work &mdash; Backend Engineer
        </p>

        <h1 className="font-display text-[clamp(2.4rem,6.5vw,4.8rem)] font-bold leading-[1.04] tracking-[-0.03em]">
          Hi, I&rsquo;m <span className="gradient-text">Abuzar Raziq</span>
        </h1>

        <p className="max-w-[46ch] text-[clamp(1rem,1.7vw,1.15rem)] text-muted">
          I engineer <span className="font-bold text-cyan">secure, scalable backends</span> with{' '}
          <span className="font-bold text-lime">Node.js</span>,{' '}
          <span className="font-bold text-blue">TypeScript</span> &amp;{' '}
          <span className="font-bold text-lime">MongoDB</span> &mdash; and I obsess over the
          details: <span className="font-bold text-pink">authentication</span>,{' '}
          <span className="font-bold text-violet">hashing</span>,{' '}
          <span className="font-bold text-yellow">validation</span> and{' '}
          <span className="font-bold text-cyan">clean schemas</span>.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-[12px]">
          <Button href="#projects" size="lg">
            View projects <ArrowDown size={17} />
          </Button>
          <Button href="#about" variant="ghost" size="lg">
            About me
          </Button>
          <div className="flex items-center gap-2">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-muted transition-colors duration-200 hover:border-white/25 hover:text-ink"
            >
              <Github size={18} />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-muted transition-colors duration-200 hover:border-white/25 hover:text-ink"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={LINKS.email}
              aria-label="Email"
              title="Email"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-muted transition-colors duration-200 hover:border-white/25 hover:text-ink"
            >
              <Icon name="mail" size={18} />
            </a>
          </div>
        </div>

        <HeroStats />
      </Reveal>

      <Reveal className="grid place-items-center lg:justify-end">
        <ProfileCard />
      </Reveal>
    </section>
  );
}
