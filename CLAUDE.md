# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed via npm in the project root (`node_modules/puppeteer`). Chrome is managed by Puppeteer automatically.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
**Exception for VND project:** Use separate CSS files per page. No inline styles. No Tailwind.
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
    **Exception for VND:** All headings use `letter-spacing: 0` per the VND type scale.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color


# VND Design System — Claude Code Reference
Very Nice Design · verynice.design
Read this file before every session. All values pulled directly from Figma variables and text styles.

---

## Tech Stack
- HTML / CSS / Vanilla JS
- GitHub Pages deployment
- No frameworks, no build tools
- CSS: `global.css` for shared styles, one page-specific CSS file per page

---

## Colors

From Figma Brand variable collection. Three ramps: Ink, Cream, Lime.

### CSS Custom Properties (actively used in codebase)
```css
/* Ink */
--ink:        #1B1B1B;
--ink-80:     #494949;
--ink-60:     #767676;
--ink-40:     #A4A4A4;
--ink-20:     #D1D1D1;
--ink-10:     #E8E8E8;

/* Cream */
--cream:      #F7F5F3;

/* Lime */
--lime: #EEF4A9;

/* Foundation */
--white: #FFFFFF;
```

### Full Color Ramp Reference

Use this table when you need a specific shade. Pick by name — do not invent values.

| Name | Ink | Cream | Lime |
|---|---|---|---|
| -40 (darkest dark) | #0B0B0B | #636261 | #5F6244 |
| -60 | #101010 | #949392 | #8F9265 |
| -80 | #161616 | #C6C4C2 | #BEC387 |
| Base | #1B1B1B | #F7F5F3 | #EEF4A9 |
| 80 | #494949 | #F9F7F5 | #F1F6BA |
| 60 | #767676 | #FAF9F8 | #F5F8CB |
| 40 | #A4A4A4 | #FCFBFA | #F8FBDD |
| 20 | #D1D1D1 | #FDFDFD | #EEF4A9 |
| 10 (lightest) | #E8E8E8 | #FEFEFE | #EEF4A9 |

### Hairlines
```css
/* On cream backgrounds */
border: 1px solid rgba(26,26,26,0.08);

/* On ink/dark backgrounds */
border: 1px solid rgba(247,245,243,0.08);
```

---

## Fonts

```css
--serif: 'cofo-raffine', Georgia, serif;
/* Adobe Fonts Typekit — kit ID: xrb8sgt */

font-family: 'Syne', sans-serif;
/* Google Fonts */
```

---

## Typography Scale

All values from Figma text styles. Use these exactly — never invent sizes.

### Desktop Text Styles

| Figma Style | Font | Weight | Size | Line Height | Letter Spacing | Transform |
|---|---|---|---|---|---|---|
| DESKTOP/HEADING/H1 | CoFo Raffine | Medium | 120px | 108px | 0 | — |
| DESKTOP/HEADING/H2 | CoFo Raffine | Medium | 56px | 64px | 0 | — |
| DESKTOP/HEADING/H3 | Syne | Regular | 40px | 48px | 0 | — |
| DESKTOP/HEADING/H4 | Syne | Regular | 28px | 36px | 0 | — |
| DESKTOP/HEADING/UI | Syne | Medium | 20px | 28px | 0 | — |
| DESKTOP/TEXT/Lead | Syne | SemiBold | 18px | 28px | 0 | — |
| DESKTOP/TEXT/Body | Syne | Regular | 16px | 26px | 0 | — |
| DESKTOP/TEXT/Small | Syne | Regular | 14px | 20px | 0 | — |
| DESKTOP/UI/LG Caption | Syne | SemiBold | 16px | 24px | 0.06em | UPPERCASE |
| DESKTOP/UI/Caption | Syne | SemiBold | 12px | 18px | 0.06em | UPPERCASE |
| DESKTOP/UI/Label | Syne | Medium | 10px | 16px | 0.04em | — |

### Mobile Text Styles

| Figma Style | Font | Weight | Size | Line Height | Letter Spacing | Transform |
|---|---|---|---|---|---|---|
| MOBILE/HEADING/H1 | CoFo Raffine | Medium | 40px | 48px | 0 | — |
| MOBILE/HEADING/H2 | CoFo Raffine | Medium | 32px | 40px | 0 | — |
| MOBILE/HEADING/H3 | Syne | Regular | 26px | 34px | 0 | — |
| MOBILE/HEADING/H4 | Syne | Regular | 22px | 30px | 0 | — |
| MOBILE/HEADING/UI | Syne | Medium | 18px | 26px | 0 | — |
| MOBILE/TEXT/Lead | Syne | SemiBold | 16px | 24px | 0 | — |
| MOBILE/TEXT/Body | Syne | Regular | 14px | 22px | 0 | — |
| MOBILE/TEXT/Small | Syne | Regular | 12px | 18px | 0 | — |
| MOBILE/UI/LG Caption | Syne | SemiBold | 14px | 22px | 0.06em | UPPERCASE |
| MOBILE/UI/Caption | Syne | SemiBold | 10px | 16px | 0.06em | UPPERCASE |
| MOBILE/UI/Label | Syne | Medium | 8px | 12px | 0.04em | — |

### Responsive Token Reference

From Figma Responsive variable collection (Desktop / Mobile):

| Token | Desktop Size | Desktop LH | Mobile Size | Mobile LH |
|---|---|---|---|---|
| h1 | 120px | 108px | 40px | 48px |
| h2 | 56px | 64px | 32px | 40px |
| h3 | 40px | 48px | 26px | 34px |
| h4 | 28px | 36px | 22px | 30px |
| ui | 20px | 28px | 18px | 26px |
| lead | 18px | 28px | 16px | 24px |
| body | 16px | 26px | 14px | 22px |
| small | 14px | 20px | 12px | 18px |
| lg caption | 16px | 24px | 12px | 18px |
| caption | 12px | 18px | 10px | 16px |
| label | 10px | 16px | 8px | 12px |

Design viewports: 1512px (desktop), 390px (mobile).

---

## Spacing Scale

Base unit: 8px. Values confirmed from Figma homepage audit.

| Value | Usage |
|---|---|
| 8px | Component internal gaps. Eyebrow to h2 on mobile. h2 to body on mobile. |
| 16px | Eyebrow to h2 on desktop. h2 to body on desktop. Card gaps. Body to button on mobile. |
| 24px | Body to button on desktop. Column gaps. Page left/right margin on mobile. |
| 48px | Section content top padding on mobile. |
| 96px | Page left/right margin on desktop. Section top padding on desktop. |
| 128px | Hero content top offset on desktop. |

### Page horizontal padding
```css
--page-x: clamp(24px, 6.42vw, 96px);
```
- Minimum: 24px (at 390px viewport and below)
- Maximum: 96px (at 1512px viewport and above)
- Scales fluidly between those bounds — no media query needed
- Apply to all sections: `padding-left: var(--page-x); padding-right: var(--page-x);`
- Exception: full-bleed sections (hero, CTA background, footer) extend edge to edge. Apply `--page-x` to the inner content wrapper only, not the section element itself.

---

## Breakpoints

| Name | Value |
|---|---|
| Desktop | > 1023px — no media query needed |
| Tablet | max-width: 1023px |
| Mobile | max-width: 767px |

- All styles live in CSS files only — never in HTML style attributes or script tags
- Desktop styles are written at the root level of each CSS file, no media query wrapper
- Tablet overrides go inside `@media (max-width: 1023px)` at the bottom of each CSS file
- Mobile overrides go inside `@media (max-width: 767px)` below the tablet block
- Order inside each CSS file: root styles → tablet block → mobile block

---

## CSS Architecture Rules

1. `global.css` — nav, footer, buttons, eyebrow, h2, cursor, reveal animations
2. Page CSS files — page-specific layout only
3. Section heading classes must NOT set font-family, font-size, font-weight, or line-height — inherit from the global `h2` rule
4. Never duplicate a rule already in `global.css`
5. Never use `!important`

### Global h2 Rule
```css
h2 {
  font-family: 'cofo-raffine', serif;
  font-weight: 500;
  font-size: 56px;
  line-height: 64px;
  letter-spacing: 0;
}
@media (max-width: 1023px) { h2 { font-size: 40px; line-height: 48px; } }
@media (max-width: 767px)  { h2 { font-size: 32px; line-height: 40px; } }
```

---

## Components

### Eyebrow
```css
.eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Syne', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.eyebrow::before {
  content: '';
  display: block;
  width: 28px;
  height: 1px;
  background: currentColor;
  flex-shrink: 0;
}
.eyebrow + h2 { margin-top: 16px; }

@media (max-width: 767px) {
  .eyebrow + h2 { margin-top: 8px; }
}
```

### Buttons

Two variants only. No other button styles exist on this site.

**Variant 1 — Ink (on cream/light backgrounds)**
```css
.btn-morph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 32px;
  background: #1B1B1B;
  color: #F7F5F3;
  border: 1px solid #1B1B1B;
  border-radius: 100px;
  font-family: 'Syne', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  cursor: none;
  position: relative;
}
.btn-morph:hover {
  transform: rotate(-2deg) translateY(-2px);
  box-shadow: 5px 6px 0 0 #C5CA7A;
}
```

**Variant 2 — Cream (on ink/dark backgrounds)**
```css
.btn-morph-cream {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 32px;
  background: #F7F5F3;
  color: #1B1B1B;
  border: 1px solid #1B1B1B;
  border-radius: 100px;
  font-family: 'Syne', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  cursor: none;
  position: relative;
}
.btn-morph-cream:hover {
  transform: rotate(-2deg) translateY(-2px);
  box-shadow: 5px 6px 0 0 #1B1B1B;
}
```

**Rules**
- Never full-width on desktop or mobile unless explicitly shown in a design screenshot
- Text links (e.g. "View work →") are plain `<a>` tags — no border, no background
- The nav "Let's Talk" button switches from ink to cream variant when `.scrolled` is on `#nav`
- The hover dot animation (`span.btn-dot` elements) is handled by existing JS — do not rewrite it

---

## Navigation

Desktop: fixed, 88px tall, wordmark logo. On scroll (`.scrolled`): dark background + blur, icon-only logo.
Mobile (`max-width: 1023px`): hamburger replaces nav links, cursor hidden.

---

## Footer

```css
background: #0F0F0F;
padding: 72px max(64px, calc((100vw - 1280px) / 2)) 44px;
```
Four columns: logo+tagline / Work / Studio / Connect. Kaj illustration bottom-right with proximity tail-wag.

```css
@media (max-width: 1023px) {
  footer { padding: 56px 24px 36px; }
  .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
}
@media (max-width: 767px) {
  .footer-kaj-wrap { display: none; }
}
```

---

## Scroll Snap (Services page only)

Never disable. Reduce padding/font-size to fit content within 100vh instead.

```css
html, body { scroll-snap-type: y mandatory; }
.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 100vh;
  overflow: hidden;
}
```

---

## Case Study Structure

Section order: Hero → Metrics band → Meta row → Context → Research → System Design → Before/After → Validation → Results → Prev/Next

### Key Insight Card
```css
background: var(--ink);
border-radius: 8px;
padding: 28px 24px;
```
- Label: Syne SemiBold, 9px, `rgba(247,245,243,0.35)`, uppercase, ls 0.1em
- Insight text: CoFo Raffine Medium, cream, 20–22px
- Hairline: `rgba(247,245,243,0.08)`
- Drive label: Syne SemiBold, 11px, `#EEF4A9`
- Drive value: Syne Regular, 12px, `rgba(247,245,243,0.45)`

### Act Cards (System Design)
```css
background: var(--ink);
border-radius: 8px;
padding: 24px;
position: relative;
overflow: hidden;
```
- Ghost number: 80px, `rgba(238,244,169,0.07)`, absolute top-right
- Act label: Syne SemiBold, 9px, `#EEF4A9` (lime) — fades: 01 full, 02 60%, 03 35%
- Act name: CoFo Raffine Medium, cream, 20–22px
- Deliverables: Syne Regular, 11–12px, `rgba(247,245,243,0.45)`, plain lines with hairline row dividers

---

## Copy Rules

- No em dashes anywhere, ever
- Sentence case for all headings
- Eyebrows and section labels are uppercase via CSS `text-transform: uppercase` only — never written in uppercase in HTML
- No bullet points — plain stacked lines with hairline dividers
- Smart quotes in HTML: `&ldquo;` `&rdquo;` `&lsquo;` `&rsquo;`
- Voice: I/my throughout, except case study body copy which uses we

---

## Working Method

- Read this file before starting any task
- Confirm each section via screenshot before moving on
- Never move to the next page until current is confirmed done
- When in doubt on spacing, use the nearest value from the spacing scale
- Never invent type sizes not listed in this file
- This file overrides anything currently in the browser or in existing CSS