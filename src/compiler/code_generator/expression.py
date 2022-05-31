from enum import Enum
from typing import List

from src.compiler.allocator.allocator import Allocator
from src.compiler.allocator.helpers import Layers
from src.compiler.allocator.types import ValueType
from src.compiler.code_generator.type import Operand, Operator
from src.compiler.code_generator.type import Quad, OperationType
from src.compiler.errors import CompilerError, CompilerEvent
from src.compiler.symbol_table.constant_table.constant_table import ConstantTable
from src.compiler.validation.type_check import type_check as check_type
from src.utils.debug import Debug
from src.utils.observer import Publisher, Event, Subscriber


class ExpressionEvents(Enum):
    ADD_TEMP = 0


class ExpressionActions(Publisher, Subscriber):
    def __init__(self, quad_list, operands, operators):
        super().__init__()
        self.__operand_address_stack: List[Operand] = operands  # stores the
        self.quad_list: List[Quad] = quad_list
        # ed virtual address, not actual value
        self.__operator_stack: List[Operator] = operators
        self.parenthesis_start = [0]  # operators indexed before this value do not exist

    def handle_event(self, event: Event):
        if event.type_ is CompilerEvent.SET_RETURN:
            self.__execute_function_return(event.payload)

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
                return self.__execute_assign()
            return self.__execute_arithmetic(scheduler)

    def push_operator(self, operator, scheduler: Allocator):
        type_ = OperationType(operator)
        priority = 0

        if type_ is {OperationType.ASSIGN}:
            priority = 0
        elif type_ in {OperationType.AND, OperationType.OR}:
            priority = 1
        elif type_ in {OperationType.GREAT_THAN,
                       OperationType.EQUAL,
                       OperationType.LESS_THAN,
                       OperationType.LESS_EQUAL,
                       OperationType.GREAT_EQUAL}:
            priority = 2
        elif type_ in {OperationType.ADD, OperationType.SUBTRACT}:
            priority = 3

        elif type_ in {OperationType.MULTIPLY, OperationType.DIVIDE}:
            priority = 4

        operator = Operator(priority, type_)

        is_parenthesis = self.__handle_parenthesis(operator, scheduler)

        if not is_parenthesis:
            self.__operator_stack.append(operator)

    def execute_remaining(self, scheduler: Allocator):
        while len(self.__operator_stack) > self.parenthesis_start[-1] and len(self.__operand_address_stack) > 2:
            self.__execute_arithmetic(scheduler)

    def push_constant(self, value, constant_table: ConstantTable):
        constant = constant_table.get_from_value(value)
        operand = Operand(constant.type_, constant.address)
        self.__operand_address_stack.append(operand)

    # Helpers
    def __handle_parenthesis(self, operator: Operator, scheduler: Allocator):
        if operator.type_ == OperationType.LPAREN:
            self.parenthesis_start.append(len(self.__operator_stack))
            return True
        elif operator.type_ == OperationType.RPAREN:
            self.execute_remaining(scheduler)
            self.parenthesis_start.pop()
            return True
        return False

    def next_operator(self):
        if len(self.__operator_stack) == 0:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError("Operator Stack empty")))
        return self.__operator_stack.pop()

    def next_operand(self):
        if len(self.__operand_address_stack) == 0:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError("Operand stack empty")))
        return self.__operand_address_stack.pop()

    def __execute_assign(self):
        address_map = Debug.map()

        operator = self.next_operator()

        right = self.next_operand()
        left = self.next_operand()

        type_match = check_type(operator.type_.value, left.type_.value, right.type_.value)
        if type_match is None:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'{address_map[left.address]}:'
                f'{left.type_.value} '
                f'{operator.type_.value} '
                f'{address_map[right.address]} '
                f'({left.type_.value} and {right.type_.value} are not compatible)')))

        quad = Quad(
            left_address=right.address,
            right_address=None,
            operation=OperationType.ASSIGN,
            result_address=left.address)

        self.quad_list.append(quad)
        # self.broadcast(Event(CompilerEvent.RELEASE_MEM_IF_POSSIBLE, [right.address]))

    def __execute_function_return(self, type_: ValueType):
        operator = self.next_operator()
        return_expression = self.next_operand()

        if return_expression.type_ is not type_:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'Function return type validation failed: '
                f'Should be {type_.value}, but is {return_expression.type_.value} instead')))

        quad = Quad(operation=operator.type_.value, result_address=return_expression.address)
        self.quad_list.append(quad)
        self.quad_list.append(Quad(operation=OperationType.ENDFUNC))

    def add_call_assign(self, address, function_return_type):
        quad = Quad(OperationType.CALL_ASSIGN, result_address=address)
        self.quad_list.append(quad)

        self.broadcast(Event(ExpressionEvents.ADD_TEMP, (function_return_type, address)))
        self.__operand_address_stack.append(Operand(function_return_type, address))

    def __execute_arithmetic(self, scheduler: Allocator):
        operator = self.next_operator()

        right: Operand = self.next_operand()
        left: Operand = self.next_operand()

        address_map = Debug.map()
        type_match = check_type(operator.type_.value, left.type_.value, right.type_.value)

        if type_match is None:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'Type Mismatch: cannot perform action: '
                f'{address_map[left.address]} '
                f'{operator.type_.value} '
                f'{address_map[right.address]}')))

            # broadcast add variable count to function data

        result = scheduler.allocate_address(ValueType(type_match), Layers.TEMPORARY)
        self.__operand_address_stack.append(Operand(ValueType(type_match), result))

        # temps count towards function total size
        self.broadcast(Event(ExpressionEvents.ADD_TEMP, (type_match, result)))

        if scheduler.is_segment(left.address, Layers.TEMPORARY):
            self.broadcast(Event(ExpressionEvents.ADD_TEMP, (left.type_, left.address)))
        if scheduler.is_segment(right.address, Layers.TEMPORARY):
            self.broadcast(Event(ExpressionEvents.ADD_TEMP, (right.type_, right.address)))

        quad = (Quad(
            left_address=left.address,
            right_address=right.address,
            operation=operator.type_,  # convert to type for easy identification in vm
            result_address=result))

        self.quad_list.append(quad)

        # Release unused addresses
        # self.broadcast(Event(CompilerEvent.RELEASE_MEM_IF_POSSIBLE,
        #                      [left.address, right.address]))

    def __peek_operators(self):
        if len(self.__operator_stack) - 1 < self.parenthesis_start[-1]:
            return None
        return self.__operator_stack[-1]
