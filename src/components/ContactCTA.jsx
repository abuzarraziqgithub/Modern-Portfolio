import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from './ui';
import Icon from './Icon';
import { LINKS } from '../data/portfolio';
import Reveal from './Reveal';

export default function ContactCTA() {
  return (
    <Reveal className="w-full">
      <section
        className="section-shell contact-cta flex flex-col items-start justify-between gap-[26px] rounded-[22px] border-2 border-white/[0.14] p-[28px_24px] backdrop-blur-[16px] sm:flex-row sm:items-center sm:p-[38px_34px]"
        style={{
          background:
            'radial-gradient(600px 200px at 15% 0%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(600px 200px at 90% 100%, rgba(167,139,250,0.2), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
          boxShadow: '8px 8px 0 0 rgba(34,211,238,0.22)',
        }}
      >
        <div className="grid gap-3">
          <p className="font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-cyan">
            <Icon name="send" size={14} className="mr-2 inline-block" /> Let's build
          </p>
          <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.3rem)] font-bold leading-[1.05] tracking-tight">
            Have a backend idea, a role, or just want to talk tech?
          </h2>
          <p className="max-w-[46ch] text-muted">
            Let's talk about APIs, architecture, AI &mdash; or anything that ships good software.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-none">
          <Button href={LINKS.email} size="lg" className="w-full sm:w-auto">
            Get in touch <ArrowUpRight size={18} />
          </Button>
          <a
            href={LINKS.email}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] border-2 border-white/[0.14] bg-white/[0.06] px-[26px] py-[15px] text-[1.02rem] font-bold text-ink shadow-[4px_4px_0_0_rgba(255,255,255,0.14)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white/[0.11] hover:shadow-[7px_7px_0_0_rgba(255,255,255,0.2)] sm:w-auto"
          >
            <Mail size={18} /> iabuzarraziq@gmail.com
          </a>
        </div>
      </section>
    </Reveal>
  );
}
