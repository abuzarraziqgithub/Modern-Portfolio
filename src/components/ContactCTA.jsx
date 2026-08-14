import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from './ui';
import Icon from './Icon';
import { LINKS } from '../data/portfolio';
import Reveal from './Reveal';

export default function ContactCTA() {
  return (
    <Reveal className="w-full">
      <section className="section-shell contact-cta bento flex flex-col items-start justify-between gap-6 p-[26px_22px] sm:p-[34px_30px] lg:flex-row lg:items-center">
        <div className="grid gap-3">
          <p className="font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-cyan">
            <Icon name="send" size={14} className="mr-2 inline-block" /> Let's build
          </p>
          <h2 className="max-w-[24ch] font-display text-[clamp(1.7rem,4.4vw,2.8rem)] font-bold leading-[1.08] tracking-tight">
            Have a <span className="text-cyan">backend idea</span>, a{' '}
            <span className="text-violet">role</span>, or just want to{' '}
            <span className="gradient-text">talk tech</span>?
          </h2>
          <p className="max-w-[46ch] text-muted">
            Let's talk about APIs, architecture, AI &mdash; or anything that ships good software.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-none sm:flex-row">
          <Button href="/contact" size="lg" className="w-full sm:w-auto">
            Get in touch <ArrowUpRight size={18} />
          </Button>
          <a
            href={LINKS.email}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3 text-[1rem] font-bold text-ink transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.1] sm:w-auto"
          >
            <Mail size={18} /> iabuzarraziq@gmail.com
          </a>
        </div>
      </section>
    </Reveal>
  );
}
