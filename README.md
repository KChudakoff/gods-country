# GODS COUNTRY — Visual Foundation

This repository contains the first visual implementation of the GODS COUNTRY website built with Next.js, TypeScript, Tailwind CSS and Framer Motion.

Getting started

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Where to replace placeholder assets

- Replace the hero image: `public/placeholder-hero.jpg`
- Replace the world image: `public/placeholder-world.jpg`
- Replace gallery images: `public/placeholder-1.jpg`, `public/placeholder-2.jpg`, `public/placeholder-3.jpg`, `public/placeholder-4.jpg`
- Subtle grain: `public/grain.png`

Configuration

- Server IP (displayed in UI): `components/ServerPanel.tsx` (variable `ip`)
- Discord link: update `pages/_app.tsx` meta or `components/Nav.tsx` / `components/Footer.tsx` links

Project structure

- `pages/` — Next.js page routes
- `components/` — Reusable editorial components
- `styles/` — Tailwind entry + CSS variables
- `public/` — Placeholder images and grain texture

Notes

- Typography scale, whitespace, composition and animation are implemented with editorial scale and slow, deliberate motion.
- This implementation focuses on visuals and responsiveness. No auth, payments, or database are included.
