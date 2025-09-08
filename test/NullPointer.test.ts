/** @file Tests for the NullPointer class. */
import { describe, expect, it } from "vitest";

import { NullPointer } from "../src";

describe("NullPointer Class", () => {
    describe("Initialization", () => {
        it("should always have a pointer value of 0", () => {
            const nullPtr = new NullPointer();
            expect(nullPtr.ptr).toBe(0);
        });
    });

    describe("Behavior", () => {
        it("should throw an error when attempting to read", () => {
            const nullPtr = new NullPointer();
            expect(() => nullPtr.read()).toThrowError(
                "Cannot read from a NullPointer"
            );
        });
    });
});
