# Advanced Examples

By combining pointer classes, you can build powerful, high-level abstractions
for complex tasks.

## Image Processing Pipeline

This function shows a multi-step image processing pipeline where multiple
filters are applied sequentially to the same memory buffer before reading the
result.

```typescript
async function processImage(imageData: ImageData, wasm: WASMModule) {
    const pixels = Array.from(imageData.data);

    // Create a single WASM array pointer for the entire pipeline
    const pixelPtr = ArrayPointer.from(wasm, "i8", pixels.length, pixels);

    // Apply multiple filters in place
    wasm._blur_filter(pixelPtr.ptr, imageData.width, imageData.height, 3);
    wasm._sharpen_filter(pixelPtr.ptr, imageData.width, imageData.height);
    wasm._color_correction(
        pixelPtr.ptr,
        imageData.width,
        imageData.height,
        1.2
    );

    // Get the final processed data and free the memory
    const processedPixels = pixelPtr.readAndFree();

    // Convert back to ImageData to be drawn on a canvas
    const processedImageData = new ImageData(
        new Uint8ClampedArray(processedPixels),
        imageData.width,
        imageData.height
    );

    return processedImageData;
}
```

## Matrix Class Wrapper

You can create a JavaScript class that encapsulates matrix operations, using
`wasp-lib` internally to manage memory. This provides a clean, object-oriented
API to consumers.

```typescript
class Matrix {
    private data: ArrayPointer<"double", number>;

    constructor(
        private wasm: WASMModule,
        private rows: number,
        private cols: number,
        initialData?: number[]
    ) {
        this.data = ArrayPointer.from(
            wasm,
            "double",
            rows * cols,
            initialData || new Array(rows * cols).fill(0)
        );
    }

    multiply(other: Matrix): Matrix {
        if (this.cols !== other.rows) {
            throw new Error("Matrix dimensions are incompatible");
        }
        const result = new Matrix(this.wasm, this.rows, other.cols);
        this.wasm._matrix_multiply(
            this.data.ptr,
            other.data.ptr,
            result.data.ptr,
            this.rows,
            this.cols,
            other.cols
        );
        return result;
    }

    toArray(): number[] {
        return [...this.data.read()];
    }

    free(): void {
        this.data.free();
    }
}
```

## Real-time Audio Processing

For real-time applications like audio processing, pointers can be allocated once
and reused for each audio buffer, minimizing performance overhead.

```typescript
class AudioProcessor {
    private leftChannel: ArrayPointer<"float", number>;
    private rightChannel: ArrayPointer<"float", number>;

    constructor(
        private wasm: WASMModule,
        private bufferSize: number
    ) {
        // Allocate pointers once and reuse them for each processing block
        this.leftChannel = ArrayPointer.alloc(wasm, "float", bufferSize);
        this.rightChannel = ArrayPointer.alloc(wasm, "float", bufferSize);
    }

    processAudio(left: Float32Array, right: Float32Array) {
        // Copy audio samples to WASM memory
        this.leftChannel.write([...left]);
        this.rightChannel.write([...right]);

        // Apply effects in WASM
        this.wasm._apply_reverb(
            this.leftChannel.ptr,
            this.rightChannel.ptr,
            this.bufferSize
        );
        this.wasm._apply_compressor(
            this.leftChannel.ptr,
            this.rightChannel.ptr,
            this.bufferSize
        );

        // Read processed samples back
        const processedLeft = new Float32Array(this.leftChannel.read());
        const processedRight = new Float32Array(this.rightChannel.read());

        return { left: processedLeft, right: processedRight };
    }

    free(): void {
        this.leftChannel.free();
        this.rightChannel.free();
    }
}
```
