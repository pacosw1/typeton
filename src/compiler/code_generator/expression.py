from enum import Enum
from operator import le
from re import L
from typing import List

from src.compiler.stack_allocator.index import StackAllocator
from src.compiler.stack_allocator.helpers import Layers
from src.compiler.stack_allocator.types import ValueType
from src.compiler.code_generator.type import Operand, Operator, FunctionTableEvents
from src.compiler.code_generator.type import Quad, OperationType
from src.compiler.errors import CompilerError, CompilerEvent
from src.compiler.symbol_table.constant_table.constant_table import ConstantTable
from src.compiler.symbol_table.function_table.function_table import PRIMITIVE_TYPES
from src.compiler.validation.type_check import type_check as check_type
from src.utils.debug import Debug
from src.utils.observer import Publisher, Event, Subscriber


SHORTHAND = {
    OperationType.DASSIGN,
    OperationType.LASSIGN,
    OperationType.MASSIGN,
    OperationType.PASSIGN
}


PRIMITIVES = {ValueType.INT, ValueType.FLOAT,
              ValueType.STRING, ValueType.BOOL}


class ExpressionActions(Publisher, Subscriber):
    def __init__(self, quad_list, operands, operators, pointer_types):
        super().__init__()
        self.pointer_types = pointer_types
        self.__operand_address_stack: List[Operand] = operands  # stores the
        self.quad_list: List[Quad] = quad_list
        # ed virtual address, not actual value
        self.__operator_stack: List[Operator] = operators
        # operators indexed before this value do not exist
        self.parenthesis_start = [0]

    def handle_event(self, event: Event):
        if event.type_ is CompilerEvent.SET_RETURN:
            self.__execute_function_return(event.payload)

    def push_variable(self, id_, type_, address, class_id):
        if address is None:
            return CompilerError(f'Variable "{id_}" not found')

        operand = Operand(type_, address, class_id)
        self.__operand_address_stack.append(operand)

    def get_operands(self):
        return self.__operand_address_stack

    def execute_if_possible(self, priority, stack_allocator: StackAllocator):
        last_operator: Operator = self.__peek_operators()

        if last_operator is not None and last_operator.priority == priority:
            if priority == 0:
                if last_operator.type_ in SHORTHAND:
                    return self.execute_shorthand_assign(stack_allocator)
                return self.__execute_assign()
            return self.__execute_arithmetic(stack_allocator)

    def push_operator(self, operator, stack_allocator: StackAllocator):
        type_ = OperationType(operator)
        priority = 0

        if type_ is {OperationType.ASSIGN}:
            priority = 0
        elif type_ in {OperationType.AND, OperationType.OR}:
            priority = 1
        elif type_ in {OperationType.GREAT_THAN,
                       OperationType.EQUAL,
                       OperationType.LESS_THAN,
                       OperationType.NOT_EQUAL,
                       OperationType.LESS_EQUAL,
                       OperationType.GREAT_EQUAL}:
            priority = 2
        elif type_ in {OperationType.ADD, OperationType.SUBTRACT}:
            priority = 3

        elif type_ in {OperationType.MULTIPLY, OperationType.DIVIDE}:
            priority = 4

        operator = Operator(priority, type_)

        is_parenthesis = self.__handle_parenthesis(operator, stack_allocator)

        if not is_parenthesis:
            self.__operator_stack.append(operator)

    def execute_remaining(self, scheduler: StackAllocator):
        while len(self.__operator_stack) > self.parenthesis_start[-1] and len(self.__operand_address_stack) > 2:
            self.__execute_arithmetic(scheduler)

    def push_constant(self, value, constant_table: ConstantTable):
        constant = constant_table.get_from_value(value)
        operand = Operand(constant.type_, constant.address)
        self.__operand_address_stack.append(operand)

    # Helpers
    def __handle_parenthesis(self, operator: Operator, scheduler: StackAllocator):
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
            self.broadcast(
                Event(
                    CompilerEvent.STOP_COMPILE,
                    CompilerError("Operator Stack empty")
                )
            )

        return self.__operator_stack.pop()

    def next_operand(self):
        if len(self.__operand_address_stack) == 0:
            self.broadcast(
                Event(
                    CompilerEvent.STOP_COMPILE,
                    CompilerError("Operand stack empty")
                )
            )

        return self.__operand_address_stack.pop()

    def __execute_assign(self):
        address_map = Debug.map()

        operator = self.next_operator()

        right = self.next_operand()
        left = self.next_operand()

        right_pointer = self.pointer_types.get(right.address)
        left_pointer = self.pointer_types.get(left.address)

        if right_pointer is not None and type(right_pointer) is not str:
            right.type_ = right_pointer
        if left_pointer is not None and type(left_pointer) is not str:
            left.type_ = left_pointer

        type_match = check_type(operator.type_.value, left.type_.value, right.type_.value)

        if type_match is None:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'{left.type_.value} '
                f'!= '
                f'{right.type_.value} '
                f'({left.type_.value} and {right.type_.value} are not compatible)')))

        # checks
        # Boolean Expressions for Object Checks ---------------------------------------------------------------------------------------

        # left and right are pure objects
        left_is_class = left.class_id is not None and not left.is_class_param
        right_is_class = right.class_id is not None and not right.is_class_param

        # left is primitive param
        left_prim_param = left.class_id is None and left.is_class_param and left.type_ in PRIMITIVES

        # right is primitive or primitive param
        right_prim = right.type_ in PRIMITIVES
        right_prim_param = right.class_id is None and right.is_class_param and right_prim

        # left and right params are both type object
        left_obj_param = left.class_id is not None and left.is_class_param
        right_obj_param = right.class_id is not None and right.is_class_param

        # Object Assignment Possibilities ---------------------------------------------------------------------------------------------

        # possible obj mismatch expression
        pure_err = (left_is_class and right_is_class)
        obj_param_err = (left_obj_param and right_prim_param)
        param_pure_err = left_obj_param and right_is_class

        possible_error = pure_err or obj_param_err or param_pure_err

        if possible_error:
            if left.class_id != right.class_id:
                self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                    f'{left.class_id} '
                    f'!= '
                    f'{right.class_id} '
                )))

        # obj = otherObj
        if left_is_class and right_is_class:

            left.address = f'&{left.address}'
            right.address = f'&{right.address}'

        # obj.param(primitive) = primitive
        elif left_prim_param and right_prim:
            # print('both are primitives', 'get value right and set into *left')
            left.address = f'*{left.address}'

        # obj.param(obj) = obj.param(obj)
        elif left_obj_param and right_obj_param:

            left.address = f'*{left.address}'
            right.address = f'*{right.address}'

        # obj.param(obj) = otherObj
        elif left_obj_param and right_is_class:
            # print('since param set the ref of right obj inside left *value')
            left.address = f'*{left.address}'
            right.address = f'&{right.address}'

        # obj.param(primitive) = obj.param(primitive)
        elif left_prim_param and right_prim_param:
            if left.type_ != right.type_:
                self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                    f'{left.type_} '
                    f'!= '
                    f'{right.type_} '
                )))
            left.address = f'*{left.address}'
            right.address = f'*{right.address}'

        # ----------------------------------------------------------------------------------------------------------------------

        quad = Quad(
            left_address=right.address,
            right_address=None,
            operation=OperationType.ASSIGN,
            result_address=left.address)

        self.quad_list.append(quad)
        # self.broadcast(Event(CompilerEvent.RELEASE_MEM_IF_POSSIBLE, [right.address]))

    def execute_shorthand_assign(self, stack_allocator):
        address_map = Debug.map()
        operator = self.next_operator()

        expression = self.next_operand()
        assignment = self.next_operand()

        right_pointer = self.pointer_types.get(expression.address)
        left_pointer = self.pointer_types.get(assignment.address)

        if right_pointer is not None and type(right_pointer) is not str:
            expression.type_ = right_pointer
        if left_pointer is not None and type(left_pointer) is not str:
            assignment.type_ = left_pointer

        type_match = check_type(
            operator.type_.value,
            assignment.type_.value,
            expression.type_.value
        )

        if type_match is None:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'{address_map[assignment.address]}:'
                f'{assignment.type_.value} '
                f'{operator.type_.value} '
                f'{address_map[expression.address]} '
                f'({assignment.type_.value} and {expression.type_.value} are not compatible)')))

        # address needed to store operation (a += b) = (a + b = temp, a = temp)
        temp_address = stack_allocator.allocate_address(
            ValueType(type_match), Layers.TEMPORARY)
        self.broadcast(
            Event(
                FunctionTableEvents.ADD_TEMP,
                (type_match, temp_address, None)
            )
        )

        operator_type = None

        if operator.type_ is OperationType.PASSIGN:
            operator_type = OperationType.ADD
        elif operator.type_ is OperationType.LASSIGN:
            operator_type = OperationType.SUBTRACT
        elif operator.type_ is OperationType.MASSIGN:
            operator_type = OperationType.MULTIPLY
        elif operator.type_ is OperationType.DASSIGN:
            operator_type = OperationType.DIVIDE
        else:
            self.broadcast(
                Event(
                    CompilerEvent.STOP_COMPILE,
                    CompilerError(f'Invalid shorthand type {operator.type_}')
                )
            )

        temp_quad = Quad(operation=operator_type,
                         left_address=assignment.address,
                         right_address=expression.address,
                         result_address=temp_address)

        # validate pointer assignment
        if assignment.type_ is ValueType.POINTER:
            type_ = self.pointer_types[assignment.address]
            if ValueType(type_match) != type_:
                self.broadcast(
                    Event(
                        CompilerEvent.STOP_COMPILE,
                        CompilerError(f'({type_match} cannot be assigned to {type_.value})')
                    )
                )

        assignment_quad = Quad(
            OperationType.ASSIGN,
            left_address=temp_address,
            result_address=assignment.address
        )

        self.quad_list.append(temp_quad)
        self.quad_list.append(assignment_quad)

    def __execute_function_return(self, type_: ValueType):
        operator = self.next_operator()
        return_expression = self.next_operand()

        if return_expression.type_ is ValueType.POINTER:
            return_expression.type_ = self.pointer_types.get(return_expression.address)
            if return_expression.type_ is None:
                self.broadcast(
                    Event(
                        CompilerEvent.STOP_COMPILE,
                        CompilerError(f'Cannot return a pointer')
                    )
                )

        if return_expression.type_ is not type_:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'Function return type validation failed: '
                f'Should be {type_.value}, but is {return_expression.type_.value} instead')))

        quad = Quad(operation=operator.type_.value,
                    result_address=return_expression.address)
        self.quad_list.append(quad)
        self.quad_list.append(Quad(operation=OperationType.ENDFUNC))

    def add_call_assign(self, address, function_return_type):
        quad = Quad(OperationType.CALL_ASSIGN, result_address=address)
        self.quad_list.append(quad)

        self.broadcast(
            Event(
                FunctionTableEvents.ADD_TEMP, (function_return_type, address, None)
            )
        )

        self.__operand_address_stack.append(Operand(function_return_type, address))

    def __execute_arithmetic(self, stack_allocator: StackAllocator):
        operator = self.next_operator()

        right: Operand = self.next_operand()
        left: Operand = self.next_operand()

        right_pointer = self.pointer_types.get(right.address)
        left_pointer = self.pointer_types.get(left.address)

        if right_pointer is not None and type(right_pointer) is not str:
            right.type_ = right_pointer
        if left_pointer is not None and type(left_pointer) is not str:
            left.type_ = left_pointer

        type_match = check_type(operator.type_.value, left.type_.value, right.type_.value)

        if type_match is None:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'Type Mismatch: cannot perform action: '
                f'{left.type_.value} '
                f'{operator.type_.value} '
                f'{right.type_.value}')))

        result = stack_allocator.allocate_address(ValueType(type_match), Layers.TEMPORARY)
        self.__operand_address_stack.append(Operand(ValueType(type_match), result))

        # temps count towards function total size
        self.broadcast(Event(FunctionTableEvents.ADD_TEMP, (type_match, result, None)))

        if stack_allocator.is_segment(left.address, Layers.TEMPORARY):
            self.broadcast(Event(FunctionTableEvents.ADD_TEMP, (left.type_, left.address, None)))
        if stack_allocator.is_segment(right.address, Layers.TEMPORARY):
            self.broadcast(Event(FunctionTableEvents.ADD_TEMP, (right.type_, right.address, None)))

        quad = (Quad(
            left_address=left.address,
            right_address=right.address,
            operation=operator.type_,  # convert to type for easy identification in vm
            result_address=result))

        self.quad_list.append(quad)

    def __peek_operators(self):
        if len(self.__operator_stack) - 1 < self.parenthesis_start[-1]:
            return None
        return self.__operator_stack[-1]
