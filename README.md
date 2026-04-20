# Very Nice Design

**Portfolio site for Joyce Eller — Senior UX Designer & Founder of Very Nice Design**

Live site: https://verynicedesign.github.io/test-website
Final domain: https://verynice.design (coming soon)

## About

Source code for verynice.design, a hand-coded HTML/CSS/JS portfolio site built without frameworks or CMS dependencies. Deployed via GitHub Pages.

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- No frameworks or build tools
- Deployed via GitHub Pages

## File Structure

```
css/
  global.css        — tokens, reset, nav, footer, buttons, shared components
  index.css         — homepage-specific styles
  about.css         — About page styles
  services.css      — Services page styles
  contact.css       — Contact page styles
  case-study.css    — shared case study structural base
  bestbuy.css       — Best Buy brand colors + unique components
  pepsico.css       — PepsiCo brand colors + unique components
  normans.css       — Norman's Nursery brand colors + unique components
brand_assets/       — logos, images, illustrations
*.html              — page files
```

## Breakpoints

- **Desktop:** 1024px and above (default, no media query)
- **Tablet:** max-width 1023px
- **Mobile:** max-width 767px

## Adding a New Case Study

1. Copy `case-study.html` and rename it
2. Create a new brand CSS file in `css/` with five tokens:
   `--cs-navy`, `--cs-accent`, `--cs-accent-secondary`, `--cs-orb-color`, `--cs-scroll-color`
3. Link `css/global.css`, `css/case-study.css`, then your brand CSS file

## Running Locally

Open any `.html` file directly in a browser, or use a local server:

```sh
npx serve .
```

## Deployment

Pushes to the `main` branch deploy automatically via GitHub Pages.
