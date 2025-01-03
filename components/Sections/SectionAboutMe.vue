<template>
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
                thrive on solving complex problems and crafting efficient,
                scalable solutions. Whether it’s building innovative
                applications or exploring the latest in tech, I’m always driven
                by curiosity and a desire to make an impact. </span
            ><span class="text-lg font-semibold"
                >Let’s build something amazing together!</span
            >
        </div>
    </Section>
</template>

<script setup lang="ts">
import Section from '~/components/Sections/Section.vue';
</script>
