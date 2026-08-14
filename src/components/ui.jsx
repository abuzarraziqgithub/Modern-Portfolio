import Icon, { TechIcon } from './Icon';

export function GlassCard({ tone = 'cyan', className = '', children, lift = true }) {
  return (
    <article
      className={`bento relative ${lift ? 'transition-colors duration-200 hover:border-white/[0.18]' : ''} ${className}`}
    >
      {children}
    </article>
  );
}

const TONES = {
  cyan: 'text-cyan border-cyan/30 bg-cyan/10',
  violet: 'text-violet border-violet/30 bg-violet/10',
  pink: 'text-pink border-pink/30 bg-pink/10',
  lime: 'text-lime border-lime/30 bg-lime/10',
  yellow: 'text-yellow border-yellow/30 bg-yellow/10',
  orange: 'text-orange border-orange/30 bg-orange/10',
  blue: 'text-blue border-blue/30 bg-blue/10',
};

export function CardIcon({ name, size = 22, tone = 'cyan', className = '' }) {
  const fill = TONES[tone] || TONES.cyan;
  return (
    <div className={`grid h-12 w-12 place-items-center rounded-2xl border ${fill} ${className}`}>
      <Icon name={name} size={size} />
    </div>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-display font-bold cursor-pointer select-none transition-colors duration-200';
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-[0.95rem]',
    lg: 'px-6 py-3 text-[1rem]',
  };
  const variants = {
    primary:
      'text-[#04141d] bg-gradient-to-br from-cyan to-violet hover:from-violet hover:to-pink',
    ghost: 'text-ink border border-white/15 bg-white/[0.05] hover:bg-white/[0.1]',
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

export function SectionHeading({ icon, tone = 'cyan', eyebrow, children }) {
  const toneText = {
    cyan: 'text-cyan',
    violet: 'text-violet',
    pink: 'text-pink',
    lime: 'text-lime',
    yellow: 'text-yellow',
    orange: 'text-orange',
  };
  return (
    <div className="mb-5 grid gap-2.5">
      <p className={`font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.22em] ${toneText[tone] || toneText.cyan}`}>
        <Icon name={icon} size={14} className="mr-2 inline-block" />
        {eyebrow}
      </p>
      <h2 className="max-w-[20ch] font-display text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-tight">
        {children}
      </h2>
    </div>
  );
}

export function Tag({ children, img, tone = '' }) {
  return (
    <span className="inline-flex items-center gap-[7px] rounded-full border border-white/10 bg-white/[0.05] px-3 py-[7px] text-[0.82rem] font-semibold text-ink">
      {img ? <TechIcon {...img} size={14} /> : null}
      {tone ? <span className={`mr-0.5 ${tone}`}>{children}</span> : children}
    </span>
  );
}

export function SkillTag({ tag }) {
  if (tag.kind === 'img') {
    return <Tag img={{ slug: tag.icon, color: tag.color }}>{tag.label}</Tag>;
  }
  return (
    <Tag>
      <Icon name={tag.icon} size={13} className="shrink-0 text-faint" />
      {tag.label}
    </Tag>
  );
}
