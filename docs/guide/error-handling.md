# 🛡️ Error Handling

`wasp-lib` provides comprehensive error handling with descriptive messages to
help you catch common issues related to memory management and type validation.

### Memory Safety

Attempting to use a pointer after it has been freed will result in an error.
This prevents use-after-free bugs.

```typescript
const ptr = StringPointer.from(wasm, 10, "test");
ptr.free(); // Memory is freed here

try {
    ptr.read();
} catch (error) {
    // Throws: "Cannot operate on freed or invalid pointer"
    console.error(error.message);
}
```

### Bounds Checking

Writing to an array index that is out of bounds is prevented automatically.

```typescript
const arrayPtr = ArrayPointer.alloc(wasm, "i32", 5);

try {
    arrayPtr.add(10, 42);
} catch (error) {
    // Throws: "Out-of-bounds access: tried to write at index 10 in array of length 5"
    console.error(error.message);
}
```

### Type Validation

The library validates inputs to ensure they match the expected type constraints.

```typescript
try {
    // CharPointer expects a single character
    CharPointer.from(wasm, "AB");
} catch (error) {
    // Throws: "Input must be exactly one character"
    console.error(error.message);
}

try {
    // TypeConverter validates ASCII code ranges
    TypeConverter.charFromC(300);
} catch (error) {
    // Throws: "Invalid ASCII code: 300. Must be 0-255"
    console.error(error.message);
}
```

### Buffer Overflow Protection

Writing a string that is larger than the allocated buffer size will throw an
error, preventing buffer overflows.

```typescript
const strPtr = StringPointer.alloc(wasm, 10);

try {
    strPtr.write("This string is way too long for the buffer");
} catch (error) {
    // Throws: "String length exceeds buffer size"
    console.error(error.message);
}
```
