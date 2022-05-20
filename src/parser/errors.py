class CompilerError:
    def __init__(self, message: str, line_number = None):
        self.message = message
        self.line_number = line_number

    def print(self):
        if self.line_number is None:
            print("CompilationError: ", self.message)
        else:
            print(f'CompilationError: {self.message} at line: {self.line_number}')