import Backdrop from './Backdrop';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import Fireflies from './Fireflies';
import { IMAGES } from '../config/images';
import { STACK } from '../data/stack';

function SkillNode({ item, note, accent }) {
  return (
    <li className="flex items-center gap-2.5 text-[0.98rem] text-ink/90">
      <span
        className="h-2 w-2 shrink-0 rounded-full node-breathe"
        style={{ background: accent, boxShadow: `0 0 10px 1px ${accent}` }}
      />
      <span>{item}</span>
      {note && <em className="not-italic text-[0.8rem] text-faint">{note}</em>}
    </li>
  );
}

export default function Stack() {
  return (
    <Backdrop
      id="stack"
      image={IMAGES.stack}
      gradient="to bottom"
      overlay="rgba(7,10,18,0.8)"
      overlayEnd="rgba(7,10,18,0.92)"
      className="py-24 sm:py-32"
    >
      <Fireflies className="absolute inset-0 opacity-40" density={0.00004} palette={['#a9e6dd', '#f0d0a0']} />

      <div className="relative z-10">
        <div className="shell-tight">
          <SectionHeading
            eyebrow="The garden"
            title="Tools I tend, grouped like a night sky."
            intro="Not a boring grid — a small constellation of the things I reach for. Grouped loosely by where they live in my day."
            accent="var(--color-teal)"
          />
        </div>

        <div className="shell mt-2 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {STACK.map((group, gi) => (
            <Reveal key={group.category} delay={gi % 3}>
              <div className="group">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3.5 w-3.5 rounded-full node-breathe"
                    style={{
                      background: group.accent,
                      boxShadow: `0 0 16px 2px ${group.accent}`,
                    }}
                  />
                  <h3
                    className="font-display text-xl italic"
                    style={{ color: group.accent }}
                  >
                    {group.category}
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5 border-l pl-5" style={{ borderColor: `${group.accent}44` }}>
                  {group.items.map((s) => (
                    <SkillNode key={s.name} item={s.name} note={s.note} accent={group.accent} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Backdrop>
  );
}