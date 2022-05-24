from enum import Enum
from queue import Queue


class ValueType(Enum):
    INT = "Int"
    VOID = "Void"
    STRING = "String"
    FLOAT = "Float"
    BOOL = "Bool"


class TypeResource:
    def __init__(self, start, end, resource_type: ValueType):
        self.type = resource_type
        self.start = start
        self.end = end
        self.pointer = start
        self.free_addresses_list = Queue()


class MemoryType:
    def __init__(self, value_type: ValueType, size: int):
        self.type = value_type
        self.size = size


DEFAULT_TYPES = [
    MemoryType(value_type=ValueType.INT, size=499),
    MemoryType(value_type=ValueType.FLOAT, size=499),
    MemoryType(value_type=ValueType.BOOL, size=499),
    MemoryType(value_type=ValueType.STRING, size=499)
]