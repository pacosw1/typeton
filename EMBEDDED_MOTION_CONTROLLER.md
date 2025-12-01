# Embedded Motion Controller Architecture

## Overview

Typeton is being transformed into a dedicated **embedded motion controller language**. Instead of generating full C code or running a Python VM, we:

1. **Compile** Typeton code to quads (intermediate representation) in Python
2. **Serialize** quads + metadata to a compact format
3. **Send** to STM32 microcontroller via UART/USB/SPI
4. **Execute** quads on STM32 using a lightweight C runtime engine
5. **Add** motion control commands directly to the language

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Python Compiler                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Lexer   │→ │  Parser  │→ │   Code   │→ │  Serial  │  │
│  │          │  │          │  │ Generator│  │   izer   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
│  Output: Quads + Function Data + Constants                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Serialized Program (JSON/Binary)
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Communication Layer (UART/USB/SPI)              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              STM32 C Runtime Engine                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Quad       │  │   Memory     │  │   Motion     │     │
│  │ Interpreter  │→ │   Manager    │→ │   Control    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  - Executes quads sequentially                               │
│  - Manages GLOBAL, LOCAL, TEMP, CONSTANT memory segments    │
│  - Handles function calls, jumps, expressions               │
│  - Executes motion control commands                          │
└─────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. Python Compiler (Existing)
- **Lexer**: Tokenizes Typeton source code
- **Parser**: Builds AST
- **Code Generator**: Generates quads (intermediate representation)
- **Output**: Quads + function metadata + constants

### 2. Serialization Layer (New)
- Converts quads + metadata to compact format
- Options:
  - **JSON** (easy, human-readable, larger)
  - **Binary** (compact, efficient, smaller)
- Includes:
  - Quad list (operation + addresses)
  - Function entry points
  - Function size data
  - Constant table
  - Initial memory values

### 3. Communication Layer (New)
- **UART**: Simple, standard serial communication
- **USB**: Faster, more reliable
- **SPI**: Fast, for close-range communication
- Protocol:
  - Send program size
  - Send program data
  - Receive execution status/errors

### 4. STM32 C Runtime Engine (New)
- **Lightweight quad interpreter** (~10-20KB flash)
- **Memory management**:
  - Global memory (persistent)
  - Local memory (per function call)
  - Temporary memory (expressions)
  - Constant table (read-only)
- **Operation handlers**:
  - Arithmetic (ADD, SUBTRACT, MULTIPLY, DIVIDE)
  - Logic (AND, OR, EQUAL, LESS_THAN, etc.)
  - Control flow (GOTO, GOTOF, GOTOV)
  - Functions (GOSUB, RETURN, PARAM)
  - **Motion control** (MOVE, HOME, SET_POSITION, etc.)

## Motion Control Operations

### New Operations to Add

```python
# In OperationType enum:
MOVE_ABS = "MOVE_ABS"      # Move absolute position
MOVE_REL = "MOVE_REL"      # Move relative position
HOME = "HOME"              # Home axis
SET_POSITION = "SET_POS"   # Set current position
GET_POSITION = "GET_POS"   # Get current position
SET_VELOCITY = "SET_VEL"   # Set velocity
SET_ACCEL = "SET_ACCEL"    # Set acceleration
WAIT_MOVE = "WAIT_MOVE"    # Wait for move to complete
ENABLE_MOTOR = "EN_MOTOR"  # Enable motor
DISABLE_MOTOR = "DIS_MOTOR" # Disable motor
```

### Language Syntax

```typeton
// Motion control example
func main() {
    var axis: Int32 = 0
    var position: Float32 = 100.5
    var velocity: Float32 = 50.0
    
    // Enable motor
    enable_motor(axis)
    
    // Set velocity
    set_velocity(axis, velocity)
    
    // Move to absolute position
    move_abs(axis, position)
    
    // Wait for move to complete
    wait_move(axis)
    
    // Get current position
    var current_pos: Float32 = get_position(axis)
    
    // Move relative
    move_rel(axis, 10.0)
    
    // Home axis
    home(axis)
}
```

## Memory Model (STM32)

### Memory Segments

```
┌─────────────────────────────────────────┐
│         GLOBAL MEMORY                   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ INT │ │FLT  │ │BOOL │ │STR │       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
└─────────────────────────────────────────┘
         ▲
         │ (shared across all functions)
         │
┌─────────────────────────────────────────┐
│         LOCAL MEMORY (per function)     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ INT │ │FLT  │ │BOOL │ │STR │       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
└─────────────────────────────────────────┘
         ▲
         │
┌─────────────────────────────────────────┐
│         TEMP MEMORY (expressions)       │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ INT │ │FLT  │ │BOOL │ │STR │       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
└─────────────────────────────────────────┘
         ▲
         │
┌─────────────────────────────────────────┐
│         CONSTANT TABLE (read-only)      │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ INT │ │FLT  │ │BOOL │ │STR │       │
│  └─────┘ └─────┘ └─────┘ └─────┘       │
└─────────────────────────────────────────┘
```

### Address Ranges

- **GLOBAL**: 1000-1999 (INT), 2000-2999 (FLOAT), etc.
- **LOCAL**: 3000-3999 (INT), 4000-4999 (FLOAT), etc.
- **TEMPORARY**: 5000-5999 (INT), 6000-6999 (FLOAT), etc.
- **CONSTANT**: 7000-7999 (all types)

## C Runtime Structure

### Core Files

```
embedded_runtime/
├── typeton_runtime.h          # Main runtime header
├── typeton_runtime.c          # Quad interpreter
├── typeton_memory.c           # Memory management
├── typeton_motion.c           # Motion control handlers
├── typeton_serial.c           # Communication layer
└── stm32_hal.h                # STM32 HAL integration
```

### Runtime API

```c
// Initialize runtime
void typeton_runtime_init(void);

// Load program from serialized data
int typeton_load_program(const uint8_t* data, size_t len);

// Run program
void typeton_run(void);

// Get/set runtime variables
int32_t typeton_get_int(int address);
void typeton_set_int(int address, int32_t value);
float typeton_get_float(int address);
void typeton_set_float(int address, float value);

// Motion control callbacks (implement in your code)
void motion_move_abs(int axis, float position);
void motion_move_rel(int axis, float distance);
void motion_home(int axis);
float motion_get_position(int axis);
void motion_set_velocity(int axis, float velocity);
```

## Serialization Format

### JSON Format (Initial)

```json
{
  "quads": [
    {"op": "ASSIGN", "left": "7000", "right": null, "result": "1000"},
    {"op": "ADD", "left": "1000", "right": "1001", "result": "5000"},
    {"op": "MOVE_ABS", "left": "0", "right": "5000", "result": null}
  ],
  "functions": {
    "main": {
      "start_quad": 0,
      "size_data": {
        "Int": {"local": 2, "temp": 1},
        "Float": {"local": 0, "temp": 0}
      }
    }
  },
  "constants": {
    "7000": 10,
    "7001": 20.5
  }
}
```

### Binary Format (Future)

- More compact
- Faster to parse
- Better for production

## Advantages

1. **Lightweight**: Runtime engine is small (~10-20KB)
2. **Flexible**: Can update program without reflashing firmware
3. **Runtime Variables**: Access variables at runtime via communication
4. **Domain-Specific**: Motion control commands built-in
5. **Simple**: Quad-based execution is easy to understand/debug
6. **Fast**: Direct execution, no interpretation overhead

## Workflow

1. **Develop** Typeton code on PC
2. **Compile** to quads using Python compiler
3. **Serialize** quads to JSON/binary
4. **Upload** to STM32 via UART/USB
5. **Execute** on STM32 C runtime
6. **Monitor** variables via communication interface
7. **Update** program without reflashing (if using RAM storage)

## Next Steps

1. ✅ Design architecture
2. ⏳ Add motion control operations to compiler
3. ⏳ Create C runtime engine
4. ⏳ Implement serialization
5. ⏳ Create communication protocol
6. ⏳ Test on STM32 hardware







