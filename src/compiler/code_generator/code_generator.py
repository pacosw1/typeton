from typing import Dict, List

import jsonpickle

from src.compiler.code_generator.array import ArrayActions
from src.compiler.code_generator.built_in import Builtin_Function_Actions
from src.compiler.code_generator.conditional import ConditionalActions
from src.compiler.code_generator.expression import Operand, Operator, ExpressionActions
from src.compiler.code_generator.function import FunctionActions
from src.compiler.code_generator.loop import LoopActions
from src.compiler.code_generator.object import ObjectActions
from src.compiler.code_generator.type import Quad
from src.compiler.stack_allocator.index import StackAllocator
from src.compiler.stack_allocator.types import ValueType
from src.utils.debug import Debug
from src.utils.display import make_table, TableOptions


class CodeGenerator:
    def __init__(self, stack_allocator: StackAllocator, classes):
        self.__operand_address_stack: List[Operand] = []
        self.__operator_stack: List[Operator] = []
        self.__quad_list: List[Quad] = []
        self.pointer_types: Dict[str, ValueType] = {}

        self.scheduler = stack_allocator

        self.object_actions = ObjectActions(
            self.__quad_list,
            self.__operand_address_stack,
            self.scheduler,
            self.pointer_types,
            classes
        )

        self.conditional_actions = ConditionalActions(self.__quad_list)

        self.array_actions = ArrayActions(
            self.__quad_list,
            self.__operand_address_stack,
            pointer_types=self.pointer_types
        )
        self.function_actions = FunctionActions(
            self.__quad_list,
            self.__operand_address_stack
        )
        self.loop_actions = LoopActions(self.__quad_list)
        self.builtin_actions = Builtin_Function_Actions(self.__quad_list)

        self.expression_actions = ExpressionActions(
            self.__quad_list,
            self.__operand_address_stack,
            self.__operator_stack,
            self.pointer_types)

    # Expressions -------------------------------------------

    def print_operand_stack(self):
        a = Debug.map()
        r = "Operands: "
        for operand in self.__operand_address_stack:
            r += a[operand.address] + " "
        print(r)
        print()

    def print_operator_stack(self):
        r = "Operators: "
        for operator in self.__operator_stack:
            r += operator.type_.value + " "
        print(r)

    def get_next_quad(self):
        return len(self.__quad_list)

    def push_variable(self, id_, type_, address, class_id):
        self.expression_actions.push_variable(id_, type_, address, class_id)

    def push_operator(self, operator):
        self.expression_actions.push_operator(operator, self.scheduler)

    def execute_if_possible(self, priority):
        self.expression_actions.execute_if_possible(priority, self.scheduler)

    def push_constant(self, value, constant_table):
        self.expression_actions.push_constant(value, constant_table)

    def execute_remaining(self):
        self.expression_actions.execute_remaining(self.scheduler)

    # -------------------------------------------------------

    # Arrays -------------------------------------------

    def push_dimensions(self, addresses):
        self.array_actions.push_dimensions(addresses)

    def verify_dimension(self):
        self.array_actions.verify_dimensions()

    def calculate_dimension(self):
        self.array_actions.calculate_dimension(self.scheduler)

    def get_array_pointer(self, function_name):
        self.array_actions.get_array_pointer(self.scheduler, function_name)

    # -------------------------------------------------------

    # Conditionals -------------------------------------------

    def fill_end_single(self):
        return self.conditional_actions.fill_end_single()

    def get_conditional(self):
        return self.conditional_actions.get_conditional(self.__operand_address_stack)

    def fill_and_goto(self):
        return self.conditional_actions.fill_and_goto()

    def fill_end(self):
        self.conditional_actions.fill_end()

    # -------------------------------------------------------

    # Loop -------------------------------------------

    def save_loop_start(self):
        self.loop_actions.save_loop_start()

    def set_loop_condition(self):
        self.loop_actions.set_loop_condition(self.__operand_address_stack)

    def fill_and_reset_loop(self):
        return self.loop_actions.fill_and_reset_loop()

    # -------------------------------------------------------

    # Helpers

    def peak_operand(self):
        return self.__operand_address_stack[-1]

    def display(self):
        address_map = Debug.map()
        address_map = {}
        table = make_table("Quadruples",
                           ["#", "Operator", "Left", "Right", "Result"],
                           map(lambda quad:
                               [
                                   '{:^10}'.format(quad[0]),
                                   '{:^10}'.format(quad[1].operation.value),
                                   quad[1].left_address,
                                   quad[1].right_address,
                                   quad[1].result_address

                               ], enumerate(self.__quad_list)),
                           options=TableOptions(20, 20)
                           )
        print(table)

    def __push_quad(self, quad: Quad):
        self.__quad_list.append(quad)

    def execute_builtin_call(self):
        self.builtin_actions.execute_call(self.__operator_stack, self.__operand_address_stack, self.scheduler)

    def get_output_quads(self):
        """ Returns quads list of types [str, str, str, str] used by the output file """

        return jsonpickle.encode(self.__quad_list)
