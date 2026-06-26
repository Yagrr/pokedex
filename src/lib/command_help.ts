import { State } from "./state.js";

export function commandHelp(state: State): void {
    console.log("\nUsage:\n");
    const commandsAvailable = state.commands;
    for (const cmd in commandsAvailable) {
        console.log(`${commandsAvailable[cmd].name}: ${commandsAvailable[cmd].description}`);
    }
}
