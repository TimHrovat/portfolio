<template>
  <main class="bg-background pb-96 px-6">
    <section
      :class="[
        'flex flex-col items-center justify-center',
        'h-screen text-center gap-7',
      ]"
    >
      <Badge class="w-fit text-lg">Welcome to my portfolio</Badge>
      <h1 class="text-6xl md:text-8xl font-bold">Tim Hrovat</h1>
      <h2 class="text-muted-foreground text-2xl md:text-3xl font-semibold">
        Full Stack Developer
      </h2>
    </section>
    <section
      class="flex flex-col items-center justify-center gap-8 text-center"
    >
      <h2 class="text-3xl md:text-3xl font-semibold">
        Technologies I've worked with
      </h2>
      <div
        class="flex flex-wrap gap-4 items-center justify-center max-w-[700px]"
      >
        <Badge
          v-for="technology in technologies"
          variant="secondary"
          class="cursor-default flex gap-2.5"
        >
          <NuxtImg :src="`/images/technology-icons/${technology.icon}`" width="32"/>
          {{ technology.label }}</Badge
        >
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import Badge from "@/components/ui/badge/Badge.vue";

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
