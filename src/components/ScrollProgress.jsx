import useScrollProgress from '../hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left shadow-[0_0_14px_rgba(34,211,238,0.6)]"
      style={{
        transform: `scaleX(${progress})`,
        background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6)',
      }}
    />
  );
}
