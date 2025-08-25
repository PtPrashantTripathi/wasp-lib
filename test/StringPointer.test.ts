/** @file Tests for the StringPointer class. */
import { beforeAll, describe, expect, it } from "vitest";

import { StringPointer } from "../src";

import { getModule, type WASMTestsModule } from "./test_module";

describe("StringPointer Class", () => {
    let wasm: WASMTestsModule;

    beforeAll(async () => {
        wasm = await getModule();
    });

    describe("Initialization and Operations", () => {
        it("should correctly create and read a string pointer", () => {
            const str = "Hello World!";
            const strPtr = StringPointer.from(wasm, 20, str);
            expect(strPtr.read()).toBe(str);
            strPtr.free();
        });

        it("should correctly write new content to an existing pointer", () => {
            const strPtr = StringPointer.from(wasm, 20, "old");
            strPtr.write("new");
            expect(strPtr.read()).toBe("new");
            strPtr.free();
        });

        it("should return the correct string representation", () => {
            const strPtr = StringPointer.from(wasm, 20, "test");
            expect(strPtr.toString()).toContain("StringPointer(ptr=");
            expect(strPtr.toString()).toContain(", valid=true)");
            strPtr.free();
        });
    });

    describe("Error Handling and Validation", () => {
        it("should throw an error if the string length exceeds the buffer size", () => {
            const strPtr = StringPointer.alloc(wasm, 5);
            expect(() => strPtr.write("too long")).toThrowError(
                "String length exceeds buffer size"
            );
            strPtr.free();
        });

        it("should throw an error when operating on a freed pointer", () => {
            const strPtr = StringPointer.from(wasm, 10, "test");
            strPtr.free();
            expect(() => strPtr.read()).toThrowError(
                "Cannot operate on freed or invalid pointer"
            );
        });
    });

    describe("Interaction with WASM functions", () => {
        it("should correctly modify a string via a C++ function", () => {
            const strPtr = StringPointer.from(wasm, 30, "Hello");
            wasm._modify_string(strPtr.ptr);
            const modifiedString = strPtr.readAndFree();
            expect(modifiedString).toContain("Hello World!");
        });
    });
});
