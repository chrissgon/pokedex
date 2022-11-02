<template>
  <p
    :style="{
      background: color,
    }"
    class="inline-flex rounded-full px-3 py-1 cursor-pointer text-sm text-white"
  >
    <slot></slot>
  </p>
</template>

<script setup lang="ts">
interface Props {
  color: string;
}
defineProps<Props>();
</script>

<style scoped></style>
