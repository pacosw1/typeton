/**
 * Typeton Embedded Runtime Engine Implementation
 * Executes quads on STM32 microcontroller
 */

#include <stdio.h>
#include "typeton_runtime.h"
#include <math.h>
#include <string.h>

#define ADDR_LITERAL_FLAG (1u << 31)
#define PTR_REF_FLAG (1u << 30)
#define PTR_DEREF_FLAG (1u << 29)
#define STRING_LITERAL_FLAG (1u << 27)
#define CLEAR_FLAGS(value) ((int32_t)((uint32_t)(value) & ~(ADDR_LITERAL_FLAG | PTR_REF_FLAG | PTR_DEREF_FLAG | STRING_LITERAL_FLAG)))
#define HAS_FLAG(value, flag) ((((uint32_t)(value)) & (flag)) != 0)
#ifndef DEG_TO_RAD
#define DEG_TO_RAD 0.01745329251994329577f
#endif
#define GLOBAL_BOOL_START 8000
#define TEMP_BOOL_START 8500
#ifndef LOCAL_BOOL_START
#define LOCAL_BOOL_START 9000
#endif

// Helper functions
static value_type_t get_address_type(int32_t address);
static int32_t get_segment_offset(int32_t address, value_type_t type);
static void *get_memory_pointer(typeton_runtime_t *rt, int32_t address,
                                value_type_t type);
static int32_t resolve_int_operand(typeton_runtime_t *rt, int32_t operand);
static float resolve_float_operand(typeton_runtime_t *rt, int32_t operand);
static bool resolve_bool_operand(typeton_runtime_t *rt, int32_t operand);
static const char *resolve_string_literal(typeton_runtime_t *rt,
                                          int32_t operand);
static int32_t resolve_result_address(typeton_runtime_t *rt, int32_t operand);

// Execute a single quad
static void execute_quad(typeton_runtime_t *rt, const quad_t *quad);

// Operation handlers
static void handle_arithmetic(typeton_runtime_t *rt, const quad_t *quad);
static void handle_logic(typeton_runtime_t *rt, const quad_t *quad);
static void handle_assign(typeton_runtime_t *rt, const quad_t *quad);
static void handle_jump(typeton_runtime_t *rt, const quad_t *quad);
static void handle_function(typeton_runtime_t *rt, const quad_t *quad);
static void handle_motion_control(typeton_runtime_t *rt, const quad_t *quad);
static void handle_encoder_method(typeton_runtime_t *rt, const quad_t *quad);
static void handle_print(typeton_runtime_t *rt, const quad_t *quad);
static void handle_math_func(typeton_runtime_t *rt, const quad_t *quad);
static void handle_input(typeton_runtime_t *rt, const quad_t *quad);
static void handle_gear_blend(typeton_runtime_t *rt, const quad_t *quad);
static void clear_call_frame(call_frame_t *frame);
static void apply_pending_params(typeton_runtime_t *rt);

void typeton_runtime_init(typeton_runtime_t *rt) {
  memset(rt, 0, sizeof(typeton_runtime_t));
  rt->ip = 0;
  rt->running = false;
  rt->call_stack_depth = 0;
  rt->pending_call.active = false;
}

int typeton_load_program(typeton_runtime_t *rt, const uint8_t *data,
                         size_t len) {
  // TODO: Implement JSON/binary deserialization
  // For now, this is a placeholder
  // In production, parse JSON or binary format and populate:
  // - rt->quads[]
  // - rt->functions[]
  // - rt->constants_*[]

  return 0; // 0 = success
}

void typeton_run(typeton_runtime_t *rt) {
  if (rt->quad_count == 0) {
    return; // No program loaded
  }

  rt->running = true;
  rt->ip = 0;

  // Find main function
  for (uint8_t i = 0; i < rt->function_count; i++) {
    if (strcmp(rt->functions[i].name, "main") == 0) {
      rt->ip = rt->functions[i].start_quad;
      break;
    }
  }

  // Execute quads
  while (rt->running && rt->ip < rt->quad_count) {
    uint16_t current_ip = rt->ip;
    const quad_t *quad = &rt->quads[current_ip];
    execute_quad(rt, quad);

    // Increment IP (unless jump operation modified it)
    if (!rt->running) {
      break;
    }

    if (rt->ip == current_ip) {
      rt->ip++;
    }
  }
}

void typeton_stop(typeton_runtime_t *rt) { rt->running = false; }

static void execute_quad(typeton_runtime_t *rt, const quad_t *quad) {
  switch (quad->operation) {
  // Arithmetic operations
  case OP_ADD:
  case OP_SUBTRACT:
  case OP_MULTIPLY:
  case OP_DIVIDE:
    handle_arithmetic(rt, quad);
    break;

  // Logic operations
  case OP_EQUAL:
  case OP_NOT_EQUAL:
  case OP_LESS_THAN:
  case OP_GREAT_THAN:
  case OP_LESS_EQUAL:
  case OP_GREAT_EQUAL:
  case OP_AND:
  case OP_OR:
    handle_logic(rt, quad);
    break;

  // Assignment
  case OP_ASSIGN:
    handle_assign(rt, quad);
    break;

  // Jumps
  case OP_GOTO:
  case OP_GOTOF:
  case OP_GOTOV:
    handle_jump(rt, quad);
    break;

  // Functions
  case OP_ERA:
  case OP_PARAM:
  case OP_GOSUB:
  case OP_RETURN:
  case OP_ENDFUNC:
    handle_function(rt, quad);
    break;

  // Motion control
  case OP_MOVE_ABS:
  case OP_MOVE_REL:
  case OP_HOME:
  case OP_SET_POSITION:
  case OP_GET_POSITION:
  case OP_SET_VELOCITY:
  case OP_SET_ACCEL:
  case OP_WAIT_MOVE:
  case OP_ENABLE_MOTOR:
  case OP_DISABLE_MOTOR:
  case OP_GET_ENCODER:
    handle_motion_control(rt, quad);
    break;

  case OP_CALL_ENCODER_METHOD:
    handle_encoder_method(rt, quad);
    break;

  case OP_SIN_DEG:
  case OP_COS_DEG:
  case OP_TAN_DEG:
  case OP_ABS:
  case OP_SQRT:
  case OP_ATAN2:
  case OP_FLOOR:
  case OP_CEIL:
  case OP_MIN:
  case OP_MAX:
    handle_math_func(rt, quad);
    break;

  case OP_END:
    typeton_stop(rt);
    break;

  case OP_PRINT:
    handle_print(rt, quad);
    break;

  case OP_SET_INPUT_TYPE:
  case OP_READ_INPUT:
    handle_input(rt, quad);
    break;

  case OP_SET_GEAR_BLEND:
    handle_gear_blend(rt, quad);
    break;

  case OP_DEREF: {
    int32_t slot_address = resolve_int_operand(rt, quad->left_address);
    int32_t pointer_value = typeton_get_int(rt, slot_address);
    typeton_set_int(rt, quad->result_address, pointer_value);
  } break;

  default:
    // Unknown operation - skip
    break;
  }
}

static void handle_arithmetic(typeton_runtime_t *rt, const quad_t *quad) {
  value_type_t result_type = get_address_type(quad->result_address);

  if (result_type == TYPE_FLOAT) {
    float left = typeton_get_float(rt, quad->left_address);
    float right = typeton_get_float(rt, quad->right_address);
    float result = 0.0f;

    switch (quad->operation) {
    case OP_ADD:
      result = left + right;
      break;
    case OP_SUBTRACT:
      result = left - right;
      break;
    case OP_MULTIPLY:
      result = left * right;
      break;
    case OP_DIVIDE:
      if (right != 0.0f) {
        result = left / right;
      }
      break;
    default:
      break;
    }

    typeton_set_float(rt, quad->result_address, result);
  } else {
    int32_t left = resolve_int_operand(rt, quad->left_address);
    int32_t right = resolve_int_operand(rt, quad->right_address);
    int32_t result = 0;

    switch (quad->operation) {
    case OP_ADD:
      result = left + right;
      break;
    case OP_SUBTRACT:
      result = left - right;
      break;
    case OP_MULTIPLY:
      result = left * right;
      break;
    case OP_DIVIDE:
      if (right != 0) {
        result = left / right;
      }
      break;
    case OP_MOD:
      if (right != 0) {
        result = left % right;
      }
      break;
    default:
      break;
    }

    typeton_set_int(rt, quad->result_address, result);
  }
}

static void handle_logic(typeton_runtime_t *rt, const quad_t *quad) {
  value_type_t left_type = get_address_type(quad->left_address);
  value_type_t right_type = get_address_type(quad->right_address);
  bool prefer_float = (left_type == TYPE_FLOAT) || (right_type == TYPE_FLOAT);
  bool prefer_bool = (left_type == TYPE_BOOL) || (right_type == TYPE_BOOL);

  float left_f = resolve_float_operand(rt, quad->left_address);
  float right_f = resolve_float_operand(rt, quad->right_address);
  int32_t left_i = resolve_int_operand(rt, quad->left_address);
  int32_t right_i = resolve_int_operand(rt, quad->right_address);
  bool left_b = resolve_bool_operand(rt, quad->left_address);
  bool right_b = resolve_bool_operand(rt, quad->right_address);

  bool result = false;

  switch (quad->operation) {
  case OP_EQUAL:
    if (prefer_bool && !prefer_float) {
      result = left_b == right_b;
    } else if (prefer_float) {
      result = left_f == right_f;
    } else {
      result = left_i == right_i;
    }
    break;
  case OP_NOT_EQUAL:
    if (prefer_bool && !prefer_float) {
      result = left_b != right_b;
    } else if (prefer_float) {
      result = left_f != right_f;
    } else {
      result = left_i != right_i;
    }
    break;
  case OP_LESS_THAN:
    if (prefer_float) {
      result = left_f < right_f;
    } else {
      result = left_i < right_i;
    }
    break;
  case OP_GREAT_THAN:
    if (prefer_float) {
      result = left_f > right_f;
    } else {
      result = left_i > right_i;
    }
    break;
  case OP_LESS_EQUAL:
    if (prefer_float) {
      result = left_f <= right_f;
    } else {
      result = left_i <= right_i;
    }
    break;
  case OP_GREAT_EQUAL:
    if (prefer_float) {
      result = left_f >= right_f;
    } else {
      result = left_i >= right_i;
    }
    break;
  case OP_AND:
    result = left_b && right_b;
    break;
  case OP_OR:
    result = left_b || right_b;
    break;
  default:
    break;
  }

  typeton_set_bool(rt, quad->result_address, result);
}

static void handle_assign(typeton_runtime_t *rt, const quad_t *quad) {
  int32_t dest = resolve_result_address(rt, quad->result_address);
  value_type_t dest_type = get_address_type(dest);

  if (dest_type == TYPE_FLOAT) {
    float value = resolve_float_operand(rt, quad->left_address);
    typeton_set_float(rt, dest, value);
  } else if (dest_type == TYPE_BOOL) {
    bool value = resolve_bool_operand(rt, quad->left_address);
    typeton_set_bool(rt, dest, value);
  } else {
    int32_t value = resolve_int_operand(rt, quad->left_address);
    typeton_set_int(rt, dest, value);
  }
}

static void handle_jump(typeton_runtime_t *rt, const quad_t *quad) {
  switch (quad->operation) {
  case OP_GOTO:
    rt->ip = quad->result_address;
    break;

  case OP_GOTOF:
    if (!resolve_int_operand(rt, quad->left_address)) {
      rt->ip = quad->result_address;
    }
    break;

  case OP_GOTOV:
    if (resolve_int_operand(rt, quad->left_address)) {
      rt->ip = quad->result_address;
    }
    break;

  default:
    break;
  }
}

static void handle_function(typeton_runtime_t *rt, const quad_t *quad) {
  switch (quad->operation) {
  case OP_ERA:
    rt->pending_call.active = true;
    rt->pending_call.target_ip = quad->left_address;
    rt->pending_call.param_count = 0;
    break;
  case OP_PARAM:
    if (!rt->pending_call.active ||
        rt->pending_call.param_count >= MAX_PENDING_PARAMS) {
      break;
    }
    pending_param_t *slot =
        &rt->pending_call.params[rt->pending_call.param_count++];
    slot->dest_address = quad->result_address;
    slot->type = get_address_type(slot->dest_address);
    switch (slot->type) {
    case TYPE_FLOAT:
      slot->value_float = resolve_float_operand(rt, quad->left_address);
      break;
    case TYPE_BOOL:
      slot->value_int = resolve_bool_operand(rt, quad->left_address) ? 1 : 0;
      break;
    default:
      slot->value_int = resolve_int_operand(rt, quad->left_address);
      break;
    }
    break;
  case OP_GOSUB:
    if (!rt->pending_call.active) {
      break;
    }
    if (rt->call_stack_depth >= 8) {
      rt->running = false;
      break;
    }
    call_frame_t *frame = &rt->call_stack[rt->call_stack_depth];
    clear_call_frame(frame);
    frame->return_ip = rt->ip + 1;
    rt->call_stack_depth++;
    apply_pending_params(rt);
    int32_t target_ip = rt->pending_call.target_ip;
    rt->pending_call.active = false;
    rt->ip = target_ip;
    break;
  case OP_RETURN:
  case OP_ENDFUNC:
    if (rt->call_stack_depth == 0) {
      rt->running = false;
      break;
    }
    rt->call_stack_depth--;
    rt->ip = rt->call_stack[rt->call_stack_depth].return_ip;
    break;
  default:
    break;
  }
}

static void handle_motion_control(typeton_runtime_t *rt, const quad_t *quad) {
  int axis = resolve_int_operand(rt, quad->left_address);
  float value = typeton_get_float(rt, quad->right_address);

  switch (quad->operation) {
  case OP_MOVE_ABS:
    motion_move_abs(axis, value);
    break;

  case OP_MOVE_REL:
    motion_move_rel(axis, value);
    break;

  case OP_HOME:
    motion_home(axis);
    break;

  case OP_SET_POSITION:
    motion_set_position(axis, value);
    break;

  case OP_GET_POSITION: {
    float pos = motion_get_position(axis);
    typeton_set_float(rt, quad->result_address, pos);
  } break;

  case OP_GET_ENCODER: {
    int property = quad->right_address;
    float result = (property == ENCODER_PROPERTY_COUNTS)
                       ? motion_get_encoder_counts(axis)
                       : motion_get_encoder_angle(axis);
    typeton_set_float(rt, quad->result_address, result);
  } break;

  case OP_CALL_ENCODER_METHOD:
    handle_encoder_method(rt, quad);
    break;

  case OP_SET_VELOCITY:
    motion_set_velocity(axis, value);
    break;

  case OP_SET_ACCEL:
    motion_set_acceleration(axis, value);
    break;

  case OP_WAIT_MOVE:
    motion_wait_move(axis);
    break;

  case OP_ENABLE_MOTOR:
    motion_enable_motor(axis);
    break;

  case OP_DISABLE_MOTOR:
    motion_disable_motor(axis);
    break;

  case OP_WAIT_FOR_ANGLE:
    motion_wait_for_angle(axis, value);
    break;

  case OP_WAIT_FOR_COUNTS:
    motion_wait_for_counts(axis, (int32_t)value);
    break;

  case OP_JOG:
    motion_jog(axis, value);
    break;

  case OP_SET_GEAR_MASTER:
    motion_set_gear_master(axis, (int32_t)resolve_int_operand(rt, quad->right_address));
    break;

  case OP_SET_GEAR_RATIO:
    motion_set_gear_ratio(axis, value);
    break;

  default:
    break;
  }
}

static void clear_call_frame(call_frame_t *frame) {
  memset(frame->local_int, 0, sizeof(frame->local_int));
  memset(frame->local_float, 0, sizeof(frame->local_float));
  memset(frame->local_bool, 0, sizeof(frame->local_bool));
  memset(frame->temp_int, 0, sizeof(frame->temp_int));
  memset(frame->temp_float, 0, sizeof(frame->temp_float));
  memset(frame->temp_bool, 0, sizeof(frame->temp_bool));
}

static void apply_pending_params(typeton_runtime_t *rt) {
  for (uint8_t i = 0; i < rt->pending_call.param_count; i++) {
    pending_param_t *param = &rt->pending_call.params[i];
    switch (param->type) {
    case TYPE_FLOAT:
      typeton_set_float(rt, param->dest_address, param->value_float);
      break;
    case TYPE_BOOL:
      typeton_set_bool(rt, param->dest_address, param->value_int != 0);
      break;
    default:
      typeton_set_int(rt, param->dest_address, param->value_int);
      break;
    }
  }
  rt->pending_call.param_count = 0;
}

static void handle_input(typeton_runtime_t *rt, const quad_t *quad) {
  int channel = resolve_int_operand(rt, quad->left_address);
  if (channel < 0) {
    channel = 0;
  }
  if (channel >= MAX_INPUT_CHANNELS) {
    channel = MAX_INPUT_CHANNELS - 1;
  }

  switch (quad->operation) {
  case OP_SET_INPUT_TYPE: {
    bool active_low = resolve_int_operand(rt, quad->right_address) == 0;
    typeton_configure_input(rt, channel, active_low);
  } break;
  case OP_READ_INPUT: {
    bool value = typeton_read_input(rt, channel);
    typeton_set_bool(rt, quad->result_address, value);
  } break;
  default:
    break;
  }
}

static void handle_gear_blend(typeton_runtime_t *rt, const quad_t *quad) {
  int axis = resolve_int_operand(rt, quad->left_address);
  float blend_counts = resolve_float_operand(rt, quad->right_address);
  bool use_master = quad->result_address != 0;
  motion_set_gear_blend(axis, blend_counts, use_master);
}

static void handle_math_func(typeton_runtime_t *rt, const quad_t *quad) {
  float left = resolve_float_operand(rt, quad->left_address);
  float right = resolve_float_operand(rt, quad->right_address);
  float radians = left * DEG_TO_RAD;
  float result = 0.0f;

  switch (quad->operation) {
  case OP_SIN_DEG:
    result = sinf(radians);
    break;
  case OP_COS_DEG:
    result = cosf(radians);
    break;
  case OP_TAN_DEG:
    result = tanf(radians);
    break;
  case OP_ABS:
    result = fabsf(left);
    break;
  case OP_SQRT:
    result = left >= 0.0f ? sqrtf(left) : 0.0f;
    break;
  case OP_ATAN2:
    result = atan2f(left, right) / DEG_TO_RAD;
    break;
  case OP_FLOOR:
    result = floorf(left);
    break;
  case OP_CEIL:
    result = ceilf(left);
    break;
  case OP_MIN:
    result = fminf(left, right);
    break;
  case OP_MAX:
    result = fmaxf(left, right);
    break;
  case OP_ROUND:
    result = roundf(left);
    break;
  default:
    break;
  }

  if (quad->operation == OP_ROUND) {
    value_type_t dest_type = get_address_type(quad->result_address);
    if (dest_type == TYPE_INT) {
      typeton_set_int(rt, quad->result_address, (int32_t)lroundf(left));
      return;
    }
  }

  typeton_set_float(rt, quad->result_address, result);
}

static void handle_encoder_method(typeton_runtime_t *rt, const quad_t *quad) {
  int axis = resolve_int_operand(rt, quad->left_address);
  int method = quad->result_address;
  float argument = resolve_float_operand(rt, quad->right_address);

  switch (method) {
  case ENCODER_METHOD_WAITFORANGLE:
    motion_wait_for_angle(axis, argument);
    break;
  case ENCODER_METHOD_WAITFORCOUNTS:
    motion_wait_for_counts(axis, (int32_t)argument);
    break;
  case ENCODER_METHOD_JOG:
    motion_jog(axis, argument);
    break;
  case ENCODER_METHOD_MOVEABSOLUTE:
    motion_move_absolute(axis, argument);
    break;
  case ENCODER_METHOD_SETGEARMASTER:
    motion_set_gear_master(axis, (int32_t)argument);
    break;
  case ENCODER_METHOD_SETGEARRATIO:
    motion_set_gear_ratio(axis, argument);
    break;
  default:
    break;
  }
}

// Variable access functions
int32_t typeton_get_int(typeton_runtime_t *rt, int32_t address) {
  if (HAS_FLAG(address, ADDR_LITERAL_FLAG)) {
    return CLEAR_FLAGS(address);
  }
  if (address >= 0 && address < 1000) {
    return address;
  }
  value_type_t type = get_address_type(address);
  int stack_idx = rt->call_stack_depth > 0 ? rt->call_stack_depth - 1 : 0;

  if (type == TYPE_INT) {
    // Check if constant
    if (address >= 7000 && address < 8000) {
      int idx = address - 7000;
      if (idx < MAX_CONSTANTS) {
        return rt->constants_int[idx];
      }
    }
    // Check global
    else if (address >= 1000 && address < 2000) {
      int idx = address - 1000;
      if (idx < GLOBAL_INT_SIZE) {
        return rt->global_int[idx];
      }
    }
    // Check local (current function)
    else if (address >= 3000 && address < 4000 && rt->call_stack_depth > 0) {
      int idx = address - 3000;
      if (idx < LOCAL_INT_SIZE) {
        return rt->call_stack[rt->call_stack_depth - 1].local_int[idx];
      }
    }
    // Check temp
    else if (address >= 5000 && address < 6000) {
      int idx = address - 5000;
      if (idx < TEMP_INT_SIZE) {
        return rt->call_stack[stack_idx].temp_int[idx];
      }
    }
  }

  return address;
}

void typeton_set_int(typeton_runtime_t *rt, int32_t address, int32_t value) {
  if (HAS_FLAG(address, ADDR_LITERAL_FLAG)) {
    address = CLEAR_FLAGS(address);
  }
  if (address < 1000) {
    return;
  }
  value_type_t type = get_address_type(address);
  int stack_idx = rt->call_stack_depth > 0 ? rt->call_stack_depth - 1 : 0;

  if (type == TYPE_INT) {
    // Global
    if (address >= 1000 && address < 2000) {
      int idx = address - 1000;
      if (idx < GLOBAL_INT_SIZE) {
        rt->global_int[idx] = value;
      }
    }
    // Local
    else if (address >= 3000 && address < 4000 && rt->call_stack_depth > 0) {
      int idx = address - 3000;
      if (idx < LOCAL_INT_SIZE) {
        rt->call_stack[rt->call_stack_depth - 1].local_int[idx] = value;
      }
    }
    // Temp
    else if (address >= 5000 && address < 6000) {
      int idx = address - 5000;
      if (idx < TEMP_INT_SIZE) {
        rt->call_stack[stack_idx].temp_int[idx] = value;
      }
    }
  }
}

float typeton_get_float(typeton_runtime_t *rt, int32_t address) {
  value_type_t type = get_address_type(address);
  int stack_idx = rt->call_stack_depth > 0 ? rt->call_stack_depth - 1 : 0;

  if (type == TYPE_FLOAT) {
    // Constants
    if (address >= 7000 && address < 8000) {
      int idx = address - 7000;
      if (idx < MAX_CONSTANTS) {
        return rt->constants_float[idx];
      }
    }
    // Global
    else if (address >= 2000 && address < 3000) {
      int idx = address - 2000;
      if (idx < GLOBAL_FLOAT_SIZE) {
        return rt->global_float[idx];
      }
    }
    // Local
    else if (address >= 4000 && address < 5000 && rt->call_stack_depth > 0) {
      int idx = address - 4000;
      if (idx < LOCAL_FLOAT_SIZE) {
        return rt->call_stack[rt->call_stack_depth - 1].local_float[idx];
      }
    }
    // Temp
    else if (address >= 6000 && address < 7000) {
      int idx = address - 6000;
      if (idx < TEMP_FLOAT_SIZE) {
        return rt->call_stack[stack_idx].temp_float[idx];
      }
    }
  }

  return 0.0f;
}

void typeton_set_float(typeton_runtime_t *rt, int32_t address, float value) {
  value_type_t type = get_address_type(address);
  int stack_idx = rt->call_stack_depth > 0 ? rt->call_stack_depth - 1 : 0;

  if (type == TYPE_FLOAT) {
    // Global
    if (address >= 2000 && address < 3000) {
      int idx = address - 2000;
      if (idx < GLOBAL_FLOAT_SIZE) {
        rt->global_float[idx] = value;
      }
    }
    // Local
    else if (address >= 4000 && address < 5000 && rt->call_stack_depth > 0) {
      int idx = address - 4000;
      if (idx < LOCAL_FLOAT_SIZE) {
        rt->call_stack[rt->call_stack_depth - 1].local_float[idx] = value;
      }
    }
    // Temp
    else if (address >= 6000 && address < 7000) {
      int idx = address - 6000;
      if (idx < TEMP_FLOAT_SIZE) {
        rt->call_stack[stack_idx].temp_float[idx] = value;
      }
    }
  }
}

bool typeton_get_bool(typeton_runtime_t *rt, int32_t address) {
  int stack_idx = rt->call_stack_depth > 0 ? rt->call_stack_depth - 1 : 0;

  if (address >= GLOBAL_BOOL_START &&
      address < GLOBAL_BOOL_START + GLOBAL_BOOL_SIZE) {
    int idx = address - GLOBAL_BOOL_START;
    if (idx < GLOBAL_BOOL_SIZE) {
      return rt->global_bool[idx];
    }
  } else if (address >= LOCAL_BOOL_START &&
             address < LOCAL_BOOL_START + LOCAL_BOOL_SIZE &&
             rt->call_stack_depth > 0) {
    int idx = address - LOCAL_BOOL_START;
    if (idx < LOCAL_BOOL_SIZE) {
      return rt->call_stack[rt->call_stack_depth - 1].local_bool[idx];
    }
  } else if (address >= TEMP_BOOL_START &&
             address < TEMP_BOOL_START + TEMP_BOOL_SIZE) {
    int idx = address - TEMP_BOOL_START;
    if (idx < TEMP_BOOL_SIZE) {
      return rt->call_stack[stack_idx].temp_bool[idx];
    }
  }
  return false;
}

void typeton_set_bool(typeton_runtime_t *rt, int32_t address, bool value) {
  int stack_idx = rt->call_stack_depth > 0 ? rt->call_stack_depth - 1 : 0;

  if (address >= GLOBAL_BOOL_START &&
      address < GLOBAL_BOOL_START + GLOBAL_BOOL_SIZE) {
    int idx = address - GLOBAL_BOOL_START;
    if (idx < GLOBAL_BOOL_SIZE) {
      rt->global_bool[idx] = value;
    }
  } else if (address >= LOCAL_BOOL_START &&
             address < LOCAL_BOOL_START + LOCAL_BOOL_SIZE &&
             rt->call_stack_depth > 0) {
    int idx = address - LOCAL_BOOL_START;
    if (idx < LOCAL_BOOL_SIZE) {
      rt->call_stack[rt->call_stack_depth - 1].local_bool[idx] = value;
    }
  } else if (address >= TEMP_BOOL_START &&
             address < TEMP_BOOL_START + TEMP_BOOL_SIZE) {
    int idx = address - TEMP_BOOL_START;
    if (idx < TEMP_BOOL_SIZE) {
      rt->call_stack[stack_idx].temp_bool[idx] = value;
    }
  }
}

void typeton_configure_input(typeton_runtime_t *rt, int channel,
                             bool active_low) {
  if (channel < 0 || channel >= MAX_INPUT_CHANNELS) {
    return;
  }
  rt->input_active_low[channel] = active_low;
}

void typeton_set_input_state(typeton_runtime_t *rt, int channel, bool is_high) {
  if (channel < 0 || channel >= MAX_INPUT_CHANNELS) {
    return;
  }
  rt->input_state[channel] = is_high;
}

bool typeton_read_input(typeton_runtime_t *rt, int channel) {
  if (channel < 0 || channel >= MAX_INPUT_CHANNELS) {
    return false;
  }
  bool raw = rt->input_state[channel];
  return rt->input_active_low[channel] ? !raw : raw;
}

static int32_t resolve_int_operand(typeton_runtime_t *rt, int32_t operand) {
  if (HAS_FLAG(operand, STRING_LITERAL_FLAG)) {
    return 0;
  }
  if (HAS_FLAG(operand, ADDR_LITERAL_FLAG)) {
    return CLEAR_FLAGS(operand);
  }
  if (HAS_FLAG(operand, PTR_DEREF_FLAG)) {
    int32_t slot = CLEAR_FLAGS(operand);
    int32_t addr = typeton_get_int(rt, slot);
    return typeton_get_int(rt, addr);
  }
  if (operand >= 1000 && operand < 8000) {
    return typeton_get_int(rt, operand);
  }
  if ((operand >= GLOBAL_BOOL_START &&
       operand < GLOBAL_BOOL_START + GLOBAL_BOOL_SIZE) ||
      (operand >= LOCAL_BOOL_START &&
       operand < LOCAL_BOOL_START + LOCAL_BOOL_SIZE) ||
      (operand >= TEMP_BOOL_START &&
       operand < TEMP_BOOL_START + TEMP_BOOL_SIZE)) {
    return typeton_get_bool(rt, operand) ? 1 : 0;
  }
  return operand;
}

static float resolve_float_operand(typeton_runtime_t *rt, int32_t operand) {
  if (HAS_FLAG(operand, STRING_LITERAL_FLAG)) {
    return 0.0f;
  }
  value_type_t type = get_address_type(operand);
  if (type == TYPE_FLOAT) {
    return typeton_get_float(rt, operand);
  }
  if (type == TYPE_BOOL) {
    return typeton_get_bool(rt, operand) ? 1.0f : 0.0f;
  }
  return (float)resolve_int_operand(rt, operand);
}

static bool resolve_bool_operand(typeton_runtime_t *rt, int32_t operand) {
  value_type_t type = get_address_type(operand);
  if (type == TYPE_BOOL) {
    return typeton_get_bool(rt, operand);
  }
  if (type == TYPE_FLOAT) {
    return typeton_get_float(rt, operand) != 0.0f;
  }
  return resolve_int_operand(rt, operand) != 0;
}

static const char *resolve_string_literal(typeton_runtime_t *rt,
                                          int32_t operand) {
  int32_t idx = ((int32_t)((uint32_t)operand & ~STRING_LITERAL_FLAG));
  if (idx >= 0 && idx < rt->string_literal_count) {
    return rt->string_literals[idx];
  }
  return "";
}

static int32_t resolve_result_address(typeton_runtime_t *rt, int32_t operand) {
  if (HAS_FLAG(operand, PTR_REF_FLAG)) {
    int32_t slot = CLEAR_FLAGS(operand);
    return typeton_get_int(rt, slot);
  }
  if (HAS_FLAG(operand, ADDR_LITERAL_FLAG)) {
    return CLEAR_FLAGS(operand);
  }
  return operand;
}

static void handle_print(typeton_runtime_t *rt, const quad_t *quad) {
  if (HAS_FLAG(quad->left_address, STRING_LITERAL_FLAG)) {
    printf("%s\n", resolve_string_literal(rt, quad->left_address));
    return;
  }
  value_type_t type = get_address_type(quad->left_address);

  if (type == TYPE_FLOAT) {
    printf("%f\n", typeton_get_float(rt, quad->left_address));
  } else if (type == TYPE_BOOL) {
    printf("%s\n",
           typeton_get_bool(rt, quad->left_address) ? "true" : "false");
  } else {
    printf("%d\n", resolve_int_operand(rt, quad->left_address));
  }
}

// Helper functions
static value_type_t get_address_type(int32_t address) {
  // Determine type based on address range
  if (address >= 1000 && address < 2000)
    return TYPE_INT;
  if (address >= 2000 && address < 3000)
    return TYPE_FLOAT;
  if (address >= 3000 && address < 4000)
    return TYPE_INT;
  if (address >= 4000 && address < 5000)
    return TYPE_FLOAT;
  if (address >= 5000 && address < 6000)
    return TYPE_INT;
  if (address >= 6000 && address < 7000)
    return TYPE_FLOAT;
  if (address >= 7000 && address < 8000)
    return TYPE_FLOAT; // Float constants
  if (address >= GLOBAL_BOOL_START &&
      address < GLOBAL_BOOL_START + GLOBAL_BOOL_SIZE)
    return TYPE_BOOL;
  if (address >= LOCAL_BOOL_START &&
      address < LOCAL_BOOL_START + LOCAL_BOOL_SIZE)
    return TYPE_BOOL;
  if (address >= TEMP_BOOL_START &&
      address < TEMP_BOOL_START + TEMP_BOOL_SIZE)
    return TYPE_BOOL;
  return TYPE_INT;   // Default
}
