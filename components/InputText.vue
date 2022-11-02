<template>
  <input
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :value="modelValue"
    type="text"
    class="mt-16 w-full max-w-xs h-12 pl-6 rounded-full text-base font-medium outline-none bg-slate-100 dark:bg-slate-800 "
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: any;
}

defineProps<Props>();

defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
