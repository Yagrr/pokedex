import { initState } from "./lib/state.js";

export const startREPL = (): void => {
    const prompt = "Pokedex > ";
    const state = initState(prompt)
};

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().replace(/\s+/g, " ").split(" ");
}
