<template>
    <Section>
        <h2 class="text-3xl md:text-3xl font-semibold">
            Technologies I've worked with
        </h2>
        <div class="flex flex-wrap gap-4 items-center justify-center">
            <TechnologyBadge
                v-for="technology in technologies"
                :key="technology.icon"
                variant="secondary"
                class="cursor-default flex gap-2.5"
            >
                <NuxtImg
                    :src="`/images/technology-icons/${technology.icon}`"
                    width="32"
                />
                {{ technology.label }}</TechnologyBadge
            >
        </div>
    </Section>
</template>

<script setup lang="ts">
import TechnologyBadge from '~/components/TechnologyBadge.vue';
import Section from '~/components/Sections/Section.vue';

const initialTechnologies: { label: string; icon: string }[] = [
    { label: 'Tailwind CSS', icon: 'tailwind.svg' },
    { label: 'HTML', icon: 'HTML5.svg' },
    { label: 'CSS', icon: 'css3.svg' },
    { label: 'JavaScript', icon: 'javascript.svg' },
    { label: 'TypeScript', icon: 'typescript.svg' },
    { label: 'VueJS', icon: 'vuejs.svg' },
    { label: 'ReactJS', icon: 'react.svg' },
    { label: 'Nuxt', icon: 'nuxt.svg' },
    { label: 'NestJS', icon: 'nest.svg' },
    { label: 'NextJS', icon: 'next.svg' },
    { label: 'C', icon: 'c.svg' },
    { label: 'C++', icon: 'cpp.svg' },
    { label: 'Java', icon: 'java.svg' },
    { label: 'PHP', icon: 'php.svg' },
    { label: 'Laravel', icon: 'laravel.png' },
    { label: 'Wordpress', icon: 'wordpress.svg' },
    { label: 'Embedded Systems', icon: 'embedded.png' },
    { label: 'MariaDB', icon: 'mariadb.svg' },
    { label: 'MongoDB', icon: 'mongo.png' },
    { label: 'MySQL', icon: 'mysql.png' },
    { label: 'Postgres', icon: 'postgres.png' },
    { label: 'Prisma ORM', icon: 'prisma.png' },
];

const technologies = ref<{ label: string; icon: string }[]>([]);

onMounted(() => {
    technologies.value = [...initialTechnologies].sort(
        () => Math.random() - 0.5,
    );
});
</script>
