import { State } from "./state.js";

export async function commandExit(state: State): Promise<void> {
    console.log("\nClosing the Pokedex... Goodbye!\n");
    state.rl.close();
    process.exit(0);
};
