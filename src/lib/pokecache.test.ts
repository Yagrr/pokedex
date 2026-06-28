import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500, // 1/2 second
    },
    {
        key: "https://example.com/path",
        val: "testdata",
        interval: 1000, // 1 second
    },
    {
        key: "https://pokeapi.co/api/v2",
        val: {
            "count": 1234,
            "next": "https://pokeapi.co/api/v2/location-area/?offset=20&limit=20",
            "previous": null,
            "results": [
                {
                    "name": "canalave-city-area",
                    "url": "https://pokeapi.co/api/v2/location-area/1/",
                },
                {
                    "name": "eterna-city-area",
                    "url": "https://pokeapi.co/api/v2/location-area/2/",
                },
                {
                    "name": "pastoria-city-area",
                    "url": "https://pokeapi.co/api/v2/location-area/3/",
                },
            ]
        },
        interval: 2000, // 2 seconds
    },  
    {
        key: "https://pokeapi.co/api/v2/location-area/canalave-city-area",
        val: {
            "encounter_method_rates": "data",
            "pokemon_encounters": "some_object",
        },
        interval: 1000, // 1 seconds
    }
])("Test Caching $interval ms", async ({ key, val, interval }) => {
        const cache = new Cache(interval);

        cache.add(key, val);
        const cached = cache.get(key);
        expect(cached).toBe(val);

        await new Promise((resolve) => setTimeout(resolve, interval * 2));
        const reaped = cache.get(key);
        expect(reaped).toBe(undefined);

        cache.stopReapLoop();
    });
