from src.compiler.stack_allocator.types import ValueType

from src.compiler.code_generator.type import Quad, OperationType, Operand
from src.compiler.errors import CompilerError, CompilerEvent
from src.utils.observer import Subscriber, Event, Publisher


class FunctionCallData:
    def __init__(self, id_):
        self.call_id = id_
        self.parameter_count = 0
        self.parameter_signature = []
        self.current_class = None
        self.type_ = ValueType.VOID


class FunctionActions(Publisher, Subscriber):
    def __init__(self, quad_list, operand_list):
        super().__init__()

        self.operand_list = operand_list
        self.parameter_counter = 0
        self.quad_list = quad_list
        self.param_signature_stack = []
        self.function_call_stack = []

    def handle_event(self, event: Event):
        if event.type_ is CompilerEvent.GEN_END_FUNC:
            self.generate_end_function()
        elif event.type_ is CompilerEvent.GO_TO_MAIN:
            self.generate_go_to_main()
        elif event.type_ is CompilerEvent.GENERATE_ARE:
            self.generate_are(event.payload)
        elif event.type_ is CompilerEvent.END_GLOBAL:
            self.end_global()

    def end_global(self):
        quad = Quad(operation=OperationType.END_GLOBAL)
        self.quad_list.append(quad)

    def generate_end_function(self):
        quad = Quad(operation=OperationType.ENDFUNC)
        self.quad_list.append(quad)

    def generate_go_to_main(self):
        quad = Quad(operation=OperationType.GOTO, result_address="main")
        self.quad_list.insert(0, quad)

    def generate_are(self, id_, class_id='global'):
        quad = Quad(operation=OperationType.ARE, left_address=class_id, result_address=id_)
        self.quad_list.append(quad)

    def generate_go_sub(self, id_, class_id='global'):
        quad = Quad(operation=OperationType.GOSUB, left_address=class_id, result_address=id_)
        self.quad_list.append(quad)

    def verify_parameter_type(self, type_: ValueType, param_id, in_class=False):
        operand: Operand = self.operand_list.pop()
        if operand.type_ is not type_:
            self.broadcast(
                Event(
                    CompilerEvent.STOP_COMPILE,
                    CompilerError(
                        f'"Invalid function call signature: Type should be {type_.value} but its {operand.type_.value} instead')
                )
            )

        print('operant.type: ', operand.type_, 'address', operand.address)

        quad = Quad(operation=OperationType.PARAM,
                    left_address=operand.address, right_address=param_id)
        self.quad_list.append(quad)

    def add_self_param(self, obj, nested):
        # self.operand_list.append(
        #     Operand(ValueType.POINTER, obj.address_, is_class_param=False))

        action = '*' if nested else '&'

        quad = Quad(operation=OperationType.PARAM, left_address=f'{action}{obj.address_}', right_address=0)
        self.quad_list.append(quad)
