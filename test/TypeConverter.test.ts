/** @file Tests for the TypeConverter utility class. */
import { describe, expect, it } from "vitest";

import { C_FALSE, C_TRUE, TypeConverter } from "../src/";
import { C_NumberType, C_TYPE_SIZES } from "../src/types";

describe("TypeConverter Utility Functions", () => {
    describe("Boolean Conversions", () => {
        it("should convert JavaScript booleans to C integers", () => {
            expect(TypeConverter.boolToC(true)).toBe(C_TRUE);
            expect(TypeConverter.boolToC(false)).toBe(C_FALSE);
        });

        it("should convert C integers back to JavaScript booleans", () => {
            expect(TypeConverter.boolFromC(1)).toBe(true);
            expect(TypeConverter.boolFromC(0)).toBe(false);
            expect(TypeConverter.boolFromC(42)).toBe(true); // Should handle any non-zero value as true
        });
    });

    describe("Character Conversions", () => {
        it("should convert a single character to its ASCII code", () => {
            expect(TypeConverter.charToC("A")).toBe(65);
            expect(TypeConverter.charToC("0")).toBe(48);
        });

        it("should convert an ASCII code to a single character", () => {
            expect(TypeConverter.charFromC(65)).toBe("A");
            expect(TypeConverter.charFromC(48)).toBe("0");
        });

        it("should throw an error for invalid character length input", () => {
            expect(() => TypeConverter.charToC("AB")).toThrowError(
                "Input must be exactly one character"
            );
            expect(() => TypeConverter.charToC("😎")).toThrowError(
                "Input must be exactly one character"
            );
            expect(() => TypeConverter.charToC("")).toThrowError(
                "Input must be exactly one character"
            );
        });

        it("should throw an error for a character outside the ASCII range", () => {
            expect(() => TypeConverter.charToC("ǣ")).toThrowError(
                "Character 'ǣ' is outside ASCII range (0-255)"
            );
        });

        it("should throw an error for invalid ASCII codes", () => {
            expect(() => TypeConverter.charFromC(-1)).toThrowError(
                "Invalid ASCII code: -1. Must be 0-255"
            );
            expect(() => TypeConverter.charFromC(256)).toThrowError(
                "Invalid ASCII code: 256. Must be 0-255"
            );
        });
    });

    describe("Type Validation and Sizing", () => {
        it("should correctly validate supported numeric types", () => {
            for (const type in C_TYPE_SIZES) {
                expect(TypeConverter.validateNumberType(type)).toBe(true);
            }
        });

        it("should throw an error for an unsupported numeric type", () => {
            expect(() =>
                TypeConverter.validateNumberType("string")
            ).toThrowError("Unsupported number type: string");
        });

        it("should return the correct size in bytes for a given type", () => {
            for (const type in C_TYPE_SIZES) {
                expect(TypeConverter.getTypeSize(type as C_NumberType)).toBe(
                    C_TYPE_SIZES[type]
                );
            }
        });
    });
});
