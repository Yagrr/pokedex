# TS-Pokedex

## Description

A CLI-based Pokedex written in TypeScript that uses the PokeAPI to fetch data about Pokemon and its world.

This project implements a REPL that fetches data from the [PokeAPI](https://pokeapi.co/), written as part of [Boot.dev's course "Build a Pokedex in TypeScript"](https://www.boot.dev/courses/build-pokedex-cli-typescript) for practicing API calls, JSON parsing, and caching.

This project was created for the purpose of self-learning, use at your own risk.

## Installation

1. Requirements:

- Node.js JavaScript runtime environment: version 22.15.0. 
    - Install [NVM](https://github.com/nvm-sh/nvm) for managing Node.js versions and type `nvm use` in the CLI in the root folder to ensure the correct Node.js version is used. The `.nvmrc` file indicates the required Node.js version.

- [npm](https://www.npmjs.com/package/npm): version >10.9.7

2. Clone the repository locally or download as .zip file and extract:

```bash
git clone <URL>
cd pokedex/
```

3. Initialise Pokedex with `npm start`

## Usage

Basic loop:

- `map`: display the 20 locations areas.

- `mapb`: display the previous 20 location areas.

- `explore <Location area>`: explore an area to list all the Pokemon in a given area.

- `catch <Pokemon in location area>`: catch a Pokemon in the location area.

- `inspect <caught Pokemon>`: Inspect a caught Pokemon.

- `pokedex`: List all caught Pokemon.
