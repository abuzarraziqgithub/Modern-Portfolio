import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import { SectionHeading } from './ui';

export default function ProjectsPreview() {
  return (
    <section id="projects" className="shell py-20 sm:py-24">
      <Reveal>
        <SectionHeading
          slug="projects"
          title="featured projects"
          right={
            <Link
              to="/projects"
              className="group hidden items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent sm:inline-flex"
            >
              all projects
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          }
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={i * 70}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-accent"
        >
          all projects <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}