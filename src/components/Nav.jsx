import { useEffect, useState } from 'react';
import { PROFILE } from '../data/profile';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'learning', label: 'Learning' },
  { id: 'projects', label: 'Projects' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
];

function useScrollSpy() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const ids = ['hero', ...LINKS.map((l) => l.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? 'border-b border-line bg-night/80 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between gap-3" aria-label="Primary">
        <button
          type="button"
          onClick={() => go('hero')}
          className="group inline-flex items-baseline gap-2 font-display text-lg font-medium tracking-wide text-ink"
          aria-label="Abuzar Raziq — back to top"
        >
          <span className="text-gold transition-colors group-hover:text-gold-soft">✦</span>
          <span>{PROFILE.name}</span>
        </button>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              aria-current={active === link.id ? 'true' : undefined}
              className={`px-3 py-1.5 text-sm transition-colors ${
                active === link.id ? 'text-gold' : 'text-muted hover:text-ink'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={`mailto:${PROFILE.email}`}
            className="ml-2 rounded-full border border-gold/40 px-4 py-1.5 text-sm text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            Say hi
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-night-2/60 md:hidden"
        >
          <span
            className="block h-[2px] w-4 rounded-full bg-ink transition-transform"
            style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}
          />
          <span className="block h-[2px] w-4 rounded-full bg-ink transition-opacity" style={{ opacity: open ? 0 : 1 }} />
          <span
            className="block h-[2px] w-4 rounded-full bg-ink transition-transform"
            style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
          />
        </button>

        {open && (
          <div
            id="mobile-nav"
            className="absolute left-0 right-0 top-16 flex flex-col gap-1 border-b border-line bg-night/95 px-4 py-4 backdrop-blur-md md:hidden"
          >
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className={`rounded-md px-3 py-2.5 text-left text-base transition-colors ${
                  active === link.id ? 'text-gold' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}