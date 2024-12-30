<template>
  <main class="pb-96 px-6">
    <!-- HERO -->
    <section
      :class="[
        'flex flex-col items-center justify-center',
        'min-h-screen text-center gap-8',
        'animate-in fade-in slide-in-from-bottom-8 duration-700',
      ]"
    >
      <span
        :class="[
          'w-fit text-xl rounded-full px-4 py-1.5 font-semibold',
          'bg-surface-primary-default-bg text-surface-primary-default-text',
          'border border-solid border-surface-primary-default-border',
        ]"
        >Welcome to my portfolio!</span
      >
      <h1 class="text-6xl md:text-8xl font-bold">Tim Hrovat</h1>
      <h2 class="text-foreground-muted text-2xl md:text-3xl font-semibold">
        Full Stack Developer
      </h2>
    </section>

    <!-- ABOUT ME -->
    <Section>
      <div class="animate-in fade-in duration-1000">
        <NuxtImg
          :class="['size-56 bg-cover rounded-full']"
          src="/images/portrait.png"
        />
      </div>
      <div class="flex flex-col gap-6">
        <span class="text-4xl font-bold"> Hi, I’m Tim </span>
        <span class="text-lg">
          a passionate software developer and dedicated student at
          <strong
            ><a
              target="_blank"
              href="https://fri.uni-lj.si/sl/studijski-program/racunalnistvo-informatika-0"
              >FRI UNI Ljubljana</a
            ></strong
          >. With a strong foundation in coding and a professional edge, I
          thrive on solving complex problems and crafting efficient, scalable
          solutions. Whether it’s building innovative applications or exploring
          the latest in tech, I’m always driven by curiosity and a desire to
          make an impact. </span
        ><span class="text-lg font-semibold"
          >Let’s build something amazing together!</span
        >
      </div>
    </Section>

    <!-- TECHNOLOGIES -->
    <Section>
      <h2 class="text-3xl md:text-3xl font-semibold">
        Technologies I've worked with
      </h2>
      <div class="flex flex-wrap gap-4 items-center justify-center">
        <TechnologyBadge
          v-for="technology in technologies"
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
  </main>
</template>

<script setup lang="ts">
import TechnologyBadge from "~/components/TechnologyBadge.vue";
import Section from "~/components/Section.vue";

const technologies: { label: string; icon: string }[] = [
  { label: "Tailwind CSS", icon: "tailwind.svg" },
  { label: "HTML", icon: "HTML5.svg" },
  { label: "CSS", icon: "css3.svg" },
  { label: "JavaScript", icon: "javascript.svg" },
  { label: "TypeScript", icon: "typescript.svg" },
  { label: "VueJS", icon: "vuejs.svg" },
  { label: "ReactJS", icon: "react.svg" },
  { label: "Nuxt", icon: "nuxt.svg" },
  { label: "NestJS", icon: "nest.svg" },
  { label: "NextJS", icon: "next.svg" },
  { label: "C", icon: "c.svg" },
  { label: "C++", icon: "cpp.svg" },
  { label: "Java", icon: "java.svg" },
  { label: "PHP", icon: "php.svg" },
  { label: "Laravel", icon: "laravel.png" },
  { label: "Wordpress", icon: "wordpress.svg" },
  { label: "Embedded systems", icon: "embedded.png" },
];
</script>
