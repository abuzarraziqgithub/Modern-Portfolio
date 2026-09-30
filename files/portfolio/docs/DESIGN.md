# Design brief

Sampled by eye from the reference video, so refine values in the browser. Look and structure are reference-inspired, all content and artwork are original.

## Tokens (`src/styles/tokens.css`)
| Token | Value | Use |
|---|---|---|
| `--page` | `#FFFFFF` | page |
| `--card` | `#F4F4F2` | cards, bento tiles |
| `--ink` | `#0E0E0C` | text, nav pill |
| `--muted` | `#6C6C66` | secondary text (AA on `--page`) |
| `--glow-1` / `--glow-2` | `#FFE94A` / `#FFF7B0` | hero glow, button glow |
| `--pill-active-bg` / `-fg` | `#3B3300` / `#FFE94A` | active nav item |
| `--radius-card` / `-tile` / `-pill` | `28px` / `20px` / `999px` | vary radii by role |

Light theme only (`color-scheme: light`). Yellow text only on dark backgrounds. Shadows are soft and low, never one identical grey shadow on everything.

## Type
- Display and body: **Inter Tight** variable. Giant name 600 weight, tracking about -0.05em, line-height 0.85. Body 17-18px, line-height 1.55, max 62ch.
- Handwritten notes: **Caveat**, slightly rotated, muted colour, used only for short annotations (max 8 words). Never for body copy.
- Fluid scale with `clamp()`. Preload only the display font file. Metric-matched fallback via `size-adjust`.

## Sections (single page, anchors `#hey #work #story #chat`)
```
HEY      [ nav pill, sticky, centered ]
         yellow radial glow from top edge, fades to white by 70% height
         intro line (top-left, muted, max 2 lines)
         giant name, bottom-aligned, one line >= 600px, two stacked lines below
         polaroid peeks over the name after 1.4s (user photo + caption)

WORK     handwritten note (tilted) + "My latest work" centred
         project cards stack as you scroll (position: sticky)
         card = logo + title | arrow / one-line pitch / two overlapping shots cropped by the card
         hover: shots lift 8px, arrow nudges. Whole card is one link.
         Below: stack chips + <details> "The hard part"

STORY    bento of grey tiles: text | polaroid rail (scroll-snap, tilted) | doodle tile | text
         collage of project shots and polaroids around a centred line,
         drifting at different speeds on scroll

CHAT     handwritten note + huge glossy black "Connect" pill
         press opens a bottom dock: email + social icons (magnify on hover)
```
- Mobile (below 700px): one column, cards lose the overlap and show one shot, rail is full-bleed, collage becomes a two-column stagger with no drift, nav pill stays top-centre but compact.
- Wide (1600px and up): content max-width 1200px centred, giant name keeps filling the container width. Test 2560px.
- Backend-only projects: if there is no UI, use the `visual` field. `terminal` renders the user's real pasted output in a styled window, `diagram` renders their SVG. Never fabricate output.

## Doodles
Inline SVG, `stroke-linecap: round`, 2-3px stroke, slightly irregular paths, each under 600 bytes: arrow, sparkle, squiggle underline, burst, heart-arrow, browser-window frame. Draw them yourself.

## Accessibility and SEO
Skip link, real `<nav>`, one `<h1>`, visible focus ring (3px ink with yellow offset), 44px touch targets, `lang="en"`, dock closes on Esc. `<title>`, description, canonical, OG image, JSON-LD `Person` with real links only.
