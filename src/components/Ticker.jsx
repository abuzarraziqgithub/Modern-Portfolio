import { memo } from 'react';
import { TICKER } from '../data/portfolio';

function Ticker() {
  const items = [...TICKER, ...TICKER];

  return (
    <div
      className="mask-fade-x mt-[34px] overflow-hidden border-y-2 border-white/[0.14] py-4"
      aria-hidden="true"
      style={{ background: 'rgba(255,255,255,0.035)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="flex w-max items-center gap-[26px]"
        style={{ animation: 'ticker-scroll 42s linear infinite' }}
      >
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-[26px]">
            <span className="whitespace-nowrap font-mono text-[0.95rem] font-bold uppercase tracking-[0.06em] text-muted">
              {item}
            </span>
            <span
              className="h-[7px] w-[7px] flex-none rounded-full"
              style={{ background: 'linear-gradient(135deg,#22d3ee,#f472b6)', boxShadow: '0 0 10px rgba(34,211,238,0.8)' }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default memo(Ticker);
