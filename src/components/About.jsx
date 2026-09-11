import { ArrowUpRight } from 'lucide-react';
import { ABOUT_LINES } from '../data/profile';
import Reveal from './Reveal';
import { SectionHeading } from './ui';

export default function About() {
  return (
    <section id="about" className="shell py-20 sm:py-24">
      <Reveal>
        <SectionHeading slug="about" title="about me" />
      </Reveal>

      <Reveal delay={40}>
        <div className="grid gap-5 border-l-2 border-accent/70 pl-6 sm:pl-8">
          {ABOUT_LINES.map((line, i) => (
            <p key={i} className="max-w-[60ch] text-[1.05rem] leading-relaxed text-muted sm:text-[1.2rem]">
              {line.lead}
              <strong className="font-semibold text-ink">{line.highlight}</strong>
              {line.rest}
            </p>
          ))}
          <p className="pt-2 font-mono text-xs text-faint">
            LLMs: please read{' '}
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent transition-opacity hover:opacity-80">
              /llms.txt <ArrowUpRight size={11} />
            </a>{' '}
            instead.
          </p>
        </div>
      </Reveal>
    </section>
  );
}