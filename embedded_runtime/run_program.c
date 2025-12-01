#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include "typeton_runtime.h"

#define ADDR_LITERAL_FLAG (1u << 31)
#define PTR_REF_FLAG (1u << 30)
#define PTR_DEREF_FLAG (1u << 29)
#define STRING_LITERAL_FLAG (1u << 27)
#define VALUE_MASK (~(ADDR_LITERAL_FLAG | PTR_REF_FLAG | PTR_DEREF_FLAG | STRING_LITERAL_FLAG))

static int hex_value(char c) {
    if (c >= '0' && c <= '9') return c - '0';
    if (c >= 'a' && c <= 'f') return 10 + (c - 'a');
    if (c >= 'A' && c <= 'F') return 10 + (c - 'A');
    return 0;
}

static size_t decode_hex_string(const char* hex, char* out, size_t max_len) {
    size_t len = strlen(hex);
    size_t out_len = len / 2;
    if (out_len >= max_len) {
        out_len = max_len - 1;
    }
    for (size_t i = 0; i < out_len; ++i) {
        int hi = hex_value(hex[i * 2]);
        int lo = hex_value(hex[i * 2 + 1]);
        out[i] = (char)((hi << 4) | lo);
    }
    out[out_len] = '\0';
    return out_len;
}

static int32_t register_string_literal(typeton_runtime_t* rt, const char* hex) {
    if (rt->string_literal_count >= MAX_STRING_LITERALS) {
        return 0;
    }
    uint16_t idx = rt->string_literal_count++;
    decode_hex_string(hex, rt->string_literals[idx], STRING_LITERAL_MAX);
    return (int32_t)(STRING_LITERAL_FLAG | idx);
}

static int32_t register_float_literal(typeton_runtime_t* rt, float value) {
    if (rt->float_literal_count >= MAX_CONSTANTS) {
        return 7000;
    }
    uint16_t idx = rt->float_literal_count++;
    rt->constants_float[idx] = value;
    return 7000 + idx;
}

static operation_type_t map_operation(const char* name) {
    if (strcmp(name, "=") == 0) return OP_ASSIGN;
    if (strcmp(name, "ADD_I32") == 0) return OP_ADD;
    if (strcmp(name, "SUB_I32") == 0) return OP_SUBTRACT;
    if (strcmp(name, "MUL_I32") == 0) return OP_MULTIPLY;
    if (strcmp(name, "DIV_I32") == 0) return OP_DIVIDE;
    if (strcmp(name, "PRINT") == 0) return OP_PRINT;
    if (strcmp(name, "GOTO") == 0) return OP_GOTO;
    if (strcmp(name, "GOTOF") == 0) return OP_GOTOF;
    if (strcmp(name, "GOTOV") == 0) return OP_GOTOV;
    if (strcmp(name, "GET_ENCODER") == 0) return OP_GET_ENCODER;
    if (strcmp(name, "CALL_ENCODER_METHOD") == 0) return OP_CALL_ENCODER_METHOD;
    if (strcmp(name, "OP_LESS_THAN") == 0 || strcmp(name, "LESS_THAN") == 0)
        return OP_LESS_THAN;
    if (strcmp(name, "OP_GREAT_THAN") == 0 || strcmp(name, "GREAT_THAN") == 0)
        return OP_GREAT_THAN;
    if (strcmp(name, "OP_LESS_EQUAL") == 0 || strcmp(name, "LESS_EQUAL") == 0)
        return OP_LESS_EQUAL;
    if (strcmp(name, "OP_GREAT_EQUAL") == 0 || strcmp(name, "GREAT_EQUAL") == 0)
        return OP_GREAT_EQUAL;
    if (strcmp(name, "OP_NOT_EQUAL") == 0 || strcmp(name, "NOT_EQUAL") == 0)
        return OP_NOT_EQUAL;
    if (strcmp(name, "OP_EQUAL") == 0 || strcmp(name, "EQUAL") == 0)
        return OP_EQUAL;
    if (strcmp(name, "MOD_I32") == 0)
        return OP_MOD;
    if (strcmp(name, "OP_AND") == 0)
        return OP_AND;
    if (strcmp(name, "OP_OR") == 0)
        return OP_OR;
    if (strcmp(name, "SIN_DEG") == 0)
        return OP_SIN_DEG;
    if (strcmp(name, "COS_DEG") == 0)
        return OP_COS_DEG;
    if (strcmp(name, "TAN_DEG") == 0)
        return OP_TAN_DEG;
    if (strcmp(name, "ABS") == 0)
        return OP_ABS;
    if (strcmp(name, "SQRT") == 0)
        return OP_SQRT;
    if (strcmp(name, "ATAN2") == 0)
        return OP_ATAN2;
    if (strcmp(name, "FLOOR") == 0)
        return OP_FLOOR;
    if (strcmp(name, "CEIL") == 0)
        return OP_CEIL;
    if (strcmp(name, "MIN") == 0)
        return OP_MIN;
    if (strcmp(name, "MAX") == 0)
        return OP_MAX;
    if (strcmp(name, "ROUND") == 0)
        return OP_ROUND;
    if (strcmp(name, "DEREF") == 0) return OP_DEREF;
    if (strcmp(name, "SET_INPUT_TYPE") == 0) return OP_SET_INPUT_TYPE;
    if (strcmp(name, "READ_INPUT") == 0) return OP_READ_INPUT;
    if (strcmp(name, "WAIT_FOR_ANGLE") == 0) return OP_WAIT_FOR_ANGLE;
    if (strcmp(name, "WAIT_FOR_COUNTS") == 0) return OP_WAIT_FOR_COUNTS;
    if (strcmp(name, "JOG") == 0) return OP_JOG;
    if (strcmp(name, "SET_GEAR_MASTER") == 0) return OP_SET_GEAR_MASTER;
    if (strcmp(name, "SET_GEAR_RATIO") == 0) return OP_SET_GEAR_RATIO;
    if (strcmp(name, "SET_GEAR_BLEND") == 0) return OP_SET_GEAR_BLEND;
    if (strcmp(name, "MOVE_ABS") == 0 || strcmp(name, "MOVE_ABSOLUTE") == 0) return OP_MOVE_ABS;
    if (strcmp(name, "ERA") == 0) return OP_ERA;
    if (strcmp(name, "PARAM") == 0) return OP_PARAM;
    if (strcmp(name, "GOSUB") == 0) return OP_GOSUB;
    if (strcmp(name, "RETURN") == 0) return OP_RETURN;
    if (strcmp(name, "ENDFUNC") == 0) return OP_ENDFUNC;
    return OP_END;
}

static int32_t parse_operand(typeton_runtime_t* rt, const char* token) {
    if (!token || token[0] == '\0') {
        return 0;
    }
    if (token[0] == '&') {
        return (int32_t)(PTR_REF_FLAG | (uint32_t)atoi(token + 1));
    }
    if (token[0] == '*') {
        return (int32_t)(PTR_DEREF_FLAG | (uint32_t)atoi(token + 1));
    }
    if (strncmp(token, "ADDR:", 5) == 0) {
        return (int32_t)(ADDR_LITERAL_FLAG | (uint32_t)atoi(token + 5));
    }
    if (strncmp(token, "STR:", 4) == 0) {
        return register_string_literal(rt, token + 4);
    }
    if (strpbrk(token, ".eE") != NULL) {
        char* end = NULL;
        float floatValue = strtof(token, &end);
        if (end && *end == '\0') {
            return register_float_literal(rt, floatValue);
        }
    }
    return atoi(token);
}

static int load_quads(typeton_runtime_t* rt, const char* path) {
    FILE* fp = fopen(path, "r");
    if (!fp) {
        fprintf(stderr, "Unable to open quad file: %s\n", path);
        return -1;
    }

    char token[64];
    char leftStr[512];
    char rightStr[512];
    char resStr[512];
    int quad_idx = 0;
    char line[2048];

    while (fgets(line, sizeof(line), fp)) {
        if (line[0] == '\n' || line[0] == '#') {
            continue;
        }

        int parts =
            sscanf(line, "%63s %511s %511s %511s", token, leftStr, rightStr, resStr);
        if (parts < 2) {
            fprintf(stderr, "Skipping line (parts %d): %s", parts, line);
            continue;
        }

        if (quad_idx >= MAX_QUADS) {
            break;
        }

        rt->quads[quad_idx].operation = map_operation(token);
        rt->quads[quad_idx].left_address = parse_operand(rt, leftStr);
        rt->quads[quad_idx].right_address = parse_operand(rt, rightStr);
        rt->quads[quad_idx].result_address = parse_operand(rt, resStr);
        quad_idx++;
    }

    fclose(fp);
    rt->quad_count = quad_idx;
    return 0;
}

int main(int argc, char** argv) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <quad_file>\n", argv[0]);
        return 1;
    }

    typeton_runtime_t runtime;
    typeton_runtime_init(&runtime);

    if (load_quads(&runtime, argv[1]) != 0) {
        return 1;
    }

    printf("Running C runtime with %u quads...\n", runtime.quad_count);
    struct timespec start, end;
    clock_gettime(CLOCK_MONOTONIC, &start);
    typeton_run(&runtime);
    clock_gettime(CLOCK_MONOTONIC, &end);
    const double duration_us =
        (double)(end.tv_sec - start.tv_sec) * 1e6 + (double)(end.tv_nsec - start.tv_nsec) / 1e3;
    printf("C runtime finished (%.3f µs).\n", duration_us);
    return 0;
}

void motion_move_abs(int axis, float position) { (void)axis; (void)position; }
void motion_move_rel(int axis, float distance) { (void)axis; (void)distance; }
void motion_home(int axis) { (void)axis; }
float motion_get_position(int axis) { (void)axis; return 0.0f; }
void motion_set_position(int axis, float position) { (void)axis; (void)position; }
void motion_set_velocity(int axis, float velocity) { (void)axis; (void)velocity; }
void motion_set_acceleration(int axis, float acceleration) { (void)axis; (void)acceleration; }
void motion_wait_move(int axis) { (void)axis; }
void motion_enable_motor(int axis) { (void)axis; }
void motion_disable_motor(int axis) { (void)axis; }
float motion_get_encoder_angle(int axis) { (void)axis; return 0.0f; }
float motion_get_encoder_counts(int axis) { (void)axis; return 0.0f; }
void motion_wait_for_angle(int axis, float target) { (void)axis; (void)target; }
void motion_wait_for_counts(int axis, int32_t target) { (void)axis; (void)target; }
void motion_jog(int axis, float distance) { (void)axis; (void)distance; }
void motion_move_absolute(int axis, float position) { (void)axis; (void)position; }
void motion_set_gear_master(int axis, int32_t level) { (void)axis; (void)level; }
void motion_set_gear_ratio(int axis, float ratio) { (void)axis; (void)ratio; }
void motion_set_gear_blend(int axis, float blend, bool use_master) { (void)axis; (void)blend; (void)use_master; }
void motion_encoder_method(int axis, int method, int32_t argument) {
    (void)axis;
    (void)method;
    (void)argument;
}
