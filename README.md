# Jennifer — Chapter 23

A cinematic, interactive birthday experience created with love for KPANOU Jennifer.

## Art direction

Editorial black canvas, heart-shaped photographic mosaic, floating portrait archive, warm ivory typography, champagne accents, wishes revealed through interaction, and a handwritten papyrus letter finished with a wax seal.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

## Portrait assets

The app expects seven personal portraits in `public/images/`:

- `jennifer-01.webp` … `jennifer-07.webp`

Extract the companion archive `jennifer-portrait-assets.zip` at the repository root. It contains the folder `public/images/` with the optimized portraits supplied for this birthday project.

## Current scope

- Interactive balloon welcome
- Cinematic editorial archive and portrait lightbox
- Four individually revealed wishes
- Papyrus letter with progressive writing animation
- Wax seal interaction and replay action

The current branch is an implementation preview. Run the production build and test the experience on desktop and mobile before merging into `main`.
