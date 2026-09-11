// Copies technology logos out of the `devicon` package into public/.
// Add a name below and run `pnpm icons:sync`.

import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'node_modules/devicon/icons');
const to = resolve(root, 'public/images/technology-icons');

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
    { icon: 'embeddedc' },
    { icon: 'mariadb' },
    { icon: 'mongodb' },
    { icon: 'mysql' },
    { icon: 'postgresql' },
    { icon: 'prisma' },
];

await mkdir(to, { recursive: true });

for (const { icon, variant = 'original' } of icons) {
    await copyFile(
        `${from}/${icon}/${icon}-${variant}.svg`,
        `${to}/${icon}.svg`,
    );
}

console.log(`synced ${icons.length} icons`);
