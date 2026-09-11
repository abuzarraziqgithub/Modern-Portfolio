import { EXPERIENCE } from '../data/experience';
import Reveal from './Reveal';
import { SectionHeading, Pill } from './ui';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="shell py-20 sm:py-24">
      <Reveal>
        <SectionHeading slug="experience" title="experience" />
      </Reveal>

      <div className="grid gap-10">
        {EXPERIENCE.map((job, i) => (
          <Reveal key={`${job.role}-${job.company}`} delay={i * 60}>
            <div className="grid gap-2 sm:grid-cols-[170px_1fr] sm:gap-8">
              <p className="pt-0.5 font-mono text-xs leading-relaxed text-faint">{job.duration}</p>
              <div className="relative border-l border-line pl-5 sm:pl-6">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg"
                />
                <h3 className="font-mono text-lg font-bold leading-snug tracking-tight">
                  {job.role}
                  <span className="font-normal text-muted"> &#183; {job.company}</span>
                </h3>
                <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                  {job.description}
                </p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}