import { ArrowDown } from 'lucide-react';
import ProfileCard from './ProfileCard';
import { Button } from './ui';
import Icon, { TechIcon } from './Icon';
import { LINKS, HERO_STATS } from '../data/portfolio';
import Reveal from './Reveal';

function HeroStats() {
  return (
    <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {HERO_STATS.map((s) => (
        <div
          key={s.title}
          className="grid gap-0.5 rounded-[14px] border-2 border-white/[0.14] bg-white/[0.05] p-[14px_16px] shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-x-0.5 hover:-translate-y-[3px] hover:border-white/25 hover:shadow-[6px_7px_0_0_rgba(0,0,0,0.4)]"
        >
          <Icon name={s.icon} size={15} className="mb-1 text-cyan" />
          <strong className="font-display text-[0.95rem]">{s.title}</strong>
          <span className="text-[0.78rem] leading-snug text-muted">{s.sub}</span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="section-shell hero" id="home">
      <Reveal className="hero-copy" delay={0}>
        <p className="inline-flex w-fit items-center gap-[9px] rounded-full border-2 border-white/[0.14] bg-white/[0.06] px-4 py-2 text-[0.82rem] font-bold uppercase tracking-[0.04em] text-cyan shadow-[3px_3px_0_0_rgba(34,211,238,0.3)] backdrop-blur-[10px]">
          <span
            className="h-[9px] w-[9px] rounded-full bg-lime"
            style={{ animation: 'pulse-dot 2s cubic-bezier(0.22,1,0.36,1) infinite' }}
          />
          Open to work &mdash; Backend Engineer
        </p>

        <h1 className="font-display text-[clamp(2.8rem,7vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.04em]">
          Hi, I'm <span className="gradient-text">Abuzar Raziq</span>
        </h1>

        <p className="max-w-[42ch] text-[clamp(1.02rem,1.8vw,1.18rem)] text-muted">
          I engineer <span className="font-bold text-cyan">secure, scalable backends</span> with
          Node.js, TypeScript &amp; MongoDB &mdash; and I care deeply about the details:{' '}
          <span className="font-bold text-pink">authentication</span>,{' '}
          <span className="font-bold text-violet">hashing</span>,{' '}
          <span className="font-bold text-lime">validation</span> and clean schemas.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-[14px]">
          <Button href="#projects" size="lg">
            View projects <ArrowDown size={17} />
          </Button>
          <Button href="#about" variant="ghost" size="lg">
            About me
          </Button>
          <div className="flex items-center gap-2.5 rounded-[14px] border-2 border-white/[0.14] bg-white/[0.06] p-[7px_10px] shadow-[3px_3px_0_0_rgba(0,0,0,0.35)]">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="grid h-9 w-9 place-items-center rounded-[10px] text-muted transition-all duration-300 hover:bg-white/[0.1] hover:text-ink"
            >
              <TechIcon slug="github" color="f2f5ff" size={18} />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-[10px] text-muted transition-all duration-300 hover:bg-white/[0.1] hover:text-ink"
            >
              <img src="/images/linkedin-icon.png" alt="" width="18" height="18" loading="lazy" />
            </a>
            <a
              href={LINKS.email}
              aria-label="Email"
              title="Email"
              className="grid h-9 w-9 place-items-center rounded-[10px] text-muted transition-all duration-300 hover:bg-white/[0.1] hover:text-ink"
            >
              <Icon name="mail" size={18} />
            </a>
          </div>
        </div>

        <HeroStats />
      </Reveal>

      <Reveal className="hero-visual" delay={120}>
        <ProfileCard />
      </Reveal>
    </section>
  );
}
