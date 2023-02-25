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
    stats: IPokemonStats[];
    types: [];
    weight: number;
};
interface IPokemonStats {
    base_stat: number;
    effort: number;
    stat: IPokemonStat;
}
interface IPokemonStat {
    name: string;
    url: string;
}
const getPokemon = async (pokeNum: number): Promise<TPokemon> => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeNum}`
    );
    const data: TPokemon = await response.json();
    return data;
};
const $pokemonList = document.getElementById("pokemon-list");
// Gamepad Code
interface Xbox360Controller {
    0: "0";
    1: "B";
    2: "X";
    3: "Y";
    4: "LB";
    5: "RB";
    6: "LT";
    7: "RT";
    8: "Double Box";
    9: "Hamburger";
    10: "";
    11: "";
    12: "Top";
    13: "Down";
    14: "Left";
    15: "Right";
    16: "Xbox";
    17: "";
}
// New to the game pad experimenting so some types are any until I learn what type they are
const haveEvents = "ongamepadconnected" in window;
const controllers: any = [];
const connectHandler = (e: any) => {
    addGamePad(e.gamepad);
    console.log(e);
};
const addGamePad = (gamePad: Gamepad) => {
    controllers[gamePad.index] = gamePad;
    requestAnimationFrame(updateStatus);
};
const scanGamePads = () => {
    const gamePads = navigator.getGamepads();
    for (const gamePad of gamePads) {
        if (gamePad) {
            // Can be null if disconnected during the session
            if (gamePad.index in controllers) {
                controllers[gamePad.index] = gamePad;
            } else {
                addGamePad(gamePad);
            }
        }
    }
};
const disconnectHandler = (e: any) => {
    removeGamePad(e.gamepad);
    console.log(e);
};
const removeGamePad = (gamePad: Gamepad) => {
    delete controllers[gamePad.index];
};
// Recursive function to keep polling for button presses
const updateStatus = () => {
    //If there are no gamepad events on window scan again for pads
    if (!haveEvents) {
        scanGamePads();
    }
    // Check button presses on each controller
    controllers.forEach((controller: Gamepad) => {
        //Each controller check it's buttons
        controller.buttons.forEach((button: GamepadButton, buttonIndex) => {
            // make sure it is a button object
            if (typeof button === "object") {
                // We only want data on pressed buttons
                if (button.pressed) {
                    console.log(buttonIndex, button.value);
                }
            }
        });
    });
    requestAnimationFrame(updateStatus);
};
ready(function () {
    console.log("ready");
    //If we were iterating over an array we would want to cache the array first before looping for performance
    for (let pokeIndex = 1; pokeIndex < 151; pokeIndex++) {
        getPokemon(pokeIndex).then((pokemon) => {
            const pokeBox = document.createElement("div");
            pokeBox.id = `pokemon-${pokeIndex}`;
            pokeBox.className = "pokemon";
            // The referencing of an object by its index instead of searching for the key value pair is unwise
            // Will update at a later date to use array.find()
            pokeBox.innerHTML = `
                <span class="img">
                    <img src="${pokemon.sprites.front_default}" alt="" />
                </span>
                <span class="name">
                    ${pokemon.name}
                </span>
                <span class="hp">
                ${pokemon.stats[0].stat.name} : ${pokemon.stats[0].base_stat}
                </span>
                <span class="attack">
                ${pokemon.stats[1].stat.name} : ${pokemon.stats[1].base_stat}
                </span>
                <span class="defense">
                ${pokemon.stats[2].stat.name} : ${pokemon.stats[2].base_stat}
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
    window.addEventListener("gamepadconnected", connectHandler);
    window.addEventListener("gamepaddisconnected", disconnectHandler);
    if (!haveEvents) {
        setInterval(scanGamePads, 500);
    }
});
