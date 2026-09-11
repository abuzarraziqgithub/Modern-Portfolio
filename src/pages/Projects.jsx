import { PROJECTS } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { SectionHeading } from '../components/ui';

export default function Projects() {
  return (
    <main id="main-content" className="pb-24">
      <section className="shell grid gap-4 pt-16 sm:pt-20">
        <Reveal>
          <SectionHeading
            slug="projects"
            title="projects"
            right={
              <p className="font-mono text-xs text-faint">
                // {PROJECTS.length} total
              </p>
            }
          />
        </Reveal>
        <p className="-mt-4 max-w-[52ch] text-muted">
          Backend systems and APIs I&rsquo;ve built while learning and shipping.
        </p>
      </section>

      <section className="shell mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={(i % 3) * 70}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </section>
    </main>
  );
}