export default function Footer() {
  return (
    <footer className="relative border-t border-line/60 bg-night py-7">
      <div className="shell flex flex-col items-center justify-center gap-2 text-center">
        <span className="text-gold/70" aria-hidden="true">
          ✦
        </span>
        <p className="text-[0.85rem] text-faint">
          Built by Abuzar Raziq, one honest line at a time.
        </p>
        <p className="text-[0.78rem] text-faint/70">
          © {new Date().getFullYear()} — crafted with patience in Islamabad.
        </p>
      </div>
    </footer>
  );
}