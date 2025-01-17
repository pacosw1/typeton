from this import s
from typing import List
from unittest import result
from weakref import ref
from src.compiler.code_generator.expression import PRIMITIVES, ExpressionActions
from src.compiler.code_generator.type import FunctionTableEvents, Operand, OperationType, Quad
from src.compiler.errors import CompilerError, CompilerEvent

from src.compiler.stack_allocator.helpers import Layers
from src.compiler.stack_allocator.index import StackAllocator
from src.compiler.stack_allocator.types import ValueType
from src.compiler.symbol_table.class_table import Class
from src.compiler.symbol_table.function_table.variable_table import variable
from src.compiler.symbol_table.function_table.variable_table.variable import Variable
from src.utils.observer import Publisher, Event
from src.virtual_machine.types import pure_address

"""
Conditional semantic actions
"""


class ObjectActions(Publisher):
    def __init__(self, quad_list, operand_list, stack_allocator: StackAllocator, pointer_types, classes):
        super().__init__()
        self.pointer_types = pointer_types
        self.parse_type = 0
        self.property_parent = None
        self.next_function_object = []
        self.variable_stack: List[Variable] = []
        self.class_stack = []
        self.object_property_stack = []
        self.prev_obj_stack = []
        self.nested_stack = []
        self.object_stack = []
        self.classes = classes
        self.result_stack = []
        self.count = 0
        self.operand_list = operand_list
        self.quad_list = quad_list
        self.stack_allocator = stack_allocator

    # def push_variable(self, var):

    def free_heap_memory(self, variable: Variable):

        if variable.class_id is None and variable.array_type is None:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'{variable.id_} is not a freeable variable')))

        q = Quad(OperationType.DELETE_REF, result_address=variable.address_)
        self.quad_list.append(q)

    def set_parse_type(self, parse_type):
        self.parse_type = parse_type

    # used to allocate heap
    def push_variable(self, variable: Variable):
        self.variable_stack.append(variable)

    # push object property to stack

    def push_object_property(self, property_name):
        self.object_property_stack.append(property_name)

    def push_object(self, variable):
        self.object_stack.append(variable)

    def resolve_function_object(self):
        # check if object is nested so that we can use the (*) operator

        nested = False
        if len(self.object_property_stack) >= 1:
            nested = True

        self.resolve_objects()
        if len(self.result_stack) == 0:
            # no object to resolve (global function)
            return False

        self.resolve_objects()
        variable = self.result_stack.pop()

        if variable.type_ != ValueType.POINTER:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'{variable.id_} cannot be used to call functions')))

        self.nested_stack.append(nested)

        self.pointer_types[variable.address_] = variable.type_
        if variable.class_id is not None:
            self.pointer_types[variable.address_] = variable.class_id

        self.next_function_object.append(variable)
        return True

    def resolve_get(self):
        """resolve get operator"""
        print('resolving get')

        self.resolve_objects()
        if len(self.result_stack) == 0:
            print('no result')
            return

        variable = self.result_stack.pop()

        print('variable', variable.type_)

        if variable.type_ is ValueType.POINTER:
            print('should not run')
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'can not use pointer types in expressions')))

        address = self.stack_allocator.allocate_address(variable.type_, Layers.TEMPORARY)
        self.broadcast(Event(FunctionTableEvents.ADD_TEMP, (variable.type_, address, variable.class_id)))

        # assign value to pointer
        self.quad_list.append(Quad(OperationType.ASSIGN, f'*{variable.address_}', result_address=address))

        self.operand_list.append(
            Operand(variable.type_, address, class_id=variable.class_id, is_class_param=True))
        print(self.operand_list[-1].type_)

    def resolve(self):
        """resolve objects for assignment or expressions, always returns pointer with location of object param or object itself"""
        if len(self.object_property_stack) == 0:
            return

        self.resolve_objects()
        variable = self.result_stack.pop()

        print('resolving to pointer', variable.address_)

        self.operand_list.append(
            Operand(ValueType.POINTER, variable.address_, class_id=variable.class_id, is_class_param=True))

        self.pointer_types[variable.address_] = variable.type_
        if variable.class_id is not None:
            self.pointer_types[variable.address_] = variable.class_id

    def resolve_objects(self):
        count = 0

        while (len(self.object_property_stack) > 0):
            self.resolve_object_assignment(count)
            count += 1

        # can only be one result type, if multiple (object and primitve) raise syntax error
        if len(self.object_stack) > 0:
            if len(self.result_stack) > 0:
                self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                    f'{self.result_stack[0].id_} only objects can use the . operator')))

            self.result_stack.append(self.object_stack.pop())

    def build_quad(self, left, left_pointer_type, result, result_pointer_type, property_data):
        # either * or &
        left = f'{left_pointer_type}{left}'
        result = f'{result_pointer_type}{result}'

        quad = Quad(OperationType.POINTER_ADD, left_address=left, right_address=property_data.offset, result_address=result)
        quad.property_data = property_data

        return quad

    def validate_property_exists_in_object(self, class_data):
        """check that property exists in object"""
        property_name = self.object_property_stack.pop(0)

        if property_name not in class_data.variables:
            self.broadcast(
                Event(
                    CompilerEvent.STOP_COMPILE,
                    CompilerError(
                        f'{property_name} not found in Class {class_data.id_}')
                )
            )

        return property_name

    def allocate_temporary_result_pointer(self, property_data):
        """Reserve a temp pointer to local memory """
        property_pointer = self.stack_allocator.allocate_address(
            ValueType.POINTER, Layers.TEMPORARY)
        self.broadcast(Event(FunctionTableEvents.ADD_TEMP,
                       (ValueType.POINTER, property_pointer, property_data.class_id)))

        return property_pointer

    def resolve_object_assignment(self, count):
        object = self.object_stack.pop(0)
        class_data = self.classes[object.class_id]

        property_id = self.validate_property_exists_in_object(class_data)
        property_data = class_data.variables[property_id]

        property_pointer = self.allocate_temporary_result_pointer(property_data)

        # we simply get the address of the object and push it to the object !queue!
        if property_data.type_ is ValueType.POINTER and count == 0:
            quad = self.build_quad(object.address_, '&', property_pointer, '&', property_data)
            # push it to object stack for further resolving (possibly)
            self.push_next_object(property_data, property_pointer, quad)

        # in this case we are talking about nested objects so we need to access left addr by value(*)
        elif property_data.type_ is ValueType.POINTER and count > 0:
            quad = self.build_quad(object.address_, '*', property_pointer, '&', property_data)
            self.push_next_object(property_data, property_pointer, quad)

        # in this case we simply want the objects value so left address is & (initial object)
        elif property_data.type_ in PRIMITIVES and count == 0:
            quad = self.build_quad(object.address_, '&', property_pointer, '&', property_data)
            self.push_result_stack(property_data, property_pointer)

        # in this case object is nested, so we need to acces it by value(*)
        elif property_data.type_ in PRIMITIVES and count > 0:
            # However we don't push it to the object stack, because we cant resolve primitives
            quad = self.build_quad(object.address_, '*', property_pointer, '&', property_data)
            self.push_result_stack(property_data, property_pointer)

        self.quad_list.append(quad)

    def push_result_stack(self, property_data, property_pointer):
        "Resolver Result will go here"
        var = Variable(None)
        var.address_ = property_pointer
        var.class_id = property_data.class_id
        var.type_ = property_data.type_

        self.result_stack.append(var)

    def push_next_object(self, property_data, property_pointer, quad):

        var = Variable(None)
        var.address_ = property_pointer
        var.class_id = property_data.class_id
        var.type_ = property_data.type_

        self.push_object(var)

        # add to pointer hash for type validation
        self.pointer_types[property_pointer] = property_data.type_
        if property_data.class_id is not None:
            self.pointer_types[property_pointer] = property_data.class_id

    def allocate_temporary_result_pointer(self, property_data):
        property_pointer = self.stack_allocator.allocate_address(
            ValueType.POINTER, Layers.TEMPORARY)
        self.broadcast(Event(FunctionTableEvents.ADD_TEMP,
                       (ValueType.POINTER, property_pointer, property_data.class_id)))

        return property_pointer

    def allocate_heap(self):
        object: Class = self.class_stack.pop()
        variable: Class = self.class_stack.pop()

        var: Variable = self.variable_stack.pop()
        var.initialized = True

        if variable.id_ != object.id_:
            self.broadcast(
                Event(
                    CompilerEvent.STOP_COMPILE,
                    CompilerError(
                        f'variable {variable.id_} cannot be assigned Class type of {object.id_}')
                )
            )

        operand: Operand = self.operand_list.pop()

        if var.id_ is None:
            operand.address = f'*{operand.address}'

        quad = Quad(OperationType.POINTER_ASSIGN, left_address=OperationType.ALLOCATE_HEAP, right_address=variable.size,
                    result_address=operand.address)

        self.quad_list.append(quad)
        self.pointer_types[operand.address] = var.class_id

    def push_class_data(self, class_data: Class):
        self.class_stack.append(class_data)
