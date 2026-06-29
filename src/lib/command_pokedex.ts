import { type State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    const caughtPokemon = Object.keys(state.pokedex).sort();
    if (caughtPokemon.length === 0) {
        console.log("No Pokemon caught yet! Explore an area then catch a Pokemon first!");
        return;
    }
    console.log("Your Pokedex:");
    caughtPokemon.forEach((pokemon) => {
        console.log(`- ${pokemon}`);
    });
}
