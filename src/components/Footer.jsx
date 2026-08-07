import Icon, { TechIcon } from './Icon';
import { LINKS } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="pb-[26px]">
      <div
        className="section-shell footer-inner flex flex-wrap items-center justify-center gap-[18px] rounded-[22px] border-2 border-white/[0.14] bg-white/[0.045] p-[22px_26px] text-center backdrop-blur-[14px] shadow-[6px_6px_0_0_rgba(167,139,250,0.2)] sm:justify-between"
      >
        <div className="flex items-center justify-center gap-3 font-display font-bold">
          <span className="grid h-[42px] w-[42px] place-items-center rounded-xl border-2 border-white/40 bg-[linear-gradient(135deg,#22d3ee,#a78bfa)] text-[1rem] text-[#05141c] shadow-[3px_3px_0_0_rgba(34,211,238,0.45)]">
            AR
          </span>
          <p className="text-[0.9rem] text-muted">Abuzar Raziq &mdash; Backend Engineer</p>
        </div>

        <div className="flex gap-2.5">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-xl border-2 border-white/[0.14] bg-white/[0.06] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:text-ink"
          >
            <TechIcon slug="github" color="f2f5ff" size={18} />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-xl border-2 border-white/[0.14] bg-white/[0.06] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:text-ink"
          >
            <img src="/images/linkedin-icon.png" alt="" width="18" height="18" loading="lazy" />
          </a>
          <a
            href={LINKS.email}
            aria-label="Email"
            className="grid h-10 w-10 place-items-center rounded-xl border-2 border-white/[0.14] bg-white/[0.06] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12] hover:text-ink"
          >
            <Icon name="mail" size={18} />
          </a>
        </div>

        <p className="text-[0.82rem] text-faint">
          Copyright &copy; 2026. All rights reserved by Abuzar Raziq.
        </p>
      </div>
    </footer>
  );
}
