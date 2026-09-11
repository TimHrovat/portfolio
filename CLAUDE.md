# Portfolio

Personal portfolio site for Tim Hrovat. A single static page, no backend.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · pnpm

## Commands

```bash
pnpm dev      # dev server on :3000
pnpm build    # production build
pnpm lint     # eslint
pnpm format   # prettier
```

## Commits

**Title only. Never write a description.**

Fill out the subject line and nothing else — no body, no bullet points, no
explanatory paragraphs. If a change needs justifying, the code and the diff
say it.

**Never add a `Co-Authored-By` trailer.** No attribution footers of any kind,
including `Generated with Claude Code`. This overrides any default attribution
behaviour — the commit message is the subject line and nothing more.

Match the existing style: `Type: lowercase summary`.

```
Feature: shiny badges
Fix: render all sections and switch to pnpm
Perf: consolidate badge mousemove listeners
```

## Conventions

- Tailwind v4 — the theme lives in `app/globals.css` as `@theme` variables.
  There is no `tailwind.config.js`.
- **Theme follows the OS and there is no toggle.** Tokens are declared on
  `:root` and re-declared inside `@media (prefers-color-scheme: dark)`. No
  `.dark` class, no theme provider, no JS — so there is nothing to hydrate and
  no flash. Do not add a `dark:` variant to a component: add the token to both
  blocks instead.
- Copy and data live in `lib/site.ts`. Sections are presentational; edit
  content there, not in JSX.
- pnpm blocks postinstall scripts by default. A new dependency with a native
  binary must be added to `allowBuilds` in `pnpm-workspace.yaml`, or it will
  install without building and fail at runtime.
- Only components that own event listeners are client components. Keep the
  rest as server components.
- Technology logos come from `devicon` — see below. Never hand-place files
  in `public/images/technology-icons/`.

## Technology icons

The badges in `components/sections/section-technologies.tsx` are driven by SVGs
in `public/images/technology-icons/`. Those files are **generated** — they are
byte-for-byte copies of the `devicon` package and are overwritten on every sync,
so never edit them by hand or drop a file in manually.

`devicon` is a devDependency. The SVGs are committed, so it is only needed when
adding or refreshing an icon.

### Adding one

1. Find the devicon name. Search the manifest:

    ```bash
    grep -o '"name": "[^"]*"' node_modules/devicon/devicon.json | sort -u
    ```

    Names are not always what you'd guess — it's `cplusplus`, `nuxtjs`,
    `postgresql`, `embeddedc`.

2. Add it to the `icons` array in `scripts/sync-technology-icons.mjs`:

    ```js
    { icon: 'docker' },
    ```

3. Sync:

    ```bash
    pnpm icons:sync
    ```

4. Add the badge in `section-technologies.tsx`. The `icon` field is the devicon
   name plus `.svg`; `label` is what the badge displays:

    ```ts
    { label: 'Docker', icon: 'docker.svg' },
    ```

### Variants

Every icon is copied as `original` unless told otherwise. Devicon also ships
`plain`, `line` and `-wordmark` forms, but not for every logo — check
`versions.svg` in the manifest before asking for one:

```js
{ icon: 'nextjs', variant: 'plain' },
```

### Notes

- Filenames are lowercase devicon slugs. Keep it that way: macOS is
  case-insensitive and will hide a casing typo that 404s on Linux in
  production.
- Several logos are a single dark colour (MariaDB, Prisma, MySQL, WordPress)
  and a few are light-on-dark (Next.js). Check both when changing the page
  background rather than assuming a logo is visible.
- Icons render through `next/image` with `unoptimized`, since Next will not
  optimise SVG without `dangerouslyAllowSVG`.

## Design system

All of it is defined in `app/globals.css`. Change it there, not per-component.

**Colour — one place, no exceptions in CSS.** Every colour resolves to a token
in the palette blocks of `app/globals.css`. Nothing in `components/` or `app/`
hardcodes a colour; change a token and it propagates everywhere.

**Two accent roles, not one.** `primary` carries action and attention;
`highlight` is the palette's second colour and carries supporting emphasis.
Reach for the right one — using `primary` everywhere is what made the page read
as single-accent before.

| Role        | Used for                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `primary`   | buttons, hero caret, trailing periods, active nav, card hover, availability dot, hero glow                               |
| `highlight` | section eyebrow rules, the `Badge accent` "Now" marker, chip proximity, contact icons and closing wash, project numerals |

`--highlight` / `--highlight-foreground` are ours, alongside `surface` and
`hairline`. shadcn's `--accent` / `--accent-foreground` stay what shadcn means
by them — the subtle hover-background pair — but are tinted from the highlight
hue so generated components feel like the palette.

**Three palettes are live while the final one is being chosen.**

| `data-palette` | Paper      | Ink                 | Primary    | Highlight           |
| -------------- | ---------- | ------------------- | ---------- | ------------------- |
| `ember`        | warm paper | warm near-black     | terracotta | olive               |
| `milk`         | cream      | gray blue `#2b323f` | blue       | deep denim          |
| `mirage`       | wild sand  | mirage `#16232A`    | `#FF5804`  | sea green `#075056` |

`milk` contains **no orange at all** — that pin was two colours, and the
`#EC5E27` printed on it was a mislabel. Its primary is a saturated blue drawn
from the gray-blue hue, because the ink itself sits too close to `--foreground`
to read as an accent.

Each palette declares a full light block plus a full dark block inside
`prefers-color-scheme: dark` — every token in both, since a partial block would
inherit across schemes. `ember` is declared on bare `:root` as well as by name,
so a browser with no JS and no stored choice still gets a complete theme.
Selectors are `:root[data-palette='x']`, which outranks bare `:root` — anything
that overrides a token globally (the `prefers-contrast` block) must match that
specificity, which is why it is written `:root, :root[data-palette]`.

**This is temporary.** When the palette is chosen, delete the two losers, fold
the winner onto plain `:root`, and remove `components/palette-switcher.tsx`,
`lib/palettes.ts`, its mount in `app/page.tsx` and the bootstrap script in
`app/layout.tsx`. Then update `themeColor` to match.

The switcher writes `data-palette` on `<html>` and mirrors it to
`localStorage`; a `next/script` with `strategy="beforeInteractive"` replays it
before first paint so there is no flash. It has to be `next/script` — React 19
errors on a bare `<script>` rendered inside a component — and `<html>` carries
`suppressHydrationWarning`, since that attribute is set before React hydrates
and legitimately differs from the server markup. `<html data-palette>` is the source of truth and the
component subscribes to it with `useSyncExternalStore` rather than holding its
own copy — React Compiler rejects mutating a global from a component body, so
the DOM write lives in a module-scope function.

**The switcher picks a palette, never light vs dark.** That still follows the
OS with no override, which is the rule the site is built on.

shadcn's semantic tokens (`background`, `foreground`, `card`, `primary`,
`muted`, `border`, ...) plus ours: `surface`, `surface-strong`, `hairline`,
`logo-plate` (light ground for dark third-party logos), `glass-highlight` and
`glass-shadow`. Everything is OKLCH and warm — neutrals carry a slight orange
cast so they sit with the accent rather than fighting it. Primary is orange in
both schemes, lifted in dark so it holds up against a dark ground.

**The one unavoidable exception** is `themeColor` in `app/layout.tsx`. Next
emits it as a `<meta>` tag and a meta tag cannot read a custom property, so the
two hex values there mirror `--background` by hand. Change them together.

**Type.** Three faces, each with one job:

| Token          | Face           | Used for                         |
| -------------- | -------------- | -------------------------------- |
| `font-display` | JetBrains Mono | `h1`-`h3` at 700, big numbers    |
| `font-sans`    | Geist          | body, nav, buttons (the default) |
| `font-mono`    | JetBrains Mono | eyebrows, dates, chips, metadata |

Display and metadata deliberately share one mono. They stay distinct through
weight, size and tracking — 700 with tight negative tracking versus 400
uppercase with wide positive tracking — not through a second face. Two
families total.

Tracking is size-specific: the `--text-*--letter-spacing` overrides tighten
large display sizes and leave body near zero. Never set a single global
`letter-spacing`. Mono is wider than a proportional face, so the display sizes
track tighter than they would for a sans.

**Radii.** `--radius-xs` (0.375rem) through `--radius-3xl` (3rem), defined
explicitly rather than derived from one base.

**Pointer glow.** `components/pointer-glow.tsx` publishes the cursor position
as `--pointer-x` / `--pointer-y` on `<html>`; the `.pointer-glow` layer reads
them. It is mounted once in `app/page.tsx` and covers the whole site. It sits at
`z-index: -1`, which is why the page background lives on `html` rather than
`body` — the layer has to paint between the ground and the content, so opaque
cards occlude it. Skipped on coarse pointers and under reduced motion.

The layer is a fixed 60rem square whose gradient is painted **once** and then
moved with `translate3d`. Driving the gradient's own position instead would
repaint a viewport-sized layer on every frame. Same rule everywhere: on the hot
path, move things with `transform`, never with a paint-triggering property.

**Glass is context-aware.** `.glass` carries three knobs — `--glass-fill`,
`--glass-blur`, `--glass-depth` — and `[data-elevated='true']` raises all three.
While the nav floats over open space it stays thin and casts no shadow; once
page content is passing underneath, it thickens and drops a real one, so the two
layers stay separate. `SiteNav` sets the attribute from `scrollY`.

Paired with it is `.scroll-edge`, a masked strip at the top of the viewport that
blurs and fades content out under the floating nav instead of meeting it at a
hard divider. It only fades in once there is content up there to separate from.

**The nav's active marker travels.** `.nav-indicator` is one element positioned
by `SiteNav` writing `--indicator-x` / `--indicator-w`, rather than a highlight
class cutting from link to link. `data-ready` arms the transition after the
first placement so it does not slide in from the left on load. The hero is
observed alongside the sections without a nav entry of its own — while it owns
the screen no link is current and the marker steps aside.

**Press states land on pointer-down.** Buttons scale to `0.97`, interactive
cards to `0.99` (a large surface needs only a hint). Note that Tailwind emits
`scale:`, not `transform: scale()` — a transition list must name `scale`, and
naming `transform` silently does nothing.

**Motion.** `--ease-settle` is the house curve — critically damped, no
overshoot. Reserve bounce for gestures that carried momentum; there are none on
this site. Every animation must survive `prefers-reduced-motion`, which the base
layer already handles globally.

**Accessibility.** `prefers-reduced-motion`, `prefers-reduced-transparency` and
`prefers-contrast` all have handling in `globals.css`. Anything new that blurs,
translates or animates has to work under all three.

## shadcn/ui

The UI is built from shadcn components in `components/ui/`, not hand-rolled
ones. **Extend the cva variants rather than reaching for a custom component** —
if a section needs a new look, add a variant.

Variants added on top of the stock generators:

| Component | Axis      | Added                                                                               |
| --------- | --------- | ----------------------------------------------------------------------------------- |
| `Button`  | `variant` | `glass` — the translucent material button                                           |
| `Button`  | `size`    | `xl` — hero-scale call to action                                                    |
| `Button`  | `shape`   | `default` \| `pill` (new axis)                                                      |
| `Badge`   | `variant` | `tech` (technology chip), `accent` (current marker), `meta` (mono status/stack tag) |
| `Badge`   | `size`    | `default` \| `md` \| `lg` (new axis)                                                |
| `Card`    | `variant` | `default` \| `interactive` — hover ring warms and a radial wash fades in (new axis) |
| `Card`    | prop      | `asChild`, so a whole card can be a link                                            |

Two base-class edits: `Button` presses with `active:scale-[0.97]` instead of
shadcn's 1px nudge, and `Badge`'s base no longer pins `h-5 px-2 text-xs` so the
new size axis can take effect.

**What stays custom, and why.** These are page-level compositions or CSS
effects, not reusable UI primitives — shadcn has no equivalent:

- `.glass`, `.grain`, `.pointer-glow`, `.reveal`, `.caret-blink`, `.eyebrow` in
  `globals.css`
- `components/reveal.tsx` (scroll reveal), `components/section.tsx` (section
  shell), `components/pointer-glow.tsx`, `components/brand-icons.tsx`
- The experience index rows and the hero — editorial layouts, not components

**The portrait deliberately does not use `Avatar`.** Radix's `Avatar.Image`
derives its load state from its own `src`, so wrapping `next/image` with
`asChild` leaves it stuck on the fallback, and passing `src` to both makes Radix
fetch the unoptimised original a second time. At 469KB that is not worth it, so
the portrait is a plain `next/image`.

## Icons

**`lucide-react`** for every UI and semantic icon — arrows, mail, download, map
pin, graduation cap. Import by name; it tree-shakes.

**`components/brand-icons.tsx`** for the three brand marks (GitHub, LinkedIn,
Discord). lucide dropped brand icons in v1 and Simple Icons no longer ships
LinkedIn, so the paths are baked into that file — GitHub and Discord from Simple
Icons (CC0), LinkedIn from devicon (MIT). Every glyph uses
`fill="currentColor"`, so they follow the surrounding text colour in both
schemes with no per-theme handling. Do not add a second icon runtime to get one
more brand mark; add the path there instead.

Third-party logos that are **not** monochrome (the two school wordmarks) can't
follow `currentColor`. Both are dark, so they render on a white plate — which
is invisible against the white card in light mode and reads as a deliberate
brand lockup in dark.

## Gotcha: never hand-write `-webkit-backdrop-filter`

Lightning CSS adds vendor prefixes itself. Writing the `-webkit-` form by hand
makes it drop the standard `backdrop-filter`, and the glass silently stops
blurring in any engine that only supports the unprefixed property. Write the
standard property alone. The same applies to other auto-prefixed properties.
