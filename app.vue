<template>
  <div :class="{ dark: dark }">
    <section class="App min-h-screen dark:bg-slate-900 p-6">
      <!-- header -->
      <header class="relative w-full flex justify-center">
        <img width="125" src="/pokemon.svg" />

        <DarkMode @change="changeDarkMode" />
      </header>
    </section>
  </div>
</template>

<script setup lang="ts">
const dark = useCookie<boolean>("dark");

function changeDarkMode(isDark: boolean) {
  dark.value = isDark;
}
</script>

<style scoped>
:not(.dark) > .App {
  background: linear-gradient(to bottom, #fff, #eee, #eee, #fff);
}
</style>
