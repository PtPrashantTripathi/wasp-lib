import type { WASMModule } from "../../src";

import Module from "./test_module";

/**
 * Extended WASM module interface with test-specific functions. This interface
 * defines the C functions available in our test WASM module.
 */
export interface WASMTestsModule extends WASMModule {
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

export async function getModule(): Promise<WASMTestsModule> {
    const wasmModule = await Module();
    return wasmModule as WASMTestsModule;
}
