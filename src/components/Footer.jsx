import { Link } from 'react-router-dom';
import { SOCIALS } from '../data/social';
import { BRAND_ICONS } from './Icon';

const COLUMNS = [
  {
    title: 'navigate',
    links: [
      { label: 'home', to: '/' },
      { label: 'projects', to: '/projects' },
    ],
  },
  {
    title: 'explore',
    links: [{ label: 'resume.pdf', href: '/resume.pdf' }],
  },
  {
    title: 'social',
    links: ['github', 'linkedin', 'x'].map((k) => ({
      label: SOCIALS[k].label.toLowerCase(),
      icon: BRAND_ICONS[k],
      href: SOCIALS[k].url,
    })),
  },
  {
    title: 'work',
    links: [
      {
        label: 'peerlist',
        icon: BRAND_ICONS.peerlist,
        href: SOCIALS.peerlist.url,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.title} className="grid content-start gap-3">
            <p className="eyebrow">{col.title}</p>
            <ul className="grid gap-2.5">
              {col.links.map((link) =>
                link.to ? (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                    >
                      <span className="text-faint transition-colors group-hover:text-accent">/</span>
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.icon ? (
                        <link.icon size={14} className="text-faint transition-colors group-hover:text-accent" />
                      ) : (
                        <span className="text-faint transition-colors group-hover:text-accent">/</span>
                      )}
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="shell flex flex-col items-center justify-between gap-2 border-t border-line py-6 sm:flex-row">
        <p className="font-mono text-xs text-faint">
          &copy; 2026 ABUZAR RAZIQ. All rights reserved.
        </p>
        <a
          href="/llms.txt"
          className="font-mono text-xs text-faint transition-colors hover:text-accent"
        >
          llms.txt
        </a>
      </div>
    </footer>
  );
}