<template>
    <div
        ref="card"
        :class="[
            'grid transition-[grid-template-rows] duration-300 ease-in-out',
            visible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ]"
    >
            <div :class="['overflow-hidden flex flex-col gap-2']">
                <slot />
            </div>
    </div>
</template>

<script setup lang="ts">
const card = ref<HTMLDivElement>();
const visible = ref<boolean>(false);

function handleScroll(): void {
    const rect = card.value?.getBoundingClientRect();

    if (!rect) {
        return;
    }

    visible.value =
        rect.y <= window.innerHeight / 2 &&
        window.innerHeight / 2 <= rect.y + rect.height;
}

onMounted(() => {
    document.getElementById('root')?.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    document
        .getElementById('root')
        ?.removeEventListener('scroll', handleScroll);
});
</script>
