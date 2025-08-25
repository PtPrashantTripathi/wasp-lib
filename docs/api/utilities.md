# Utility Classes

## `TypeConverter`

A static utility class for type conversions and validations between JavaScript
and C types.

### Boolean Conversions

- **`static boolToC(value: boolean): 0 | 1`**: Converts a JS `boolean` to a C
  integer boolean.
- **`static boolFromC(value: 0 | 1): boolean`**: Converts a C integer boolean
  back to a JS `boolean`.

```typescript
const cTrue = TypeConverter.boolToC(true); // 1
const jsTrue = TypeConverter.boolFromC(1); // true
```

### Character Conversions

- **`static charToC(char: string): number`**: Converts a single JS character to
  its ASCII code.
- **`static charFromC(code: number): string`**: Converts an ASCII code to a JS
  character.

<!-- end list -->

```typescript
const asciiA = TypeConverter.charToC("A"); // 65
const charFromAscii = TypeConverter.charFromC(65); // 'A'
```

### Type Utilities

- **`static validateNumberType(type: string): boolean`**: Checks if a string is
  a valid `C_NumberType`.
- **`static getTypeSize(type: C_NumberType): number`**: Returns the size of a C
  numeric type in bytes.

<!-- end list -->

```typescript
const isValid = TypeConverter.validateNumberType("i32"); // true
const size = TypeConverter.getTypeSize("double"); // 8
```
