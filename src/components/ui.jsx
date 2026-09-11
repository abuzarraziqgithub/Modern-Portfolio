export function SectionHeading({ slug, title, right }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-sm text-accent">
          <span className="text-faint">## </span>
          {slug}
        </p>
        <h2 className="mt-1 font-mono text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}

export function Pill({ children }) {
  return <span className="pill">#{children}</span>;
}