import { createInterface } from "node:readline";
import { getCommands } from "./lib/commands.js";
import { commandExit } from "./lib/command_exit.js";

export function startREPL(): void {
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    console.log("Welcome to the Pokedex!");
    repl.prompt();
    repl.on("line", (input): void => {
       const commandsAvailable = getCommands(); 
        const inputSanitized = cleanInput(input)[0];
        if (inputSanitized in commandsAvailable) {
            const commandCalled = commandsAvailable[inputSanitized];
            try {
                commandCalled.callback(commandsAvailable);
                repl.prompt()
            } catch(error) {
                console.log(error);
            }
        } else {
            console.log("Unknown command");
        }
    })
    repl.on("exit", commandExit);
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().replace(/\s+/g, " ").split(" ");
}
