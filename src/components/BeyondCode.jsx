import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import Fireflies from './Fireflies';
import { GALLERY } from '../config/images';

export default function BeyondCode() {
  return (
    <section id="beyond" className="relative overflow-hidden bg-night py-24 sm:py-32">
      <Fireflies className="absolute inset-0 opacity-30" density={0.00003} palette={['#f7cdd7', '#cfc3ff']} />

      <div className="relative z-10">
        <div className="shell-tight">
          <SectionHeading
            eyebrow="Beyond code"
            title="The quiet pages between the commits."
            intro="Who I am outside the editor — a few words per mood, nothing more."
            accent="var(--color-rose)"
          />
        </div>

        <div className="shell mt-4 columns-2 gap-4 md:columns-3 lg:columns-4">
          {GALLERY.map((item, i) => (
            <Reveal key={item.label} delay={i % 3} className="mb-4 break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-2xl border border-line transition-all duration-300 hover:border-rose/40">
                <div className="overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent px-4 pb-3.5 pt-10">
                  <span className="text-[0.92rem] font-medium text-ink/95">{item.label}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}