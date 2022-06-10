from typing import List, Dict

from src.compiler.code_generator.type import Quad
from src.compiler.symbol_table.constant_table import ConstantTable
from src.virtual_machine.types import FunctionData


class OutputFile:
    def __init__(self, constant_table, function_data, quad_list, heap_start, class_data):
        self.constant_table: ConstantTable = constant_table
        self.quad_list: List[Quad] = quad_list
        self.heap_start = heap_start

        # include both functions and class data
        self.function_data = FunctionStorage(function_data, class_data)


class FunctionStorage:
    def __init__(self, global_function_data: Dict[str, FunctionData], class_data):
        self.global_ = global_function_data
        self.class_ = class_data
