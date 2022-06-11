from cmath import inf
from distutils.errors import CompileError
import sys

import jsonpickle

from src.compiler.code_generator.code_generator import CodeGenerator
from src.compiler.code_generator.expression import PRIMITIVES
from src.compiler.code_generator.function import FunctionCallData
from src.compiler.code_generator.type import Dimension, FunctionTableEvents, Operand, OperationType, Quad
from src.compiler.errors import CompilerError, CompilerEvent
from src.compiler.lexer import lex, tokens
from src.compiler.ply import yacc
from src.compiler.stack_allocator.helpers import Layers
from src.compiler.stack_allocator.index import StackAllocator
from src.compiler.stack_allocator.types import ValueType
from .output import OutputFile
from .symbol_table import SymbolTable
from .symbol_table.class_table import ClassTable
from ..utils.observer import Subscriber, Event, Publisher


class Compiler(Publisher, Subscriber):
    def __init__(self):
        super().__init__()

        self._allocator = StackAllocator()
        self._symbol_table = SymbolTable()

        self.tokens = tokens
        self.lexer = lex
        self._parser = yacc.yacc(module=self, start="program", debug=True)
        self._code_generator = CodeGenerator(
            self._allocator, self._symbol_table.class_table.classes)

        # subscribe to expression code generator
        expressions = self._code_generator.expression_actions
        expressions.add_subscriber(self._allocator, {})

        # subscribe to array actions
        array_actions = self._code_generator.array_actions
        array_actions.add_subscriber(self, {})

        # subscribe to builtin actions
        built_in_actions = self._code_generator.builtin_actions
        built_in_actions.add_subscriber(self, {})

        # subscribe to compiler events
        self.add_subscriber(self._code_generator.function_actions, {})

        # subscribe compiler to error messages
        self._allocator.add_subscriber(self, {})
        self._code_generator.expression_actions.add_subscriber(self, {})
        self._symbol_table.class_table.add_subscriber(self, {})
        self._symbol_table.constant_table.add_subscriber(self, {})
        self._code_generator.object_actions.add_subscriber(self, {})

        self.init_current_function_table()

        self.syntax_error = None

    # handle subscribed events (semantic errors)
    def handle_event(self, event):
        if event.type_ is CompilerEvent.STOP_COMPILE:
            self.p_error(event.payload)

    def remove_temp_function_subs(self):
        object_actions = self._code_generator.object_actions
        object_actions.remove_temp_subscribers()

        # subscribe to expression code generator
        expressions = self._code_generator.expression_actions
        expressions.remove_temp_subscribers()

        # subscribe to array actions
        array_actions = self._code_generator.array_actions
        array_actions.remove_temp_subscribers()

        # subscribe to builtin actions
        built_in_actions = self._code_generator.builtin_actions
        built_in_actions.remove_temp_subscribers()

        self._allocator.remove_temp_subscribers()
        self._symbol_table.function_table.delete_subscribers()

    def init_current_function_table(self):
        self.remove_temp_function_subs()

        object_actions = self._code_generator.object_actions
        object_actions.add_temp_subscriber(
            self._symbol_table.function_table)

        # subscribe to expression code generator
        expressions = self._code_generator.expression_actions
        expressions.add_temp_subscriber(
            self._symbol_table.function_table)

        # subscribe to array actions
        array_actions = self._code_generator.array_actions
        array_actions.add_temp_subscriber(
            self._symbol_table.function_table)

        # subscribe to builtin actions
        built_in_actions = self._code_generator.builtin_actions
        built_in_actions.add_temp_subscriber(
            self._symbol_table.function_table)

        self._symbol_table.function_table.add_subscribers(
            [
                self._allocator,
                self._code_generator.function_actions,
                self._code_generator.expression_actions,
                self
            ])

        self.add_temp_subscriber(self._symbol_table.function_table)

        self._allocator.add_temp_subscriber(
            self._symbol_table.function_table)

    def compile(self, data: str, debug=False):
        """
        Compiles a program.

        :param data: program to be compiled
        :param debug: shows compiled programs inner workings if true
        :return: output json file (ready to be executed by the Virtual Machine)
        """

        self._parser.parse(data, self.lexer, debug=False)

        if self._symbol_table.function_table.function_data_table.get("main") is None:
            self.handle_event(Event(CompilerEvent.STOP_COMPILE,
                              CompilerError("Main function is required")))

        if debug:
            self._display_tables()
            self._display_quads()
            self._symbol_table.class_table.display()

        return self._make_json()

    def _make_json(self):
        """ Makes output json with all the necessary data for execution in the Virtual Machine"""
        constant_table = self._symbol_table.constant_table
        quads = self._code_generator.get_output_quads()
        function_data = self._symbol_table.global_function_table.get_output_function_data()
        class_data = self._symbol_table.class_table.get_output_class_data()

        output = OutputFile(constant_table, function_data,
                            quads, self._allocator._segments[Layers.CONSTANT.value].end+1, class_data)
        return jsonpickle.encode(output)

    def _display_tables(self):
        self._symbol_table.function_table.display(debug=True)
        self._symbol_table.constant_table.display()

    def _display_quads(self):
        self._code_generator.display()

    # -- START -----------------------

    def p_program(self, p):
        """
        program : program1 program
                | program1
        """

    def p_program1(self, p):
        """
        program1 : body more_lines
                 | body
        """

    def p_more_lines(self, p):
        """
        more_lines : NLINE more_lines
                 | NLINE
        """

    def p_body(self, p):
        """
        body : class
             | function
             | declaration
        """

    # -- TOP LEVEL -----------------------

    def p_class(self, p):
        """
        class : CLASS ID add_class class_block end_class

        """
        #         | CLASS ID COLON ID class_block

    def p_add_class(self, p):
        """
        add_class :
        """
        self._symbol_table.class_table.add_class(p[-1])
        self._symbol_table.start_class()
        self.init_current_function_table()

    def p_end_class(self, p):
        """
        end_class :
        """
        self.remove_temp_function_subs()
        self._symbol_table.end_class()
        self.init_current_function_table()

    def p_function_return_type(self, p):
        """
        function_return_type : primitive
                             |
        """

    def p_function(self, p):
        """
        function : FUNC ID add_function params ARROW function_return_type init_block end_function
        """

    def p_declaration(self, p):
        """
        declaration : VAR ID add_variable COLON type
        """

    def p_class_declaration(self, p):
        """
        class_declaration : ID add_class_variable COLON class_type
        """

    def p_class_type(self, p):
        """
        class_type : INT set_class_variable_type
                   | BOOL set_class_variable_type
                   | FLOAT set_class_variable_type
                   | STRING set_class_variable_type
                   | ID set_class_object_type
        """

    def p_add_class_variable(self, p):
        """
        add_class_variable :
        """
        valid = self._symbol_table.class_table.current_class.add_variable(
            p[-1])
        if not valid:
            self.handle_event(Event(CompilerEvent.STOP_COMPILE,
                                    CompilerError(f"Class property {p[-1]} redeclared")))

    def p_set_class_object_type(self, p):
        """
        set_class_object_type :
        """
        class_data = self._symbol_table.class_table.classes[p[-1]]
        if class_data is None:
            self.handle_event(Event(CompilerEvent.STOP_COMPILE,
                              CompilerError("Class '" + p[-1] + "' not found")))

        self._symbol_table.class_table.current_class.set_type(
            ValueType.POINTER, p[-1])

    def p_set_class_variable_type(self, p):
        """
        set_class_variable_type :
        """
        type_ = ValueType(p[-1])
        self._symbol_table.class_table.current_class.set_type(type_, None)

    # -- PARAMS -----------------------

    def p_params(self, p):
        """
        params : LPAREN params1 RPAREN
               | LPAREN RPAREN
        """

    def p_params1(self, p):
        """
        params1 : param
                | param COMMA params1
        """

    def p_param(self, p):
        """
        param : ID add_param COLON primitive
        """

    # -- TYPE -----------------------

    def p_type(self, p):
        """
        type :  primitive
             | primitive array allocate_dimensions
             | ID set_type
        """

    def p_primitive(self, p):
        """
        primitive : INT     set_type
                  | FLOAT   set_type
                  | STRING  set_type
                  | BOOL    set_type
        """

    def p_array(self, p):
        """
        array : LBRACK INTLIT RBRACK add_dimension
              | LBRACK INTLIT RBRACK add_dimension array
        """

    # -- BLOCKS -----------------------

    def p_class_block(self, p):
        """
        class_block : LCURLY class_block1 RCURLY
        """

    def p_class_block1(self, p):
        """
        class_block1 : class_block2
                     | class_block3 class_block2
        """

    def p_class_block2(self, p):
        """
        class_block2 : NLINE class_block1
                     | NLINE
        """

    def p_class_block3(self, p):
        """
        class_block3 :  class_declaration
                        | function
        """

        # removed function for now

    def p_init_block(self, p):
        """
        init_block : LCURLY check_function_type init_block1 RCURLY
        """

    def p_check_function_type(self, p):
        """
        check_function_type :
        """
        if self._symbol_table.function_table.current_function.is_pending_type():
            print('pending type')
            self._symbol_table.function_table.current_function.set_type(
                "Void")

    def p_init_block1(self, p):
        """
        init_block1 : init_block2
                    | init_block3 init_block2
        """

    def p_init_block2(self, p):
        """
        init_block2 : NLINE init_block1
                    | NLINE
        """

    def p_init_block3(self, p):
        """
        init_block3 : statement
                    | declaration
        """

    def p_block(self, p):
        """
        block : LCURLY block1 RCURLY
        """

    def p_block1(self, p):
        """
        block1 : block2
               | statement block2
        """

    def p_block2(self, p):
        """
        block2 : NLINE block1
               | NLINE
        """

    # -- STATEMENTS -----------------------

    def p_statement(self, p):
        """
        statement : display
                  | if
                  | while
                  | input
                  | assign
                  | call
                  | return
                  | constant_object
                  | delete_heap_memory
        """

    def p_delete_heap_memory(self, p):
        """
        delete_heap_memory : DELETE ID
        """
        var = self._symbol_table.function_table.get_variable(p[2])
        self._code_generator.object_actions.free_heap_memory(var)

    def p_while(self, p):
        """
        while : WHILE LPAREN save_loop_start bool_expr set_loop_condition RPAREN block fill_and_reset_loop
        """

    def p_input(self, p):
        """
        input : INPUT push_operator LPAREN STRINGLIT add_constant print_prompt RPAREN execute_builtin_call
        """

    def p_display(self, p):
        """
        display : PRINT push_operator LPAREN bool_expr RPAREN execute_builtin_call
        """

    def p_return(self, p):
        """
        return : RETURN
               | RETURN push_operator bool_expr set_return
        """

    def p_assign(self, p):
        """
        assign : assign1 ASSIGN other_assign
               | assign1 assign2 bool_expr execute_priority_0
               | assign1 assign2 input execute_priority_0

        """

    def p_resolve_object_(self, p):
        """
        resolve_object :
        """
        self._code_generator.object_actions.resolve()
        self.p_push_operator(')')

    def p_resolve_get_object(self, p):
        """
        resolve_get_object :
        """
        self._code_generator.object_actions.resolve_get()
        self.p_push_operator(')')

    def p_other_assing(self, p):
        """
        other_assign : push_variable_class new_object verify_and_allocate_object
        """

    def p_print_prompt(self, p):
        """
        print_prompt :
        """
        self._code_generator.push_operator(OperationType.PRINT)
        self._code_generator.execute_builtin_call()

    def p_new_object(self, p):
        """
        new_object : NEW ID verify_class_exists LPAREN RPAREN
        """

    def p_verify_and_allocate_object(self, p):
        """
        verify_and_allocate_object :
        """

        self._code_generator.object_actions.allocate_heap()

    def p_push_variable_class(self, p):
        """
        push_variable_class :
        """
        operand: Operand = self._code_generator.peak_operand()
        var = self._symbol_table.function_table.get_id(
            address=operand.address)

        if var.class_id is None:
            self.handle_event(
                Event(CompileError, f'Cannot assign object {p[-1]} to primitive variable'))

        class_data = self._symbol_table.class_table.get_class(var.class_id)
        self._code_generator.object_actions.push_class_data(class_data)
        self._code_generator.object_actions.push_variable(var)

    def p_verify_class_exists(self, p):
        """
        verify_class_exists :
        """
        class_data = self._symbol_table.class_table.get_class(p[-1])
        if class_data is None:
            self.handle_event(
                Event(CompileError, f'Class {p[-1]} does not exist'))

        self._code_generator.object_actions.push_class_data(class_data)

    #
    # def p_push_class_variable(self, p):
    #     """
    #     push_class_variable :
    #     """
    #     self._code_generator.object_actions.push_variable(p[-1])

    # def p_push_class_id(self, p):
    #     """
    #     push_class_id :
    #     """
    #
    #     # verify
    #     data = self._symbol_table.class_table.classes[p[-1]]
    #     if data is None:
    #         print('error')
    #         return
    #
    #     self._code_generator.object_actions.push_class_data(data)

    def p_assign1(self, p):
        """
        assign1 : ID push_variable
                | call_array
                | constant_object resolve_object

        """

    def p_constant_object(self, p):
        """
        constant_object : ID push_object PERIOD object_property
        """

    def p_push_object(self, p):
        """
        push_object :
        """
        self.p_push_operator('(')

        print(p[-1])

        variable = self._symbol_table.function_table.get_variable(p[-1])

        if variable is None or variable.class_id is None:
            # check previous context if variable not found locally
            prev_context = self._symbol_table.current_function_table[-2]
            variable = prev_context.get_variable(p[-1])
            if variable is None or variable.class_id is None:
                self.handle_event(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                    f'Variable {p[-1]} not found in {self._symbol_table.function_table.current_function.id_}')))

        self._code_generator.object_actions.property_parent = variable
        self._code_generator.object_actions.push_object(variable)

    def p_assign2(self, p):  # TODO add rest to semantic cube
        """
        assign2 : ASSIGN push_operator
                | PASSIGN push_operator
                | LASSIGN push_operator
                | MASSIGN push_operator
                | DASSIGN push_operator
        """

    def p_call_array(self, p):
        """
        call_array : ID push_variable push_dimensions call_array1 get_array_pointer
        """

    def p_call_array1(self, p):
        """
        call_array1 : LBRACK expression verify_dimension RBRACK
                    | LBRACK expression verify_dimension RBRACK calculate_dimension call_array1
        """

    def p_calculate_dimension(self, p):
        """
        calculate_dimension :
        """
        self._code_generator.calculate_dimension()

    # Function Call ----------------------------------------------------------------------------------------------------

    # TODO update grammar diagram (added call_body, renamed call1 -> call_parameters
    def p_call(self, p):
        """
        call : ID verify_function_existence  LPAREN gen_are_memory call_parameters RPAREN verify_param_count generate_go_sub
             | ID verify_function_existence  LPAREN gen_are_memory RPAREN verify_param_count generate_go_sub
        """

    def p_call_parameters(self, p):
        """
        call_parameters : bool_expr verify_parameter_signature
              | bool_expr verify_parameter_signature COMMA increment_parameter_count call_parameters
        """

    # Call Actions ----------------------------------------------------------------

    def p_verify_function_existence(self, p):
        """
        verify_function_existence :
        """
        # resolve previous nested objects
        valid_object = self._code_generator.object_actions.resolve_function_object()
        good_table = None

        in_func = False

        if valid_object:
            print("changing to class function")
            in_func = True
            # check if function called by object
            # dont remove it yet
            obj = self._code_generator.object_actions.next_function_object[-1]
            # function table context for specific class
            # self.remove_temp_function_subs()
            self._symbol_table.set_class_functions(obj.class_id)
            # self.init_current_function_table()

        context_stack = self._symbol_table.current_function_table
        count = len(context_stack) - 1

        while count >= 0:
            prev_func_table = context_stack[count]
            print('cjecking table', prev_func_table.current_class)
            exists = prev_func_table.verify_function_exists(p[-1])
            if exists is True:
                good_table = prev_func_table
                break

            count -= 1

        if exists is False:
            self.handle_event(Event(
                CompilerEvent.STOP_COMPILE,
                CompilerError(f'Invalid Function Call: Function with name {p[-1]} does not exist')))

        func_call = FunctionCallData(p[-1])
        func_call.current_class = good_table.current_class
        func_call.parameter_signature = good_table.function_data_table[p[-1]].parameter_signature
        func_call.type_ = good_table.function_data_table[p[-1]].type_

        self._code_generator.function_actions.function_call_stack.append(func_call)

        # if in_func is True:
        #     self._symbol_table.go_back()

    def p_verify_param_count(self, p):
        """
        verify_param_count :
        """
        curr_func: FunctionCallData = self._code_generator.function_actions.function_call_stack[-1]
        param_count = curr_func.parameter_count
        param_signature = curr_func.parameter_signature

        signature_len = len(param_signature)

        print(signature_len)

        if param_count + 1 != signature_len and (signature_len != 0 and param_count == 0):
            self.handle_event(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'Function Call Parameter Mistmatch {param_count} != {signature_len}')))

        print('verified param count')

    def p_generate_go_sub(self, p):
        """
        generate_go_sub :
        """
        # TODO move to function table
        curr_func: FunctionCallData = self._code_generator.function_actions.function_call_stack[-1]
        current_class = curr_func.current_class

        class_id = 'global'
        if current_class is not None:
            class_id = current_class.id_

        self._code_generator.function_actions.generate_go_sub(curr_func.call_id, class_id)
        print('gosubing to', curr_func.call_id)

        # reset

    def p_gen_are_memory(self, p):
        """
        gen_are_memory :
        """

        # func_id = self._symbol_table.function_table.generate_are_memory()
        self.p_push_operator('(')
        # if in class at self param

        curr_func = self._code_generator.function_actions.function_call_stack[-1]
        class_id = "global"
        if curr_func.current_class is not None:
            class_id = curr_func.current_class.id_

        self._code_generator.function_actions.generate_are(curr_func.call_id, class_id)

        # Generate invisible self parameter if class function call
        if self._symbol_table.function_table.current_class is not None:
            print('in class, adding self to function')
            # pop function's object to create a type with that reference

            class_object_stack = self._code_generator.object_actions.next_function_object
            if len(class_object_stack) > 0:
                class_object = class_object_stack.pop()
                nested = self._code_generator.object_actions.nested_stack.pop()
                print(nested)
                self._code_generator.function_actions.add_self_param(class_object, nested)
        # look in all previous contexts

    def p_verify_parameter_signature(self, p):
        """
        verify_parameter_signature :
        """
        # Todo add this into function directory
        current_func: FunctionCallData = self._code_generator.function_actions.function_call_stack[-1]
        param_count = current_func.parameter_count

        if param_count >= len(current_func.parameter_signature):
            self.handle_event(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'Too many parameters for function {current_func.call_id}')))

        param_type_ = current_func.parameter_signature[param_count]
        self._code_generator.function_actions.verify_parameter_type(
            param_type_, param_count)

    def p_increment_parameter_count(self, p):
        """
        increment_parameter_count :
        """
        current_func: FunctionCallData = self._code_generator.function_actions.function_call_stack[-1]
        current_func.parameter_count += 1

    # --------------------------------------------------------------------------------

    # -------------------------------------------------------------------------------------------------------------------

    def p_if(self, p):
        """
        if : if_single
           | if_multiple
        """

    def p_if_single(self, p):  # allow single
        """
        if_single : IF LPAREN bool_expr RPAREN get_conditional block fill_end_single
        """

    def p_if_multiple(self, p):
        """
        if_multiple : IF LPAREN bool_expr RPAREN get_conditional block if_multiple_2
        """

    def p_if_multiple_2(self, p):  # force else at the end, less loop-holes, safer code
        """
        if_multiple_2 : fill_and_goto ELSE if_multiple
                      | fill_and_goto ELSE  block fill_end
        """

    # -- EXPRESSIONS -----------------------

    def p_bool_expr(self, p):
        """
        bool_expr : relational_exp execute_priority_1
                  | relational_exp execute_priority_1 AND push_operator bool_expr
                  | relational_exp execute_priority_1 OR push_operator bool_expr
        """

    # TODO Changed to relation_exp to prevent compiler panic. fix this
    def p_relational_exp(self, p):
        """
        relational_exp : expression execute_priority_2 comp relational_exp
                       | expression execute_priority_2
        """

    def p_expression(self, p):
        """
        expression : term execute_priority_3
                   | term execute_priority_3 PLUS push_operator expression
                   | term execute_priority_3 MINUS push_operator  expression
        """

    def p_term(self, p):
        """
        term : factor execute_priority_4
             | factor execute_priority_4 TIMES push_operator term
             | factor execute_priority_4 DIVIDE push_operator term
        """

    def p_factor(self, p):
        """
        factor : constant
               | LPAREN push_operator bool_expr RPAREN push_operator
        """

    def p_constant(self, p):
        """
        constant : INTLIT    add_constant
                 | FLOATLIT  add_constant
                 | BOOLLIT   add_constant
                 | string
                 | call add_call_operator
                 | call_array
                 | constant2
                 | constant_object resolve_get_object
        """
        self._code_generator.object_actions.set_parse_type(1)

    def p_add_call_operator(self, p):
        """
        add_call_operator :
        """

        curr_func = self._code_generator.function_actions.function_call_stack.pop()

        type_ = curr_func.type_
        address = self._allocator.allocate_address(type_, Layers.TEMPORARY)

        self.broadcast(
            Event(FunctionTableEvents.ADD_TEMP, (type_, address, None)))

        self._code_generator.expression_actions.add_call_assign(address, type_)
        self.p_push_operator(')')

        # change back to global context
        # self._symbol_table.go_back()
        # self.remove_temp_function_subs()

    def p_object_call_operator(self, p):
        """
        object_call_operator :
        """

        # don't resolve object since its a function
        curr_func: FunctionCallData = self._code_generator.function_actions.function_call_stack.pop()

        print('calling op')

        if curr_func.type_ is not ValueType.VOID:
            address = self._allocator.allocate_address(curr_func.type_, Layers.TEMPORARY)

            self.broadcast(
                Event(FunctionTableEvents.ADD_TEMP, (curr_func.type_, address, None)))

            self._code_generator.expression_actions.add_call_assign(address, curr_func.type_)
        self.p_push_operator(')')  # for function call

        # change back to global context
        # self.remove_temp_function_subs()
        self._symbol_table.go_back()
        # self.init_current_function_table()

    def p_constant2(self, p):
        """
        constant2 : ID push_variable
        """

    def p_object_property(self, p):
        """
        object_property : ID push_object_property PERIOD object_property
                        | ID push_object_property
                        | call object_call_operator
        """

    def p_push_object_property(self, p):
        """
        push_object_property :
        """
        self._code_generator.object_actions.push_object_property(p[-1])

    def p_comp(self, p):
        """
        comp : LESS push_operator
             | MORE push_operator
             | EQUALS push_operator
             | NEQUALS push_operator
             | LEQUALS push_operator
             | MEQUALS push_operator
        """

    def p_string(self, p):
        """
        string : string_expr
               | string_expr string
        """

    def p_string_expr(self, p):
        """
        string_expr : STRINGLIT add_constant
                    | BSLASH LPAREN expression RPAREN
        """

    # -- SEMANTIC ACTIONS -----------------------

    def p_add_function(self, p):
        """
        add_function :
        """
        # End global if possible
        self._symbol_table.function_table.end_global()

        self._symbol_table.function_table.add(
            p[-1], self._code_generator.get_next_quad())

        if self._symbol_table.in_class:
            self._symbol_table.function_table.set_self_param(
                self._allocator)

    def p_validate_return(self, p):
        """
        set_return :
        """
        (self._symbol_table.function_table.set_return())

    def p_end_function(self, p):
        """
        end_function :
        """
        self._code_generator.execute_remaining()
        self._symbol_table.function_table.end_function()

    def p_add_constant(self, p):
        """
        add_constant :
        """
        (self._symbol_table.constant_table.add(p[-1], self._allocator))
        (self._code_generator.push_constant(
            p[-1], self._symbol_table.constant_table))

    # def p_set_self_param(self, p):
    #     """
    #     set_self_param :
    #     """
    #     if self._symbol_table.in_class and self._symbol_table.function_table.parameter_count == 0:
    #         self._symbol_table.function_table.add_variable(
    #             "self", is_param=True)
    #         self._symbol_table.function_table.set_type(
    #             "Pointer", self._allocator)

    def p_add_param(self, p):
        """
        add_param :
        """

        self._symbol_table.function_table.add_variable(
            p[-1], is_param=True)

    def p_add_variable(self, p):
        """
        add_variable :
        """
        self._symbol_table.function_table.add_variable(
            p[-1], is_param=False)

    def p_add_dimension(self, p):
        """
        add_dimension :
        """
        self._symbol_table.constant_table.add(p[-2], self._allocator)
        self._symbol_table.function_table.add_dimension(p[-2])

    def p_allocate_dimensions(self, p):
        """
        allocate_dimensions :
        """
        size = self._symbol_table.function_table.allocate_dimensions(
            self._allocator, self._symbol_table.constant_table)
        var = self._symbol_table.function_table.current_function.current_variable
        var.array_type = var.type_
        self._symbol_table.function_table.set_type(
            "Pointer", self._allocator)
        self._code_generator.array_actions.initialize_array(size, var)

    def p_set_type(self, p):
        """
        set_type :
        """
        self._symbol_table.function_table.set_type(
            p[-1], self._allocator)
    # used to check on stack and execute quad operations

    def p_execute_priority_0(self, p):
        """
        execute_priority_0 :
        """
        (self._code_generator.execute_if_possible(0))

    # used to check on stack and execute quad operations
    def p_execute_builtin_call(self, p):
        """
        execute_builtin_call :
        """
        (self._code_generator.execute_builtin_call())

    def p_execute_priority_1(self, p):
        """
        execute_priority_1 :
        """
        (self._code_generator.execute_if_possible(1))

    def p_execute_priority_2(self, p):
        """
        execute_priority_2 :
        """

        (self._code_generator.execute_if_possible(2))

    def p_execute_priority_3(self, p):
        """
        execute_priority_3 :
        """
        (self._code_generator.execute_if_possible(3))

    def p_execute_priority_4(self, p):
        """
        execute_priority_4 :
        """
        (self._code_generator.execute_if_possible(4))

    def p_get_conditional(self, p):
        """
        get_conditional :
        """
        self._code_generator.get_conditional()

    def p_fill_and_goto(self, p):
        """
        fill_and_goto :
        """
        self._code_generator.fill_and_goto()

    def p_fill_end(self, p):
        """
        fill_end :
        """
        self._code_generator.fill_end()

    def p_fill_end_single(self, p):
        """
        fill_end_single :
        """
        self._code_generator.fill_end_single()

    def p_save_loop_start(self, p):
        """
        save_loop_start :
        """
        self._code_generator.save_loop_start()

    def p_set_loop_condition(self, p):
        """
        set_loop_condition :
        """
        self._code_generator.set_loop_condition()

    def p_fill_and_reset_loop(self, p):
        """
        fill_and_reset_loop :
        """
        self._code_generator.fill_and_reset_loop()

    def p_push_operator(self, p):
        """
        push_operator :
        """
        self._code_generator.push_operator(p[-1])

    def p_push_variable(self, p):
        """
        push_variable :
        """
        variable = self._symbol_table.function_table.get_variable(
            p[-1], self._symbol_table.current_function_table)

        print(p[-1])
        self._code_generator.push_variable(
            p[-1], variable.type_, variable.address_, variable.class_id)

    def p_push_dimensions(self, p):
        """
        push_dimensions :
        """

        self.p_push_operator('(')
        # TODO: Clean this mess
        operand = self._code_generator.peak_operand()
        variable = self._symbol_table.function_table.get_id(
            operand.address)

        dimensions = []
        for dim_data in reversed(variable.dim_data_list):
            size = self._symbol_table.constant_table.get_from_value(
                dim_data.size)
            m = self._symbol_table.constant_table.get_from_value(dim_data.m)

            if m is None:
                dimension = Dimension(size_address=size.address)
            else:
                dimension = Dimension(
                    size_address=size.address, m_address=m.address)

            dimensions.append(dimension)

        self._code_generator.push_dimensions(dimensions)

    def p_verify_dimension(self, p):
        """
        verify_dimension :
        """
        self._code_generator.verify_dimension()

    def p_get_array_pointer(self, p):
        """
        get_array_pointer :
        """
        self._code_generator.get_array_pointer(
            self._symbol_table.function_table)
        self.p_push_operator(')')

    # -- ERROR -----------------------

    def p_error(self, p):
        # self.display_debug()
        error_message = 'Syntax error'
        if p:

            if type(p) is CompilerError:
                p.trace = self._symbol_table.function_table.current_trace()
                p.print()
            else:
                error_message += f': at token {p.type} ({p.value}) on line {p.lineno}'
                print(error_message)
        else:
            error_message += f': end of file'
            self.syntax_error = error_message
            print(error_message)
        sys.exit()

    def display_debug(self):
        self._symbol_table.constant_table.display()
        self._code_generator.display()
