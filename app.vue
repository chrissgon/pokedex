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
            class="inline-flex text-sm cursor-pointer p-3 px-4 rounded-full bg-slate-100 dark:bg-slate-800 [&_img]:hover:rotate-90"
          >
            <img src="/pokebola.png" class="mr-2 w-5 transition-transform" />
            My <b class="ml-1">Pokedéx</b>
          </span>

          <h1 class="text-3xl mt-10">Who is that <b>Pokémon?</b></h1>
          <p class="mt-2">
            Find out more about your favorite pokemons
          </p>

          <label class="relative">
            <InputText
              v-model="PokemonStore.name"
              @blur="PokemonStore.get()"
              class="pr-14"
            />
            <i
              class="bi bi-search w-9 h-9 flex justify-center items-center absolute text-xs -bottom-1.5 right-1.5 rounded-full cursor-pointer bg-white dark:bg-slate-700"
            ></i>
          </label>

          <div class="filter mt-10">
            <Badge
              v-for="(color, type) in PokemonStore.types"
              @click="setType(type.toString())"
              :style="{ background: color }"
              :class="{ '!opacity-100': PokemonStore.typeIsEquals(type) }"
              class="m-1 opacity-50 transition-transform hover:opacity-100 hover:scale-105"
            >
              <img :src="`/${type}.svg`" class="mr-2 w-3" />
              <span v-text="type"></span>
            </Badge>
          </div>
        </article>

        <aside class="w-full hidden justify-center pl-10 md:flex md:w-1/2">
          <CardPokemon />
          <!-- <code v-text="PokemonStore"></code> -->
        </aside>
      </main>

      <!-- list -->
      
    </section>
  </div>
</template>

<script setup lang="ts">
// data
const PokemonStore = usePokemonStore();
const dark = useCookie<boolean>("dark");

// methods
function changeDarkMode(isDark: boolean): void {
  dark.value = isDark;
}
function setType(type: string): void {
  PokemonStore.typeSelected = type;
}

// onMounted
onMounted(() => {
  PokemonStore.get();
});
</script>

<style scoped>
body * {
  font-family: "Poppins", sans-serif;
  /* font-size: 0.85rem; */
}
</style>
