# Introduction

## 🎯 What is wasp-lib?

> 🐝 **W.A.S.P.** stands for **Web Assembly Safe Pointers**

**wasp-lib** is a powerful TypeScript library that bridges the gap between
JavaScript and WebAssembly memory management. It transforms complex, error-prone
manual memory operations into simple, type-safe method calls, making WebAssembly
integration as easy as working with native JavaScript objects.

### The Problem

Working with WebAssembly memory directly is challenging:

- **Memory Leaks**: Forgetting to call `_free()` leads to memory leaks.
- **Type Safety**: No compile-time guarantees about data types.
- **Boilerplate Code**: Repetitive allocation/deallocation patterns.
- **Error Prone**: Manual pointer arithmetic and buffer management.

### The Solution

wasp-lib provides intuitive wrapper classes that:

- ✅ **Automatically manage memory** allocation and deallocation.
- ✅ **Ensure type safety** with TypeScript generics.
- ✅ **Eliminate boilerplate** with a simple, chainable API.
- ✅ **Prevent memory leaks** with built-in cleanup mechanisms.
