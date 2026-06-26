import { State } from "./state.js";

export function commandExit(state: State): void {
    console.log("\nClosing the Pokedex... Goodbye!\n");
    state.rl.close();
    process.exit(0);
};
