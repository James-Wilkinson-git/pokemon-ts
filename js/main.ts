function ready(fn: Function): void {
    if (document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn());
    }
}
// https://pokeapi.co/docs/v2#pokemon/
type TPokemonAPI = {
    count: number;
    next: string | null;
    previous: string | null;
    results: [TPokemon];
};

// https://pokeapi.co/docs/v2#pokemon/{id}
type TPokemon = {
    abilities: [];
    base_experience: number;
    forms: [];
    game_indices: [];
    height: number;
    held_items: [];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: [];
    name: string;
    order: number;
    past_types: [];
    species: {};
    sprites: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        other: {};
        versions: {};
    };
    stats: [];
    types: [];
    weight: number;
};
const getPokemon = async (pokeNum: number): Promise<TPokemon> => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeNum}`
    );
    const data = await response.json();
    console.log(data);
    return data;
};
const pokemonList = document.getElementById("pokemon-list");

ready(function () {
    console.log("ready");
    for (let pokeIndex = 1; pokeIndex < 21; pokeIndex++) {
        getPokemon(pokeIndex).then((pokemon) => {
            pokemonList!.innerHTML += `<li> <img src="${pokemon.sprites.front_default}" alt="" /> ${pokemon.name} </li>`;
        });
    }
});
