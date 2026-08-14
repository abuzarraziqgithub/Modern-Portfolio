import Icon, { Github, Linkedin } from './Icon';
import { LINKS } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="pb-[26px]">
      <div className="section-shell footer-inner flex flex-col items-center justify-center gap-[16px] rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-[22px_24px] text-center sm:flex-row sm:justify-between">
        <div className="flex items-center justify-center gap-3 font-display font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet text-[0.9rem] text-[#04141d]">
            AR
          </span>
          <p className="text-[0.9rem] text-muted">Abuzar Raziq &mdash; Backend Engineer</p>
        </div>

        <div className="flex gap-2">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-muted transition-colors duration-200 hover:border-white/25 hover:text-ink"
          >
            <Github size={16} />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-muted transition-colors duration-200 hover:border-white/25 hover:text-ink"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={LINKS.email}
            aria-label="Email"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-muted transition-colors duration-200 hover:border-white/25 hover:text-ink"
          >
            <Icon name="mail" size={16} />
          </a>
        </div>

        <p className="text-[0.8rem] text-faint">
          Copyright &copy; 2026. All rights reserved by Abuzar Raziq.
        </p>
      </div>
    </footer>
  );
}
