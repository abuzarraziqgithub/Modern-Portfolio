import { memo } from 'react';

const ORBS = [
  {
    className: 'orb-cyan',
    style: {
      width: '480px',
      height: '480px',
      background: 'rgba(34,211,238,0.5)',
      top: '-120px',
      left: '-120px',
      animation: 'float-a 18s ease-in-out infinite',
    },
  },
  {
    className: 'orb-pink',
    style: {
      width: '420px',
      height: '420px',
      background: 'rgba(244,114,182,0.38)',
      top: '30%',
      right: '-140px',
      animation: 'float-b 22s ease-in-out infinite',
    },
  },
  {
    className: 'orb-violet',
    style: {
      width: '520px',
      height: '520px',
      background: 'rgba(167,139,250,0.4)',
      bottom: '-180px',
      left: '25%',
      animation: 'float-a 26s ease-in-out infinite reverse',
    },
  },
  {
    className: 'orb-lime',
    style: {
      width: '340px',
      height: '340px',
      background: 'rgba(163,230,53,0.26)',
      bottom: '12%',
      right: '18%',
      animation: 'float-b 20s ease-in-out infinite',
    },
  },
];

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {ORBS.map((orb) => (
        <span
          key={orb.className}
          className="absolute rounded-full blur-[90px] will-change-transform"
          style={orb.style}
        />
      ))}
    </div>
  );
}

export default memo(Background);
