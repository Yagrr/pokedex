import { initState } from "./lib/state.js";

export const startREPL = async (): Promise<void> => {
    const prompt = "Pokedex > ";
    const cachingInterval = 500000
    const state = await initState(prompt, cachingInterval);
};

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().replace(/\s+/g, " ").split(" ");
}
