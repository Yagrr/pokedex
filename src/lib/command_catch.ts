import { type State } from "./state.js"

export async function commandCatch(state: State, pokemonName: string): Promise<void> {
    // check if currentLocation is defined 
    if (!state.currentLocation) {
        console.log("Please explore a location first!") 
        return;
    }
    try {
        const pokemonEncounters = (await state.api.fetchLocation(state.currentLocation)).pokemon_encounters;
        const isInArea = pokemonEncounters.some(encounter => encounter.pokemon.name === pokemonName);
        if (!isInArea) {
            console.log("Pokemon not in area")
            return;
        }
        const pokemon = await state.api.fetchPokemonInfo(pokemonName);
        console.log(`Throwing a Pokeball at ${pokemon.name}...`);
        const isCaught = (Math.random() < 1 / (1 + pokemon.base_experience / 100));
        if (isCaught) {
            console.log(`${pokemon.name} was caught!`);
            state.pokedex[pokemon.name] = pokemon;
        } else {
            console.log(`${pokemon.name} escaped!`)
        }
    } catch(error) {
        console.error(`Unable to catch '${pokemonName}' - ${error}`)
    }
}
