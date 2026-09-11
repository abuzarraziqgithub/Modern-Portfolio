import { memo } from 'react';

const ITEMS = [
  'Node.js',
  'TypeScript',
  'Express',
  'Mongoose',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'WebSockets',
  'JWT',
  'Authentication',
  'Hashing',
  'Validation',
  'REST APIs',
  'Docker',
  'Neovim',
  'Arch Linux',
  'Git',
];

function Row({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-8 pr-8 font-mono text-sm tracking-tight text-faint"
        >
          <span className="text-accent/80">&diams;</span>
          {item}
        </span>
      ))}
    </div>
  );
}

function Marquee() {
  return (
    <div
      className="mt-14 overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      aria-label="Technologies Abuzar works with"
    >
      <div className="marquee-track flex w-max items-center">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}

export default memo(Marquee);