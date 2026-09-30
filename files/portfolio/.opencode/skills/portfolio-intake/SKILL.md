---
name: portfolio-intake
description: Use when content/ is missing, empty or has placeholders, when the build fails on content validation, or when the user wants to add or change a project, photo, story text, link or the hero intro. Collects real content from the user and writes it into content/ without inventing anything.
---

# Portfolio intake

## Workflow
1. Run `node scripts/validate-content.mjs`. Group the errors by file.
2. Send ONE message asking only for what is missing, as a numbered list. Say exactly where to drop files (`content/assets/polaroids/`, `content/assets/projects/<slug>/`). Accept rough notes, the user's wording is the source.
3. Write the answers into the content files, keeping the template structure. Fix grammar and tighten wording, never change facts, never add claims, metrics or adjectives the user did not give.
4. Show the rewritten `intro`, each `pitch` and each `hard_part` back to the user in a short list and wait for a yes or an edit.
5. Re-run validation and report what is still missing. If a required field is still empty, stop and say what it blocks.

## Questions to ask
**Hero and connect:** one sentence to say above your name; name style (full or first only); email; which socials and their URLs; resume PDF or none; final site URL.

**Each project (3 to 5):**
1. What does it do and for whom, in one line?
2. Your role (solo, team, which part)?
3. Stack?
4. The hard part: one real problem you hit and how you solved it.
5. Live link and repo link?
6. Visual: real screenshots (desktop, optional mobile with alt text), OR for a backend-only project, paste a real `curl` request and response, or supply your own SVG diagram.

**Story:** where you are from, how you got into code, what you do now, the Urdu and English tech videos (platforms, rough audience only if you want to state it). 3 to 6 photos, each with alt text and a caption of 4 words or fewer.

## Rules
- Never fill a gap with plausible text. Empty is better than invented.
- If the user says "skip" on an optional item, delete that block from the file.
- Do not ask for what is already in `content/`. Do not ask more than once.
