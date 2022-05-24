from typing import List

from src.compiler.symbol_table.constant_table.constant_table import ConstantTable
from src.compiler.errors import CompilerError
from src.compiler.validation.type_check import type_check as check_type
from src.compiler.code_generator.type import Quad, OperationType
from src.compiler.code_generator.type import Operand, Operator
from src.utils.debug import Debug
from src.compiler.allocator.allocator import Allocator
from src.compiler.allocator.helpers import Layers
from src.compiler.allocator.types import ValueType


class ExpressionActions:
    def __init__(self, quad_list, operands, operators):
        self.__operand_address_stack: List[Operand] = operands  # stores the
        self.quad_list: List[Quad] = quad_list
        # ed virtual address, not actual value
        self.__operator_stack: List[Operator] = operators
        self.parenthesis_start = [0]  # operators indexed before this value do not exist

    def push_variable(self, id_, type_, address):
        if address is None:
            return CompilerError(f'Variable "{id_}" not found')

        operand = Operand(type_, address)
        self.__operand_address_stack.append(operand)

    def get_operands(self):
        return self.__operand_address_stack

    def execute_if_possible(self, priority, scheduler: Allocator):
        last_operator: Operator = self.__peek_operators()

        if last_operator is not None and last_operator.priority == priority:
            if priority == 0:
                return self.__execute_assign(scheduler)
            return self.__execute_arithmetic(scheduler)

    def push_operator(self, new_operator: Operator, scheduler: Allocator):
        is_parenthesis, errors = self.__handle_parenthesis(new_operator, scheduler)
        if is_parenthesis or errors is not None:
            return errors
        else:
            self.__operator_stack.append(new_operator)

    def execute_remaining(self, scheduler: Allocator):
        errors = []
        while len(self.__operator_stack) > self.parenthesis_start[-1] and len(self.__operand_address_stack) > 2:
            errors.append(self.__execute_arithmetic(scheduler))
        return errors

    def push_constant(self, value, constant_table: ConstantTable):
        constant = constant_table.get(value)
        operand = Operand(constant.type_, constant.address)
        self.__operand_address_stack.append(operand)

    # Helpers
    def __handle_parenthesis(self, operator: Operator, scheduler: Allocator):
        if operator.type_ == OperationType.LPAREN:
            self.parenthesis_start.append(len(self.__operator_stack))
            return True, None
        elif operator.type_ == OperationType.RPAREN:
            errors = self.execute_remaining(scheduler)
            self.parenthesis_start.pop()
            return True, errors
        return False, None

    def __execute_assign(self, scheduler: Allocator):
        address_map = Debug.map()

        operator = self.__operator_stack.pop()
        right = self.__operand_address_stack.pop()
        left = self.__operand_address_stack.pop()

        type_match = check_type(operator.type_.value, left.type_.value, right.type_.value)
        if type_match is None:
            return CompilerError(
                f'{address_map[left.address]}:'
                f'{left.type_.value} '
                f'{operator.type_.value} '
                f'{address_map[right.address]} '
                f'({left.type_.value} and {right.type_.value} are not compatible)')

        quad = Quad(
            left_address=right.address,
            right_address=None,
            operation=OperationType.ASSIGN,
            result_address=left.address)

        self.quad_list.append(quad)

        if not scheduler.is_segment(right.address, Layers.CONSTANT):
            scheduler.release_address(right.address)

    def __execute_arithmetic(self, scheduler: Allocator):
        operator = self.__operator_stack.pop()

        right: Operand = self.__operand_address_stack.pop()
        left: Operand = self.__operand_address_stack.pop()

        address_map = Debug.map()
        type_match = check_type(operator.type_.value, left.type_.value, right.type_.value)

        if type_match is None:
            return CompilerError(
                f'Type Mismatch: cannot perform action: '
                f'{address_map[left.address]} '
                f'{operator.type_.value} '
                f'{address_map[right.address]}')

        result, error = scheduler.allocate_address(ValueType(type_match), Layers.TEMPORARY)
        self.__operand_address_stack.append(Operand(ValueType(type_match), result))

        quad = (Quad(
            left_address=left.address,
            right_address=right.address,
            operation=OperationType(operator.type_.value),  # convert to type for easy identification in vm
            result_address=result))

        self.quad_list.append(quad)

        # Release temp addresses
        if scheduler.is_segment(left.address, Layers.TEMPORARY):
            scheduler.release_address(left.address)
        if scheduler.is_segment(right.address, Layers.TEMPORARY):
            scheduler.release_address(right.address)

    def __peek_operators(self, ):
        if len(self.__operator_stack) - 1 < self.parenthesis_start[-1]:
            return None
        return self.__operator_stack[-1]