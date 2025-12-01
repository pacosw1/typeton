# Embedded Motion Controller - Quick Start

## What is This?

Typeton is now a **dedicated embedded motion controller language**. Instead of generating full C code or running a Python VM, we:

1. **Compile** Typeton → Quads (intermediate representation)
2. **Serialize** Quads → JSON format
3. **Send** to STM32 via UART/USB/SPI
4. **Execute** on STM32 using lightweight C runtime

## Why This Approach?

✅ **Lightweight**: Runtime is only ~10-20KB  
✅ **Flexible**: Update programs without reflashing firmware  
✅ **Fast**: Direct execution, no interpretation overhead  
✅ **Domain-Specific**: Motion control commands built into language  
✅ **Runtime Access**: Read/write variables at runtime  

## Architecture

```
┌─────────────────────────────────────┐
│     Python Compiler (PC)            │
│  Typeton Code → Quads → JSON         │
└──────────────┬──────────────────────┘
               │
               │ Serialized Program
               │
               ▼
┌─────────────────────────────────────┐
│     STM32 C Runtime Engine          │
│  JSON → Quads → Execution            │
│  + Motion Control Handlers           │
└─────────────────────────────────────┘
```

## Quick Start

### 1. Write Typeton Code

```typeton
// programs/motion_control.ty
func main() {
    var axis: Int32 = 0
    var position: Float32 = 100.5
    var velocity: Float32 = 50.0
    
    enable_motor(axis)
    set_velocity(axis, velocity)
    move_abs(axis, position)
    wait_move(axis)
    home(axis)
    disable_motor(axis)
}
```

### 2. Compile for Embedded

```bash
python3 -m src.main programs/motion_control.ty --emit-embedded output.json
```

This generates `output.json` with:
- All quads (operations)
- Function metadata
- Constants
- Memory layout

### 3. Upload to STM32

Transfer `output.json` to your STM32 via:
- **UART**: Serial communication
- **USB**: USB CDC
- **SPI**: SPI flash
- **SD Card**: File system

### 4. Run on STM32

```c
#include "typeton_runtime.h"

typeton_runtime_t runtime;

void main(void) {
    // Initialize
    typeton_runtime_init(&runtime);
    
    // Load program (from your communication interface)
    typeton_load_program(&runtime, program_data, program_len);
    
    // Run
    typeton_run(&runtime);
}
```

### 5. Implement Motion Control

```c
// Implement these callbacks
void motion_move_abs(int axis, float position) {
    stepper_set_target(axis, position);
    stepper_start_move(axis);
}

void motion_wait_move(int axis) {
    while (!stepper_is_done(axis)) {
        // Wait
    }
}

// ... etc
```

## Motion Control Commands

| Command | Syntax | Description |
|---------|--------|-------------|
| `move_abs` | `move_abs(axis, position)` | Move to absolute position |
| `move_rel` | `move_rel(axis, distance)` | Move relative distance |
| `home` | `home(axis)` | Home axis |
| `set_position` | `set_position(axis, pos)` | Set current position |
| `get_position` | `var pos = get_position(axis)` | Get current position |
| `set_velocity` | `set_velocity(axis, vel)` | Set velocity |
| `set_accel` | `set_accel(axis, accel)` | Set acceleration |
| `wait_move` | `wait_move(axis)` | Wait for move complete |
| `enable_motor` | `enable_motor(axis)` | Enable motor |
| `disable_motor` | `disable_motor(axis)` | Disable motor |

## Example Program

```typeton
func main() {
    var x_axis: Int32 = 0
    var y_axis: Int32 = 1
    var speed: Float32 = 100.0
    var accel: Float32 = 50.0
    
    // Enable motors
    enable_motor(x_axis)
    enable_motor(y_axis)
    
    // Set motion parameters
    set_velocity(x_axis, speed)
    set_velocity(y_axis, speed)
    set_accel(x_axis, accel)
    set_accel(y_axis, accel)
    
    // Move to position (100, 200)
    move_abs(x_axis, 100.0)
    move_abs(y_axis, 200.0)
    wait_move(x_axis)
    wait_move(y_axis)
    
    // Move relative
    move_rel(x_axis, 50.0)
    move_rel(y_axis, -25.0)
    wait_move(x_axis)
    wait_move(y_axis)
    
    // Home both axes
    home(x_axis)
    home(y_axis)
    wait_move(x_axis)
    wait_move(y_axis)
    
    // Disable motors
    disable_motor(x_axis)
    disable_motor(y_axis)
}
```

## Runtime Variable Access

You can read/write variables at runtime:

```c
// Get variable value
int32_t axis = typeton_get_int(&runtime, 1000);  // address 1000
float pos = typeton_get_float(&runtime, 2000);   // address 2000

// Set variable value
typeton_set_int(&runtime, 1000, 1);
typeton_set_float(&runtime, 2000, 150.5);
```

## Memory Layout

| Segment | Address Range | Type |
|---------|--------------|------|
| Global INT | 1000-1999 | Persistent |
| Global FLOAT | 2000-2999 | Persistent |
| Local INT | 3000-3999 | Per function |
| Local FLOAT | 4000-4999 | Per function |
| Temp INT | 5000-5999 | Expressions |
| Temp FLOAT | 6000-6999 | Expressions |
| Constants | 7000-7999 | Read-only |

## Files

- **`embedded_runtime/typeton_runtime.h`**: Runtime header
- **`embedded_runtime/typeton_runtime.c`**: Runtime implementation
- **`src/compiler/code_generator/embedded_serializer.py`**: Serializer
- **`EMBEDDED_MOTION_CONTROLLER.md`**: Full architecture docs

## Next Steps

1. ✅ Compile your Typeton program
2. ✅ Generate embedded JSON
3. ⏳ Implement communication layer (UART/USB)
4. ⏳ Implement motion control callbacks
5. ⏳ Test on STM32 hardware

## Notes

- Motion control functions are **not yet implemented** in the compiler
- You'll need to add grammar rules for motion control functions
- The runtime is ready, but needs motion control callbacks implemented
- See `EMBEDDED_MOTION_CONTROLLER.md` for full details







