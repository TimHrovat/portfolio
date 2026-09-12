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
- **Light and dark follow the OS by default.** Every colour token is a
  `light-dark()` pair, chosen by `color-scheme`. No `.dark` class, no theme
  provider. Do not add a `dark:` variant to a component: give the token both
  values instead. Five colour themes exist, Signal is the default, and the
  floating switcher can pin a theme and a scheme — see the design system
  below.
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

- **Read a whole object when its fields are optional.** `Experience` takes each
  role's copy from `getMessages()` as a `RoleCopy` (and `OtherRoles` its own
  `OtherRoleCopy`), because `highlights` and `stack` are there for some roles
  and not others — and a per-key lookup cannot
  express that. `RoleCopy` is declared in `lib/site.ts` rather than inferred,
  since an inferred union of six different shapes cannot be read uniformly.
- **No em dashes in displayed copy.** Not one reaches a reader: break the
  sentence, or use a colon where it introduces a list, the way Phosphorland's
  entry does. Comments and this file are prose for whoever is working on the
  site and are not covered. An en dash stays where it is a range, which is
  what `{copy.from} – {copy.to}` is in `Experience` and `OtherRoles`.
- **Markup inside a sentence is a tag, not a split string.** Contact's heading
  is `"Let’s build something <accent>together</accent>."` and `t.rich` supplies
  the span. Never cut a sentence into fragments around JSX.
- **Decoration is not copy.** The trailing period on every section title is
  drawn by `Section` in the accent colour, so it is not in the messages. The
  full stop at the end of Contact's sentence _is_, because there it is
  punctuation.

**What stays on the client.** `app/layout.tsx` hands `NextIntlClientProvider`
only the namespaces the client components read — `nav`, `person`, `dev`. The CV
copy never reaches the browser as messages. That is also why `RoleHighlights`
takes its toggle label as a prop, `Drawer` takes a `closeLabel`, and
`WorkSwitcher` takes its tabs and panels as rendered markup: all are client
components, and a prop keeps a whole namespace out of the bundle.

## Technology icons

The chips in `components/stack-strip.tsx` are driven by SVGs
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
| `primary`   | buttons, hero caret, trailing periods, the ongoing role's "Present", active nav, card hover, availability dot, and the halos through `--glow` |
| `highlight` | section eyebrow rules, the `Badge accent` "In progress" marker, contact icons and closing wash, preview accents |

`--highlight` / `--highlight-foreground` are ours, alongside `surface` and
`hairline`. shadcn's `--accent` / `--accent-foreground` stay what shadcn means
by them — the subtle hover-background pair — but are tinted from the highlight
hue so generated components feel like the palette.

**Five themes, and Signal ships.** Each is a full palette for both schemes:

| Theme    | Character                                                                          |
| -------- | ---------------------------------------------------------------------------------- |
| `signal` | warm paper and ink, vermilion `primary`, mustard ochre `highlight` — the default   |
| `tide`   | deep petrol teal `primary` against copper and sand                                 |
| `apple`  | the palette the site had before: apple.com's greys, systemBlue, systemIndigo       |
| `mono`   | no hue: ink on paper, and `primary` is simply the strongest contrast there is      |
| `mono-orange` | Mono, with a vibrant orange as `primary` and ink as its label colour          |

Signal replaced Apple as the shipped palette because blue and indigo on white
or true black read as the default of every generated site. Apple stays as a
theme with its original values untouched. A green terminal theme was tried and
removed.

**Signal sits on bare `:root`**, so the shipped site needs no attribute to have
it; the others are `[data-theme='…']` blocks. The selectors are deliberately
`[data-theme]` rather than `:root[data-theme]`, so any element can wear a
theme — the switcher's swatches do, which is how they show each theme's own
background and primary without a colour being written out a second time.

**Every colour is written once, as `light-dark(light, dark)`.** Which half
applies is decided by `color-scheme`: `light dark` on `:root` follows the OS,
and `[data-scheme]` pins one. So a theme is one block rather than a light block
plus a dark block plus a copy of each for the dev override — the four
duplicated palette blocks that used to exist are gone, and with them the gap
where a forced scheme outranked `prefers-contrast: more`. Only non-colour
values (`--grain-opacity`, `--glow-strength`) still need the media query, since
`light-dark()` takes colours only.

Two things are easy to get wrong here:

- **A theme defines fourteen tokens, not all of them.** `background`,
  `foreground`, `surface`, `surface-strong`, `hairline`, `muted-foreground`,
  `primary` / `-foreground`, `highlight` / `-foreground`, `accent` /
  `-foreground`, `glass-highlight` and `glass-shadow`. The shadcn roles that are
  the same in every theme (`card`, `popover`, `secondary`, `muted`, `border`,
  `input`, `ring`) are derived from those in one shared `:root, [data-theme]`
  rule. Adding a token means adding it to every theme block. The same rule sets
  `--glow` — the colour of the halo at the top of the hero and the one under
  the cursor — to `primary`; Mono Orange overrides it with `foreground`, so its
  halos stay monochrome and the orange is kept for things that point somewhere.
- **Lightning CSS rewrites `light-dark()`** into a `--lightningcss-light` /
  `--lightningcss-dark` fallback for older Safari, driven by the `color-scheme`
  declarations in the same file. That works — but it means `color-scheme` has
  to stay declared in `globals.css`, not set from a component or inline style,
  or the fallback never switches.

New theme values were checked for contrast before landing: body text is 15–16:1
on its background in every theme and scheme, and each accent against its
foreground is at least 4.3:1. Hold a new theme to the same.

**The switcher: `data-theme` and `data-scheme` on `<html>`.**
`components/scheme-switcher.tsx` is a floating control with theme swatches and
a three-way System / Light / Dark group. It writes both attributes on `<html>`
and mirrors them to `localStorage` (`theme`, `scheme`); a `next/script` with
`strategy="beforeInteractive"` replays them before first paint so there is no
flash. It has to be `next/script` — React 19 errors on a bare `<script>`
rendered inside a component — and `<html>` carries `suppressHydrationWarning`,
since those attributes are set before React hydrates and legitimately differ
from the server markup. `<html>` is the source of truth and the component
subscribes to it with `useSyncExternalStore` rather than holding its own copy —
React Compiler rejects mutating a global from a component body, so the DOM
write lives in a module-scope function. The theme ids live in `lib/scheme.ts`,
and the bootstrap script lists the non-default ones by hand; add a theme in
both.

**The defaults remove their attribute.** Signal and System do not write
`data-theme="signal"` or `data-scheme="system"`; they delete the attribute, so
choosing them collapses back to exactly what ships — Signal, following the OS.

shadcn's semantic tokens (`background`, `foreground`, `card`, `primary`,
`muted`, `border`, ...) plus ours: `surface`, `surface-strong`, `hairline`,
`logo-plate` (light ground for dark third-party logos), `glass-highlight` and
`glass-shadow`. Everything is OKLCH.

**The unavoidable exceptions are metadata**, which is emitted as tags and JSON
rather than CSS and so cannot read a custom property — and it follows Signal,
since that is what ships. Four hex literals mirror Signal's `--background` by
hand and change together: the light and dark pair in `themeColor` in
`app/layout.tsx`, and `background_color` / `theme_color` in `app/manifest.ts`
(dark, since that is what a launcher shows behind the icon). Signal's vermilion
is written out again in `app/icon.svg` and baked into `og.png` — see the icons
section below.

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
behind them. The chips in the stack strip switch their blur off entirely —
see About below.

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

## Page structure

Five sections: the hero, About, Work, Projects and Contact. Education and Stack
used to be sections of their own; they are tiles inside About now. The page was
9.7 screens tall on a 1024×768 desktop and 12.1 on a phone, most of it one
centred column after another, and it is about 6.7 and 7 now. Keep an eye on
that number when adding anything: the easy way to make this page worse is to
make it longer.

Section padding is `py-16 md:py-20` in `Section` (and a little more on
Contact). It used to be twice that.

## About

`components/sections/about.tsx` is one grid of glass tiles, six columns from
`md` and one below: the portrait (full bleed, with the location on a glass pill
over it) beside the intro, then Education across the full width, then Stack.
`#education` and `#stack` stay on their tiles, so old links still land.

The grid is `grid-cols-1` below `md`, **not** an implicit column. An implicit
column is `auto`, and the stack strip's track is `max-content` wide — the
column grows to fit it and the whole page scrolls sideways on a phone.
`grid-cols-*` is `minmax(0, 1fr)`, which is what keeps the tiles to the screen.

**Education** is three rows in one tile — the two schools and the certificate —
side by side from `md`. Each row is **one link stretched over the whole row**
with `after:absolute after:inset-0` on the name's anchor, rather than an
overlay element with no accessible name of its own.

**Stack** is `components/stack-strip.tsx`, a server component: the
technologies alternated into two rows that drift in opposite directions. Each
row is its list followed by an `aria-hidden` copy, and the track moves by
exactly half its width, so the copy lands where the original started and the
loop has no seam; each list carries a trailing padding equal to the gap, so the
join is the same width as every other gap. It pauses on hover. Under reduced
motion the copies go and the rows wrap in place.

The chips there switch their own backdrop blur off (`backdrop-filter-none`).
They sit on a tile that is already blurring, and a backdrop filter on a moving
element is recomputed every frame — fifty-eight of them for no visible
difference. This replaced a wall of chips with a daily shuffle and a
pointer-proximity lift, neither of which suits chips that are moving.

## Work

`components/sections/experience.tsx` renders the section and
`components/work-switcher.tsx` switches it: **one role at a time**, as Radix
`Tabs`. The tabs are a column on the left from `md` up and a two-by-two grid
of outlined cells above the panel below that, each a mark and the employer in a
word (`short` in `RoleCopy`). **Not a row that scrolls sideways**: that was
tried, and the other workplaces sat off the edge of the screen with nothing to
say they were there. Four tabs fit a grid, so every one is visible and tappable
without a gesture anyone has to discover. It replaced a vertical
timeline down the page's centre that was nearly three screens on its own, most
of it one role's detail.

**The server renders everything; the client only switches.** Each tab and each
panel arrives at `WorkSwitcher` as already-rendered markup in `items`, so the
CV copy reaches the browser as HTML and never as messages. That is the same
reason `RoleHighlights` takes its labels as props.

Three details in the switcher are easy to break:

- **Every panel is `forceMount`ed** and the inactive ones are hidden by
  `.work-panel[data-state='inactive']`, so every role is in the HTML for
  anything that reads the page. Radix would otherwise unmount them.
- **The active marker is one element** (`.tab-indicator`), moved with
  `transform` from offsets written as `--tab-*` — the nav indicator's
  technique in two dimensions. Offsets inside the list rather than rects, so
  it does not care where the page has been scrolled to. It is
  armed with `data-ready` after its first placement so it does not slide in on
  load.
- **The panels' container animates its height, and it is the one measured
  height on the page.** The eAsistent panel is several times taller than the
  rest, so without it the section below jumps. A `ResizeObserver` on the active
  panel writes the height, which also follows the highlights folding open. The
  container carries padding pulled back with negative margins, room for focus
  rings and the spec sheet's shadow that the clip would otherwise cut — and the
  measured height adds that padding back (`+ 2.75rem`). Change one and change
  the other.

The incoming panel settles in from the direction of travel (`data-direction`),
only after the first user choice, and only when motion is welcome. Radix gives
arrow keys between tabs; the list is `orientation="vertical"` from `md`.

**The job title leads**, in the tab and in the panel's `h3`; the employer is
the line under it and the dates are mono metadata. What the work was is the
thing worth reading — who paid for it is context.

**Ordering is by `start`, descending.** `Role.start` / `Role.end` stay in
`lib/site.ts` as `YYYY-MM` strings, so a string sort is a date sort and no
`Date` is constructed anywhere. The dates as they _read_ (`from` / `to`) are
copy. `end: null` means ongoing, and that role's "Present" is set in `primary`
(`RoleDates`, in the tab and in the panel) — that is the whole "current"
marker. There used to be a "Now" badge as well, which said the same thing
twice. On this CV the ongoing role also has the most recent start, so it is
the first tab and the one open on load without a special case.

**Side jobs share the last tab.** `roles` and `otherRoles` in `lib/site.ts` are
two lists rather than one with a `kind` on it. The rest are a line each in
`components/other-roles.tsx` — title, then employer and dates — under an
"Other work" tab. A print shop and a support desk are part of the record, but a
tab each would give them the weight of three years of engineering. Their
messages carry four fields, not six: `OtherRoleCopy` has no `description`.

**Highlights mark the featured role**, and eAsistent is the only one that
carries them. Every other role is a paragraph of `description` and nothing
else. Both live in `work.roles.<id>` in the messages file, which is why
`Experience` reads a role's copy as a `RoleCopy` object rather than key by key.

It is grouped, not flat: `{ label, items }`, rendered as a label column with
its lines beside it, a spec sheet rather than a bullet list. Nine equal bullets
are something to skim past; three named groups (_Built alone_, _Across the
stack_, _Beyond the code_) are three things to remember. The labels use the
`.eyebrow` style. Below `sm` the label stacks above its items.

**Every group is named from the start, and most of it is folded away.**
`components/role-highlights.tsx` is the one client component here. It shows the
first `PREVIEW_PER_GROUP` entries of each group — two — so all three headings
and a sample of each are on the page without a click, and a footer button
reveals the remaining eight. A reader who skims still leaves knowing the shape
of the role; fourteen entries at once is a wall nobody finishes, and hiding all
fourteen behind a shut pill meant nobody saw the best of it. Three details
carry it.

- **The preview count lives in `lib/highlights.ts`, not in the component.**
  `Experience` needs it too — the expand label carries how many entries are still
  folded away, and that string is built on the server so the CV copy stays out
  of the client bundle. A `'use client'` module cannot supply it: the server
  gets a client reference in place of every export, so the constant arrives as
  an object and the arithmetic yields `NaN` **without failing the build**.
- **Two rather than one, and the grid is why.** The entries are two columns
  from `sm` up, so a preview of two fills a row exactly and the expansion
  starts on a fresh one with no seam to patch. The overflow rows carry their
  top margin _inside_ the clipped element, so the gap they need when open
  collapses to nothing when shut.
- **Height comes from a `0fr` to `1fr` grid row,** not a transitioned
  `height` — one per group, all driven by the single button. A height
  transition needs a measured pixel value, which means reading layout on open
  and again whenever the content reflows; a grid row interpolates to the
  content's own height with nothing measured. Clipped content stays in the
  accessibility tree, so each overflow region is `inert` while it is shut.

It stays one surface throughout rather than a panel with a control beneath it:
stacking a second translucent surface on the first muddies both, which the
material rules above already warn about. The button is a footer row on the
panel's own glass, separated by a hairline.

**The featured role carries no special styling of its own.** Its panel is
simply the one with a glass spec sheet in it, which is weight enough. If a
second role ever earns the treatment, it inherits all of it by gaining
`highlights` — nothing is keyed to the array position.

Keep each line to a sentence or two. The moment one needs a paragraph it
belongs in `description`, or in Projects as its own card — which is where the
landing page went.

**Logos.** `components/org-mark.tsx` renders the mark — the Work tabs and the
Education rows both use it — on a `--logo-plate` ground, because the logos are
arbitrary colours and several are dark-on-transparent. It falls back to
initials when an organisation has no usable logo — Simpliservers is the case
that forced it, its site is gone — so a missing file degrades to something
deliberate rather than a hole.

**The nav has three links** — About, Work, Projects — and still collapses into
the drawer below `md`.

## Projects

**The first entry is the headline** and spans the full width of the grid, with
its preview beside the copy so it gains no height; the rest pair up underneath
with the preview on top. `Project.source` is optional, and where the work is not
public a "Closed source" badge takes the Source button's slot — the same
position, the leading one — so every card's footer reads the same and the
absence is a stated fact rather than one button fewer.

**Below `md` the cards are a swipeable row**, not a stack: `snap-x` with each
card at 85% of the width so the next one peeks in, which is what says the row
scrolls. Five stacked cards were more than three screens on a phone. The bar
under the row is a scroll-driven animation on the row's own horizontal scroll
(`scroll-timeline: --projects inline`); a named timeline is only visible inside
the element that scrolls, so the wrapper lifts it with `timeline-scope`.
Engines without scroll timelines do not show the bar.

In that row the summaries are clamped to four lines, with a "Read more" toggle
(`components/project-summary.tsx`), and the cards take tighter padding, a
smaller title and a shorter preview. A full summary made each card taller than
most of the screen. The clamp is visual only, so a screen reader still gets the
whole summary; from `md` up there is no clamp and no toggle.

**Every card has a preview**, `components/project-preview.tsx`: a small loop of
what the project does, drawn in markup and animated in CSS — Wordle tiles
flipping, an attention line drawing with its peaks marked, a timetable filling
in, a side-scroller running, the sign-in form cycling through its methods. No
screenshots to keep current, and every colour is a token. The Wordle guesses and
the sign-in methods are copy, under `projects.items.<id>.demo`.

Three rules keep them honest:

- **The base styles are the finished frame.** The keyframes are attached only
  inside `prefers-reduced-motion: no-preference`, so with motion reduced every
  scene is a meaningful still — the solved board, the drawn line — rather than
  an empty box.
- **They pause off screen.** `components/in-view.tsx` writes `data-playing` from
  an observer that never disconnects, and one rule — declared last and one
  class more specific than every scene's `animation` — pauses everything inside
  a scene that is not playing.
- **Loops stagger inside their own period.** Each piece is delayed by
  `--step`, and every loop leaves enough idle time at the end that the stagger
  never runs into the next pass.

## UI components

`components/ui/` is hand-written, but **behaviour comes from Radix**. The split
is the point: shadcn's _generated components_ were removed — a `data-slot`
system, seven card sub-components and a polymorphic slot for a page with four
cards on it — while Radix's _headless primitives_ stayed for anything with real
interaction and state. Styling is ours; focus management is not.

Write presentation by hand. Reach for a Radix primitive the moment something
needs a focus trap, dismissal, collision positioning or `aria-*` wiring.

| Component   | Notes                                                                                |
| ----------- | ------------------------------------------------------------------------------------ |
| `Button`    | `variant` primary / secondary / ghost / outline / link / glass, `size` sm–xl + icon  |
| `Badge`     | `variant` tech / accent / meta / solid, `size` sm / md / lg, `as` for `li`           |
| `Card`      | one container, `interactive` for the hover accent and wash, `glass` for the material |
| `Separator` | a hairline rule                                                                      |
| `Drawer`    | Radix `Dialog`, dismissed by dragging its handle                                     |

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

## Brand icons and the share card

`app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`,
`public/images/icons/icon-{192,512}.png` and `public/images/og.png` are one
family, all drawn from the same two sources: the nav's `TH` monogram and the
hero's layout. They replaced Next's default favicon and a leftover Nuxt one
that was still sitting in `public/`.

**The letterforms are real outlines, not text.** `app/icon.svg` carries the `T`
and `H` of JetBrains Mono Bold as `<path>` data, extracted with `fontTools` from
the installed font and transformed into a 512 box. A `<text>` element would have
fallen back to whatever monospace the viewer happens to have, and an SVG favicon
is rendered on their machine, not ours. The mark is centred on its **ink**
rather than its advance widths — `T` and `H` have different side bearings, and
advance-centring leaves it 5px left of true.

Everything else is derived from that one file: `rsvg-convert` for the PNGs,
`magick` for the multi-size `.ico`. The apple icon is the same art with the
rounded rect removed, because iOS applies its own mask and would otherwise
round an already-rounded corner.

`public/images/og.png` is a real 1200×630 landscape card reproducing the hero
in Signal's dark palette: the eyebrow, the name in Bold with the vermilion caret
beside it, the tagline, the domain, over a faint vermilion glow. Unlike the
favicon it can use `<text>`: it is rasterised here with `rsvg-convert` against
the installed JetBrains Mono, and only the PNG ships. It replaced
`portrait.png`, which is square, 600px, and was declared in the metadata as
1200×1200; every platform cropped it.

**All of these follow Signal.** They are images and cannot switch theme, so
when the shipped theme's vermilion or background changes, regenerate them.

**A logo is not a favicon.** Check any change at 16px before keeping it —
`magick montage` at 16/32/48 on a light ground is enough. Two letters is
already the limit; the trailing period the nav wordmark carries was left off
here because at 16px it is one grey pixel.

## SEO surface

`app/robots.ts`, `app/sitemap.ts` and `app/manifest.ts` are route handlers
rather than files in `public/` — they read `SITE_URL` from `lib/seo.ts`, so
there is one place the site's address is written down and a preview deployment
can describe itself honestly through `NEXT_PUBLIC_SITE_URL`. A preview that
canonicalises to the live domain is asking to be indexed in its place.

`components/structured-data.tsx` emits a `Person` graph in JSON-LD — the half
of the page a name search actually reads. It is built from the same messages
and `lib/site.ts` the page renders from, so it cannot drift: `worksFor` follows
whichever role has `end: null`, `alumniOf` follows `education`, `knowsAbout`
follows `technologies`, and `sameAs` takes only the socials that are real
links. Nothing is asserted there that is not on the page. Adding a role or a
school needs no edit here.

## Gotcha: never hand-write `-webkit-backdrop-filter`

Lightning CSS adds vendor prefixes itself. Writing the `-webkit-` form by hand
makes it drop the standard `backdrop-filter`, and the glass silently stops
blurring in any engine that only supports the unprefixed property. Write the
standard property alone. The same applies to other auto-prefixed properties.
