/** @file Tests for the BoolPointer class. */
import { beforeAll, describe, expect, it } from "vitest";

import { BoolPointer } from "../src";

import { getModule, type WASMTestsModule } from "./test_module";

describe("BoolPointer Class", () => {
    let wasm: WASMTestsModule;

    beforeAll(async () => {
        wasm = await getModule();
    });

    describe("Initialization and Operations", () => {
        it("should correctly create and read a true boolean pointer", () => {
            const boolPtr = BoolPointer.from(wasm, true);
            expect(boolPtr.read()).toBe(true);
            boolPtr.free();
        });

        it("should correctly create and read a false boolean pointer", () => {
            const boolPtr = BoolPointer.from(wasm, false);
            expect(boolPtr.read()).toBe(false);
            boolPtr.free();
        });

        it("should correctly write a new value to an existing boolean pointer", () => {
            const boolPtr = BoolPointer.from(wasm, true);
            boolPtr.write(false);
            expect(boolPtr.read()).toBe(false);
            boolPtr.free();
        });
    });

    describe("Memory Management and Validation", () => {
        it("should throw an error when operating on a freed pointer", () => {
            const boolPtr = BoolPointer.from(wasm, true);
            boolPtr.free();
            expect(() => boolPtr.read()).toThrowError(
                "Cannot operate on freed or invalid pointer"
            );
        });

        it("should correctly allocate a boolean pointer with a default value of false", () => {
            const boolPtr = BoolPointer.alloc(wasm);
            expect(boolPtr.read()).toBe(false);
            boolPtr.free();
        });
    });

    describe("Interaction with WASM functions", () => {
        it("should correctly modify a boolean via a C++ function", () => {
            const boolPtr = BoolPointer.from(wasm, true);
            wasm._modify_bool_pointer(boolPtr.ptr);
            expect(boolPtr.readAndFree()).toBe(false);
        });
    });
});
