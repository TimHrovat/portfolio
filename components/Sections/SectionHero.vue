<template>
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
</template>
