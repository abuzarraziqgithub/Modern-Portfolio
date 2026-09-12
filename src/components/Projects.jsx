import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { IMAGES } from '../config/images';
import { PROJECTS } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-night-2 py-24 sm:py-32">
      {/* Jet-trail as a fading banner behind the heading only */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-40"
        aria-hidden="true"
      >
        <img
          src={IMAGES.projects.src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-center"
          style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)' }}
        />
      </div>

      <div className="relative z-10">
        <div className="shell-tight">
          <SectionHeading
            eyebrow="Projects"
            title="Little worlds I've been building."
            intro="A handful of backend projects — placeholders for now, real ones arrive soon."
            accent="var(--color-gold)"
          />
        </div>

        <div className="shell mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i % 3}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-night-3/80 p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_28px_60px_-18px_rgba(230,179,107,0.18)]">
                <div className="mb-4">
                  <span className="text-gold/70 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                    ✦
                  </span>
                </div>

                <h3 className="font-display text-2xl font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-gold-soft">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[0.78rem] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4 border-t border-line pt-4">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    Code ↗
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}