import Backdrop from './Backdrop';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { IMAGES } from '../config/images';
import { LEARNING_POINTS } from '../data/profile';

export default function NowLearning() {
  return (
    <Backdrop
      id="learning"
      image={IMAGES.learning}
      gradient="to bottom"
      overlay="rgba(7,10,18,0.66)"
      overlayEnd="rgba(7,10,18,0.92)"
      className="py-24 sm:py-32"
    >
      <div className="shell-tight relative z-10">
        <SectionHeading
          eyebrow="Now learning"
          title="Still early in the journey. Still curious."
          intro="No job history to show yet — instead, a small illustrated snapshot of what I'm growing into right now."
          accent="var(--color-rose)"
        />

        <div className="grid gap-5 sm:grid-cols-3">
          {LEARNING_POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i % 3}>
              <div className="group h-full rounded-2xl border border-line bg-night/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-rose/40">
                <h3 className="font-display text-2xl font-medium text-ink">
                  <span className="text-rose">✦ </span>
                  {point.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{point.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <blockquote className="mx-auto mt-14 max-w-2xl text-center">
            <p className="font-display text-2xl italic leading-[1.45] text-ink/90 sm:text-3xl">
              “Looking for a team or environment that helps me learn faster and think sharper.”
            </p>
          </blockquote>
        </Reveal>
      </div>
    </Backdrop>
  );
}