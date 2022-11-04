<template>
  <article class="MiniCard w-full">
    <!-- header -->
    <header
      :style="{ background: color }"
      class="flex h-full items-center justify-between text-white relative rounded-2xl p-6 py-4 cursor-pointer"
    >
      <span
        v-text="code"
        class="absolute text-5xl font-medium right-5 bottom-5 opacity-25"
      ></span>

      <div class="relative w-64 z-10">
        <h4
          v-text="name"
          class="font-semibold md:w-2/4 text-2xl tracking-wide capitalize mb-4 "
        ></h4>

        <Badge
          v-for="t in types"
          v-text="t"
          class="types text-xs mr-1 mb-1"
        ></Badge>
      </div>

      <img :src="image" class="avatar relative h-28 -mt-20" />
    </header>
  </article>
</template>

<script setup lang="ts">
interface Props {
  code: string;
  name: string;
  types: string[];
  color: string;
  image: string;
}

defineProps<Props>();
</script>

<style scoped>
.types {
  background: rgba(255, 255, 255, 0.2);
}
.avatar {
  min-width: 100px;
}
</style>
