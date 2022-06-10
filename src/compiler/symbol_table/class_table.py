from typing import Dict
from src.compiler.errors import CompilerError, CompilerEvent

from src.compiler.stack_allocator.types import ValueType
from src.compiler.symbol_table.function_table.function_table import FunctionTable
from src.utils.display import make_table, TableOptions
from src.utils.observer import Event, Publisher
from src.virtual_machine.types import FunctionData


class ClassVariable:
    def __init__(self, id_, offset):
        self.id_ = id_
        self.type_ = None
        self.offset = offset
        self.class_id = None


class ClassData:
    def __init__(self, id_, size, function_data):
        self.id_ = id_
        self.function_data: Dict[str, FunctionData] = function_data
        self.size = size


class ClassTable(Publisher):
    def __init__(self):
        super().__init__()

        self.classes: Dict[str, Class] = {}
        self.class_data: Dict[str, ClassData] = {}
        self.current_class: Class = None

    def add_class(self, id_):
        if id_ in self.classes:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'Class {id_} already exists')))

        self.classes[id_] = Class(id_, self)
        self.current_class = self.classes[id_]

    def class_size(self, id_):
        if id_ not in self.classes:
            self.broadcast(Event(CompilerEvent.STOP_COMPILE, CompilerError(
                f'Class {id_} does not exist')))
        return self.classes[id_].size

    def get_class(self, id_):
        return self.classes[id_]

    def display(self):
        """ Displays symbol_table of functions tables """

        print(make_table("Class Directory", ["ID", "SIZE"],
                         map(lambda fun: [fun[1].id_, fun[1].size], self.classes.items())))

        for key in self.classes:
            val = self.classes[key]
            val.display()

    def end_class(self):
        self.current_class.size = len(self.current_class.variables)

        self.current_class.function_table.receiveing_off = True

        self.class_data[self.current_class.id_] = ClassData(
            self.current_class.id_, self.current_class.size, self.current_class.function_table.function_data())


class Class:
    def __init__(self, id_, class_table):
        self.current_variable = None
        self.id_ = id_
        self.size = 0
        self.offset = 0
        self.test = []
        self.function_table = FunctionTable(class_table, self)
        self.variables: Dict[str, ClassVariable] = {}

    def add_variable(self, id_):
        if id_ in self.variables:
            return False
        self.variables[id_] = ClassVariable(id_, self.offset)
        self.current_variable = self.variables[id_]
        self.offset += 1
        return True

    def set_type(self, type_: ValueType, class_id):
        self.current_variable.type_ = type_
        self.current_variable.class_id = class_id

    def display(self):
        print(make_table(self.id_ + ": Variables", ["ID", "TYPE", "OFFSET"],
                         map(lambda fun: [
                             fun[1].id_, fun[1].type_, fun[1].offset], self.variables.items()),
                         TableOptions(20, 20)))

        self.function_table.display()
