import useTilt3D from '../hooks/useTilt3D';
import { TechIcon } from './Icon';
import { GraduationCap, MapPin, Brain, Zap } from 'lucide-react';

const BADGES = [
  { kind: 'img', icon: 'nodedotjs', color: '5fa04e', style: { top: '4%', left: '5%', transform: 'translateZ(70px)' }, label: 'Node.js' },
  { kind: 'img', icon: 'typescript', color: '3178c6', style: { top: '15%', right: '5%', transform: 'translateZ(90px)' }, label: 'TypeScript' },
  { kind: 'img', icon: 'mongodb', color: '47a248', style: { bottom: '13%', left: '5%', transform: 'translateZ(80px)' }, label: 'MongoDB' },
  { kind: 'fa', icon: 'zap', style: { bottom: '6%', right: '9%', transform: 'translateZ(60px)' }, label: 'Realtime' },
];

export default function ProfileCard() {
  const { targetRef, glareRef, requestOrientation } = useTilt3D({ max: 13, scale: 1.05 });

  return (
    <div
      className="relative grid place-items-center will-3d"
      onPointerDown={() => requestOrientation()}
      onTouchStart={() => requestOrientation()}
    >
      {/* Glow blob */}
      <div
        className="absolute aspect-square w-[min(400px,82%)] rounded-full opacity-55 blur-[46px]"
        aria-hidden="true"
        style={{
          background:
            'conic-gradient(from 180deg, #22d3ee, #a78bfa, #f472b6, #fde047, #22d3ee)',
          animation: 'blob-spin 16s linear infinite',
        }}
      />

      {/* 3D card */}
      <div
        ref={targetRef}
        className="will-3d relative z-[1] w-[min(340px,100%)] rounded-[26px] p-[14px] will-change-transform"
      >
        {/* Base surface */}
        <div
          className="absolute inset-0 rounded-[26px] border-[3px]"
          style={{
            background: 'linear-gradient(180deg, rgba(30,34,66,0.88), rgba(16,19,43,0.92))',
            borderColor: 'rgba(255,255,255,0.24)',
            backdropFilter: 'blur(18px) saturate(150%)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5), 10px 10px 0 0 rgba(167,139,250,0.35)',
          }}
        />

        {/* Photo */}
        <div
          className="relative overflow-hidden rounded-[18px] border-2"
          style={{ transform: 'translateZ(36px)', borderColor: 'rgba(255,255,255,0.22)' }}
        >
          <img
            src="/images/profileimg.jpg"
            alt="Portrait of Abuzar Raziq"
            className="aspect-square w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        {/* Body */}
        <div className="relative grid gap-2 px-2 pb-2 pt-4" style={{ transform: 'translateZ(48px)' }}>
          <h3 className="font-display text-[1.5rem] font-bold tracking-tight">Abuzar RaziQ</h3>
          <p className="flex items-center gap-2 text-[0.9rem] text-muted">
            <GraduationCap className="text-cyan" size={16} />
            BSc Computer Science
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-[7px] rounded-full border-[1.5px] bg-white/[0.06] px-3 py-[6px] text-[0.78rem] font-bold text-ink">
              <MapPin size={12} className="text-cyan" /> Islamabad, PK
            </span>
            <span className="inline-flex items-center gap-[7px] rounded-full border-[1.5px] bg-white/[0.06] px-3 py-[6px] text-[0.78rem] font-bold text-ink">
              <Brain size={12} className="text-cyan" /> AI enthusiast
            </span>
          </div>
        </div>

        {/* Floating 3D badges */}
        {BADGES.map((b) => (
          <div
            key={b.label}
            className="absolute z-[2]"
            style={b.style}
          >
            <div
              title={b.label}
              className="grid h-14 w-14 place-items-center rounded-2xl border-2 bg-[rgba(22,26,52,0.9)] shadow-[5px_5px_0_0_rgba(0,0,0,0.45)] will-change-transform"
              style={{
                borderColor: 'rgba(255,255,255,0.24)',
                backdropFilter: 'blur(12px)',
                animation: `badge-bob 5s ease-out infinite`,
                animationDelay: b.label === 'Node.js' ? '0s' : b.label === 'TypeScript' ? '0.8s' : b.label === 'MongoDB' ? '1.6s' : '2.4s',
              }}
            >
              {b.kind === 'img' ? (
                <TechIcon slug={b.icon} color={b.color} size={24} />
              ) : (
                <Zap className="text-cyan" size={24} />
              )}
            </div>
          </div>
        ))}

        {/* Glare */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-300"
          style={{ transform: 'translateZ(110px)' }}
        />
      </div>
    </div>
  );
}
