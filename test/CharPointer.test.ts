/** @file Tests for the CharPointer class. */
import { beforeAll, describe, expect, it } from "vitest";

import { CharPointer } from "../src";

import { getModule, type WASMTestsModule } from "./test_module";

describe("CharPointer Class", () => {
    let wasm: WASMTestsModule;

    beforeAll(async () => {
        wasm = await getModule();
    });

    describe("Initialization and Operations", () => {
        it("should correctly create and read a character pointer", () => {
            const charPtr = CharPointer.from(wasm, "A");
            expect(charPtr.read()).toBe("A");
            charPtr.free();
        });

        it("should correctly write a new character to an existing pointer", () => {
            const charPtr = CharPointer.from(wasm, "B");
            charPtr.write("C");
            expect(charPtr.read()).toBe("C");
            charPtr.free();
        });

        it("should correctly allocate and write a character", () => {
            const charPtr = CharPointer.alloc(wasm);
            charPtr.write("X");
            expect(charPtr.readAndFree()).toBe("X");
        });
    });

    describe("Error Handling and Validation", () => {
        it("should throw an error if input is not exactly one character", () => {
            expect(() => CharPointer.from(wasm, "AB")).toThrowError(
                "Input must be exactly one character"
            );
        });

        it("should throw an error when writing a multi-character string", () => {
            const charPtr = CharPointer.alloc(wasm);
            expect(() => charPtr.write("YZ")).toThrowError(
                "Input must be exactly one character"
            );
            charPtr.free();
        });

        it("should throw an error when operating on a freed pointer", () => {
            const charPtr = CharPointer.from(wasm, "A");
            charPtr.free();
            expect(() => charPtr.read()).toThrowError(
                "Cannot operate on freed or invalid pointer"
            );
        });
    });
});
