<template>
  <div class="Stats flex items-center">
    <p
      v-text="label"
      class="p-2 w-2/3 text-slate-400 text-sm font-medium whitespace-nowrap capitalize"
    ></p>
    <p v-text="percent" class="p-2 mr-3 text-sm"></p>

    <div class="w-full h-1 relative bg-slate-200 dark:bg-slate-700">
      <div
        :style="{ background: color, width: `${getPercent}%` }"
        class="h-full absolute"
      ></div>
      <div
        class="w-full relative z-10 h-1 flex justify-between rounded-full bg-transparent [&_*]:bg-white dark:[&_*]:bg-slate-800 [&_*]:w-1"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  percent: number;
  color: string;
}

const props = defineProps<Props>();

const getPercent = computed(()=>{
    if(props.percent >= 100) return 100

    return props.percent
})
</script>

<style scoped></style>
