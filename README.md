# Portfolio

Personal portfolio site for Tim Hrovat, built with Next.js 16 (App Router),
React 19, TypeScript, Tailwind CSS v4 and shadcn/ui.

## Setup

This project uses pnpm. Build scripts are allowlisted in `pnpm-workspace.yaml` —
pnpm blocks them by default, and Tailwind's native `@tailwindcss/oxide` binary
will be missing without it.

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

The site runs on `http://localhost:3000`.

## Copy

Every displayed string lives in `messages/en.json`, grouped by section, and is
read through next-intl. `lib/site.ts` holds only the structure around it —
ids, links, assets and ordering. Edit copy in the messages file.

## Production

```bash
pnpm build
pnpm start
```

## Other commands

```bash
pnpm lint
pnpm format
```
