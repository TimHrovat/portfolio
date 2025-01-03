<template>
    <div :class="['flex items-center justify-between']">
        <span :class="['font-bold text-2xl']">
            <slot />
        </span>
        <div class="flex items-center gap-2 font-semibold">
            <span>{{ from }}</span>
            <span>-</span>
            <span>{{ to }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ readonly from: string; readonly to: string }>();
</script>
