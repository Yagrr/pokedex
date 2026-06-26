import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
    console.log("\nUsage:\n");
    const commandsAvailable = commands;
    for (const cmd in commandsAvailable) {
        console.log(`${commandsAvailable[cmd].name}: ${commandsAvailable[cmd].description}`);
    }
}
