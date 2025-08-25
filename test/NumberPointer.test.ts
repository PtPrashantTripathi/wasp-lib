/** @file Tests for the NumberPointer class. */
import { beforeAll, describe, expect, it } from "vitest";

import { NumberPointer } from "../src";

import { getModule, type WASMTestsModule } from "./test_module";

describe("NumberPointer Class", () => {
    let wasm: WASMTestsModule;

    beforeAll(async () => {
        wasm = await getModule();
    });

    describe("Initialization and Read/Write Operations", () => {
        it("should correctly create, write, and read an i8 pointer", () => {
            const ptr = NumberPointer.from(wasm, "i8", 10);
            expect(ptr.read()).toBe(10);
            ptr.write(20);
            expect(ptr.read()).toBe(20);
            ptr.free();
        });

        it("should correctly create, write, and read an i32 pointer", () => {
            const ptr = NumberPointer.from(wasm, "i32", 123456);
            expect(ptr.read()).toBe(123456);
            ptr.write(654321);
            expect(ptr.read()).toBe(654321);
            ptr.free();
        });

        it("should correctly create, write, and read a float pointer", () => {
            const ptr = NumberPointer.from(wasm, "float", 3.14);
            expect(ptr.read()).toBeCloseTo(3.14);
            ptr.write(9.87);
            expect(ptr.read()).toBeCloseTo(9.87);
            ptr.free();
        });

        it("should correctly handle a 64-bit integer (i64) using BigInt", () => {
            const bigNumber = 9007199254740991n;
            const ptr = NumberPointer.from(wasm, "i64", bigNumber);
            expect(ptr.read()).toBe(bigNumber);
            const newBigNumber = bigNumber + 100n;
            ptr.write(newBigNumber);
            expect(ptr.read()).toBe(newBigNumber);
            ptr.free();
        });
    });

    describe("Memory Management", () => {
        it("should throw an error when operating on a freed pointer", () => {
            const ptr = NumberPointer.from(wasm, "i32", 42);
            ptr.free();
            expect(() => ptr.read()).toThrowError(
                "Cannot operate on freed or invalid pointer"
            );
        });

        it("should return false for isValid after being freed", () => {
            const ptr = NumberPointer.from(wasm, "i32", 42);
            expect(ptr.isValid).toBe(true);
            ptr.free();
            expect(ptr.isValid).toBe(false);
        });
    });

    describe("Interaction with WASM functions", () => {
        it("should correctly modify a value via a C++ function call with a pointer", () => {
            const ptr = NumberPointer.from(wasm, "i32", 5);
            wasm._modify_i32_pointer(ptr.ptr);
            expect(ptr.readAndFree()).toBe(10); // The C function doubles the value
        });

        it("should correctly modify a float via a C++ function", () => {
            const floatPtr = NumberPointer.from(wasm, "float", 7.7);
            wasm._modify_float_pointer(floatPtr.ptr);
            expect(floatPtr.readAndFree()).toBeCloseTo(15.4);
        });
    });
});
