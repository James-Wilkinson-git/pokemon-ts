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
    console.log(data);
    return data;
});
const pokemonList = document.getElementById("pokemon-list");
ready(function () {
    console.log("ready");
    for (let pokeIndex = 0; pokeIndex < 20; pokeIndex++) {
        getPokemon(pokeIndex).then((pokemon) => {
            pokemonList.innerHTML += `<li> <img src="${pokemon.sprites.front_default}" alt="" /> ${pokemon.name} </li>`;
        });
    }
});
