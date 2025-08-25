---
layout: home

hero:
    name: "wasp-lib"
    text: "Web Assembly Safe Pointers"
    tagline:
        Hexagon speed, wasp-lib precision, powered by WASM. A zero-dependency
        TypeScript library for seamless, type-safe interaction with Emscripten
        WebAssembly memory.
    image:
        src: https://raw.githubusercontent.com/PtPrashantTripathi/wasp-lib/main/logo/wasp_lib_logo.png
        alt: wasp-lib logo
    actions:
        - theme: brand
          text: Get Started
          link: /guide/introduction
        - theme: alt
          text: View on GitHub
          link: https://github.com/ptprashanttripathi/wasp-lib

features:
    - title: 🔒 Type-Safe Memory
      details:
          Full TypeScript support with generics ensures your memory operations
          are safe at compile time.
    - title: 🧹 Automatic Memory Management
      details:
          Built-in allocation, deallocation, and cleanup methods prevent common
          memory leaks.
    - title: 🎯 Intuitive API
      details:
          High-level pointer classes transform complex manual memory operations
          into simple, chainable method calls.
    - title: 📦 Zero Dependencies
      details:
          A lightweight library with no external dependencies, ensuring a small
          footprint for your project.
---

## The Problem: Manual WASM Memory is Hard

Working directly with WebAssembly memory from JavaScript is powerful but fraught
with challenges like memory leaks, a lack of type safety, and repetitive
boilerplate code.

### Before wasp-lib 😰

```typescript
// Manual memory management - error-prone and verbose!
function processData(wasm: any, numbers: number[]) {
    // Allocate memory manually
    const arraySize = numbers.length * 4; // 4 bytes per i32
    const arrayPtr = wasm._malloc(arraySize);

    // Copy data byte by byte
    for (let i = 0; i < numbers.length; i++) {
        wasm.setValue(arrayPtr + i * 4, numbers[i], "i32");
    }

    // Call WASM function
    const sum = wasm._sum_array(arrayPtr, numbers.length);

    // Read result and manually free memory
    wasm._free(arrayPtr); // Easy to forget!

    return sum;
}
```

## The Solution: Simple & Safe Abstractions

`wasp-lib` provides intuitive wrapper classes that handle the messy parts of
memory management for you, so you can focus on your application logic.

### After wasp-lib 🎉

```typescript
// Clean, type-safe, automatic cleanup!
import { ArrayPointer, WASMModule } from "wasp-lib";

function processData(wasm: WASMModule, numbers: number[]) {
    const arrayPtr = ArrayPointer.from(wasm, "i32", numbers.length, numbers);
    const sum = wasm._sum_array(arrayPtr.ptr, numbers.length);

    // Use readAndFree() for automatic cleanup or free() manually
    arrayPtr.free();

    return sum;
}
```
