import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useMediaQuery';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact', page: true },
];

function useScrollSpy() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const ids = ['home', 'about', 'skills', 'projects'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0.1 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return active;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const active = useScrollSpy();
  const navRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [location, close]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const goTo = (id) => {
    setOpen(false);
    if (id === 'contact') {
      if (location.pathname === '/contact') return;
      navigate('/contact');
      return;
    }
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.08]"
      style={{ background: 'rgba(7,8,18,0.85)', backdropFilter: 'blur(12px)' }}
    >
      <nav ref={navRef} className="relative mx-auto flex min-h-[70px] w-[min(1160px,calc(100%-28px))] items-center gap-4">
        <button
          type="button"
          onClick={() => goTo('home')}
          className="inline-flex items-center gap-[11px] font-display text-[1.15rem] font-bold tracking-tight"
          aria-label="Abuzar RaziQ home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet text-[0.95rem] text-[#04141d]">
            AR
          </span>
          <span className="hidden text-ink sm:inline">
            Abuzar<span className="text-cyan">.</span>
          </span>
        </button>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => goTo(l.id)}
              className={`rounded-full px-4 py-[8px] text-[0.92rem] font-semibold transition-colors duration-200 ${
                active === l.id && !l.page
                  ? 'bg-white/[0.1] text-ink'
                  : 'text-muted hover:bg-white/[0.06] hover:text-ink'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goTo('contact')}
            className="ml-2 rounded-full bg-gradient-to-br from-cyan to-violet px-5 py-[9px] font-display text-[0.92rem] font-bold text-[#04141d]"
          >
            Let's talk
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-white/10 bg-white/[0.05] active:bg-white/[0.1] md:hidden"
        >
          <span
            className="block h-[2.5px] w-5 rounded-full bg-ink transition-transform duration-200"
            style={{ transform: open ? 'translateY(7.5px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block h-[2.5px] w-5 rounded-full bg-ink transition-opacity duration-200"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-[2.5px] w-5 rounded-full bg-ink transition-transform duration-200"
            style={{ transform: open ? 'translateY(-7.5px) rotate(-45deg)' : 'none' }}
          />
        </button>

        {isMobile && (
          <div
            id="primary-nav"
            className={`absolute left-0 right-0 top-[64px] flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0b0d1b] p-3 transition-all duration-200 ${
              open ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-[10px] opacity-0'
            }`}
          >
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => goTo(l.id)}
                className={`rounded-xl px-4 py-[11px] text-left text-[0.95rem] font-semibold transition-colors duration-200 ${
                  (active === l.id && !l.page) || (l.page && location.pathname === '/contact')
                    ? 'bg-white/[0.1] text-ink'
                    : 'text-muted hover:bg-white/[0.06] hover:text-ink'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate('/contact');
              }}
              className="mt-2 rounded-xl bg-gradient-to-br from-cyan to-violet px-4 py-[11px] text-left font-display font-bold text-[#04141d]"
            >
              Let's talk
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
