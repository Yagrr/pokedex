import { createInterface, type Interface } from "readline";

import { getCommands } from "./commands.js";
import { commandExit } from "./command_exit.js";
import { cleanInput } from "../repl.js";
import { PokeAPI } from "./pokeapi.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI,
    nextLocationsURL?: string | null;
    previousLocationsURL?: string | null;
};

export async function initState(prompt: string, interval: number): Promise<State> {
    const state = {
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: prompt.length > 0 ? `${prompt} ` : "",
        }),
        commands: getCommands(),
        api: new PokeAPI(interval),
    }
    console.log("Welcome to the Pokedex!");
    state.rl.prompt();

    state.rl.on("line", async (input): Promise<void> => {
        const inputSanitized = cleanInput(input);
        const args = input.split(" ").slice(1);
        // only take the first word as command
        if (inputSanitized[0] in state.commands) {
            const commandCalled = state.commands[inputSanitized[0]];

            try {
                await commandCalled.callback(state, ...args);
            } catch(error) {
                console.error(error);
            }

        } else {
            console.error("Unknown command");
        }
        state.rl.prompt();
    })
    state.rl.on("exit", commandExit);

    return state;
}
