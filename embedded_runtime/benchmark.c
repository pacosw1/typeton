/**
 * Benchmark test for Typeton Runtime
 * Tests performance with a loop of arithmetic operations
 */

#include "typeton_runtime.h"
#include <stdio.h>

int main() {
    typeton_runtime_t rt;
    typeton_runtime_init(&rt);
    
    // Benchmark: Loop that does 1000 additions
    // var sum: Int32 = 0;
    // for (i = 0; i < 1000; i++) {
    //     sum = sum + 1;
    // }
    // print(sum);
    
    // Simulated as unrolled loop (since we don't have loops yet)
    // We'll do 100 iterations manually
    
    int quad_idx = 0;
    
    // Initialize sum = 0
    rt.quads[quad_idx].operation = OP_ASSIGN;
    rt.quads[quad_idx].left_address = 0;
    rt.quads[quad_idx].right_address = 0;
    rt.quads[quad_idx].result_address = 1000;
    quad_idx++;
    
    // Unroll 100 iterations of: sum = sum + 1
    for (int i = 0; i < 100; i++) {
        rt.quads[quad_idx].operation = OP_ADD_I32;
        rt.quads[quad_idx].left_address = 1000;  // sum
        rt.quads[quad_idx].right_address = 1;    // literal 1
        rt.quads[quad_idx].result_address = 5000; // temp
        quad_idx++;
        
        rt.quads[quad_idx].operation = OP_ASSIGN;
        rt.quads[quad_idx].left_address = 5000;  // temp
        rt.quads[quad_idx].right_address = 0;
        rt.quads[quad_idx].result_address = 1000; // sum
        quad_idx++;
    }
    
    // Print result
    rt.quads[quad_idx].operation = OP_PRINT;
    rt.quads[quad_idx].left_address = 1000;
    rt.quads[quad_idx].right_address = 0;
    rt.quads[quad_idx].result_address = 0;
    quad_idx++;
    
    // End
    rt.quads[quad_idx].operation = OP_END;
    rt.quads[quad_idx].left_address = 0;
    rt.quads[quad_idx].right_address = 0;
    rt.quads[quad_idx].result_address = 0;
    quad_idx++;
    
    rt.quad_count = quad_idx;
    
    printf("Running Typeton VM benchmark (%d quads)...\n", rt.quad_count);
    typeton_run(&rt);
    printf("Benchmark complete.\n");
    
    return 0;
}
