import { z } from "zod";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (!pageURL) {
            console.log(PokeAPI.baseURL);
            pageURL = `${PokeAPI.baseURL}/location-area/`;
        }

        try {
            const locations = await fetch (pageURL, {
                method: "GET",
                mode: "cors",
            });
            return ShallowLocationsSchema.parse(await locations.json());
        } catch(error) {
            throw new Error(`${error}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const pageURL = `${PokeAPI.baseURL}/location-area/${locationName}/`;
        try {
            const location = await fetch (pageURL, {
                method: "GET",
                mode: "cors",
            });
            return LocationSchema.parse(await location.json());
        } catch(error) {
            throw new Error(`${error}`);
        }
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
