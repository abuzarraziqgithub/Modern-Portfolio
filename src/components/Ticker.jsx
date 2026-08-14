import { memo } from 'react';
import { TICKER } from '../data/portfolio';
import { Tag } from './ui';

function Ticker() {
  return (
    <div className="mt-[30px] border-y border-white/[0.08] py-4" aria-label="Technologies I work with">
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
        {TICKER.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  );
}

export default memo(Ticker);
