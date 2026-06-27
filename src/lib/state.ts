import { createInterface, type Interface } from "readline";

import { getCommands } from "./commands.js";
import { commandExit } from "./command_exit.js";
import { cleanInput } from "../repl.js";
import { PokeAPI } from "./pokeapi.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI,
    nextLocationsURL?: string | null;
    previousLocationsURL?: string | null;
};

export async function initState(prompt: string): Promise<State> {
    const state = {
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: prompt.length > 0 ? `${prompt} ` : "",
        }),
        commands: getCommands(),
        api: new PokeAPI(),
    }
    console.log("Welcome to the Pokedex!");
    state.rl.prompt();

    state.rl.on("line", async (input): Promise<void> => {
        const inputSanitized = cleanInput(input)[0];
        if (inputSanitized in state.commands) {
            const commandCalled =state.commands[inputSanitized];
            try {
                await commandCalled.callback(state);
            } catch(error) {
                console.log(error);
            }
        } else {
            console.log("Unknown command");
        }
        state.rl.prompt();
    })
    state.rl.on("exit", commandExit);

    return state;
}
