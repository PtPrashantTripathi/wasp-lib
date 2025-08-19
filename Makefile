# Makefile for compiling C to WASM for testing

# Compiler command
EMCC = emcc

# C source file
C_SOURCE = test/test_module.c

# Output WASM file
WASM_OUTPUT = test/test_module.wasm

# JS output file (glue code)
JS_OUTPUT = test/test_module.js

# Compiler flags
EM_FLAGS = -s WASM=1 \
           -s EXPORTED_RUNTIME_METHODS='["cwrap", "setValue", "getValue", "UTF8ToString", "stringToUTF8", "lengthBytesUTF8", "FS"]' \
           -s EXPORTED_FUNCTIONS='["_malloc", "_free"]' \
           -s ALLOW_MEMORY_GROWTH=1 \
		   -s ENVIRONMENT='["web","node"]' \
           -s MODULARIZE=1 \
           -s EXPORT_ES6=1 \
		   -s WASM_BIGINT=1 \
           -o $(JS_OUTPUT)

.PHONY: all

# Default target
all: clean $(WASM_OUTPUT)

# Rule to build the WASM module
$(WASM_OUTPUT): $(C_SOURCE)
	@echo "Compiling $(C_SOURCE) to $(WASM_OUTPUT) and $(JS_OUTPUT)..."
	$(EMCC) $(C_SOURCE) $(EM_FLAGS)
	@echo "Compilation finished."

# Clean up generated files
clean:
	@echo "Cleaning up generated files..."
	rm -f $(WASM_OUTPUT) $(JS_OUTPUT)
	@echo "Cleanup complete."