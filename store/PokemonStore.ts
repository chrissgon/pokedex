interface Types {
  [name: string]: string;
}

interface State {
  count: number;
  name: string;
  pokemon: any;
  species: any;
  weaknesses: any;
  pokemons: any[];
  types: Types;
  typeSelected: string;
}

function formatNumber(n: number): string {
  return `#${String("00" + n).slice(-3)}`;
}

export const usePokemonStore = defineStore("PokemonStore", {
  state: (): State => ({
    count: 0,
    name: "Bulbasaur",
    pokemon: {},
    species: {},
    weaknesses: {},
    pokemons: [],
    types: {
      all: "#3e75c3",
      bug: "#9bba48",
      dark: "#4a3d80",
      dragon: "#1a6bdb",
      electric: "#ffb303",
      fairy: "#e673e4",
      fighting: "#d11332",
      fire: "#f20202",
      flying: "#7fa3f0",
      ghost: "#616EB7",
      grass: "#52e02d",
      ground: "#ce8056",
      ice: "#67ebd1",
      normal: "#A0A29F",
      poison: "#8b38b0",
      psychic: "#e36b64",
      rock: "#66d9c2",
      steel: "#4b9cb3",
      water: "#379cfa",
    },
    typeSelected: "all",
  }),
  actions: {
    async get(): Promise<void> {
      try {
        const pokemon = await useApi.get(`/pokemon/${this.name.toLowerCase()}`);
        const species = await useApi.get(pokemon.species.url);
        const weaknesses = await useApi.get(pokemon.types[0].type.url);

        this.pokemon = pokemon;
        this.species = species;
        this.weaknesses = weaknesses;
      } catch (e) {
        this.reset();
        console.log(e);
      }
    },
    async getAll(): Promise<void> {
      const { count: cnt, results } = await useApi.get(`/pokemon`);

      this.count = cnt;
      this.pokemons = results;
    },
    reset(): void {
      this.name = "";
      this.pokemon = {};
      this.pokemons = [];
    },
  },
  getters: {
    typeIsEquals({ typeSelected }): Function {
      return function (type: string): boolean {
        return typeSelected === type;
      };
    },
    pokemonEmpty(): boolean {
      return Object.entries(this.pokemon).length === 0;
    },
    getName(): string {
      if (this.pokemonEmpty) return "????";

      return this.pokemon.name;
    },
    getCode(): string {
      if (this.pokemonEmpty) return formatNumber(0);

      return formatNumber(this.pokemon.id);
    },
    getImage(): string {
      if (this.pokemonEmpty) return "";

      return this.pokemon.sprites.other.dream_world.front_default;
    },
    getTypes(): string[] {
      if (this.pokemonEmpty) return [];

      return this.pokemon.types.map(({ type }: any) => type.name);
    },
    getColor(): string {
      return this.types[this.getTypes[0]];
    },
    getAbout(): string {
      if (this.pokemonEmpty) return "";

      return this.species.flavor_text_entries[8].flavor_text;
    },
    getWeight(): string {
      if (this.pokemonEmpty) return "0 kg";

      return `${this.pokemon.weight / 10} kg`;
    },
    getHeight(): string {
      if (this.pokemonEmpty) return "0 cm";

      return `${this.pokemon.height * 10} cm`;
    },
    getAbilities(): string[] {
      if (this.pokemonEmpty) return [];

      return this.pokemon.abilities.map(({ ability }: any) => ability.name);
    },
    getWeaknesses(): string[] {
      if (this.pokemonEmpty) return [];

      return this.weaknesses.damage_relations.double_damage_from.map(
        ({ name }: any) => name
      );
    },
    getStats(): any {
      if (this.pokemonEmpty) return {};

      const stats: any = {};

      for (const { stat, base_stat } of this.pokemon.stats) {
        stats[stat.name] = base_stat;
      }

      return {
        HP: stats.hp,
        Attack: stats.attack,
        Defense: stats.defense,
        "Sp. attack": stats["special-attack"],
        "Sp. defense": stats["special-defense"],
        Speed: stats.speed,
      };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokemonStore, import.meta.hot));
}
