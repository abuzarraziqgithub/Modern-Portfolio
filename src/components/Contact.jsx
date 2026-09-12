import Backdrop from "./Backdrop";
import Reveal from "./Reveal";
import Fireflies from "./Fireflies";
import { IMAGES } from "../config/images";
import { PROFILE } from "../data/profile";
import { SOCIALS } from "../data/social";

export default function Contact() {
  return (
    <Backdrop
      id="contact"
      image={IMAGES.contact}
      gradient="to bottom"
      overlay="rgba(7,10,18,0.55)"
      overlayEnd="rgba(7,10,18,0.95)"
      className="py-28 sm:py-40 text-center"
    >
      <Fireflies
        className="absolute inset-0 opacity-50"
        density={0.00005}
        palette={["#f0d0a0", "#cfc3ff", "#a9e6dd"]}
      />

      <div className="shell-tight relative z-10">
        <Reveal>
          <p
            className="eyebrow justify-center"
            style={{ "--section-accent": "var(--color-gold)" }}
          >
            Let&rsquo;s talk
          </p>
        </Reveal>

        <Reveal delay={1}>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-ink glow sm:text-5xl">
            Open to a place that makes me think harder.
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            {PROFILE.status}
          </p>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${PROFILE.email}`}
              className="rounded-full border border-gold/50 bg-gold/10 px-7 py-3 text-gold transition-colors hover:border-gold hover:bg-gold/20"
            >
              Say hello
            </a>
            <span className="text-faint">or find me here</span>
          </div>
        </Reveal>

        {/* Social links as constellation points */}
        <Reveal delay={3}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                    style={{
                      background: s.accent,
                      boxShadow: `0 0 12px 1px ${s.accent}`,
                    }}
                  />
                  <span className="text-[0.95rem]">
                    {s.label}
                    <span className="text-faint">
                      {" "}
                      · {s.handle.replace("DUMMY: ", "")}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Backdrop>
  );
}
