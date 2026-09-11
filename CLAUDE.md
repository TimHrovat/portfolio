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
- The app is pinned to dark mode with `class="dark"` on `<html>`. shadcn's
  `.dark` block holds the project palette, so `--foreground` means white.
- pnpm blocks postinstall scripts by default. A new dependency with a native
  binary must be added to `allowBuilds` in `pnpm-workspace.yaml`, or it will
  install without building and fail at runtime.
- Only components that own event listeners are client components. Keep the
  rest as server components.
