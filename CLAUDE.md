# Portfolio

Personal portfolio site for Tim Hrovat. A single static page, no backend.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
next-intl · pnpm

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
- **Theme follows the OS and there is no toggle in the shipped site.** Tokens
  are declared on `:root` and re-declared inside
  `@media (prefers-color-scheme: dark)`. No `.dark` class, no theme provider.
  Do not add a `dark:` variant to a component: add the token to both blocks
  instead. The one piece of JS is the dev-only scheme switcher — see the design
  system below.
- **Every displayed string lives in `messages/en.json`**, and `lib/site.ts`
  holds the structure it hangs off — see below. Sections are presentational;
  edit copy in the messages file, not in JSX.
- pnpm blocks postinstall scripts by default. A new dependency with a native
  binary must be added to `allowBuilds` in `pnpm-workspace.yaml`, or it will
  install without building and fail at runtime.
- Only components that own event listeners are client components. Keep the
  rest as server components.
- Technology logos come from `devicon` — see below. Never hand-place files
  in `public/images/technology-icons/`.

## Copy and i18n

**Not one displayed string is written in a component.** Everything a reader or
a screen reader meets — headings, buttons, the CV copy, `aria-label`s, image
alt text, the page metadata — comes from `messages/en.json` through `next-intl`.

It is set up for one locale with **no routing**: `i18n/request.ts` names the
locale and hands over the messages, `next.config.ts` wires the plugin in, and
`app/layout.tsx` reads them. There is no `[locale]` segment, no middleware and
no switcher. A second language is `sl.json` beside `en.json` and a locale to
choose between them in `i18n/request.ts` — no call site moves.

**`messages/en.json` is segmented by where the words appear**: `meta`,
`person`, `nav`, `hero`, `about`, `work`, `education`, `stack`, `projects`,
`contact`, `footer`, and `dev` for the scheme switcher. `person` is the one
cross-cutting section — the name, role, location, email and tagline are used by
several sections, and the tagline deliberately renders in both the hero and
About from that single key.

**`lib/site.ts` is the structure, not the words**: ids, hrefs, logo paths, the
`YYYY-MM` sort keys, `kind`, `plate`, `available`. Its ids are typed straight
off the messages file —

```ts
id: keyof Messages['work']['roles'];
```

— so an entry without copy behind it, or a key renamed on one side only, fails
`pnpm build` rather than rendering blank. Adding a role, project or school is
therefore two edits: the copy in `en.json`, the links and assets in `site.ts`.

**Reading it.** `getTranslations` in server components, `useTranslations` in
client ones, `t.raw` for the arrays (a role's paragraphs, a project's stack).
Three habits are worth keeping:

- **Read a whole object when its fields are optional.** `Timeline` takes each
  role's copy from `getMessages()` as a `RoleCopy`, because `highlights` and
  `stack` are there for some roles and not others — and a per-key lookup cannot
  express that. `RoleCopy` is declared in `lib/site.ts` rather than inferred,
  since an inferred union of six different shapes cannot be read uniformly.
- **Markup inside a sentence is a tag, not a split string.** Contact's heading
  is `"Let’s build something <accent>together</accent>."` and `t.rich` supplies
  the span. Never cut a sentence into fragments around JSX.
- **Decoration is not copy.** The trailing period on every section title is
  drawn by `Section` in the accent colour, so it is not in the messages. The
  full stop at the end of Contact's sentence _is_, because there it is
  punctuation.

**What stays on the client.** `app/layout.tsx` hands `NextIntlClientProvider`
only the namespaces the client components read — `nav`, `person`, `stack`,
`dev`. The CV copy never reaches the browser as messages. That is also why
`RoleHighlights` takes its toggle label as a prop and `Drawer` takes a
`closeLabel`: both are client components, and a prop keeps a whole namespace
out of the bundle.

## Technology icons

The badges in `components/sections/technologies.tsx` are driven by SVGs
in `public/images/technology-icons/`. Those files are **generated** — they are
byte-for-byte copies of the `devicon` package and are overwritten on every sync,
so never edit them by hand or drop a file in manually.

`devicon` is a devDependency. The SVGs are committed, so it is only needed when
adding or refreshing an icon.

A logo devicon does not carry goes in `scripts/icon-extras/` and is listed in
the `extras` array of the sync script with its source noted. That keeps
`public/images/technology-icons/` entirely generated — it can always be rebuilt
from scratch — while still allowing a one-off. Claude is the only one today.

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

4. Add the badge to `technologies` in `lib/site.ts`. The `id` is the devicon
   name, and it names the file as `<id>.svg`:

    ```ts
    { id: 'docker' },
    ```

5. Add its label under `stack.technologies` in `messages/en.json`, keyed by the
   same id — the `id` field will not typecheck until you do:

    ```json
    "docker": "Docker"
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
  and a few are light-on-dark (Next.js). Check both schemes when adding one
  rather than assuming it is visible. Where a mark is a single _near-black_ —
  GitHub is the case that forced it — set `plate: true` on the entry in
  `technologies` and it renders on the `--logo-plate` ground instead of
  straight onto the chip, where it would vanish in dark mode.
- Not everything has a devicon. PHPUnit has none, and "CI/CD" is a practice
  rather than a product — the nearest concrete marks are `githubactions`,
  `jenkins` and `circleci`.
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

**The palette is Apple's**, chosen out of four candidates that were live for a
while. It uses Apple's own published values rather than invented ones:
apple.com's page grey and ink for the neutrals (`#F5F5F7` / `#1D1D1F`), true
black (`#000000`) for the dark background exactly as apple.com's own dark mode
uses it, `systemBlue` for `primary` and `systemIndigo` for `highlight`. Light
and dark each use Apple's own light/dark variant of each colour (`#007AFF` →
`#2997FF`, `#5856D6` → `#5E5CE6`) rather than one value re-lit
programmatically.

It is declared as a full light block on bare `:root` plus a full dark block
inside `prefers-color-scheme: dark` — every token in both, since a partial
block would inherit across schemes.

**Dev-only: `data-scheme` pins light or dark.** `components/scheme-switcher.tsx`
is a floating three-way control (System / Light / Dark) that writes
`data-scheme` on `<html>` and mirrors it to `localStorage`; a `next/script`
with `strategy="beforeInteractive"` replays it before first paint so there is
no flash. It has to be `next/script` — React 19 errors on a bare `<script>`
rendered inside a component — and `<html>` carries `suppressHydrationWarning`,
since that attribute is set before React hydrates and legitimately differs from
the server markup. `<html data-scheme>` is the source of truth and the
component subscribes to it with `useSyncExternalStore` rather than holding its
own copy — React Compiler rejects mutating a global from a component body, so
the DOM write lives in a module-scope function.

**System is what ships**, and it removes the attribute entirely rather than
pinning the OS's current value — so the shipped site still follows the OS with
no toggle, which is the rule everything here is built on. The two
`:root[data-scheme='…']` blocks at the bottom of `globals.css` exist purely so
a change can be checked in both schemes without touching the OS setting; they
outrank the `prefers-color-scheme` block by specificity, and they knowingly
also outrank the `prefers-contrast: more` block, which is fine because they
never reach production.

shadcn's semantic tokens (`background`, `foreground`, `card`, `primary`,
`muted`, `border`, ...) plus ours: `surface`, `surface-strong`, `hairline`,
`logo-plate` (light ground for dark third-party logos), `glass-highlight` and
`glass-shadow`. Everything is OKLCH.

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
`body` — the layer has to paint between the ground and the content. Opaque
surfaces occlude it; the glass ones blur it, which is most of what gives them
something to refract. Skipped on coarse pointers and under reduced motion.

The layer is a fixed 60rem square whose gradient is painted **once** and then
moved with `translate3d`. Driving the gradient's own position instead would
repaint a viewport-sized layer on every frame. Same rule everywhere: on the hot
path, move things with `transform`, never with a paint-triggering property.

**Glass is context-aware.** `.glass` carries three knobs — `--glass-fill`,
`--glass-blur`, `--glass-depth` — and `[data-elevated='true']` raises all three.
While the nav floats over open space it stays thin and casts no shadow; once
page content is passing underneath, it thickens and drops a real one, so the two
layers stay separate. `SiteNav` sets the attribute from `scrollY`.

**Every card-like surface is that same material.** `Card glass`, which the
project and education cards use, and `Badge variant="tech"` for the technology
chips. Cards pin `data-elevated` on, since there is always something passing
behind them; the chips turn `--glass-blur` down to 12px, because there are
twenty-seven of them and a 20px blur on a 36px pill costs the same as one on a
card without looking any different.

Two traps when putting `.glass` on a component. Its `border` lives in the
components layer, so any `border-transparent` in a utility class beats it —
`Badge` has one in its base, which is why the `tech` variant restates
`border-foreground/10` (the same value `.glass` sets). And `Card`'s hover
accent has to move from `ring` to `border` when it is glass, since the material
supplies the border and the ring would sit outside it.

Paired with it is `.scroll-edge`, a masked strip at the top of the viewport that
blurs and fades content out under the floating nav instead of meeting it at a
hard divider. It only fades in once there is content up there to separate from.

**The status bar is Safari's to paint, not ours.** On iOS 26 the page scrolls
edge to edge under the Dynamic Island, but every fixed layer is clipped to the
inner viewport — negative offsets and extra height do not get out of it — so
`.scroll-edge` cannot blur that band however it is sized. What Safari paints
there is a tint it samples off the topmost fixed element, reading exactly two
properties: `background-color` and `backdrop-filter`. Three rules follow, and
breaking any one of them brings back the row of sharp content beside the
island:

- **The strip's fill is a flat `background-color`.** A gradient is a
  `background-image`, which samples as transparent — no tint, sharp content.
  The fade is the mask's job; Safari does not read masks.
- **Only one fixed element may touch the top edge.** Safari samples within
  about 4px of it and picks wrongly when several compete — `opacity: 0` does
  not take an element out of the running, only `display: none` does. So the
  nav is offset down with `top` instead of padded from `top-0`, and
  `.pointer-glow` is `display: none` on coarse pointers.
- **`viewport-fit: cover` stays** (`app/layout.tsx`), because it is what makes
  every `env(safe-area-inset-*)` resolve to anything but zero: `.scroll-edge`
  adds the top inset to its height for the clipped part, the hero adds it to
  its top padding, `body` takes the side insets for landscape and the bottom
  one for the floating toolbar, and the drawer and dev switcher take the bottom
  one too. On anything without insets every one of those is the value it had
  before.

Website tinting is a setting on the device (Settings › Apps › Safari › Tabs),
so a phone with it off shows the untinted band whatever the page does.

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

## Work and Education

`components/timeline.tsx` is the Work section: a vertical timeline, newest role
at the top, one rail down the page's **centre** with the organisation's mark as
each node and every entry centred on the same axis as the section headers and
the About prose. A left-hand rail put the whole section off-axis against a page
that is centred everywhere else.

The rail is a segment rendered above each node rather than one line behind the
list, so it spans whatever height the entry above it needs without anything
being measured.

**The job title leads.** It is the `h3`, in the display face; the employer is
the smaller line under it, and the dates are mono metadata beside that. What
the work was is the thing worth reading — who paid for it is context. The lane
chart this replaced had that the other way round, and hid every description
behind a hover popover.

It is a plain server component. The previous version needed a client half for
the follow-the-cursor popover and a mobile drawer; a vertical layout has room
for the description inline, so all of that went.

**Ordering is by `start`, descending.** `Role.start` / `Role.end` stay in
`lib/site.ts` as `YYYY-MM` strings, so a string sort is a date sort and no
`Date` is constructed anywhere. The dates as they _read_ (`from` / `to`) are
copy and live in the messages file. `end: null` means ongoing and is what draws the `Badge accent` "Now"
marker — on this CV the ongoing role also has the most recent start, so it
lands on top without a special case. The order of the array in `lib/site.ts` is
only for reading the file.

`Role.kind` is down to a single cue now: `engineering` tints the node's ring
with `primary`, `other` leaves it on the hairline. There is no legend, because
with every title spelled out there is nothing left to decode.

**Highlights mark the featured role**, and eAsistent is the only one that
carries them. Every other role is a paragraph of `description` and nothing
else. Both live in `work.roles.<id>` in the messages file, which is why
`Timeline` reads a role's copy as a `RoleCopy` object rather than key by key.

It is grouped, not flat: `{ label, items }`, rendered as a label column with
its lines beside it, a spec sheet rather than a bullet list. Nine equal bullets
are something to skim past; three named groups (_Built alone_, _Across the
stack_, _Beyond the code_) are three things to remember. The labels use the
`.eyebrow` style, and the lines sit left-aligned inside the centred panel,
since they are too long to centre without the ragged edges reading as a
mistake. Below `sm` the label stacks above its items.

**It is folded away by default.** `components/role-highlights.tsx` is the one
client component here: shut, it is a pill on the same glass; open, it is the
panel. Two details carry it.

- **One radius, not two.** The container is `rounded-3xl` in both states. CSS
  clamps a corner radius to half the shorter side, so at the shut height of
  3rem it paints as a true pill and unrolls into a 3rem box as the panel grows.
  Transitioning from an explicit `rounded-full` instead spends almost the whole
  duration at a radius still large enough to clamp, then snaps at the end.
- **Height comes from a `0fr` to `1fr` grid row,** not a transitioned
  `height`. A height transition needs a measured pixel value, which means
  reading layout on open and again whenever the content reflows; a grid row
  interpolates to the content's own height with nothing measured.

It stays one surface throughout rather than a button that swaps for a box:
stacking a second translucent surface on the first muddies both, which the
material rules above already warn about.

**The featured role is scaled up in the dimensions that already exist** — a
`size-14` mark instead of `size-12`, a `text-3xl` title instead of `text-2xl`,
and its detail on the house glass material via `Card glass`. Weight of material
is how this design system says "this one first", so there is no new colour, no
ribbon and no badge beyond the "Now" marker every ongoing role gets. If a
second role ever earns the treatment, it inherits all of it by gaining
`highlights` — nothing here is keyed to the array position.

Keep each line to a sentence or two. The moment one needs a paragraph it
belongs in `description`, or in Projects as its own card — which is where the
landing page went.

**Education is its own section**, `components/sections/education.tsx`, between
Work and Stack: the two schools as glass cards in a two-column grid, the
certificate as a slimmer row underneath — a certificate is a point in time, not
a programme, and should not be a third card pretending to be a school. School
used to share the Work section's time axis, which made the point that most of
the jobs ran alongside it, at the cost of a chart nobody needed to read that
precisely.

Each of those cards is **one link stretched over the whole surface** with
`after:absolute after:inset-0` on the heading's anchor, rather than an overlay
element with no accessible name of its own.

**Logos.** `components/org-mark.tsx` renders the mark — the timeline's rail
nodes and the education cards both use it — on a `--logo-plate` ground, because
the logos are arbitrary colours and several are dark-on-transparent. It falls
back to initials when an organisation has no usable logo — Simpliservers is the
case that forced it, its site is gone — so a missing file degrades to something
deliberate rather than a hole.

**The nav collapses at `md`, not `sm`.** Five links plus the wordmark and the
"Get in touch" button stopped fitting at `sm` when Education was added; below
`md` they go into the drawer.

**Projects: the first entry is the headline** and spans the full width of the
grid; the rest pair up underneath. `Project.source` is optional, and where the
work is not public a "Closed source" badge takes the Source button's slot —
the same position, the leading one — so every card's footer reads the same and
the absence is a stated fact rather than one button fewer.

**Live is the only primary button outside the hero and the nav.** It is the one
thing on a card a reader can go and use, so it carries the accent while Source
stays a ghost beside it.

## UI components

`components/ui/` is hand-written, but **behaviour comes from Radix**. The split
is the point: shadcn's _generated components_ were removed — a `data-slot`
system, seven card sub-components and a polymorphic slot for a page with four
cards on it — while Radix's _headless primitives_ stayed for anything with real
interaction and state. Styling is ours; focus management is not.

Write presentation by hand. Reach for a Radix primitive the moment something
needs a focus trap, dismissal, collision positioning or `aria-*` wiring.

| Component   | Notes                                                                               |
| ----------- | ----------------------------------------------------------------------------------- |
| `Button`    | `variant` primary / secondary / ghost / outline / link / glass, `size` sm–xl + icon |
| `Badge`     | `variant` tech / accent / meta / solid, `size` sm / md / lg, `as` for `li`          |
| `Card`      | one container, `interactive` for the hover accent and wash, `glass` for the material |
| `Separator` | a hairline rule                                                                     |
| `Drawer`    | Radix `Dialog`, dismissed by dragging its handle                                    |

Two conventions worth keeping:

- **`href` instead of `asChild`.** `Button` renders an `<a>` when given `href`
  and a `<button>` otherwise. Every call site wanted exactly one of those, so
  there is no slot machinery and no cloned children.
- **`Drawer` wraps Radix `Dialog`.** A native `<dialog>` covers the easy parts
  (focus trap, Escape, top layer) but Radix also gets scroll locking without
  layout shift, `aria-hidden` on the rest of the tree, and pointer-down-outside
  vs click-outside. Because it is opened from external state rather than a
  `Dialog.Trigger`, pass `restoreFocusTo` so focus returns to the control that
  opened it. Give it a `subtitle` rather than rendering a meta line in the body
  _and_ a hidden `Dialog.Description` — that announces the same words twice.

**The grab handle is the close control**; there is no X. It drags the panel
down and dismisses past a quarter of its height or on a flick, and it is a real
`<button>`, so a tap, Enter or Space closes it too — which is what keeps the
panel dismissable without a pointer.

Two things make that work, both easy to break:

- The exit keyframes in `globals.css` declare only a `to`, so the implicit
  `from` is the panel's current transform — wherever the drag left it. Give
  them an explicit `from` and every drag-close snaps back to rest before
  sliding out. Radix also needs _some_ animation on the closing panel to know
  when it may unmount, which is why every `[data-state]` below declares one.
- A drag must not also register as a tap, so the handler tracks whether the
  pointer moved. That flag is reset when the drawer opens rather than only on
  `pointerdown`: a keyboard activation arrives as a click with no `pointerdown`
  to reset it, so a drag-close would otherwise swallow the next Enter.

`class-variance-authority` stays: it is not shadcn, and it is the tidiest way
to express a variant table.

## Organisation logos

`public/images/logos/` holds the marks for workplaces, schools and the
certificate issuer, used by `components/org-mark.tsx`. They were taken from
each organisation's own site (Wikimedia for Cisco and Hella, LinkedIn for
Simpliservers, whose own site is gone), which is ordinary nominative use — the
same as a logo on a CV. They are **not** generated, unlike the technology
icons, so they are safe to edit by hand.

`OrgMark` still falls back to initials for anything without a `logo`, so a
missing file degrades rather than leaving a hole.

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
