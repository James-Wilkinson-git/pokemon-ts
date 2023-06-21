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
    0: "A";
    1: "B";
    2: "X";
    3: "Y";
    4: "LB";
    5: "RB";
    6: "LT";
    7: "RT";
    8: "Double Box";
    9: "Hamburger";
    10: "Left Joystick Press";
    11: "Right Joystick Press";
    12: "Top";
    13: "Down";
    14: "Left";
    15: "Right";
    16: "Xbox";
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
let prevButtonPressed = -1;
// Recursive function to keep polling for button presses
const updateStatus = () => {
    //If there are no gamepad events on window scan again for pads
    if (!haveEvents) {
        scanGamePads();
    }
    let buttonsPressed = false;
    const buttonPressed = (key: number, cb: Function) => {
        if (key !== prevButtonPressed) {
            cb(key);
            prevButtonPressed = key;
        }
    };
    //Check button presses on each controller
    controllers.forEach((controller: Gamepad) => {
        //Each controller check it's buttons
        controller.buttons.forEach((button: GamepadButton, buttonIndex) => {
            // make sure it is a button object
            if (typeof button === "object") {
                // We only want data on pressed buttons
                if (buttonIndex === 5 && button.pressed) {
                    buttonPressed(5, focusPokemon);
                    buttonsPressed = true;
                }
                if (buttonIndex === 4 && button.pressed) {
                    buttonPressed(4, focusPokemon);
                    buttonsPressed = true;
                }
                if (buttonIndex === 0 && button.pressed) {
                    buttonPressed(0, clickPokemon);
                    buttonsPressed = true;
                }
            }
        });
    });
    if (!buttonsPressed && prevButtonPressed !== -1) {
        prevButtonPressed = -1;
    }

    requestAnimationFrame(updateStatus);
};
//Should put JS Doc in now, to tell this is called by focusNext and previous pokemon that are called on button press
// check if the documents active element is a pokemon div, if not select the first pokemon div
const isPokemonFocused = () => {
    const focused = document.activeElement;
    if (
        focused?.tagName === "BUTTON" &&
        focused.classList.contains("pokemon")
    ) {
        return;
    } else {
        document.getElementById("pokemon-1")?.focus();
    }
};
// Need to throttle button input its to sensitive for navigation control its running so fast
const pokemonList = document.querySelectorAll(".pokemon");
const focusPokemon = (key: number) => {
    isPokemonFocused();
    // We now know we are working with a pokemon in this app, but this should be more explicit
    // This piece of code is repeated in previous with slight changes so should be made more
    // functional by moving to its own function with inputs.
    const activePokemon = document.activeElement?.id;
    if (activePokemon) {
        let activePokemonId = parseInt(activePokemon?.split("-")[1]);
        if (key === 5) {
            let nextPokemonId = activePokemonId;
            if (activePokemonId === 150) {
                nextPokemonId = 1;
            } else {
                nextPokemonId += 1;
            }
            const nextPokemon = document.getElementById(
                `pokemon-${nextPokemonId}`
            );
            nextPokemon?.focus();
        } else if (key === 4) {
            let prevPokemonId = activePokemonId;
            if (activePokemonId === 1) {
                prevPokemonId = 150;
            } else {
                prevPokemonId -= 1;
            }
            const prevPokemon = document.getElementById(
                `pokemon-${prevPokemonId}`
            );
            prevPokemon?.focus();
        }
    }
};
const clickPokemon = (key: number) => {
    const activePokemon: HTMLElement = document.activeElement as HTMLElement;
    activePokemon.click();
};
ready(function () {
    //Select first pokemon for controller navigation
    //If we were iterating over an array we would want to cache the array first before looping for performance
    for (let pokeIndex = 1; pokeIndex < 151; pokeIndex++) {
        getPokemon(pokeIndex).then((pokemon) => {
            const pokeBox = document.createElement("pokemon-entry");
            pokeBox.id = `pokemon-${pokeIndex}`;
            pokeBox.tabIndex = pokeIndex;
            // The referencing of an object by its index instead of searching for the key value pair is unwise
            // Will update at a later date to use array.find()
            pokeBox.setAttribute(
                "img",
                pokemon.sprites.front_default as string
            );
            pokeBox.setAttribute("name", pokemon.name);
            pokeBox.setAttribute("hp", pokemon.stats[0].base_stat.toString());
            pokeBox.setAttribute(
                "attack",
                pokemon.stats[1].base_stat.toString()
            );
            pokeBox.setAttribute(
                "defense",
                pokemon.stats[2].base_stat.toString()
            );
            pokeBox.addEventListener("click", (event: any) => {
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
