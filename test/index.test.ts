/**
 * @file Comprehensive test suite for wasp-lib library.
 *
 *   This test suite validates all functionality of the wasp-lib library
 *   including:
 *
 *   - Memory management operations
 *   - Type-safe pointer operations
 *   - Array manipulation
 *   - String handling
 *   - Error handling and validation
 *   - Performance characteristics
 *
 *   Tests are organized into logical groups with descriptive names and
 *   comprehensive coverage of both happy path and error conditions.
 * @author Pt. Prashant Tripathi
 * @since 1.0.0
 */
import { beforeAll, describe, expect, it } from "vitest";

import {
    ArrayPointer,
    BoolPointer,
    C_FALSE,
    C_TRUE,
    CharPointer,
    NumberPointer,
    StringPointer,
    TypeConverter,
    WASMModule,
} from "../src/";
import { C_TYPE_SIZES } from "../src/types";
import Module from "./test_module";

/**
 * Extended WASM module interface with test-specific functions. This interface
 * defines the C functions available in our test WASM module.
 */
interface TestsWASMModule extends WASMModule {
    // Scalar value modification functions (return modified value)
    _modify_i8(value: number): number;
    _modify_i16(value: number): number;
    _modify_i32(value: number): number;
    _modify_i64(value: bigint): bigint;
    _modify_float(value: number): number;
    _modify_double(value: number): number;
    _modify_char(value: number): number;
    _modify_bool(value: number): number;

    // Pointer modification functions (modify value in-place via pointer)
    _modify_i8_pointer(ptr: number): void;
    _modify_i16_pointer(ptr: number): void;
    _modify_i32_pointer(ptr: number): void;
    _modify_i64_pointer(ptr: number): void;
    _modify_float_pointer(ptr: number): void;
    _modify_double_pointer(ptr: number): void;
    _modify_char_pointer(ptr: number): void;
    _modify_bool_pointer(ptr: number): void;

    // Array modification functions (modify array elements in-place)
    _modify_i8_array(ptr: number, length: number): void;
    _modify_i16_array(ptr: number, length: number): void;
    _modify_i32_array(ptr: number, length: number): void;
    _modify_i64_array(ptr: number, length: number): void;
    _modify_float_array(ptr: number, length: number): void;
    _modify_double_array(ptr: number, length: number): void;
    _modify_string(ptr: number): void;
    _malloc(ptr: number): number;
    _free(ptr: number): void;
}

describe("WASM Module Integration", () => {
    let wasm: TestsWASMModule;

    beforeAll(async () => {
        const wasmModule = await Module();
        wasm = wasmModule as TestsWASMModule;
    });

    describe("Scalar Value Operations", () => {
        it("should correctly modify a scalar 8-bit integer", () => {
            expect(wasm._modify_i8(10)).toBe(20);
        });

        it("should correctly modify a scalar 16-bit integer", () => {
            expect(wasm._modify_i16(10000)).toBe(20000);
        });

        it("should correctly modify a scalar 32-bit integer", () => {
            expect(wasm._modify_i32(1000000000)).toBe(2000000000);
        });

        it("should correctly modify a scalar 64-bit integer", () => {
            expect(wasm._modify_i64(1000000000000000000n)).toBe(
                2000000000000000000n
            );
        });

        it("should correctly modify a scalar float value", () => {
            expect(wasm._modify_float(5.5)).toBeCloseTo(11.0);
        });

        it("should correctly modify a scalar double value", () => {
            expect(wasm._modify_double(6.6)).toBeCloseTo(13.2);
        });

        it("should correctly modify a scalar character", () => {
            const charCode = TypeConverter.charToC("A");
            const modifiedCharCode = wasm._modify_char(charCode);
            const modifiedChar = TypeConverter.charFromC(modifiedCharCode);
            expect(modifiedChar).toBe("B");
        });

        it("should correctly modify a scalar boolean value", () => {
            const cTrue = TypeConverter.boolToC(true);
            const modifiedBool = wasm._modify_bool(cTrue);
            expect(TypeConverter.boolFromC(modifiedBool)).toBe(false);

            const cFalse = TypeConverter.boolToC(false);
            const modifiedFalseBool = wasm._modify_bool(cFalse);
            expect(TypeConverter.boolFromC(modifiedFalseBool)).toBe(true);
        });
    });

    describe("Pointer Operations", () => {
        it("should correctly modify value via i8 pointer", () => {
            const numberPointer = NumberPointer.from(wasm, "i8", 11);
            wasm._modify_i8_pointer(numberPointer.ptr);
            expect(numberPointer.readAndFree()).toBe(22);
        });

        it("should correctly modify value via i16 pointer", () => {
            const numberPointer = NumberPointer.from(wasm, "i16", 22);
            wasm._modify_i16_pointer(numberPointer.ptr);
            expect(numberPointer.readAndFree()).toBe(44);
        });

        it("should correctly modify value via i32 pointer", () => {
            const numberPointer = NumberPointer.from(wasm, "i32", 33);
            wasm._modify_i32_pointer(numberPointer.ptr);
            expect(numberPointer.readAndFree()).toBe(66);
        });

        it("should correctly modify value via i64 pointer", () => {
            const numberPointer = NumberPointer.from(wasm, "i64", 44n);
            wasm._modify_i64_pointer(numberPointer.ptr);
            expect(numberPointer.readAndFree()).toBe(88n);
        });

        it("should correctly modify value via float pointer", () => {
            const floatPointer = NumberPointer.from(wasm, "float", 7.7);
            wasm._modify_float_pointer(floatPointer.ptr);
            expect(floatPointer.readAndFree()).toBeCloseTo(15.4);
        });

        it("should correctly modify value via double pointer", () => {
            const doublePointer = NumberPointer.from(wasm, "double", 8.8);
            wasm._modify_double_pointer(doublePointer.ptr);
            expect(doublePointer.readAndFree()).toBeCloseTo(17.6);
        });

        it("should correctly modify value via char pointer", () => {
            const charPointer = CharPointer.from(wasm, "C");
            wasm._modify_char_pointer(charPointer.ptr);
            expect(charPointer.readAndFree()).toBe("D");
        });

        it("should correctly modify value via bool pointer", () => {
            const boolPointer = BoolPointer.from(wasm, true);
            wasm._modify_bool_pointer(boolPointer.ptr);
            expect(boolPointer.readAndFree()).toBe(false);
        });
    });

    describe("Array and String Operations", () => {
        it("should correctly modify an array of i8 integers", () => {
            const arrayPointer = ArrayPointer.from(wasm, "i8", 3, [1, 2, 3]);
            wasm._modify_i8_array(arrayPointer.ptr, 3);
            const modifiedArray = arrayPointer.readAndFree();
            expect(modifiedArray).toEqual([2, 4, 6]);
        });

        it("should correctly modify an array of i16 integers", () => {
            const arrayPointer = ArrayPointer.from(wasm, "i16", 3, [4, 5, 6]);
            wasm._modify_i16_array(arrayPointer.ptr, 3);
            const modifiedArray = arrayPointer.readAndFree();
            expect(modifiedArray).toEqual([8, 10, 12]);
        });

        it("should correctly modify an array of i32 integers", () => {
            const arrayPointer = ArrayPointer.from(wasm, "i32", 3, [4, 5, 6]);
            wasm._modify_i32_array(arrayPointer.ptr, 3);
            const modifiedArray = arrayPointer.readAndFree();
            expect(modifiedArray).toEqual([8, 10, 12]);
        });

        it("should correctly modify an array of i64 integers", () => {
            const arrayPointer = ArrayPointer.from(wasm, "i64", 3, [
                1000n,
                2000n,
                3000n,
            ]);
            wasm._modify_i64_array(arrayPointer.ptr, 3);
            const modifiedArray = arrayPointer.readAndFree();
            expect(modifiedArray).toEqual([2000n, 4000n, 6000n]);
        });

        it("should correctly modify an array of float values", () => {
            const arrayPointer = ArrayPointer.from(
                wasm,
                "float",
                3,
                [1.1, 2.2, 3.3]
            );
            wasm._modify_float_array(arrayPointer.ptr, arrayPointer.length);
            const modifiedArray = arrayPointer.readAndFree();
            expect(modifiedArray[0]).toBeCloseTo(2.2);
            expect(modifiedArray[1]).toBeCloseTo(4.4);
            expect(modifiedArray[2]).toBeCloseTo(6.6);
        });

        it("should correctly modify an array of double values", () => {
            const arrayPointer = ArrayPointer.from(
                wasm,
                "double",
                3,
                [4.4, 5.5, 6.6]
            );
            wasm._modify_double_array(arrayPointer.ptr, arrayPointer.length);
            const modifiedArray = arrayPointer.readAndFree();
            expect(modifiedArray[0]).toBeCloseTo(8.8);
            expect(modifiedArray[1]).toBeCloseTo(11.0);
            expect(modifiedArray[2]).toBeCloseTo(13.2);
        });

        it("should correctly modify a C-style string", () => {
            const stringPointer = StringPointer.from(wasm, 60, "Hello");
            wasm._modify_string(stringPointer.ptr);
            const modifiedString = stringPointer.readAndFree();
            expect(modifiedString).toContain("Hello World!");
        });
    });

    describe("ArrayPointer Class Validation", () => {
        it("should throw a length mismatch error if array length exceeds allocated length", () => {
            const arrayPointer = ArrayPointer.alloc(wasm, "i8", 2);
            expect(() => arrayPointer.write([1, 2, 3])).toThrowError(
                "Array length mismatch. Expected 2, got 3"
            );
        });

        it("should not throw an error for a valid length write operation", () => {
            const arrayPointer = ArrayPointer.alloc(wasm, "i8", 3);
            expect(() => arrayPointer.write([1, 2, 3])).not.toThrow();
        });

        it("should throw an out-of-bounds error for an invalid index", () => {
            const arrayPointer = ArrayPointer.alloc(wasm, "i8", 2);
            expect(() => arrayPointer.add(3, 2)).toThrowError(
                "Out-of-bounds access: tried to write at index 3 in array of length 2"
            );
        });

        it("should allow writing within allocated array bounds", () => {
            const arrayPointer = ArrayPointer.alloc(wasm, "i8", 2);
            expect(() => arrayPointer.add(1, 42)).not.toThrow();
        });
    });

    describe("CharPointer Class Validation", () => {
        it("should throw an error if input string is not exactly one character", () => {
            expect(() => CharPointer.from(wasm, "AB")).toThrowError(
                "Input must be exactly one character"
            );

            expect(() => CharPointer.from(wasm, "")).toThrowError(
                "Input must be exactly one character"
            );
        });

        it("should correctly create a CharPointer for a single character string", () => {
            const charPointer = CharPointer.from(wasm, "A");
            expect(charPointer).toBeInstanceOf(CharPointer);
        });

        it("should throw an error when attempting to read from a freed pointer", () => {
            const charPointer = CharPointer.from(wasm, "t");
            charPointer.free();
            expect(() => charPointer.read()).toThrowError(
                "Cannot operate on freed or invalid pointer"
            );
        });

        it("should have a correct string representation", () => {
            const charPointer = CharPointer.from(wasm, "t");
            expect(charPointer.toString()).toBe(
                `CharPointer(ptr=${charPointer.ptr}, valid=${charPointer.isValid})`
            );
        });
    });

    describe("StringPointer Class Validation", () => {
        it("should correctly create a StringPointer from a string", () => {
            const stringPointer = StringPointer.from(wasm, 10, "test");
            expect(stringPointer).toBeInstanceOf(StringPointer);
            stringPointer.free();
        });

        it("should correctly create a StringPointer from a number", () => {
            const stringPointer = StringPointer.from(wasm, 10);
            expect(stringPointer).toBeInstanceOf(StringPointer);
            stringPointer.free();
        });

        it("should throw an error if the string length exceeds the allocated buffer size", () => {
            const stringPointer = StringPointer.alloc(wasm, 10);
            expect(() =>
                stringPointer.write("A long string more then 10 char")
            ).toThrowError("String length exceeds buffer size");
        });
    });

    describe("TypeConverter Utility Functions", () => {
        // --- boolToC ---
        it("should return C_TRUE for true", () => {
            expect(TypeConverter.boolToC(true)).toBe(C_TRUE);
        });

        it("should return C_FALSE for false", () => {
            expect(TypeConverter.boolToC(false)).toBe(C_FALSE);
        });

        // --- boolFromC ---
        it("should return true for a non-zero C value", () => {
            expect(TypeConverter.boolFromC(1)).toBe(true);
            expect(TypeConverter.boolFromC(42)).toBe(true);
        });

        it("should return false for a zero C value", () => {
            expect(TypeConverter.boolFromC(0)).toBe(false);
        });

        // --- charToC ---
        it("should convert a single character to its ASCII code", () => {
            expect(TypeConverter.charToC("A")).toBe(65);
            expect(TypeConverter.charToC("0")).toBe(48);
        });

        it("should throw an error if the input length is not 1", () => {
            expect(() => TypeConverter.charToC("")).toThrowError(
                "Input must be exactly one character"
            );
            expect(() => TypeConverter.charToC("AB")).toThrowError(
                "Input must be exactly one character"
            );
        });

        it("should throw an error if the character is outside the ASCII range", () => {
            expect(() =>
                TypeConverter.charToC(String.fromCharCode(300))
            ).toThrowError("Character");
        });

        // --- charFromC ---
        it("should convert an ASCII code to a single character", () => {
            expect(TypeConverter.charFromC(65)).toBe("A");
            expect(TypeConverter.charFromC(48)).toBe("0");
        });

        it("should throw an error for invalid ASCII codes", () => {
            expect(() => TypeConverter.charFromC(-1)).toThrowError(
                "Invalid ASCII code"
            );
            expect(() => TypeConverter.charFromC(256)).toThrowError(
                "Invalid ASCII code"
            );
            expect(() => TypeConverter.charFromC(3.14)).toThrowError(
                "Invalid ASCII code"
            );
        });

        // --- validateNumberType ---
        it("should return true for valid number types", () => {
            for (const type in C_TYPE_SIZES) {
                expect(TypeConverter.validateNumberType(type)).toBe(true);
            }
        });

        it("should throw an error for unsupported number types", () => {
            expect(() =>
                TypeConverter.validateNumberType("invalid")
            ).toThrowError("Unsupported number type");
        });

        // --- getTypeSize ---
        it("should return the correct size for a valid type", () => {
            for (const type in C_TYPE_SIZES) {
                // @ts-expect-error force invalid test
                expect(TypeConverter.getTypeSize(type)).toBe(
                    C_TYPE_SIZES[type]
                );
            }
        });

        it("should throw an error for an invalid type", () => {
            // @ts-expect-error force invalid test
            expect(() => TypeConverter.getTypeSize("invalid")).toThrowError(
                "Unsupported number type"
            );
        });
    });
});
