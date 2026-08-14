import { TechIcon } from './Icon';
import { GraduationCap, MapPin, Brain, Zap } from 'lucide-react';

const BADGES = [
  { kind: 'img', icon: 'nodedotjs', color: '5fa04e', label: 'Node.js', tone: 'border-lime/40 bg-lime/10 text-lime' },
  { kind: 'img', icon: 'typescript', color: '3178c6', label: 'TypeScript', tone: 'border-blue/40 bg-blue/10 text-blue' },
  { kind: 'img', icon: 'mongodb', color: '47a248', label: 'MongoDB', tone: 'border-lime/40 bg-lime/10 text-lime' },
  { kind: 'fa', icon: 'zap', label: 'Realtime', tone: 'border-yellow/40 bg-yellow/10 text-yellow' },
];

export default function ProfileCard() {
  return (
    <div className="relative w-[min(340px,100%)]">
      <div
        className="absolute -inset-3 rounded-[30px] opacity-70"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(320px 200px at 50% 0%, rgba(34,211,238,0.22), transparent 65%), radial-gradient(320px 200px at 50% 100%, rgba(167,139,250,0.22), transparent 65%)',
        }}
      />

      <div className="bento relative overflow-hidden p-3">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/images/profileimg.jpg"
            alt="Portrait of Abuzar Raziq"
            className="aspect-square w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="grid gap-2 px-2 pb-2 pt-4">
          <div className="flex items-end justify-between gap-2">
            <h3 className="font-display text-[1.5rem] font-bold tracking-tight">Abuzar RaziQ</h3>
            <span className="flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-2.5 py-1 font-mono text-[0.68rem] font-extrabold uppercase tracking-wider text-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Open
            </span>
          </div>
          <p className="flex items-center gap-2 text-[0.9rem] text-muted">
            <GraduationCap className="text-cyan" size={16} />
            BSc Computer Science
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-[7px] rounded-full border border-white/10 bg-white/[0.05] px-3 py-[6px] text-[0.78rem] font-bold text-ink">
              <MapPin size={12} className="text-cyan" /> Islamabad, PK
            </span>
            <span className="inline-flex items-center gap-[7px] rounded-full border border-white/10 bg-white/[0.05] px-3 py-[6px] text-[0.78rem] font-bold text-ink">
              <Brain size={12} className="text-violet" /> AI enthusiast
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span
                key={b.label}
                title={b.label}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-[0.72rem] font-bold ${b.tone}`}
              >
                {b.kind === 'img' ? (
                  <TechIcon slug={b.icon} color={b.color} size={16} />
                ) : (
                  <Zap size={14} />
                )}
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
