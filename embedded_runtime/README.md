# Typeton Embedded Runtime

Lightweight C runtime engine for executing Typeton programs on STM32 microcontrollers.

## Overview

The embedded runtime is a minimal quad interpreter that runs Typeton programs directly on STM32 hardware. Instead of generating full C code, Typeton compiles to quads (intermediate representation) which are then executed by this runtime engine.

## Architecture

```
┌─────────────────┐
│ Python Compiler │ → Quads + Metadata
└────────┬────────┘
         │
         │ JSON/Binary Serialization
         │
         ▼
┌─────────────────┐
│  STM32 Runtime  │ → Executes Quads
└─────────────────┘
```

## Features

- **Lightweight**: ~10-20KB flash memory
- **Fast**: Direct quad execution
- **Flexible**: Update programs without reflashing
- **Motion Control**: Built-in motion control operations
- **Runtime Variables**: Access variables at runtime

## Memory Model

The runtime uses segmented memory:

- **GLOBAL**: 1000-2999 (persistent across function calls)
- **LOCAL**: 3000-4999 (per function call)
- **TEMPORARY**: 5000-6999 (for expressions)
- **CONSTANT**: 7000-7999 (read-only)

Each segment is divided by type:
- INT: 1000-1999 (global), 3000-3999 (local), 5000-5999 (temp)
- FLOAT: 2000-2999 (global), 4000-4999 (local), 6000-6999 (temp)
- BOOL: Similar ranges
- STRING: Similar ranges

## Usage

### 1. Compile Typeton Program

```bash
python3 -m src.main programs/motion_control.ty --emit-embedded output.json
```

This generates `output.json` containing:
- Quad list
- Function metadata
- Constants
- Memory layout

### 2. Upload to STM32

Transfer `output.json` to STM32 via:
- UART
- USB
- SPI
- SD Card

### 3. Load and Run

```c
#include "typeton_runtime.h"

typeton_runtime_t runtime;

void main(void) {
    // Initialize runtime
    typeton_runtime_init(&runtime);
    
    // Load program (from UART/USB/etc)
    uint8_t program_data[] = { /* JSON data */ };
    typeton_load_program(&runtime, program_data, sizeof(program_data));
    
    // Run program
    typeton_run(&runtime);
}
```

## Motion Control API

Implement these callbacks in your application:

```c
void motion_move_abs(int axis, float position);
void motion_move_rel(int axis, float distance);
void motion_home(int axis);
float motion_get_position(int axis);
void motion_set_position(int axis, float position);
void motion_set_velocity(int axis, float velocity);
void motion_set_acceleration(int axis, float acceleration);
void motion_wait_move(int axis);
void motion_enable_motor(int axis);
void motion_disable_motor(int axis);
```

### Example Implementation

```c
void motion_move_abs(int axis, float position) {
    // Your motion control code here
    stepper_set_target(axis, position);
    stepper_start_move(axis);
}

void motion_wait_move(int axis) {
    while (!stepper_is_done(axis)) {
        // Wait for move to complete
    }
}
```

## Runtime API

### Initialization

```c
void typeton_runtime_init(typeton_runtime_t* rt);
```

### Loading Programs

```c
int typeton_load_program(typeton_runtime_t* rt, const uint8_t* data, size_t len);
```

Returns 0 on success, non-zero on error.

### Execution

```c
void typeton_run(typeton_runtime_t* rt);
void typeton_stop(typeton_runtime_t* rt);
```

### Variable Access

```c
int32_t typeton_get_int(typeton_runtime_t* rt, int32_t address);
void typeton_set_int(typeton_runtime_t* rt, int32_t address, int32_t value);
float typeton_get_float(typeton_runtime_t* rt, int32_t address);
void typeton_set_float(typeton_runtime_t* rt, int32_t address, float value);
bool typeton_get_bool(typeton_runtime_t* rt, int32_t address);
void typeton_set_bool(typeton_runtime_t* rt, int32_t address, bool value);
```

## Configuration

Adjust memory sizes in `typeton_runtime.h`:

```c
#define MAX_QUADS 1000          // Maximum number of quads
#define MAX_FUNCTIONS 50        // Maximum number of functions
#define GLOBAL_INT_SIZE 100     // Global integer variables
#define LOCAL_INT_SIZE 50       // Local integer variables per function
// ... etc
```

## Limitations

- **No heap allocation** (objects not supported yet)
- **Limited call stack** (8 levels max)
- **No strings** (string support is basic)
- **No arrays** (array support is basic)

## Future Improvements

- [ ] Binary serialization format (more compact)
- [ ] Heap allocation support
- [ ] Full array support
- [ ] String manipulation
- [ ] Debugging interface
- [ ] Variable watchpoints
- [ ] Breakpoints

## Integration with STM32 HAL

The runtime is designed to work with STM32 HAL. Example integration:

```c
#include "stm32f4xx_hal.h"
#include "typeton_runtime.h"

UART_HandleTypeDef huart2;
typeton_runtime_t runtime;

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {
    if (huart == &huart2) {
        // Receive program data
        typeton_load_program(&runtime, received_data, data_len);
        typeton_run(&runtime);
    }
}
```

## Building

Add to your STM32 project:

```cmake
add_library(typeton_runtime STATIC
    embedded_runtime/typeton_runtime.c
    embedded_runtime/typeton_runtime.h
)
target_include_directories(typeton_runtime PUBLIC embedded_runtime)
```

## License

Same as main Typeton project.







