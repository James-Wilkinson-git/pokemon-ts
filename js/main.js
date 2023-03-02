"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function ready(fn) {
    if (document.readyState !== "loading") {
        fn();
    }
    else {
        document.addEventListener("DOMContentLoaded", fn());
    }
}
const getPokemon = (pokeNum) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
    const data = yield response.json();
    return data;
});
const $pokemonList = document.getElementById("pokemon-list");
// New to the game pad experimenting so some types are any until I learn what type they are
const haveEvents = "ongamepadconnected" in window;
const controllers = [];
const connectHandler = (e) => {
    addGamePad(e.gamepad);
    console.log(e);
};
const addGamePad = (gamePad) => {
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
            }
            else {
                addGamePad(gamePad);
            }
        }
    }
};
const disconnectHandler = (e) => {
    removeGamePad(e.gamepad);
    console.log(e);
};
const removeGamePad = (gamePad) => {
    delete controllers[gamePad.index];
};
let prevButtonPressed = 0;
let buttonsState = 0;
// Recursive function to keep polling for button presses
const updateStatus = () => {
    //If there are no gamepad events on window scan again for pads
    if (!haveEvents) {
        scanGamePads();
    }
    let buttonsPressed = false;
    const buttonPressed = (key) => {
        if (key !== prevButtonPressed) {
            focusPokemon(key);
            prevButtonPressed = key;
        }
        else if (!buttonPressed) {
            console.log("same button");
        }
    };
    //Check button presses on each controller
    controllers.forEach((controller) => {
        //Each controller check it's buttons
        controller.buttons.forEach((button, buttonIndex) => {
            // make sure it is a button object
            if (typeof button === "object") {
                // We only want data on pressed buttons
                if (buttonIndex === 5 && button.pressed) {
                    buttonPressed(5);
                    buttonsPressed = true;
                }
                if (buttonIndex === 4 && button.pressed) {
                    buttonPressed(4);
                    buttonsPressed = true;
                }
            }
        });
    });
    if (!buttonsPressed && prevButtonPressed) {
        console.log("same button");
        prevButtonPressed = 0;
    }
    requestAnimationFrame(updateStatus);
};
//Should put JS Doc in now, to tell this is called by focusNext and previous pokemon that are called on button press
// check if the documents active element is a pokemon div, if not select the first pokemon div
const isPokemonFocused = () => {
    var _a;
    const focused = document.activeElement;
    if ((focused === null || focused === void 0 ? void 0 : focused.tagName) === "BUTTON" &&
        focused.classList.contains("pokemon")) {
        return;
    }
    else {
        (_a = document.getElementById("pokemon-1")) === null || _a === void 0 ? void 0 : _a.focus();
    }
};
// Need to throttle button input its to sensitive for navigation control its running so fast
const pokemonList = document.querySelectorAll(".pokemon");
const focusPokemon = (key) => {
    var _a;
    isPokemonFocused();
    // We now know we are working with a pokemon in this app, but this should be more explicit
    // This piece of code is repeated in previous with slight changes so should be made more
    // functional by moving to its own function with inputs.
    const activePokemon = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id;
    if (activePokemon) {
        let activePokemonId = parseInt(activePokemon === null || activePokemon === void 0 ? void 0 : activePokemon.split("-")[1]);
        if (key === 5) {
            let nextPokemonId = 0;
            if (activePokemonId === 150) {
                activePokemonId = 1;
            }
            else {
                activePokemonId + 1;
            }
            const nextPokemon = document.getElementById(`pokemon-${nextPokemonId}`);
            nextPokemon === null || nextPokemon === void 0 ? void 0 : nextPokemon.focus();
        }
        else if (key === 4) {
            let prevPokemonId = 0;
            if (activePokemonId === 1) {
                activePokemonId = 150;
            }
            else {
                activePokemonId - 1;
            }
            const prevPokemon = document.getElementById(`pokemon-${prevPokemonId}`);
            prevPokemon === null || prevPokemon === void 0 ? void 0 : prevPokemon.focus();
        }
    }
};
ready(function () {
    //Select first pokemon for controller navigation
    //If we were iterating over an array we would want to cache the array first before looping for performance
    for (let pokeIndex = 1; pokeIndex < 151; pokeIndex++) {
        getPokemon(pokeIndex).then((pokemon) => {
            const pokeBox = document.createElement("button");
            pokeBox.id = `pokemon-${pokeIndex}`;
            pokeBox.className = "pokemon";
            pokeBox.tabIndex = pokeIndex;
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
                var _a;
                // Event target can sometimes return not an element so let's make sure we have an element
                if (event.target instanceof Element) {
                    // Now that we know we have an element Typescript will let us access Element methods
                    const targetDiv = event.target.closest("div");
                    const pokemonName = (_a = targetDiv === null || targetDiv === void 0 ? void 0 : targetDiv.querySelector(".name")) === null || _a === void 0 ? void 0 : _a.textContent;
                    alert(`Clicked  ${pokemonName}`);
                }
            });
            $pokemonList === null || $pokemonList === void 0 ? void 0 : $pokemonList.appendChild(pokeBox);
        });
    }
    window.addEventListener("gamepadconnected", connectHandler);
    window.addEventListener("gamepaddisconnected", disconnectHandler);
    if (!haveEvents) {
        setInterval(scanGamePads, 500);
    }
});
