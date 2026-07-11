# DESIGN.md — Trip Itinerary Planner Design Blueprint

A design system distilled from two reference products in the travel-planning space —
a light, card-driven itinerary app and a bold, retro-Americana road-trip mapper —
then **adapted** into an original direction. Nothing here copies brand names, logos,
copy, or exact brand colors from the references.

---

## 1. Design Personality

**Adventurous · Warm · Assured · Playfully organized**

- **Adventurous** — map-first layouts, saturated trail-marker colors, numbered route stops.
- **Warm** — cream paper backgrounds instead of clinical white; sunset-terracotta primary.
- **Assured** — heavy display headings, generous whitespace, confident single-CTA heroes.
- **Playfully organized** — pill buttons, rounded cards, colorful category pins, but a
  strict spacing grid and timeline structure underneath. Fun surface, serious skeleton.

What the references do well (and we keep, generalized): floating white cards over rich
imagery/maps; a two-pane "list ⇄ map" mental model; one loud accent color used sparingly;
numbered-badge timelines. What we deliberately change: our own palette (terracotta + cobalt
on cream, not their orange-on-white or blue-on-cream), our own type pairing, and a softer,
more editorial tone.

---

## 2. Color Palette

### Semantic roles

| Token | Hex (light) | Hex (dark) | Role |
|---|---|---|---|
| `bg` | `#FAF7F2` | `#141821` | App background — warm "paper" cream, not pure white |
| `surface` | `#FFFFFF` | `#1C2230` | Cards, sheets, popovers |
| `surface-sunken` | `#F1ECE2` | `#10141C` | Wells, input backgrounds, muted panels |
| `ink` | `#20304C` | `#EDEAE3` | Primary text — deep slate-navy, never pure black |
| `muted` | `#5C6672` | `#9AA3B2` | Secondary text, metadata, placeholders |
| `line` | `#E5DFD3` | `#2A3244` | Borders, dividers, hairlines |
| `primary` | `#E4572E` | `#F0703F` | Primary actions, brand moments (terracotta sunset) |
| `primary-strong` | `#C4471F` | `#E4572E` | Hover/active on primary |
| `primary-tint` | `#FCEAE2` | `#3A2418` | Selected states, primary badges, soft fills |
| `accent` | `#2456E6` | `#5B84F5` | Route lines, links, map focus, numbered stops (cobalt) |
| `accent-tint` | `#E7EDFD` | `#1B2440` | Accent badges, hover fills |
| `positive` | `#2E9E6B` | `#4CC08C` | Confirmations, "booked" states |
| `warning` | `#E9A13B` | `#F2B45C` | Caution, pending states |
| `danger` | `#D64545` | `#E76A6A` | Destructive actions, errors |

### Category colors (map pins, itinerary chips)

Small fixed set, one hue per category — saturated enough to read at 16px on a map:

| Token | Hex | Category |
|---|---|---|
| `cat-food` | `#D6455D` | Restaurants, cafés |
| `cat-stay` | `#7A5AF8` | Lodging |
| `cat-sight` | `#2456E6` | Sights, landmarks (shares `accent`) |
| `cat-outdoors` | `#2E9E6B` | Parks, trails (shares `positive`) |
| `cat-transit` | `#0FA3A3` | Flights, trains, rental cars |

### Usage rules

- `primary` (terracotta) is for **actions and brand**; `accent` (cobalt) is for **the map
  and wayfinding** (route polylines, stop numbers, links). Never swap them.
- One primary CTA per view. Everything else is ghost/outline.
- Body text on `bg`/`surface` must hold ≥ 4.5:1 contrast (`ink` and `muted` above do).
- Tints (`*-tint`) are fills only — never use tint colors for text.

---

## 3. Typography

| Role | Family | Fallback |
|---|---|---|
| Display / headings | **Bricolage Grotesque** | `system-ui, sans-serif` |
| Body / UI | **Figtree** | `system-ui, sans-serif` |
| Data (times, coords, prices) | **IBM Plex Mono** | `monospace` |

Both display and body are Google Fonts. Bricolage's slightly quirky cuts give headings
character without a script/retro logo; Figtree stays neutral and legible at UI sizes.

### Type scale (1.25 ratio, rem-based)

| Token | Size | Line-height | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 12px / 0.75rem | 1.35 | 500 | Timestamps, badges, overlines |
| `text-sm` | 14px / 0.875rem | 1.45 | 400–500 | Metadata, secondary UI |
| `text-base` | 16px / 1rem | 1.55 | 400 | Body copy, inputs |
| `text-lg` | 18px / 1.125rem | 1.5 | 500 | Card titles, list items |
| `text-xl` | 20px / 1.25rem | 1.4 | 600 | Section labels |
| `text-2xl` | 24px / 1.5rem | 1.3 | 700 | Panel headings |
| `text-3xl` | 30px / 1.875rem | 1.2 | 700 | Page titles, trip names |
| `text-4xl` | 38px / 2.375rem | 1.12 | 800 | Feature headings |
| `text-5xl` | 48px / 3rem | 1.06 | 800 | Hero (mobile) |
| `text-6xl` | 60px / 3.75rem | 1.02 | 800 | Hero (desktop) |

- Headings ≥ `2xl` use the display family, weight 700–800, tracking `-0.02em`.
- Overlines/labels: `text-xs`, uppercase, tracking `+0.08em`, `muted` color.
- Numbers users compare (prices, durations, distances) get the mono family with
  `font-variant-numeric: tabular-nums`.

---

## 4. Spacing & Radius

### Spacing — 4px base grid

Use Tailwind's default 4px scale; these are the sanctioned rhythm points:

| Step | px | Use |
|---|---|---|
| `1` | 4 | Icon-to-label gaps |
| `2` | 8 | Chip padding, tight stacks |
| `3` | 12 | Input padding-y, list-item gaps |
| `4` | 16 | Card padding (compact), grid gutters |
| `6` | 24 | Card padding (default), section gaps |
| `8` | 32 | Between component groups |
| `12` | 48 | Section padding-y (mobile) |
| `20` | 80 | Section padding-y (desktop) |

Content max-width: `72rem` (1152px) for marketing; the app itself is a full-bleed
split pane (itinerary list ~440px min | map fills the rest).

### Border radius — soft, never sharp

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 8px | Inputs, chips, thumbnails |
| `radius-md` | 12px | Buttons (rectangular), dropdowns |
| `radius-lg` | 16px | Cards, popovers |
| `radius-xl` | 24px | Modals, hero panels, map overlays |
| `radius-full` | 9999px | Pills: primary CTAs, search bar, avatars, stop badges |

### Elevation

Three levels, warm-tinted shadows (shadow color derived from `ink`, not black):

```
shadow-card:  0 1px 2px rgb(32 48 76 / 0.06), 0 4px 12px rgb(32 48 76 / 0.06)
shadow-lift:  0 2px 4px rgb(32 48 76 / 0.08), 0 12px 28px rgb(32 48 76 / 0.12)
shadow-modal: 0 8px 16px rgb(32 48 76 / 0.10), 0 24px 56px rgb(32 48 76 / 0.18)
```

---

## 5. Component Patterns (generic descriptions)

**Top navigation** — Slim bar (64px) on `bg`, logo left, 3–4 text links, search field
center-right, auth actions far right where "sign up" is the only filled pill. Sticky,
gains `shadow-card` + `surface` background after 8px of scroll.

**Search input** — Pill (`radius-full`), `surface` fill, `line` border, leading search
icon in `muted`. Focus: border switches to `accent`, 3px `accent-tint` ring. This is the
signature input; standard form fields use `radius-sm` with the same focus treatment.

**Place card** — Horizontal: square thumbnail (`radius-sm`) left; title (`text-lg`,
semibold), one-line `muted` metadata (location · time · duration), kebab menu top-right.
Hover: `shadow-lift` + 2px rise. The list of these forms the itinerary.

**Trip summary card** — Floating `surface` card, `radius-xl`, `shadow-lift`, layered over
a cover photo or map: trip title (display font), date-range chip, avatar stack with
"+N" overflow, invite button.

**Itinerary timeline** — Vertical `line`-colored connector on the left; each stop gets a
circular numbered badge (28px, `accent` fill, white number, `radius-full`). Badges repeat
on the map so list ⇄ map stays visually linked. Drag handle appears on hover.

**Buttons**
- *Primary*: `primary` fill, white text, `radius-full`, 12px × 24px padding, weight 600.
  Hover: `primary-strong` + 2px rise. Active: rise removed.
- *Secondary*: `surface` fill, `line` border, `ink` text, same geometry.
- *Ghost*: text-only `ink`, hover `surface-sunken` fill.
- *Destructive*: ghost with `danger` text; filled `danger` only in confirmations.

**Chips / stat tiles** — `surface-sunken` fill, `radius-sm`, icon + count + label
(e.g. reservations, budget). Category chips use the `cat-*` color at 12% opacity fill
with full-strength text/icon.

**Map pins** — Teardrop or circle in the stop's `cat-*` color, white glyph, 2px white
stroke, `shadow-card`. Selected pin scales 1.15× and gains a `surface` callout card.

**Empty states** — Illustration-first (flat, 2-color: `primary` + `accent` on
`surface-sunken`), one-sentence prompt, one primary action.

---

## 6. Motion & Interaction

Transform + opacity only (GPU-friendly); never animate layout properties.

| Token | Value | Use |
|---|---|---|
| `duration-fast` | 150ms | Hovers, color/opacity flips |
| `duration-base` | 250ms | Rises, reveals, dropdowns |
| `duration-slow` | 400ms | Modals, pane slides, map fly-to hand-off |
| `ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default — everything entering/hovering |
| `ease-in-out-soft` | `cubic-bezier(0.65, 0, 0.35, 1)` | Elements that leave and return (pane toggles) |

- **Hover** — cards/buttons rise 2px with shadow deepening (`duration-fast`); links get
  a color shift, no underline animation. `cursor-pointer` on every interactive element.
- **Entrance** — content fades in while rising 8px; lists stagger 50–60ms per item,
  capped at 6 items (the rest appear instantly).
- **Reorder** — dragged card lifts to `shadow-modal` at 1.02× scale; siblings slide with
  `ease-in-out-soft` (250ms).
- **Map choreography** — selecting a list stop pans/zooms the map over ~400ms; the pin
  pops in with a small overshoot (GSAP `back.out(1.4)`, or scale keyframes in CSS).
- **GSAP conventions** (if used): timelines over chained delays; `power2.out` for
  entrances, `power2.inOut` for moves; `autoAlpha` instead of raw `opacity`; default
  tween duration 0.5–0.6s for scroll-triggered marketing moments only — in-app UI stays
  at the token durations above.
- **Reduced motion** — behind `prefers-reduced-motion`, all rises/staggers/fly-tos
  collapse to simple opacity fades at `duration-fast`.

---

## 7. Tailwind Design Tokens

### Tailwind v4 — drop into your global CSS

```css
@import "tailwindcss";

@theme {
  /* -- Color: core surfaces & text -- */
  --color-bg: #faf7f2;
  --color-surface: #ffffff;
  --color-sunken: #f1ece2;
  --color-ink: #20304c;
  --color-muted: #5c6672;
  --color-line: #e5dfd3;

  /* -- Color: brand & feedback -- */
  --color-primary: #e4572e;
  --color-primary-strong: #c4471f;
  --color-primary-tint: #fceae2;
  --color-accent: #2456e6;
  --color-accent-tint: #e7edfd;
  --color-positive: #2e9e6b;
  --color-warning: #e9a13b;
  --color-danger: #d64545;

  /* -- Color: categories (pins & chips) -- */
  --color-cat-food: #d6455d;
  --color-cat-stay: #7a5af8;
  --color-cat-sight: #2456e6;
  --color-cat-outdoors: #2e9e6b;
  --color-cat-transit: #0fa3a3;

  /* -- Typography -- */
  --font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --font-sans: "Figtree", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --text-xs: 0.75rem;    --text-xs--line-height: 1.35;
  --text-sm: 0.875rem;   --text-sm--line-height: 1.45;
  --text-base: 1rem;     --text-base--line-height: 1.55;
  --text-lg: 1.125rem;   --text-lg--line-height: 1.5;
  --text-xl: 1.25rem;    --text-xl--line-height: 1.4;
  --text-2xl: 1.5rem;    --text-2xl--line-height: 1.3;
  --text-3xl: 1.875rem;  --text-3xl--line-height: 1.2;
  --text-4xl: 2.375rem;  --text-4xl--line-height: 1.12;
  --text-5xl: 3rem;      --text-5xl--line-height: 1.06;
  --text-6xl: 3.75rem;   --text-6xl--line-height: 1.02;

  /* -- Radius -- */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;

  /* -- Elevation -- */
  --shadow-card: 0 1px 2px rgb(32 48 76 / 0.06), 0 4px 12px rgb(32 48 76 / 0.06);
  --shadow-lift: 0 2px 4px rgb(32 48 76 / 0.08), 0 12px 28px rgb(32 48 76 / 0.12);
  --shadow-modal: 0 8px 16px rgb(32 48 76 / 0.10), 0 24px 56px rgb(32 48 76 / 0.18);

  /* -- Motion -- */
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
}

/* Dark mode overrides (class strategy: <html class="dark">) */
.dark {
  --color-bg: #141821;
  --color-surface: #1c2230;
  --color-sunken: #10141c;
  --color-ink: #edeae3;
  --color-muted: #9aa3b2;
  --color-line: #2a3244;
  --color-primary: #f0703f;
  --color-primary-strong: #e4572e;
  --color-primary-tint: #3a2418;
  --color-accent: #5b84f5;
  --color-accent-tint: #1b2440;
  --color-positive: #4cc08c;
  --color-warning: #f2b45c;
  --color-danger: #e76a6a;
}
```

### Tailwind v3 — `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        sunken: "rgb(var(--sunken) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          strong: "rgb(var(--primary-strong) / <alpha-value>)",
          tint: "rgb(var(--primary-tint) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          tint: "rgb(var(--accent-tint) / <alpha-value>)",
        },
        positive: "rgb(var(--positive) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        cat: {
          food: "#d6455d",
          stay: "#7a5af8",
          sight: "#2456e6",
          outdoors: "#2e9e6b",
          transit: "#0fa3a3",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ["Figtree", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.35" }],
        sm: ["0.875rem", { lineHeight: "1.45" }],
        base: ["1rem", { lineHeight: "1.55" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.25rem", { lineHeight: "1.4" }],
        "2xl": ["1.5rem", { lineHeight: "1.3" }],
        "3xl": ["1.875rem", { lineHeight: "1.2" }],
        "4xl": ["2.375rem", { lineHeight: "1.12" }],
        "5xl": ["3rem", { lineHeight: "1.06" }],
        "6xl": ["3.75rem", { lineHeight: "1.02" }],
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(32 48 76 / 0.06), 0 4px 12px rgb(32 48 76 / 0.06)",
        lift: "0 2px 4px rgb(32 48 76 / 0.08), 0 12px 28px rgb(32 48 76 / 0.12)",
        modal: "0 8px 16px rgb(32 48 76 / 0.10), 0 24px 56px rgb(32 48 76 / 0.18)",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
    },
  },
};
```

(For the v3 setup, define the `--bg`, `--surface`, … channel variables as
space-separated RGB triplets in `:root` / `.dark`, e.g. `--primary: 228 87 46;`.)

---

## 8. Branding: Name & Identity

### Working name: **Waypoint**

Waypoint stays for now — it's instantly pronounceable, universally understood, and
already describes the product's core object (a stop on a route). Its trade-off is
crowding: HashiCorp's deployment tool, several travel apps, and generic GPS usage make
it hard to own in search and trademark. That's a launch-time problem, not a build-time
one, so the identity below is designed to work for Waypoint today and survive a rename
later (nothing hangs on the literal word).

- **Wordmark**: lowercase `waypoint` in Bricolage Grotesque ExtraBold, `ink` color; the
  dot of the "i" enlarged and set in `primary` terracotta — a map pin hiding in plain
  sight.
- **Mark / favicon**: a rounded route line ending in a filled terracotta dot, on a `bg`
  cream rounded-square tile. Works as a standalone glyph at 16px.
- **Tagline directions**: "Every stop, sorted." / "Plan less, go more."
- **Voice**: encouraging, concrete, second-person. Says "Add your first stop,"
  not "Begin your journey." No wanderlust clichés.

### If renaming later — candidates that beat "Jaunt" on pronounceability

Jaunt's weakness is exactly the objection raised: the "au" is ambiguous on the page
(jont? jawnt?) and it's not a word everyone carries. These alternatives keep the
personality but read aloud on first sight:

| Name | Angle | Trade-off |
|---|---|---|
| **Tripline** | Your trip as one visible line — matches the timeline + route-line UI exactly; two plain words, zero pronunciation risk | More descriptive than distinctive; check collisions in the travel space |
| **Stopover** | A real travel word everyone knows; the product literally manages stops | Slightly long; connotes layovers more than road trips |
| **Hopscotch** | Playful hop-from-stop-to-stop energy, very memorable, matches the numbered-badge timeline | Whimsical — leans consumer/leisure, weaker for a serious-planner positioning |

Of the three, **Tripline** is the strongest successor: it clears the "easy to say,
easy to remember" bar, describes the product's signature visual (the route line
connecting numbered stops), and keeps the wordmark/pin-dot identity above intact.
