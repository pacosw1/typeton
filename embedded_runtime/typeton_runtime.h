/**
 * Typeton Embedded Runtime Engine
 * Lightweight quad interpreter for STM32 microcontrollers
 */

#ifndef TYPETON_RUNTIME_H
#define TYPETON_RUNTIME_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

// Maximum program size (adjust based on available RAM)
#define MAX_QUADS 1000
#define MAX_FUNCTIONS 50
#define MAX_CONSTANTS 200
#define MAX_STRING_LITERALS 200
#define STRING_LITERAL_MAX 128

// Memory segment sizes (adjust based on needs)
#define GLOBAL_INT_SIZE 500
#define GLOBAL_FLOAT_SIZE 100
#define GLOBAL_BOOL_SIZE 50
#define LOCAL_BOOL_START 9000
#define GLOBAL_STRING_SIZE 50
#define LOCAL_INT_SIZE 500
#define LOCAL_FLOAT_SIZE 50
#define LOCAL_BOOL_SIZE 50
#define TEMP_INT_SIZE 500
#define TEMP_FLOAT_SIZE 50
#define TEMP_BOOL_SIZE 25
#define MAX_PENDING_PARAMS 16
#define MAX_INPUT_CHANNELS 16

#define ENCODER_PROPERTY_ANGLE 0
#define ENCODER_PROPERTY_COUNTS 1

#define ENCODER_METHOD_WAITFORANGLE 0
#define ENCODER_METHOD_WAITFORCOUNTS 1
#define ENCODER_METHOD_JOG 2
#define ENCODER_METHOD_MOVEABSOLUTE 3
#define ENCODER_METHOD_SETGEARMASTER 4
#define ENCODER_METHOD_SETGEARRATIO 5

// Operation types (must match Python OperationType enum)
typedef enum {
  OP_ALLOCATE_HEAP,
  OP_END_GLOBAL,
  OP_ARRAY_ADD,
  OP_DELETE_REF,
  OP_CALL_ASSIGN,
  OP_POINTER_ADD,
  OP_PARAM,
  OP_ARE,
  OP_GOTOMAIN,
  OP_MULTIPLY,
  OP_DIVIDE,
  OP_MOD,
  OP_ADD,
  OP_EQUAL,
  OP_AND,
  OP_OR,
  OP_NOT_EQUAL,
  OP_LESS_THAN,
  OP_GREAT_THAN,
  OP_LESS_EQUAL,
  OP_GREAT_EQUAL,
  OP_SUBTRACT,
  OP_ASSIGN,
  OP_GOTOF,
  OP_GOTOV,
  OP_GOTO,
  OP_PARAMETER,
  OP_RETURN,
  OP_GOSUB,
  OP_ENDFUNC,
  OP_ERA,
  OP_END,
  OP_PRINT,
  OP_LASSIGN,
  OP_PASSIGN,
  OP_DASSIGN,
  OP_MASSIGN,
  OP_POINTER_ASSIGN,
  OP_VERIFY,
  OP_INPUT,
  OP_SET_INPUT_TYPE,
  OP_READ_INPUT,
  OP_SET_GEAR_BLEND,
  OP_WAIT_FOR_ANGLE,
  OP_WAIT_FOR_COUNTS,
  OP_JOG,
  OP_SET_GEAR_MASTER,
  OP_SET_GEAR_RATIO,
  // Motion Control Operations
  OP_MOVE_ABS,
  OP_MOVE_REL,
  OP_HOME,
  OP_SET_POSITION,
  OP_GET_POSITION,
  OP_GET_ENCODER,
  OP_CALL_ENCODER_METHOD,
  OP_SET_VELOCITY,
  OP_SET_ACCEL,
  OP_WAIT_MOVE,
  OP_ENABLE_MOTOR,
  OP_DISABLE_MOTOR,
  OP_SIN_DEG,
  OP_COS_DEG,
  OP_TAN_DEG,
  OP_ABS,
  OP_SQRT,
  OP_ATAN2,
  OP_FLOOR,
  OP_CEIL,
  OP_MIN,
  OP_MAX,
  OP_ROUND,
  OP_DEREF
} operation_type_t;

// Value types
typedef enum {
  TYPE_INT,
  TYPE_FLOAT,
  TYPE_BOOL,
  TYPE_STRING,
  TYPE_POINTER,
  TYPE_VOID
} value_type_t;

// Quad structure
typedef struct {
  operation_type_t operation;
  int32_t left_address;
  int32_t right_address;
  int32_t result_address;
} quad_t;

// Function metadata
typedef struct {
  char name[32];
  uint16_t start_quad;
  uint8_t int_local;
  uint8_t int_temp;
  uint8_t float_local;
  uint8_t float_temp;
  uint8_t bool_local;
  uint8_t bool_temp;
} function_data_t;

typedef struct {
  int32_t dest_address;
  value_type_t type;
  int32_t value_int;
  float value_float;
} pending_param_t;

typedef struct {
  bool active;
  int32_t target_ip;
  uint8_t param_count;
  pending_param_t params[MAX_PENDING_PARAMS];
} pending_call_t;

// Runtime state
typedef struct {
  uint16_t return_ip;
  int32_t local_int[LOCAL_INT_SIZE];
  float local_float[LOCAL_FLOAT_SIZE];
  bool local_bool[LOCAL_BOOL_SIZE];
  int32_t temp_int[TEMP_INT_SIZE];
  float temp_float[TEMP_FLOAT_SIZE];
  bool temp_bool[TEMP_BOOL_SIZE];
} call_frame_t;

typedef struct {
  quad_t quads[MAX_QUADS];
  uint16_t quad_count;

  function_data_t functions[MAX_FUNCTIONS];
  uint8_t function_count;

  // Memory segments
  int32_t global_int[GLOBAL_INT_SIZE];
  float global_float[GLOBAL_FLOAT_SIZE];
  bool global_bool[GLOBAL_BOOL_SIZE];

  // Constants
  int32_t constants_int[MAX_CONSTANTS];
  float constants_float[MAX_CONSTANTS];
  bool constants_bool[MAX_CONSTANTS];
  uint16_t constant_count;
  uint16_t float_literal_count;
  char string_literals[MAX_STRING_LITERALS][STRING_LITERAL_MAX];
  uint16_t string_literal_count;
  pending_call_t pending_call;
  bool input_active_low[MAX_INPUT_CHANNELS];
  bool input_state[MAX_INPUT_CHANNELS];

  // Execution state
  uint16_t ip; // Instruction pointer
  bool running;

  // Call stack
  call_frame_t call_stack[8]; // Max 8 levels of function calls
  uint8_t call_stack_depth;
} typeton_runtime_t;

// Runtime API
void typeton_runtime_init(typeton_runtime_t *rt);
int typeton_load_program(typeton_runtime_t *rt, const uint8_t *data,
                         size_t len);
void typeton_run(typeton_runtime_t *rt);
void typeton_stop(typeton_runtime_t *rt);

// Variable access API
int32_t typeton_get_int(typeton_runtime_t *rt, int32_t address);
void typeton_set_int(typeton_runtime_t *rt, int32_t address, int32_t value);
float typeton_get_float(typeton_runtime_t *rt, int32_t address);
void typeton_set_float(typeton_runtime_t *rt, int32_t address, float value);
bool typeton_get_bool(typeton_runtime_t *rt, int32_t address);
void typeton_set_bool(typeton_runtime_t *rt, int32_t address, bool value);
void typeton_configure_input(typeton_runtime_t *rt, int channel, bool active_low);
void typeton_set_input_state(typeton_runtime_t *rt, int channel, bool is_high);
bool typeton_read_input(typeton_runtime_t *rt, int channel);

// Motion control callbacks (implement these in your application)
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
float motion_get_encoder_angle(int axis);
float motion_get_encoder_counts(int axis);
void motion_wait_for_angle(int axis, float target);
void motion_wait_for_counts(int axis, int32_t target);
void motion_jog(int axis, float distance);
void motion_move_absolute(int axis, float position);
void motion_set_gear_master(int axis, int32_t level);
void motion_set_gear_ratio(int axis, float ratio);
void motion_set_gear_blend(int axis, float blend, bool use_master);

#endif // TYPETON_RUNTIME_H
