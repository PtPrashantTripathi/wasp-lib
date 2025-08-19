#include <stdio.h>
#include <string.h>
#include <emscripten.h>
#include <stdint.h>  // Required for fixed-width integers like int8_t
#include <stdbool.h> // Required for the bool type

// --- Scalar Value Functions ---
// These functions take a value of a specific type, modify it, and return the new value.

/**
 * @brief Multiplies an 8-bit integer by 2 and returns the result.
 * @param x The input int8_t value.
 * @return The input value multiplied by 2.
 */
EMSCRIPTEN_KEEPALIVE
int8_t modify_i8(int8_t x)
{
    return x * 2;
}

/**
 * @brief Multiplies a 16-bit integer by 2 and returns the result.
 * @param x The input int16_t value.
 * @return The input value multiplied by 2.
 */
EMSCRIPTEN_KEEPALIVE
int16_t modify_i16(int16_t x)
{
    return x * 2;
}

/**
 * @brief Multiplies a 32-bit integer by 2 and returns the result.
 * @param x The input int32_t value.
 * @return The input value multiplied by 2.
 */
EMSCRIPTEN_KEEPALIVE
int32_t modify_i32(int32_t x)
{
    return x * 2;
}

/**
 * @brief Multiplies a 64-bit integer by 2 and returns the result.
 * @param x The input int64_t value.
 * @return The input value multiplied by 2.
 */
EMSCRIPTEN_KEEPALIVE
int64_t modify_i64(int64_t x)
{
    return x * 2;
}

/**
 * @brief Multiplies a float by 2.0 and returns the result.
 * @param x The input float value.
 * @return The input value multiplied by 2.0.
 */
EMSCRIPTEN_KEEPALIVE
float modify_float(float x)
{
    return x * 2.0f;
}

/**
 * @brief Multiplies a double by 2.0 and returns the result.
 * @param x The input double value.
 * @return The input value multiplied by 2.0.
 */
EMSCRIPTEN_KEEPALIVE
double modify_double(double x)
{
    return x * 2.0;
}

/**
 * @brief Increments the ASCII value of a character by 1 and returns the result.
 * @param x The input char value.
 * @return The next character in the ASCII table.
 */
EMSCRIPTEN_KEEPALIVE
char modify_char(char x)
{
    return x + 1;
}

/**
 * @brief Negates a boolean value and returns the result.
 * @param x The input bool value.
 * @return The negated boolean value.
 */
EMSCRIPTEN_KEEPALIVE
bool modify_bool(bool x)
{
    return !x;
}
// --- Pointer Functions ---
// These functions take a pointer to a value and modify the value at that memory location.

/**
 * @brief Multiplies the value pointed to by an 8-bit integer pointer by 2.
 * @param ptr A pointer to an int8_t value.
 */
EMSCRIPTEN_KEEPALIVE
void modify_i8_pointer(int8_t *ptr)
{
    if (ptr)
        *ptr = *ptr * 2;
}

/**
 * @brief Multiplies the value pointed to by a 16-bit integer pointer by 2.
 * @param ptr A pointer to an int16_t value.
 */
EMSCRIPTEN_KEEPALIVE
void modify_i16_pointer(int16_t *ptr)
{
    if (ptr)
        *ptr = *ptr * 2;
}

/**
 * @brief Multiplies the value pointed to by a 32-bit integer pointer by 2.
 * @param ptr A pointer to an int32_t value.
 */
EMSCRIPTEN_KEEPALIVE
void modify_i32_pointer(int32_t *ptr)
{
    if (ptr)
        *ptr = *ptr * 2;
}

/**
 * @brief Multiplies the value pointed to by a 64-bit integer pointer by 2.
 * @param ptr A pointer to an int64_t value.
 */
EMSCRIPTEN_KEEPALIVE
void modify_i64_pointer(int64_t *ptr)
{
    if (ptr)
        *ptr = *ptr * 2;
}

/**
 * @brief Multiplies the value pointed to by a float pointer by 2.0.
 * @param ptr A pointer to a float value.
 */
EMSCRIPTEN_KEEPALIVE
void modify_float_pointer(float *ptr)
{
    if (ptr)
        *ptr = *ptr * 2.0f;
}

/**
 * @brief Multiplies the value pointed to by a double pointer by 2.0.
 * @param ptr A pointer to a double value.
 */
EMSCRIPTEN_KEEPALIVE
void modify_double_pointer(double *ptr)
{
    if (ptr)
        *ptr = *ptr * 2.0;
}

/**
 * @brief Increments the value pointed to by a character pointer by 1.
 * @param ptr A pointer to a char value.
 */
EMSCRIPTEN_KEEPALIVE
void modify_char_pointer(char *ptr)
{
    if (ptr)
        *ptr = *ptr + 1;
}

/**
 * @brief Negates the boolean value pointed to by a boolean pointer.
 * @param ptr A pointer to a bool value.
 */
EMSCRIPTEN_KEEPALIVE
void modify_bool_pointer(bool *ptr)
{
    if (ptr)
        *ptr = !(*ptr);
}
// --- Array Functions ---
// These functions take a pointer to the start of an array and its size, and modify each element in place.

/**
 * @brief Multiplies each element in an 8-bit integer array by 2.
 * @param arr A pointer to the first element of the int8_t array.
 * @param size The number of elements in the array.
 */
EMSCRIPTEN_KEEPALIVE
void modify_i8_array(int8_t *arr, int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] = arr[i] * 2;
    }
}

/**
 * @brief Multiplies each element in a 16-bit integer array by 2.
 * @param arr A pointer to the first element of the int16_t array.
 * @param size The number of elements in the array.
 */
EMSCRIPTEN_KEEPALIVE
void modify_i16_array(int16_t *arr, int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] = arr[i] * 2;
    }
}

/**
 * @brief Multiplies each element in a 32-bit integer array by 2.
 * @param arr A pointer to the first element of the int32_t array.
 * @param size The number of elements in the array.
 */
EMSCRIPTEN_KEEPALIVE
void modify_i32_array(int32_t *arr, int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] = arr[i] * 2;
    }
}

/**
 * @brief Multiplies each element in a 64-bit integer array by 2.
 * @param arr A pointer to the first element of the int64_t array.
 * @param size The number of elements in the array.
 */
EMSCRIPTEN_KEEPALIVE
void modify_i64_array(int64_t *arr, int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] = arr[i] * 2;
    }
}

/**
 * @brief Multiplies each element in a float array by 2.0.
 * @param arr A pointer to the first element of the float array.
 * @param size The number of elements in the array.
 */
EMSCRIPTEN_KEEPALIVE
void modify_float_array(float *arr, int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] = arr[i] * 2.0f;
    }
}

/**
 * @brief Multiplies each element in a double array by 2.0.
 * @param arr A pointer to the first element of the double array.
 * @param size The number of elements in the array.
 */
EMSCRIPTEN_KEEPALIVE
void modify_double_array(double *arr, int size)
{
    for (int i = 0; i < size; i++)
    {
        arr[i] = arr[i] * 2.0;
    }
}

/**
 * @brief Appends " World!" to a C-style string.
 * @param str A pointer to the start of the string.
 */
EMSCRIPTEN_KEEPALIVE
void modify_string(char *str)
{
    strcat(str, " World!");
}