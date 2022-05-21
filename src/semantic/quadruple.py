from enum import Enum


class OperationType(Enum):
    MULTIPLY = '*'
    DIVIDE = '/'
    ADD = '+'
    EQUAL = '=='
    AND = '&&'
    OR = '||'
    LESS_THAN = '<'
    GREAT_THAN = '>'
    LESS_EQUAL = '<='
    GREAT_EQUAL = '>='
    LPAREN = '('
    RPAREN = ')'
    SUBTRACT = '-'
    ASSIGN = '='
    GOTOF = 'gotof'
    GOTOV = 'gotov'
    GOTO = 'goto'
    PARAMETER = 'parameter'
    RETURN = 'return'
    GOSUB = 'gosub'
    ENDFUNC = 'endfunc'
    ERA = 'era'
    END = 'end'
    PRINT = 'print'


class Quad:
    def __init__(self, operation, left_address=None, right_address=None, result_address=None):
        self.operation: OperationType = OperationType(operation)
        self.left_address = left_address
        self.right_address = right_address
        self.result_address = result_address
