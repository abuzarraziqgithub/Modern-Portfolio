import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { IMAGES } from '../config/images';
import { ABOUT_PARAGRAPHS } from '../data/profile';

export default function About() {
  return (
    <section id="about" className="relative bg-night py-24 sm:py-32 overflow-hidden">
      {/* Subtle side accent image */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-[600px] w-[440px] opacity-[0.12] sm:block"
        aria-hidden="true"
      >
        <img
          src={IMAGES.about.src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-center"
          style={{ maskImage: 'linear-gradient(to left, black 20%, transparent 80%)' }}
        />
      </div>

      <div className="shell-tight relative z-10">
        <SectionHeading
          eyebrow="Who I am"
          title="A backend engineer who likes things done properly."
          accent="var(--color-rose)"
        />

        <div className="space-y-6 text-[1.05rem] leading-[1.85] text-muted">
          {ABOUT_PARAGRAPHS.map((para, i) => (
            <Reveal key={i} delay={i < 3 ? i : 3}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}