import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Folder,
  User,
  Activity,
  Briefcase,
  LayoutGrid,
  Copy,
  Download,
  FileText,
  Check,
  AtSign,
  ArrowUpRight,
} from 'lucide-react';
import { OPEN_PALETTE_EVENT } from './Nav';
import { Github, Linkedin, XIcon } from './Icon';
import { PROFILE } from '../data/profile';
import { SOCIALS } from '../data/social';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(el);
    }
  }
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const restoreRef = useRef(null);

  const items = [
    { group: 'navigate', icon: Home, label: 'home', hint: '~/', run: () => navigate('/') },
    {
      group: 'navigate',
      icon: Folder,
      label: 'projects',
      hint: '/projects',
      run: () => navigate('/projects'),
    },
    { group: 'navigate', icon: User, label: 'about', hint: '/#about', run: () => chooseSection('/#about') },
    {
      group: 'navigate',
      icon: Activity,
      label: 'github activity',
      hint: '/#github',
      run: () => chooseSection('/#github'),
    },
    {
      group: 'navigate',
      icon: Briefcase,
      label: 'experience',
      hint: '/#experience',
      run: () => chooseSection('/#experience'),
    },
    {
      group: 'navigate',
      icon: LayoutGrid,
      label: 'featured projects',
      hint: '/#projects',
      run: () => chooseSection('/#projects'),
    },
    {
      group: 'social',
      icon: Github,
      label: 'github',
      hint: SOCIALS.github.handle,
      run: () => openUrl(SOCIALS.github.url),
    },
    {
      group: 'social',
      icon: Linkedin,
      label: 'linkedin',
      hint: SOCIALS.linkedin.handle,
      run: () => openUrl(SOCIALS.linkedin.url),
    },
    {
      group: 'social',
      icon: XIcon,
      label: 'x (twitter)',
      hint: SOCIALS.x.handle,
      run: () => openUrl(SOCIALS.x.url),
    },
    {
      group: 'social',
      icon: AtSign,
      label: 'peerlist',
      hint: SOCIALS.peerlist.handle,
      run: () => openUrl(SOCIALS.peerlist.url),
    },
    {
      group: 'actions',
      icon: Copy,
      label: 'copy email',
      hint: PROFILE.email,
      run: async () => {
        await copyText(PROFILE.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
    },
    {
      group: 'actions',
      icon: Download,
      label: 'download resume',
      hint: 'resume.pdf',
      run: () => openUrl('/resume.pdf'),
    },
    {
      group: 'actions',
      icon: FileText,
      label: 'view /llms.txt',
      hint: 'for AI crawlers',
      run: () => openUrl('/llms.txt'),
    },
  ];

  function chooseSection(hash) {
    if (location.pathname !== '/') {
      navigate(hash);
      return;
    }
    const id = hash.slice(2);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setCopied(false);
    const el = restoreRef.current;
    if (el && typeof el.focus === 'function') el.focus();
    restoreRef.current = null;
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onOpen = () => {
      restoreRef.current = document.activeElement;
      setOpen(true);
    };
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault();
        if (open) close();
        else onOpen();
      } else if (e.key === 'Escape' && open) {
        close();
      }
    };
    document.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = items.filter((item) => {
      if (!q) return true;
      const hay = `${item.label} ${item.hint} ${item.group}`.toLowerCase();
      if (hay.includes(q)) return true;
      let qi = 0;
      for (let i = 0; i < hay.length && qi < q.length; i += 1) {
        if (hay[i] === q[qi]) qi += 1;
      }
      return qi === q.length;
    });
    if (!q) return list;
    const score = (item) => {
      const hay = `${item.label} ${item.hint} ${item.group}`.toLowerCase();
      if (hay.startsWith(q)) return 0;
      if (hay.includes(q)) return 1;
      return 2;
    };
    return [...list].sort((a, b) => score(a) - score(b));
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.children[active];
    el?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  if (!open) return null;

  const choose = (item) => {
    item.run();
    close();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[active]) choose(filtered[active]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Tab') return;
        const focusables = Array.from(
          e.currentTarget.querySelectorAll('input, button')
        ).filter((el) => !el.disabled);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-lg border border-line bg-bg-elev shadow-2xl shadow-black/60">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="font-mono text-sm text-accent">$</span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="Search"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[active] ? `palette-opt-${active}` : undefined}
            placeholder="type a command, section, or link…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-faint"
          />
        </div>

        <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[46vh] overflow-y-auto py-1.5">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center font-mono text-sm text-faint">
              no results for &ldquo;{query}&rdquo;
            </li>
          )}
          {filtered.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === active;
            return (
              <li key={`${item.group}-${item.label}`} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  id={`palette-opt-${i}`}
                  onPointerMove={() => setActive(i)}
                  onClick={() => choose(item)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isActive ? 'border-l-2 border-accent bg-accent/10' : 'border-l-2 border-transparent'
                  }`}
                >
                  <Icon size={15} className="shrink-0 text-muted" />
                  <span className="flex-1 truncate font-mono text-sm text-ink">{item.label}</span>
                  <span className="font-mono text-xs text-faint">
                    {item.group === 'actions' && item.label === 'copy email' && copied
                      ? '✓ copied'
                      : item.hint}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2 font-mono text-[0.68rem] text-faint">
          <span>&uarr;&darr; navigate &middot; &#8629; select &middot; esc close</span>
          <span className="hidden items-center gap-1 sm:inline-flex">
            search sections, links, email <ArrowUpRight size={10} />
          </span>
        </div>
      </div>
    </div>
  );
}