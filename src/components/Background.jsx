import { memo } from 'react';

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(760px 480px at 92% -6%, rgba(34,211,238,0.10), transparent 60%), radial-gradient(760px 480px at -4% 22%, rgba(167,139,250,0.11), transparent 60%), radial-gradient(640px 420px at 60% 108%, rgba(244,114,182,0.07), transparent 60%)',
        }}
      />
    </div>
  );
}

export default memo(Background);
