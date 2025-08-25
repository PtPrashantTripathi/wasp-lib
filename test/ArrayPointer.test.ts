/** @file Tests for the ArrayPointer class. */
import { beforeAll, describe, expect, it } from "vitest";

import { ArrayPointer } from "../src";

import { getModule, type WASMTestsModule } from "./test_module";

describe("ArrayPointer Class", () => {
    let wasm: WASMTestsModule;

    beforeAll(async () => {
        wasm = await getModule();
    });

    describe("Initialization and Operations", () => {
        it("should correctly create and read a numeric array", () => {
            const numbers = [1, 2, 3, 4, 5];
            const arrayPtr = ArrayPointer.from(
                wasm,
                "i32",
                numbers.length,
                numbers
            );
            expect(arrayPtr.read()).toEqual(numbers);
            arrayPtr.free();
        });

        it("should correctly handle an array of floating-point numbers", () => {
            const floats = [1.1, 2.2, 3.3];
            const arrayPtr = ArrayPointer.from(wasm, "float", 3, floats);
            const result = arrayPtr.read();
            expect(result[0]).toBeCloseTo(1.1);
            expect(result[1]).toBeCloseTo(2.2);
            expect(result[2]).toBeCloseTo(3.3);
            arrayPtr.free();
        });

        it("should correctly write new values to an allocated array", () => {
            const arrayPtr = ArrayPointer.alloc(wasm, "i32", 3);
            const newValues = [10, 20, 30];
            arrayPtr.write(newValues);
            expect(arrayPtr.read()).toEqual(newValues);
            arrayPtr.free();
        });

        it("should correctly add and retrieve an element at a specific index", () => {
            const arrayPtr = ArrayPointer.from(wasm, "i32", 3, [1, 2, 3]);
            arrayPtr.add(1, 99);
            expect(arrayPtr.read()[1]).toBe(99);
            arrayPtr.free();
        });
    });

    describe("Error Handling and Validation", () => {
        it("should throw a length mismatch error if array length exceeds allocated size", () => {
            const arrayPtr = ArrayPointer.alloc(wasm, "i32", 2);
            expect(() => arrayPtr.write([1, 2, 3])).toThrowError(
                "Array length mismatch. Expected 2, got 3"
            );
            arrayPtr.free();
        });

        it("should throw an out-of-bounds error when writing to an invalid index", () => {
            const arrayPtr = ArrayPointer.alloc(wasm, "i32", 2);
            expect(() => arrayPtr.add(2, 42)).toThrowError(
                "Out-of-bounds access: tried to write at index 2 in array of length 2"
            );
            arrayPtr.free();
        });

        it("should throw an error when attempting to operate on a freed pointer", () => {
            const arrayPtr = ArrayPointer.from(wasm, "i32", 2, [1, 2]);
            arrayPtr.free();
            expect(() => arrayPtr.read()).toThrowError(
                "Cannot operate on freed or invalid pointer"
            );
        });
    });

    describe("Interaction with WASM functions", () => {
        it("should correctly modify an array of i32 integers", () => {
            const numbers = [1, 2, 3, 4, 5];
            const arrayPtr = ArrayPointer.from(
                wasm,
                "i32",
                numbers.length,
                numbers
            );
            wasm._modify_i32_array(arrayPtr.ptr, numbers.length);
            expect(arrayPtr.readAndFree()).toEqual([2, 4, 6, 8, 10]);
        });
    });
});
