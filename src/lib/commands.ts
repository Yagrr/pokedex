
import type { CLICommand } from "./state.js";

import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Display the next 20 location areas in the Pokemon world",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Display the previous 20 location areas in the Pokemon world",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Explore an area to list all the Pokemon in a given area, requires an area name as input",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Catch a Pokemon given its name",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspect caught Pokemon",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "List all caught Pokemon",
            callback: commandPokedex,
        },
    };
}
