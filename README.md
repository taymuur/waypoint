# waypoint

a trip itinerary planner — every stop, sorted.

(the name is always lowercase; see [DESIGN.md](./DESIGN.md) for the design system,
Tailwind tokens, and brand guidelines.)

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — design tokens live in `src/index.css` (`@theme`)

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
```

## Live site

Every merge to `main` auto-deploys to **https://taymuur.github.io/waypoint/** via
GitHub Actions (`.github/workflows/deploy.yml`).

One-time setup (repo owner): GitHub → Settings → Pages → "Build and deployment" →
set **Source** to **GitHub Actions**. That's it — the next merge to `main` publishes.
