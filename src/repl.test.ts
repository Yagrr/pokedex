import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl.js";

describe.each([
    {
        input: " hello world ",
        expected: ["hello", "world"],
    },
    {
        input: "HelloWorld !",
        expected: ["helloworld", "!"],
    },
    {
        input: "Hello World !",
        expected: ["hello", "world", "!"],
    },
    {
        input: "Knight Squire Princess King Fantasy",
        expected: ["knight", "squire", "princess", "king", "fantasy"],
    }
    // TODO: add more test cases
])("cleanInput($input)", ({ input, expected }) => {
        test(`Expected: ${expected}`, () => {
            const actual = cleanInput(input);
            expect(actual).toHaveLength(expected.length);
            for (const i in expected) {
                expect(actual[i]).toBe(expected[i]);
            }
        });
    });

