import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle, MailOpen } from 'lucide-react';
import { GlassCard, CardIcon } from '../components/ui';
import Icon, { Github, Linkedin } from '../components/Icon';
import { LINKS } from '../data/portfolio';

const CONTACTS = [
  { icon: Mail, label: 'Email', value: 'iabuzarraziq@gmail.com', href: LINKS.email, tone: 'text-cyan border-cyan/30 bg-cyan/10' },
  { icon: Phone, label: 'Phone', value: '+92 327 6088249', href: LINKS.phone, tone: 'text-violet border-violet/30 bg-violet/10' },
  { icon: MapPin, label: 'Location', value: 'Islamabad, Pakistan', tone: 'text-pink border-pink/30 bg-pink/10' },
];

const FORM_URL = 'https://formsubmit.co/ajax/iabuzarraziq@gmail.com';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [sentTo, setSentTo] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio message',
          message: form.message,
          _subject: `Portfolio message from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error('Send failed');
      setSentTo(form.email);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const mailtoFallback = `mailto:iabuzarraziq@gmail.com?subject=${encodeURIComponent(
    form.subject || 'Portfolio message'
  )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;

  const inputCls =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-cyan/70 focus:bg-white/[0.06]';

  return (
    <main className="pt-6 pb-2">
      <div className="section-shell grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <GlassCard className="grid h-full content-start gap-5 p-6 sm:p-7">
          <p className="font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.22em] text-violet">
            <Icon name="send" size={14} className="mr-2 inline-block" /> Contact
          </p>
          <h1 className="max-w-[14ch] font-display text-[clamp(2rem,4.8vw,3.2rem)] font-bold leading-[1.06] tracking-tight">
            Let&rsquo;s build something{' '}
            <span className="gradient-text">worth shipping</span>.
          </h1>
          <p className="max-w-[42ch] text-[0.97rem] text-muted">
            Roles, freelance work, or just talking about <span className="font-bold text-cyan">APIs</span>,{' '}
            <span className="font-bold text-violet">AI</span> and{' '}
            <span className="font-bold text-pink">architecture</span> &mdash; my inbox is open.
          </p>

          <div className="grid gap-3">
            {CONTACTS.map((c) => {
              const inner = (
                <>
                  <span className={`grid h-11 w-11 flex-none place-items-center rounded-xl border ${c.tone}`}>
                    <c.icon size={18} />
                  </span>
                  <div>
                    <span className="font-mono text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-faint">
                      {c.label}
                    </span>
                    <strong className="mt-0.5 block break-words text-[0.95rem] text-ink">
                      {c.value}
                    </strong>
                  </div>
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="bento flex items-center gap-[14px] p-[14px_16px] transition-colors duration-200 hover:border-white/[0.18]"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="bento flex items-center gap-[14px] p-[14px_16px]">
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
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-muted transition-colors duration-200 hover:border-white/25 hover:text-ink"
            >
              <Github size={18} />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-muted transition-colors duration-200 hover:border-white/25 hover:text-ink"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </GlassCard>

        <GlassCard className="grid content-start p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-4">
            <CardIcon name="message" tone="cyan" />
            <div>
              <p className="font-mono text-[0.74rem] font-extrabold uppercase tracking-[0.18em] text-cyan">
                Quick brief
              </p>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight">
                Send a message
              </h2>
            </div>
          </div>

          {status === 'success' && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-lime/30 bg-lime/10 p-3.5 text-[0.9rem] text-lime">
              <CheckCircle2 size={18} className="mt-0.5 flex-none" />
              <span>
                  Thanks, your message is on its way! I&rsquo;ll get back to you at{' '}
                  <strong className="text-ink">{sentTo || 'your email'}</strong>.
              </span>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-pink/30 bg-pink/10 p-3.5 text-[0.9rem] text-pink">
              <AlertCircle size={18} className="mt-0.5 flex-none" />
              <span>
                Something went wrong. Try again, or{' '}
                <a
                  href={mailtoFallback}
                  className="inline-flex items-center gap-1.5 font-bold text-ink underline underline-offset-2"
                >
                  <MailOpen size={15} /> open your mail app
                </a>{' '}
                instead.
              </span>
            </div>
          )}

          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[0.9rem] font-bold text-ink">Name</span>
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
                <span className="text-[0.9rem] font-bold text-ink">Email</span>
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
            </div>
            <label className="grid gap-2">
              <span className="text-[0.9rem] font-bold text-ink">Subject</span>
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
              <span className="text-[0.9rem] font-bold text-ink">Message</span>
              <textarea
                name="message"
                rows={7}
                required
                value={form.message}
                onChange={update('message')}
                placeholder="Tell me about the project or opportunity"
                className={`${inputCls} min-h-[150px] resize-y`}
              />
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 self-start rounded-xl bg-gradient-to-br from-cyan to-violet px-5 py-3 font-display text-[1rem] font-bold text-[#04141d] transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={17} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send Message <Send size={17} />
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
