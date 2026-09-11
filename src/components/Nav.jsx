import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PROFILE } from '../data/profile';

export const OPEN_PALETTE_EVENT = 'ar:open-command-palette';

const LINKS = [
  { id: 'home', label: 'home', to: '/' },
  { id: 'projects', label: 'projects', to: '/projects' },
];

export function isMacLike() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

function useScrollSpy(active) {
  const [section, setSection] = useState(active);

  useEffect(() => {
    if (active !== 'home') {
      setSection(active);
      return undefined;
    }
    const ids = ['home', 'about', 'github', 'experience', 'projects'];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSection(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active]);

  return section;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const section = useScrollSpy(isHome ? 'home' : location.pathname === '/projects' ? 'projects' : 'home');

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (link) => (link.to === '/' ? section === 'home' || section === 'about' || section === 'github' || section === 'experience' : location.pathname === link.to);

  const go = (link) => {
    setOpen(false);
    if (link.to === '/') {
      if (location.pathname !== '/') {
        navigate('/');
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(link.to);
  };

  const openPalette = () => {
    document.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
  };

  const kbd = isMacLike() ? '\u2318K' : 'Ctrl K';

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav className="shell flex h-14 items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(LINKS[0])}
          className="group inline-flex items-baseline gap-1 font-mono text-sm font-bold tracking-tight"
          aria-label="Abuzar Raziq — home"
        >
          <span className="text-accent transition-colors">~</span>
          <span className="text-ink">/ar</span>
          <span className="hidden text-muted transition-colors group-hover:text-accent sm:inline">
            /portfolio
          </span>
        </button>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link)}
              className={`px-3 py-1.5 font-mono text-sm transition-colors ${
                isActive(link) ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              [ <span className={isActive(link) ? 'text-accent' : ''}>{link.label}</span> ]
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 font-mono text-sm text-muted transition-colors hover:text-ink"
          >
            [ resume.pdf ]
          </a>

          <button
            type="button"
            onClick={openPalette}
            className="ml-2 inline-flex h-7 items-center gap-1.5 rounded-md border border-line bg-bg-hi px-2 font-mono text-[0.72rem] text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Open command palette"
            aria-haspopup="dialog"
          >
            <span>{kbd}</span>
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-md border border-line bg-bg-hi md:hidden"
        >
          <span
            className="block h-[2px] w-4 rounded-full bg-ink transition-transform"
            style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block h-[2px] w-4 rounded-full bg-ink transition-opacity"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-[2px] w-4 rounded-full bg-ink transition-transform"
            style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
          />
        </button>

        {open && (
          <div
            id="mobile-nav"
            className="absolute left-0 right-0 top-14 flex flex-col gap-1 border-b border-line bg-bg px-3 py-3 md:hidden"
          >
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link)}
                className={`rounded-md px-3 py-2.5 text-left font-mono text-sm transition-colors ${
                  isActive(link) ? 'bg-bg-hi text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-2.5 font-mono text-sm text-muted transition-colors hover:text-ink"
            >
              resume.pdf
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openPalette();
              }}
              className="rounded-md px-3 py-2.5 text-left font-mono text-sm text-muted transition-colors hover:text-ink"
            >
              command palette ({kbd})
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}