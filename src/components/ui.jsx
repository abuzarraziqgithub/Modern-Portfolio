import Icon, { TechIcon } from './Icon';

export function GlassCard({ tone = 'cyan', className = '', children, lift = true }) {
  return (
    <article
      className={`glass relative rounded-[22px] border p-[26px] transition-transform duration-300 ${tone} ${
        lift ? 'hover:-translate-x-1 hover:-translate-y-1.5' : ''
      } ${className}`}
    >
      {children}
    </article>
  );
}

export function CardIcon({ name, size = 22, className = '' }) {
  return (
    <div
      className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl border-2 shadow-[3px_3px_0_0_rgba(0,0,0,0.4)] ${className}`}
      style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.14)' }}
    >
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
    'inline-flex items-center justify-center gap-2 rounded-[14px] font-display font-bold border-2 border-white/[0.14] cursor-pointer select-none transition-[transform,box-shadow,background,color] duration-300';
  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-[22px] py-[13px]',
    lg: 'px-[26px] py-[15px] text-[1.02rem]',
  };
  const variants = {
    primary:
      'text-[#05141c] border-transparent bg-[linear-gradient(135deg,#22d3ee,#a78bfa)] shadow-[4px_4px_0_0_rgba(34,211,238,0.4)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_rgba(34,211,238,0.5)] active:translate-x-0.5 active:translate-y-[3px] active:shadow-[2px_2px_0_0_rgba(34,211,238,0.4)]',
    ghost:
      'text-ink bg-white/[0.06] backdrop-blur-[10px] shadow-[4px_4px_0_0_rgba(255,255,255,0.14)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white/[0.11] hover:shadow-[7px_7px_0_0_rgba(255,255,255,0.2)] active:translate-x-0.5 active:translate-y-[3px]',
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
  };
  return (
    <div className="mb-[22px] grid gap-[14px]">
      <p className={`font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.22em] ${toneText[tone]}`}>
        <Icon name={icon} size={14} className="mr-2 inline-block" />
        {eyebrow}
      </p>
      <h2 className="max-w-[18ch] font-display text-[clamp(1.9rem,4.6vw,3.3rem)] font-bold leading-[1.05] tracking-tight">
        {children}
      </h2>
    </div>
  );
}

export function Tag({ children, img }) {
  return (
    <span className="inline-flex items-center gap-[7px] rounded-full border-[1.5px] bg-white/[0.07] px-3 py-[7px] text-[0.84rem] font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.4)]">
      {img ? <TechIcon {...img} size={14} /> : null}
      {children}
    </span>
  );
}

export function SkillTag({ tag }) {
  if (tag.kind === 'img') {
    return <Tag img={{ slug: tag.icon, color: tag.color }}>{tag.label}</Tag>;
  }
  return (
    <Tag>
      <Icon name={tag.icon} size={13} className="shrink-0" />
      {tag.label}
    </Tag>
  );
}
