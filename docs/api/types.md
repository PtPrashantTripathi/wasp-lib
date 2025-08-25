# Type Definitions

`wasp-lib` exports several TypeScript types to ensure type safety in your
project.

## Core Types

These types represent the fundamental data types used when interacting with
C/C++ code in WebAssembly.

```typescript
// Supported C numeric types
type C_NumberType = "i8" | "i16" | "i32" | "i64" | "float" | "double";

// C boolean type (0 or 1)
type C_BoolType = 0 | 1;

// C character type (ASCII code 0-255)
type C_CharType = number;
```

## Size Constants

A convenient record of byte sizes for each numeric type.

```typescript
const C_TYPE_SIZES: Record<C_NumberType, number> = {
    i8: 1, // 8-bit integer
    i16: 2, // 16-bit integer
    i32: 4, // 32-bit integer
    i64: 8, // 64-bit integer
    float: 4, // 32-bit float
    double: 8, // 64-bit double
};
```

## `WASMModule` Interface

This interface extends the standard `EmscriptenModule` type with the specific
functions that `wasp-lib` relies on for memory management and data manipulation.
It's recommended to cast your loaded module to this type.

```typescript
interface WASMModule extends EmscriptenModule {
    // Memory management
    _malloc(size: number): number;
    _free(ptr: number): void;

    // Value operations
    setValue(ptr: number, value: number | bigint, type: string): void;
    getValue(ptr: number, type: string): number | bigint;

    // String operations
    stringToUTF8(str: string, outPtr: number, maxBytesToWrite: number): void;
    UTF8ToString(ptr: number): string;
    lengthBytesUTF8(str: string): number;

    // Function wrapping
    cwrap(ident: string, returnType: string, argTypes: string[]): Function;

    // File system (if enabled)
    FS: any;
}
```
