import { createInterface, type Interface } from "readline";

import { getCommands } from "./commands.js";
import { commandExit } from "./command_exit.js";
import { cleanInput } from "../repl.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
};

export function initState(prompt: string): State {
    const state = {
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: prompt.length > 0 ? `${prompt} ` : "",
        }),
        commands: getCommands(),
    }
    console.log("Welcome to the Pokedex!");
    state.rl.prompt();

    state.rl.on("line", (input): void => {
        const inputSanitized = cleanInput(input)[0];
        if (inputSanitized in state.commands) {
            const commandCalled = state.commands[inputSanitized];
            try {
                commandCalled.callback(state);
                state.rl.prompt()
            } catch(error) {
                console.log(error);
            }
        } else {
            console.log("Unknown command");
        }
    })
    state.rl.on("exit", commandExit);

    return state;
}
