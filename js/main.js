"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
function ready(fn) {
    if (document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn());
    }
}
const getPokemon = (pokeNum) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokeNum}`
        );
        const data = yield response.json();
        console.log(data);
        return data;
    });
const $pokemonList = document.getElementById("pokemon-list");
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
                var _a;
                // Event target can sometimes return not an element so let's make sure we have an element
                if (event.target instanceof Element) {
                    // Now that we know we have an element Typescript will let us access Element methods
                    const targetDiv = event.target.closest("div");
                    const pokemonName =
                        (_a =
                            targetDiv === null || targetDiv === void 0
                                ? void 0
                                : targetDiv.querySelector(".name")) === null ||
                        _a === void 0
                            ? void 0
                            : _a.textContent;
                    alert(`Clicked  ${pokemonName}`);
                }
            });
            $pokemonList === null || $pokemonList === void 0
                ? void 0
                : $pokemonList.appendChild(pokeBox);
        });
    }
});
