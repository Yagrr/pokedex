import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    try {
        const locationsData = await state.api.fetchLocations(state.nextLocationsURL ? state.nextLocationsURL : undefined);
        for (const location of locationsData.results) {
            console.log(location.name);
        }
        if (locationsData.next) {
            state.nextLocationsURL = locationsData.next;
        }
        if (locationsData.previous) {
            state.previousLocationsURL = locationsData.previous;
        } else {
            state.previousLocationsURL = null;
            console.log("You're on the first page.")
        }
    } catch(error) {
        console.log(`Error while fetching map: ${error}`);
        state.rl.prompt();
    }
} 

export async function commandMapb(state: State): Promise<void> {
    try {
        const locationsData = await state.api.fetchLocations(state.previousLocationsURL ? state.previousLocationsURL : undefined);
        for (const location of locationsData.results) {
            console.log(location.name);
        }
        if (locationsData.next) {
            state.nextLocationsURL = locationsData.next;
        }
        if (locationsData.previous) {
            state.previousLocationsURL = locationsData.previous;
        } else {
            state.previousLocationsURL = null;
            console.log("You're on the first page.");
        }
    } catch(error) {
        console.log(`Error while fetching map: ${error}`);
        state.rl.prompt();
    }
} 
