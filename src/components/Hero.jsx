import { ArrowUpRight } from 'lucide-react';
import { Github, Linkedin, XIcon, MailIcon } from './Icon';
import { PROFILE } from '../data/profile';
import { SOCIALS } from '../data/social';

const SOCIAL_ROW = [
  { key: 'github', Icon: Github },
  { key: 'linkedin', Icon: Linkedin },
  { key: 'x', Icon: XIcon },
];

export default function Hero() {
  return (
    <section id="home" className="shell grid gap-14 pt-16 sm:pt-20">
      <div className="grid justify-items-start gap-6">
        <p className="inline-flex items-center gap-2 font-mono text-xs text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {PROFILE.status}
          <span className="ml-1 inline-block h-3 w-[7px] bg-accent align-middle animate-[blink_1.1s_steps(2,start)_infinite]" />
        </p>

        <h1 className="font-mono text-[clamp(2.6rem,9vw,5.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
          Abuzar
          <br />
          <span className="text-accent">Raziq</span>
        </h1>

        <p className="font-mono text-base text-muted sm:text-lg">
          <span className="text-accent">whoami</span>
          <span className="text-faint"> =&gt; </span>
          {PROFILE.title.toLowerCase()}
        </p>

        <p className="max-w-[52ch] text-base text-muted sm:text-lg">{PROFILE.tagline}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2.5">
          {SOCIAL_ROW.map(({ key, Icon: Brand }) => (
            <a
              key={key}
              href={SOCIALS[key].url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SOCIALS[key].label} (${SOCIALS[key].handle})`}
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Brand size={15} />
            </a>
          ))}
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label={`Email ${PROFILE.email}`}
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <MailIcon size={15} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-accent/60 px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent/10"
          >
            resume.pdf <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}