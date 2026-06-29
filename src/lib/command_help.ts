import { type State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    console.log("\nUsage:\n");
    const commandsAvailable = state.commands;
    for (const cmd in commandsAvailable) {
        console.log(`${commandsAvailable[cmd].name}: ${commandsAvailable[cmd].description}`);
    }
}
