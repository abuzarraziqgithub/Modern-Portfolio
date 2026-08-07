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
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
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
    // Defer until the menu's body-scroll-lock is released so scrollIntoView can work.
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.14] backdrop-blur-[18px] saturate-150" style={{ background: 'linear-gradient(180deg, rgba(6,7,17,0.82), rgba(6,7,17,0.55))' }}>
      <nav ref={navRef} className="relative mx-auto flex min-h-[78px] w-[min(1160px,calc(100%-28px))] items-center gap-4">
        <button
          type="button"
          onClick={() => goTo('home')}
          className="inline-flex items-center gap-[11px] font-display text-[1.18rem] font-bold tracking-tight"
          aria-label="Abuzar RaziQ home"
        >
          <span className="grid h-[42px] w-[42px] place-items-center rounded-xl border-2 border-white/40 bg-[linear-gradient(135deg,#22d3ee,#a78bfa)] text-[1rem] text-[#05141c] shadow-[3px_3px_0_0_rgba(34,211,238,0.45)]">
            AR
          </span>
          <span className="hidden text-ink sm:inline">
            Abuzar<span className="text-cyan">.</span>
          </span>
        </button>

        {/* Desktop pills */}
        <div className="ml-auto hidden items-center gap-[6px] rounded-full border-2 border-white/[0.14] bg-white/[0.05] p-2 backdrop-blur-[14px] shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => goTo(l.id)}
              className={`rounded-full px-4 py-[9px] text-[0.92rem] font-semibold transition-all duration-200 ${
                active === l.id && !l.page
                  ? 'bg-[linear-gradient(135deg,#22d3ee,#a78bfa)] text-[#05141c] shadow-[2px_2px_0_0_rgba(34,211,238,0.4)]'
                  : 'text-muted hover:bg-white/[0.08] hover:text-ink'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo('contact')}
          className="hidden rounded-[14px] border-2 bg-[linear-gradient(135deg,#22d3ee,#a78bfa)] px-[22px] py-[13px] font-display font-bold text-[#05141c] shadow-[4px_4px_0_0_rgba(34,211,238,0.4)] transition-transform duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_rgba(34,211,238,0.5)] active:translate-x-0.5 active:translate-y-[3px] md:inline-flex"
        >
          Let's talk
        </button>

        {/* Hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-[14px] border-2 border-white/[0.14] bg-white/[0.06] shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] active:translate-x-0.5 active:translate-y-0.5 md:hidden"
        >
          <span
            className="block h-[2.5px] w-5 rounded-full bg-ink transition-transform duration-300"
            style={{
              transform: open ? 'translateY(7.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block h-[2.5px] w-5 rounded-full bg-ink transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-[2.5px] w-5 rounded-full bg-ink transition-transform duration-300"
            style={{
              transform: open ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>

        {/* Mobile dropdown */}
        {isMobile && (
          <div
            id="primary-nav"
            className={`absolute left-0 right-0 top-[74px] flex flex-col gap-2 rounded-[20px] border-2 border-white/[0.14] p-[14px] shadow-[8px_8px_0_0_rgba(34,211,238,0.18)] transition-all duration-300 ${
              open ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-[14px] opacity-0'
            }`}
            style={{ background: 'rgba(10,12,28,0.97)', backdropFilter: 'blur(18px)' }}
          >
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => goTo(l.id)}
                className={`rounded-[14px] px-4 py-[13px] text-left text-[0.95rem] font-semibold transition-colors ${
                  (active === l.id && !l.page) || (l.page && location.pathname === '/contact')
                    ? 'bg-[linear-gradient(135deg,#22d3ee,#a78bfa)] text-[#05141c]'
                    : 'text-muted hover:bg-white/[0.08] hover:text-ink'
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
              className="mt-2 rounded-[14px] bg-[linear-gradient(135deg,#22d3ee,#a78bfa)] px-4 py-[13px] text-left font-display font-bold text-[#05141c]"
            >
              Let's talk
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
