<template>
  <section
    :class="[
      'flex flex-col items-center justify-center',
      'gap-8 text-center py-24 max-w-[700px] mx-auto',
    ]"
  >
    <slot />
  </section>
</template>
