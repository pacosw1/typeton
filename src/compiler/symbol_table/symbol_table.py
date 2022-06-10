from src.compiler.errors import CompilerEvent
from src.compiler.symbol_table.function_table import FunctionTable
from src.compiler.symbol_table.function_table.function import Function
from src.utils.observer import Event, Publisher
from .class_table import ClassTable
from .constant_table import ConstantTable
from .function_table.variable_table import VariableTable
from .global_table import GlobalTable


class SymbolTable:
    def __init__(self):
        self.class_table = ClassTable()
        self.constant_table = ConstantTable()
        self.global_function_table = FunctionTable(self.class_table, None)
        self.current_function_table = self.global_function_table
        self.in_class = False

    @property
    def function_table(self):
        return self.current_function_table

    def start_class(self):
        print('start class')
        if self.current_function_table.current_function.id_ == "global":
            self.current_function_table.broadcast(
                Event(CompilerEvent.END_GLOBAL, None))

        self.current_function_table = self.class_table.current_class.function_table
        self.in_class = True

    def get_class_functions(self, id_):
        print('changing class')
        return self.class_table.classes[id_].function_table

    def end_class(self):
        print('end_class')

        self.current_function_table = self.global_function_table
        self.class_table.end_class()
        self.in_class = False
