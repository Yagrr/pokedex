import { z } from "zod";

import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static cache: Cache;

    constructor(interval: number) {
        // 5 min = 300 000 ms
        PokeAPI.cache = new Cache(interval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (!pageURL) {
            console.log(PokeAPI.baseURL);
            pageURL = `${PokeAPI.baseURL}/location-area/`;
        }

        // Get cache if exists, check if valid
        const cachedLocations = PokeAPI.cache.get(pageURL);
        const isShallowLocations = (cachedData: unknown): cachedData is ShallowLocations => ShallowLocationsSchema.safeParse(cachedData).success;
        if (isShallowLocations(cachedLocations)) {
            return cachedLocations;
        }

        const locationsFetched = await fetch (pageURL, {
            method: "GET",

            mode: "cors",
        });
        const locations = ShallowLocationsSchema.safeParse(await locationsFetched.json());
        if (!locations.success) {
            throw new Error(`${locations.error}`);
        }

        PokeAPI.cache.add(pageURL, locations.data);
        return locations.data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const pageURL = `${PokeAPI.baseURL}/location-area/${locationName}/`;

        // Get cache if exists, check if valid
        const cachedLocation = PokeAPI.cache.get(pageURL);
        const isLocation = (cachedData: unknown): cachedData is Location => LocationSchema.safeParse(cachedData).success;
        if (isLocation(cachedLocation)) {
            return cachedLocation;
        }

        const locationFetched = await fetch (pageURL, {
            method: "GET",
            mode: "cors",
        });
        const location = LocationSchema.safeParse(await locationFetched.json());
        if (!location.success) {
            throw new Error(`Error fetching locations data - data: ${location.data}`);
        }

        PokeAPI.cache.add(pageURL, location.data);
        return location.data;
    }
}

export const ShallowLocationsSchema = z.object({
    count: z.number(),
    next: z.nullable(z.string()),
    previous: z.nullable(z.string()),
    results: z.array(z.object({
        name: z.string(),
        url: z.string(),
    }))
});

export const LocationSchema = z.object({
    id: z.number(),
    location: z.object({
        name: z.string(),
        url: z.string(),
    }),
    pokemon_encounters: z.array(z.object({
        name: z.string(),
        url: z.string(),
    })),
});

export type ShallowLocations = z.infer<typeof ShallowLocationsSchema>;

export type Location = z.infer<typeof LocationSchema> ;
