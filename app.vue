<template>
  <div :class="{ dark: dark }">
    <section
      class="App min-h-screen p-6 lg:px-20 max-w-full overflow-x-hidden dark:text-white dark:bg-slate-900"
    >
      <!-- header -->
      <header class="relative w-full flex justify-start md:justify-center">
        <img src="/pokemon.svg" class="w-32" />

        <DarkMode @change="changeDarkMode" />
      </header>

      <!-- main -->
      <main class="w-full flex flex-wrap mt-20">
        <article class="w-full text-center md:w-1/2 md:text-left">
          <!-- minha pokedex -->
          <span
            class="inline-flex text-sm cursor-pointer p-3 px-4 rounded-full bg-white dark:bg-slate-800 [&_img]:hover:rotate-90"
          >
            <img
              src="/pokebola.png"
              class="mr-2 w-5 bg-white rounded-full transition-transform"
            />
            Minha <b class="ml-1">Pokedéx</b>
          </span>

          <h1 class="text-3xl mt-10">Dúvidas sobre esse <b>Pokémon?</b></h1>
          <p class="mt-2">
            Pesquise e descubra mais sobre seus pokémons preferidos
          </p>

          <InputText v-model="pokemon" />

          <div class="filter mt-10">
            <Badge
              v-for="(color, type) in types"
              @click="setType(type)"
              :color="color"
              :class="{ '!opacity-100': type === typeSelected }"
              class="m-1 opacity-50 transition-transform hover:opacity-100 hover:scale-105"
            >
              <img :src="`/${type}.svg`" class="mr-2 w-3" />
              <span v-text="type" class="capitalize"></span>
            </Badge>
          </div>
        </article>

        <aside class="w-full md:w-1/2"></aside>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
// data
const dark = useCookie<boolean>("dark");
const pokemon = ref("Bulbasaur");

const types = reactive({
  all: "#3e75c3",
  bug: "#9bba48",
  dark: "#4a3d80",
  dragon: "#1a6bdb",
  eletric: "#e08300",
  fairy: "#e673e4",
  fighting: "#d11332",
  fire: "#f20202",
  flying: "#7fa3f0",
  ghost: "#616EB7",
  grass: "#58c73c",
  ground: "#ce8056",
  ice: "#67ebd1",
  normal: "#A0A29F",
  poison: "#8b38b0",
  psychic: "#e36b64",
  rock: "#66d9c2",
  steel: "#4b9cb3",
  water: "#379cfa",
});

const typeSelected = ref("all");

// methods
function changeDarkMode(isDark: boolean): void {
  dark.value = isDark;
}
function setType(type: string): void {
  typeSelected.value = type;
}
</script>

<style scoped>
body * {
  font-family: "Poppins", sans-serif;
  /* font-size: 0.85rem; */
}

:not(.dark) > .App {
  background: linear-gradient(to bottom, #fff, #eee, #eee, #fff);
}
</style>
