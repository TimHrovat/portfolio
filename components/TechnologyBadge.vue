<template>
    <div
        ref="badge"
        :class="[
            'rounded-full py-1.5 px-3 cursor-pointer',
            'bg-surface-secondary-default-bg text-surface-primaryLight-default-text',
            'flex items-center font-semibold gap-2.5',
        ]"
        :style="{
            transform: `scale(${scale.size})`,
            filter: `brightness(${scale.brightness})`,
        }"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
const badge = ref<HTMLDivElement>();
const scale = ref({
    size: 1,
    brightness: 1,
});

function handleMouseMove(e: MouseEvent): void {
    const rect = badge.value?.getBoundingClientRect();

    if (!rect) {
        return;
    }

    const diffX = Math.abs(rect.x + rect.width / 2 - e.x);
    const diffY = Math.abs(rect.y + rect.height / 2 - e.y);

    const MAX_DISTANCE = 256;
    const BASE_SCALE = 1.0;
    const MAX_SCALE_SIZE = 1.2;
    const MAX_SCALE_BRIGHTNESS = 1.5;

    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance > MAX_DISTANCE) {
        scale.value.brightness = BASE_SCALE;
        scale.value.size = BASE_SCALE;
    } else {
        const proximity = (MAX_DISTANCE - distance) / MAX_DISTANCE;

        scale.value.brightness =
            BASE_SCALE +
            Math.pow(proximity, 2) * (MAX_SCALE_BRIGHTNESS - BASE_SCALE);
        scale.value.size =
            BASE_SCALE + Math.pow(proximity, 2) * (MAX_SCALE_SIZE - BASE_SCALE);
    }
}

onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
});
</script>
