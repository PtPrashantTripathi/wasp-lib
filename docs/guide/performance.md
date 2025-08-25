# 🚀 Performance Tips

While `wasp-lib` adds a layer of safety and convenience, following these best
practices can help you maintain high performance in your application.

### 1. Reuse Pointers When Possible

Allocating and freeing memory can be expensive. For operations inside a loop,
it's more efficient to allocate a pointer once and reuse it.

::: code-group

```typescript [Good]
// Good: Reuse pointer for multiple operations
const arrayPtr = ArrayPointer.alloc(wasm, "double", 1000);
for (let i = 0; i < iterations; i++) {
    // Modify array data
    arrayPtr.write(newData);
    wasm._process_array(arrayPtr.ptr, 1000);
}
arrayPtr.free();
```

```typescript [Avoid]
// Avoid: Creating new pointers in loops
for (let i = 0; i < iterations; i++) {
    const arrayPtr = ArrayPointer.from(wasm, "double", 1000, newData); // Expensive
    wasm._process_array(arrayPtr.ptr, 1000);
    arrayPtr.free();
}
```

:::

### 2\. Use Appropriate Buffer Sizes

Allocate memory that is appropriately sized for your needs. Over-allocating
large buffers can waste memory, while under-allocating can lead to errors.

::: code-group

```typescript [Good]
// Good: Right-sized buffer
const strPtr = StringPointer.from(wasm, input.length + 10, input); // Small overhead
```

```typescript [Avoid]
// Avoid: Oversized buffers
const strPtr = StringPointer.from(wasm, 10000, input); // Wastes memory
```

:::

### 3\. Batch Operations

Instead of transferring small chunks of data between JavaScript and WebAssembly
repeatedly, batch them into larger arrays. This reduces the overhead of function
calls across the JS/WASM boundary.

```typescript
// Good: Process arrays in batches
const batchSize = 1000;
const arrayPtr = ArrayPointer.alloc(wasm, "float", batchSize);

for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    arrayPtr.write(batch);
    wasm._process_batch(arrayPtr.ptr, batch.length);
}
arrayPtr.free();
```
