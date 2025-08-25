# Pointer Classes

These are the core classes for managing data in WebAssembly memory.

## `StringPointer`

Manages C-style null-terminated strings.

- **`static from(wasm, length, input?)`**: Creates a pointer from a JavaScript
  string with a specified buffer size.
- **`static alloc(wasm, length)`**: Allocates an empty string buffer of a
  specified length.
- **`write(input)`**: Writes new content to the buffer.
- **`read()`**: Reads the content as a JavaScript string.
- **`readAndFree()`**: Reads the content and immediately frees the memory.
- **`free()`**: Deallocates the memory.

### Example

```typescript
const strPtr = StringPointer.from(wasm, 100, "Initial text");
strPtr.write("New content");
const content = strPtr.read(); // "New content"
strPtr.free();
```

## `NumberPointer<T>`

A type-safe wrapper for single numeric values (`i8`, `i16`, `i32`, `i64`,
`float`, `double`).

- **`static from(wasm, type, input)`**: Creates a pointer from a JavaScript
  `number` or `bigint`.
- **`static alloc(wasm, type)`**: Allocates memory for a number of the specified
  type.
- **`write(value)`**: Writes a new value.
- **`read()`**: Reads the value.
- **`readAndFree()`**: Reads the value and frees the memory.

### Example

```typescript
const intPtr = NumberPointer.from(wasm, "i32", 42);
intPtr.write(84);
const intValue: number = intPtr.read(); // 84
intPtr.free();

const bigIntPtr = NumberPointer.from(wasm, "i64", 9007199254740991n);
const bigIntValue: bigint = bigIntPtr.read();
bigIntPtr.free();
```

## `ArrayPointer<T, N>`

A type-safe wrapper for numeric arrays.

- **`static from(wasm, type, length, input?)`**: Creates a pointer from a
  JavaScript array.
- **`static alloc(wasm, type, length)`**: Allocates an empty array of a given
  length.
- **`write(values)`**: Writes an entire new array to the buffer.
- **`add(index, value)`**: Sets the value at a specific index.
- **`read()`**: Reads the entire array.
- **`readAndFree()`**: Reads the array and frees the memory.

### Example

```typescript
const numbers = [1.1, 2.2, 3.3];
const arrayPtr = ArrayPointer.from(wasm, "double", numbers.length, numbers);
arrayPtr.add(0, 10.5); // Set first element
const result = arrayPtr.read(); // [10.5, 2.2, 3.3]
arrayPtr.free();
```

## `CharPointer`

A wrapper for single character values.

- **`static from(wasm, input)`**: Creates a pointer from a single-character
  string.
- **`static alloc(wasm)`**: Allocates memory for one character.
- **`write(input)`**: Writes a new character.
- **`read()`**: Reads the character.
- **`readAndFree()`**: Reads the character and frees the memory.

### Example

```typescript
const charPtr = CharPointer.from(wasm, "A");
charPtr.write("Z");
const char = charPtr.read(); // 'Z'
charPtr.free();
```

## `BoolPointer`

A wrapper for boolean values, stored as C integers (`0` or `1`).

- **`static from(wasm, value)`**: Creates a pointer from a boolean value.
- **`static alloc(wasm)`**: Allocates memory for a boolean, defaulting to
  `false`.
- **`write(value)`**: Writes a new boolean value.
- **`read()`**: Reads the value as a boolean.
- **`readAndFree()`**: Reads the value and frees the memory.

### Example

```typescript
const boolPtr = BoolPointer.from(wasm, true);
boolPtr.write(false);
const isTrue = boolPtr.read(); // false
boolPtr.free();
```
