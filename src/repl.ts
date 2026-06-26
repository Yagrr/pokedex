import { createInterface } from "node:readline";

export function startREPL(): void {
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    repl.prompt();
    repl.on("line", (input): void => {
        if (input === "") {
            repl.prompt();
        } else {
            const inputClean = cleanInput(input);
            console.log(`Your command was: ${inputClean[0]}`);
            repl.prompt();
        } 
    });
}



export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ");
}
