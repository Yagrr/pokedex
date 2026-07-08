# TS-Pokedex

## Description

A CLI-based Pokedex written in TypeScript that uses the PokeAPI to fetch data about Pokemon and its world.

This project implements a REPL that fetches data from the [PokeAPI](https://pokeapi.co/), written as part of [Boot.dev's course "Build a Pokedex in TypeScript"](https://www.boot.dev/courses/build-pokedex-cli-typescript) for practicing API calls, JSON parsing, and caching.

This project was created for the purpose of self-learning, use at your own risk.

## Installation

1. Requirements

- Node.js JavaScript runtime environment: version 22.15.0.
- npm: version >10.9.7
- nvm: >0.40.5

You can download [Node.js using nvm with npm](https://nodejs.org/en/download), to install Node.js globally. The steps after this one is for downloading the specific Node.js version used by this project. This is by far the simplest approach to setting up this project for usage.

2. Clone the repository locally or download as .zip file and extract somewhere convenient

```bash
git clone <URL>
cd pokedex/
```

3. Download the required Node.js version and npm dependencies

From the command line, use `nvm use` within the `pokedex/` root folder to ensure the correct Node.js version is used within the working directory. The `.nvmrc` file indicates the required Node.js version.

Use `npm install` to install Node modules for running the project. The list of packages are located in `packages.json`.

4. Initialise Pokedex with `npm start`

## Usage

Basic loop:

- `map`: display the 20 locations areas.

- `mapb`: display the previous 20 location areas.

- `explore <Location area>`: explore an area to list all the Pokemon in a given area.

- `catch <Pokemon in location area>`: catch a Pokemon in the location area.

- `inspect <caught Pokemon>`: Inspect a caught Pokemon.

- `pokedex`: List all caught Pokemon.
