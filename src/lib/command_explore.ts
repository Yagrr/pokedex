import { type State } from "./state.js";

export async function commandExplore(state: State, ...locationNames: string[]): Promise<void> {
    // Omit state.rl.prompt at the end as this callback function runs in a
    // loop to parse multiple locationName
    if (locationNames.length === 0) {
        console.log(`Empty location name, please input an area name`);
        state.rl.prompt();
    }
    for (const locationName of locationNames) {
        console.log(`Exploring ${locationName}...`);
        try {
            console.log("Found Pokemon:");
            const pokemonEncounters = (await state.api.fetchLocation(locationName)).pokemon_encounters;
            for (const pokemonData of pokemonEncounters) {
                console.log(`- ${pokemonData.pokemon.name}`);
            }
        } catch(error) {
            console.error(`Error while exploring: ${error}`);
            continue;
        }
    }
}
