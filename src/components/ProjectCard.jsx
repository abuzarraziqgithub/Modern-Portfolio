import { ArrowUpRight } from 'lucide-react';
import { Github } from './Icon';
import { Pill } from './ui';

export default function ProjectCard({ project, index = 0, showDemo = true }) {
  return (
    <article className="panel panel-hover grid content-start gap-4 p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-md border border-line font-mono text-sm text-accent">
          {showDemo ? '</>' : '#'}
        </span>
      </div>

      <h3 className="font-mono text-lg font-bold tracking-tight">{project.title}</h3>
      <p className="text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-5 border-t border-line pt-4">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <Github size={13} /> source
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          live <ArrowUpRight size={11} />
        </a>
      </div>
    </article>
  );
}