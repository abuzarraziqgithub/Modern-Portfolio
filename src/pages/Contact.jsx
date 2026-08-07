import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { GlassCard, CardIcon } from '../components/ui';
import Icon, { TechIcon } from '../components/Icon';
import Reveal from '../components/Reveal';
import { LINKS } from '../data/portfolio';

const CONTACTS = [
  { icon: Mail, label: 'Email', value: 'iabuzarraziq@gmail.com', href: LINKS.email },
  { icon: Phone, label: 'Phone', value: '+923276088249', href: LINKS.phone },
  { icon: MapPin, label: 'Location', value: 'Islamabad, Pakistan' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const body = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject || 'N/A'}%0A%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:iabuzarraziq@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio message')}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const inputCls =
    'w-full rounded-2xl border-2 border-white/[0.14] bg-white/[0.05] px-[18px] py-[15px] text-ink outline-none transition-all duration-300 placeholder:text-faint focus:border-cyan/80 focus:-translate-y-px focus:shadow-[4px_4px_0_0_rgba(34,211,238,0.25)]';

  return (
    <main className="pt-[18px]">
      <div className="section-shell grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <Reveal className="h-full">
          <GlassCard tone="bruta-violet" className="grid h-full content-start gap-5 rounded-[26px] p-[24px] sm:p-[30px]">
            <p className="font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-violet">
              <Icon name="send" size={14} className="mr-2 inline-block" /> Contact
            </p>
            <h1 className="max-w-[14ch] font-display text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-tight">
              Let's build something <span className="gradient-text">worth shipping</span>.
            </h1>
            <p className="max-w-[42ch] text-[0.98rem] text-muted">
              Roles, freelance work, or just talking about APIs, AI and architecture &mdash; my
              inbox is open.
            </p>

            <div className="mt-1.5 grid gap-3">
              {CONTACTS.map((c) => {
                const inner = (
                  <>
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl border-[1.5px] border-white/[0.14] text-violet" style={{ background: 'rgba(167,139,250,0.14)' }}>
                      <c.icon size={18} />
                    </span>
                    <div>
                      <span className="font-mono text-[0.74rem] font-extrabold uppercase tracking-[0.18em] text-violet">
                        {c.label}
                      </span>
                      <strong className="mt-0.5 block break-words text-[1rem] text-ink">
                        {c.value}
                      </strong>
                    </div>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-[14px] rounded-[18px] border-2 border-white/[0.14] bg-white/[0.06] p-[16px_18px] shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-[3px] hover:border-white/25 hover:shadow-[6px_7px_0_0_rgba(167,139,250,0.28)]"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={c.label}
                    className="flex items-center gap-[14px] rounded-[18px] border-2 border-white/[0.14] bg-white/[0.06] p-[16px_18px] shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            <div className="mt-1.5 flex gap-2.5">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-xl border-2 border-white/[0.14] bg-white/[0.06] shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                <TechIcon slug="github" color="f2f5ff" size={18} />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-xl border-2 border-white/[0.14] bg-white/[0.06] shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                <img src="/images/linkedin-icon.png" alt="" width="18" height="18" loading="lazy" />
              </a>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={100} className="h-full">
          <GlassCard tone="bruta-cyan" className="grid content-start rounded-[26px] p-[24px] sm:p-[30px]">
            <div className="mb-6 flex items-center gap-4">
              <CardIcon name="message" />
              <div>
                <p className="font-mono text-[0.74rem] font-extrabold uppercase tracking-[0.18em] text-cyan">
                  Quick brief
                </p>
                <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.2rem)] font-bold tracking-tight">
                  Send a message
                </h2>
              </div>
            </div>

            <form onSubmit={onSubmit} className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-[0.92rem] font-bold text-ink">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                  className={inputCls}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.92rem] font-bold text-ink">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.92rem] font-bold text-ink">Subject</span>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={update('subject')}
                  placeholder="Project idea / role / hello"
                  className={inputCls}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.92rem] font-bold text-ink">Message</span>
                <textarea
                  name="message"
                  rows={7}
                  required
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell me about the project or opportunity"
                  className={`${inputCls} min-h-[160px] resize-y`}
                />
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 self-start rounded-[14px] bg-[linear-gradient(135deg,#22d3ee,#a78bfa)] px-[22px] py-[13px] font-display text-[1rem] font-bold text-[#05141c] shadow-[4px_4px_0_0_rgba(34,211,238,0.4)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_rgba(34,211,238,0.5)] active:translate-x-0.5 active:translate-y-[3px] sm:w-auto"
              >
                {sent ? (
                  <>
                    <Check size={17} /> Opened in your mail app
                  </>
                ) : (
                  <>
                    Send Message <Send size={17} />
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </main>
  );
}
