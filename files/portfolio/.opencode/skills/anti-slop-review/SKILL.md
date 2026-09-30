---
name: anti-slop-review
description: Use as the final critique pass on the finished page or after any big visual change, and whenever the user says it looks generic, templated or AI-made. A short checklist of generic-design tells and specificity tests, with a two-pass limit.
---

# Anti-slop review

## Tells to remove
- Identical rounded cards in a grid with one shadow and one radius. Vary size, radius and treatment by role.
- Gradient blobs, glassmorphism everywhere, neon glows that are not the yellow motif, purple-to-blue gradients.
- Emoji or stock icons as decoration. "Hi, I'm X" with a wave, "passionate developer", "cutting-edge", "seamless".
- Every section fading up on scroll. A three-column feature grid. Everything centred.
- Tiny low-contrast grey text. Numbered eyebrows above every heading. All-caps tracked labels.
- Fake stats, fake logos, fake testimonials, lorem, placeholder screenshots.

## Tests
- **Squint test:** blur a 1440px screenshot. Is there one clear focal point per viewport?
- **Swap test:** would the page still make sense with another name on it? Any section that could belong to anyone is generic, replace it with something only Abuzar could say or show.
- **Copy test:** every sentence is specific, plain, first person, and supported by `content/`.
- **Restraint test:** one memorable thing per viewport (giant name, glossy button, polaroid rail). If two things compete, quiet one.
- **Craft test:** spacing follows one scale, type follows one scale, nothing is 1px off, hover and focus states exist.

## Process
Screenshot at 390 and 1440. List the 5 worst problems. Fix the top 3. One more pass, then stop. Report what changed in three lines. Do not restyle things that pass.
