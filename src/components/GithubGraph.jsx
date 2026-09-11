import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { SOCIALS } from '../data/social';
import Reveal from './Reveal';
import { SectionHeading } from './ui';

const CHART_URL = 'https://ghchart.rshah.org/';

export default function GithubGraph() {
  const href = SOCIALS.github.url;
  return (
    <section id="github" className="shell py-20 sm:py-24">
      <Reveal>
        <SectionHeading slug="github" title="activity" />
      </Reveal>

      <Reveal delay={40}>
        <div className="panel p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs text-faint">
              <span className="text-accent">$</span> git log --author={PROFILE.githubUsername} --oneline
            </p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              github <ArrowUpRight size={11} />
            </a>
          </div>
          <img
            src={`${CHART_URL}${PROFILE.githubUsername}`}
            alt={`GitHub contribution graph of ${PROFILE.githubUsername}`}
            width="720"
            height="120"
            loading="lazy"
            decoding="async"
            className="w-full select-none rounded-md bg-bg-elev"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}