<template>
  <label
    for="mode"
    class="flex items-center absolute px-1 right-0 h-8 w-14 rounded-full cursor-pointer border border-slate-300 dark:border-slate-600"
  >
    <input
      v-model="dark"
      @change="emit('change', dark)"
      id="mode"
      type="checkbox"
      class="hidden"
    />

    <img
      :src="`/${getIcon}.svg`"
      :class="{ right: dark }"
      class="rounded-full w-6 h-6 p-1.5 transition-transform bg-sky-100 dark:bg-slate-800 select-none"
    />
  </label>
</template>

<script setup lang="ts">
// computed
const getIcon = computed<string>(() => (dark.value ? "darkmode" : "lightmode"));

// data
const dark = useCookie<boolean>("dark", {
  default: () => false,
});

// emit
const emit = defineEmits<{
  (e: "change", dark: boolean): void;
}>();
</script>

<style lang="scss" scoped>
img.right {
  transform: translateX(22px);
}
</style>
