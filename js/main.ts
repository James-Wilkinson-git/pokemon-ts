function ready(fn: Function): void {
    if (document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn());
    }
}
// Type for generic list api no ID in URL
// https://pokeapi.co/docs/v2#pokemon/
type TPokemonAPI = {
    count: number;
    next: string | null;
    previous: string | null;
    results: [TPokemon];
};
// Type for when providing an ID
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
    const data: TPokemon = await response.json();
    console.log(data);
    return data;
};
const $pokemonList = document.getElementById("pokemon-list");

ready(function () {
    console.log("ready");
    //If we were iterating over an array we would want to cache the array first before looping for performance
    for (let pokeIndex = 1; pokeIndex < 151; pokeIndex++) {
        getPokemon(pokeIndex).then((pokemon) => {
            const pokeBox = document.createElement("div");
            pokeBox.id = `pokemon-${pokeIndex}`;
            pokeBox.className = "pokemon";
            pokeBox.innerHTML = `
                <span class="img">
                    <img src="${pokemon.sprites.front_default}" alt="" />
                </span>
                <span class="name">
                    ${pokemon.name}
                </span>
            `;
            pokeBox.addEventListener("click", (event) => {
                // Event target can sometimes return not an element so let's make sure we have an element
                if (event.target instanceof Element) {
                    // Now that we know we have an element Typescript will let us access Element methods
                    const targetDiv = event.target.closest("div");
                    const pokemonName =
                        targetDiv?.querySelector(".name")?.textContent;
                    alert(`Clicked  ${pokemonName}`);
                }
            });
            $pokemonList?.appendChild(pokeBox);
        });
    }
});
