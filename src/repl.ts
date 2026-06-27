import { initState } from "./lib/state.js";

export const startREPL = async (): Promise<void> => {
    const prompt = "Pokedex > ";
    const state = await initState(prompt);
};

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().replace(/\s+/g, " ").split(" ");
}
