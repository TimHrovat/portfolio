// Copies technology logos into public/images/technology-icons/.
//
// Almost everything comes out of the `devicon` package — add a name to `icons`
// below and run `pnpm icons:sync`. A logo devicon does not carry lives in
// scripts/icon-extras/ and is listed in `extras`, so the public directory stays
// entirely generated either way and can always be rebuilt from scratch.

import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'node_modules/devicon/icons');
const to = resolve(root, 'public/images/technology-icons');
const extrasFrom = resolve(root, 'scripts/icon-extras');

/** @type {{ icon: string, variant?: string }[]} */
const icons = [
    { icon: 'tailwindcss' },
    { icon: 'html5' },
    { icon: 'css3' },
    { icon: 'javascript' },
    { icon: 'typescript' },
    { icon: 'vuejs' },
    { icon: 'react' },
    { icon: 'nuxtjs' },
    { icon: 'nestjs' },
    { icon: 'nextjs' },
    { icon: 'c' },
    { icon: 'cplusplus' },
    { icon: 'java' },
    { icon: 'php' },
    { icon: 'laravel' },
    { icon: 'wordpress' },
    { icon: 'mariadb' },
    { icon: 'mongodb' },
    { icon: 'mysql' },
    { icon: 'postgresql' },
    { icon: 'prisma' },
    { icon: 'redis' },
    { icon: 'apachekafka' },
    { icon: 'rabbitmq' },
    { icon: 'kubernetes' },
    { icon: 'go' },
    { icon: 'argocd' },
    { icon: 'rancher' },
    { icon: 'figma' },
    { icon: 'netlify' },
    { icon: 'github' },
    { icon: 'gitlab' },
    { icon: 'npm' },
    { icon: 'pnpm' },
    // devicon only ships `plain` for Jest.
    { icon: 'jest', variant: 'plain' },
];

/**
 * Logos devicon does not ship. Checked into scripts/icon-extras/ with their
 * source noted here, so the provenance of every file is recorded somewhere.
 *
 * @type {{ icon: string, source: string }[]}
 */
const extras = [{ icon: 'claude', source: 'Simple Icons (CC0)' }];

await mkdir(to, { recursive: true });

for (const { icon, variant = 'original' } of icons) {
    await copyFile(
        `${from}/${icon}/${icon}-${variant}.svg`,
        `${to}/${icon}.svg`,
    );
}

for (const { icon } of extras) {
    await copyFile(`${extrasFrom}/${icon}.svg`, `${to}/${icon}.svg`);
}

console.log(`synced ${icons.length + extras.length} icons`);
