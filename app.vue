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
          <!-- my pokedex -->
          <Badge
            class="py-3 px-4 bg-slate-100 dark:bg-slate-800 [&_img]:hover:rotate-90 mt-12"
          >
            <img src="/pokebola.png" class="mr-2 w-5 transition-transform" />
            My <b class="ml-1">Pokedéx</b>
          </Badge>

          <h1 class="text-3xl mt-10">Who is that <b>Pokémon?</b></h1>
          <p class="mt-2">Find out more about your favorite pokemons</p>

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

          <div class="flex flex-col-reverse items-center">
            <!-- types -->
            <div
              :class="{ disabled: PokemonStore.loading }"
              class="types mt-10"
            >
              <Badge
                v-for="(color, type) in PokemonStore.types"
                @click="setType(type.toString())"
                :style="{ background: color }"
                :class="{
                  '!opacity-100': PokemonStore.typeIsEquals(type),
                }"
                class="m-1 text-white opacity-50 transition-transform hover:opacity-100 hover:scale-105"
              >
                <img :src="`/${type}.svg`" class="mr-2 w-3" />
                <span v-text="type"></span>
              </Badge>
            </div>
            <Card class="max-w-md mt-32 md:hidden" />
          </div>
        </article>

        <aside class="w-full hidden justify-center pl-5 md:flex md:w-1/2">
          <Card class="max-w-md" />
        </aside>
      </main>

      <!-- list -->
      <Badge
        class="py-3 px-4 bg-slate-100 dark:bg-slate-800 [&_img]:hover:rotate-90 mt-12"
      >
        <img src="/pokebola.png" class="mr-2 w-5 transition-transform" />
        <b v-text="PokemonStore.count" class="mr-1"></b> Pokémons found
      </Badge>
      
      <div v-if="PokemonStore.loading" class="flex justify-center mt-5">
        <Spin />
      </div>
      <List v-else :pokemons="PokemonStore.getPokemons" />
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
  PokemonStore.setTypeSelected(type);
  PokemonStore.resetLimit();

  if (PokemonStore.typeIsAll) {
    PokemonStore.getAll();
    return;
  }

  PokemonStore.getByType();
}

// onMounted
onMounted(async () => {
  await PokemonStore.get();
  PokemonStore.getAll();
});
</script>

<style>
body * {
  font-family: "Poppins", sans-serif;
}

.disabled {
  cursor: no-drop;
}

.disabled * {
  user-select: none;
  pointer-events: none !important;
}
</style>
