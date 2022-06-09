from src.compiler.symbol_table.function_table import FunctionTable
from src.utils.observer import Publisher
from .class_table import ClassTable
from .constant_table import ConstantTable
from .function_table.variable_table import VariableTable
from .global_table import GlobalTable


class SymbolTable:
    def __init__(self):
        self.class_table = ClassTable()
        self.constant_table = ConstantTable()
        self.global_function_table = FunctionTable(False)
        self.current_function_table = self.global_function_table
        self.in_class = False

    @property
    def function_table(self):
        return self.current_function_table

    def start_class(self):
        self.current_function_table = self.class_table.current_class.function_table
        self.in_class = True

    def end_class(self):
        self.current_function_table = self.global_function_table
        self.in_class = False
