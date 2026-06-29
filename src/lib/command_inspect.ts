import { Pokemon } from "./pokeapi.js";
import { type State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void> {
    // check if currentLocation is defined 
    const pokemonData: Pokemon = state.pokedex[pokemonName];
    if (!pokemonData) {
        console.log("You have not caught that pokemon")
        return;
    }
    const statsMap = Object.fromEntries(
        pokemonData.stats.map((s) => [s.stat.name, s.base_stat])
    );
    const typesMap = Object.fromEntries(
        pokemonData.types.map((t) => [t.slot, t.type.name])
    );

    console.log(`Name: ${pokemonData.name}`);
    console.log(`Height: ${pokemonData.height}`);
    console.log(`Weight: ${pokemonData.weight}`);
    console.log("Stats:");
    for (const [statName, statValue] of Object.entries(statsMap)) {
        console.log(`\t-${statName}: ${statValue}`);
    }
    console.log("Types:");
    for (const [_, typeName] of Object.entries(typesMap)) {
        console.log(`\t- ${typeName}`);
    }
}
