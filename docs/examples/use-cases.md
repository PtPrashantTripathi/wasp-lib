# Common Use Cases

Here are some examples of how `wasp-lib` can be used in various domains.

## 1. Image Processing

Process image pixel data in WebAssembly by passing a pointer to the pixel
buffer.

```typescript
// Process image pixel data in WebAssembly
const pixels = new Uint8Array(width * height * 4);
const pixelPtr = ArrayPointer.from(wasm, "i8", pixels.length, [...pixels]);
wasm._apply_filter(pixelPtr.ptr, width, height);
const processedPixels = pixelPtr.readAndFree();
```

## 2\. Mathematical Computations

Perform high-performance matrix operations by passing flattened arrays to your
WASM functions.

```typescript
const matrix = [
    [1, 2],
    [3, 4],
    [5, 6],
];
const flatMatrix = matrix.flat();
const matrixPtr = ArrayPointer.from(
    wasm,
    "double",
    flatMatrix.length,
    flatMatrix
);
const determinant = wasm._calculate_determinant(matrixPtr.ptr, 3, 2);
matrixPtr.free();
```

## 3\. String Processing

Analyze text for natural language processing tasks.

```typescript
const text = "Hello, WebAssembly world!";
const textPtr = StringPointer.from(wasm, text.length + 100, text);
wasm._analyze_sentiment(textPtr.ptr);
const analysis = textPtr.readAndFree();
```

## 4\. Game Development

Update game entity positions and other physics data in a tight loop.

```typescript
const positions = [{ x: 10.5, y: 20.3, z: 0.0 } /* ... */];
const flatPositions = positions.flatMap(p => [p.x, p.y, p.z]);
const posPtr = ArrayPointer.from(
    wasm,
    "float",
    flatPositions.length,
    flatPositions
);
wasm._update_physics(posPtr.ptr, positions.length);
const updatedPositions = posPtr.readAndFree();
```

## 5\. Scientific Computing

Perform signal processing tasks like Fast Fourier Transforms (FFT).

```typescript
const signal = new Array(1024).fill(0).map((_, i) => Math.sin(i * 0.1));
const signalPtr = ArrayPointer.from(wasm, "double", signal.length, signal);
wasm._fft_transform(signalPtr.ptr, signal.length);
const spectrum = signalPtr.readAndFree();
```
