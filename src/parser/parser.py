import src
from src.directory.constants import ConstantTable
from src.parser.errors import CompilerError
from src.ply import yacc
from src.lexer import lex, tokens

from src.directory import Directory
from src.semantic import Cube
from src.semantic.generator import QuadGenerator, Operand, Operator
from src.semantic.quadruple import OperationType
from src.virtual.compilation import Scheduler

# maybe should be named compiler?
from src.virtual.types import ValueType

class Parser:
    def __init__(self):
        self.tokens = tokens
        self.compiler_errors = []
        self.memory = Scheduler()
        self.constant_table = ConstantTable()

        self.lexer = lex
        self.directory = Directory()  # potentially = Directory(memory, cube)
        self.quadGenerator = QuadGenerator(scheduler=self.memory, directory=self.directory)

        self.parser = yacc.yacc(module=self, start="program")

    def add_compiler_error(self, message, line_number):
        self.compiler_errors.append(CompilerError(message, line_number))

    def display_function_directory(self):
        self.directory.display(debug=True)

    def parse(self, file, debug=False):
        self.parser.parse(file, self.lexer, debug=debug)

    # parser begin
    def p_program(self, p):
        """
        program : program1 program
                | program1
        """

    def p_program1(self, p):
        """
        program1 : body NLINE
                 | NLINE
        """

    def p_body(self, p):
        """
        body : class
             | function
             | declaration
        """

    # -- TOP LEVEL -----------------------

    def p_class(self, p):
        """
        class : CLASS ID class_block
              | CLASS ID COLON ID class_block
        """

    def p_function(self, p):
        """
        function : FUNC ID add_function params init_block end_function
                 | FUNC ID add_function params ARROW will_set_type primitive init_block end_function
        """

    def p_declaration(self, p):
        """
        declaration : variable ASSIGN push_operator expression execute_remaining
                    | variable ASSIGN array
                    | variable
        """

    def p_array(self, p):
        """
        array : LBRACK array1 RBRACK
        """

    def p_array1(self, p):
        """
        array1 : expression COMMA array1
               | expression
        """

    # -- PARAMS -----------------------

    def p_params(self, p):
        """
        params : LPAREN params1 RPAREN
               | LPAREN RPAREN
        """

    def p_params1(self, p):
        """
        params1 : param
                | param COMMA params1
        """

    def p_param(self, p):
        """
        param : ID add_var COLON will_set_type type
        """

    # -- BLOCKS -----------------------

    def p_class_block(self, p):
        """
        class_block : LCURLY class_block1 RCURLY
        """

    def p_class_block1(self, p):
        """
        class_block1 : class_block2
                     | class_block3 class_block2
        """

    def p_class_block2(self, p):
        """
        class_block2 : NLINE class_block1
                     | NLINE
        """

    def p_class_block3(self, p):
        """
        class_block3 : function
                     | declaration
        """

    def p_init_block(self, p):
        """
        init_block : LCURLY init_block1 RCURLY
        """

    def p_init_block1(self, p):
        """
        init_block1 : init_block2
                    | init_block3 init_block2
        """

    def p_init_block2(self, p):
        """
        init_block2 : NLINE init_block1
                    | NLINE
        """

    def p_init_block3(self, p):
        """
        init_block3 : statement
                    | declaration
        """

    def p_block(self, p):
        """
        block : LCURLY block1 RCURLY
        """

    def p_block1(self, p):
        """
        block1 : block2
               | statement block2
        """

    def p_block2(self, p):
        """
        block2 : NLINE block1
               | NLINE
        """

    # -- STATEMENTS -----------------------

    def p_statement(self, p):
        """
        statement : display
                  | if
                  | while
                  | input
                  | assign
                  | call
                  | return
        """

    def p_while(self, p):
        """
        while : WHILE LPAREN bool_expr RPAREN block
        """

    def p_input(self, p):
        """
        input : variable ASSIGN INPUT LPAREN string RPAREN
        """

    def p_display(self, p):
        """
        display : PRINT LPAREN expression RPAREN
        """

    def p_return(self, p):
        """
        return : RETURN
               | RETURN bool_expr
        """

    def p_assign(self, p):
        """
        assign : ID push_variable assign1 expression execute_remaining
        """

    def p_assign1(self, p):
        """
        assign1 : ASSIGN push_operator
                | PASSIGN
                | LASSIGN
                | MASSIGN
                | DASSIGN
        """

    def p_call(self, p):
        """
        call : ID LPAREN call1 RPAREN
        """

    def p_call1(self, p):
        """
        call1 : expression
              | expression COMMA call1
        """

    def p_if(self, p):
        """
        if : IF LPAREN bool_expr RPAREN block
           | IF LPAREN bool_expr RPAREN block if2
        """

    def p_if2(self, p):
        """
        if2 : ELSE if
            | ELSE block
        """

    # -- EXPRESSIONS -----------------------

    def p_bool_expr(self, p):
        """
        bool_expr : relational_exp
                  | relational_exp AND push_operator bool_expr
                  | relational_exp OR push_operator bool_expr
        """

    def p_relational_exp(self, p):
        """
        relational_exp : expression comp push_operator expression
                       | expression
        """

    def p_expression(self, p):
        """
        expression : term execute_priority_1
                   | term execute_priority_1 PLUS push_operator expression
                   | term execute_priority_1 MINUS push_operator  expression
        """

    def p_term(self, p):
        """
        term : factor execute_priority_2
             | factor execute_priority_2 TIMES push_operator term
             | factor execute_priority_2 DIVIDE push_operator term
        """

    def p_factor(self, p):
        """
        factor : constant
               | LPAREN push_operator expression RPAREN push_operator
        """

    def p_call_array(self, p):
        """
        call_array : ID LBRACK expression RBRACK
        """

    def p_constant(self, p):
        """
        constant :  INTLIT   add_constant
                 | FLOATLIT add_constant
                 | BOOLLIT add_constant
                 | string
                 | call
                 | call_array
                 | constant2
        """

    def p_constant2(self, p):
        """
        constant2 : ID push_variable
                  | ID PERIOD constant2
        """

    def p_comp(self, p):
        """
        comp : LESS
             | MORE
             | EQUALS
             | NEQUALS
             | LEQUALS
             | MEQUALS
        """

    # -- VARIABLES -----------------------

    def p_variable(self, p):
        """
        variable : VAR ID add_var COLON will_set_type type
        """

    def p_type(self, p):
        # TODO: might need to remove the array of custom types
        """
        type : ID
             | primitive
             | LBRACK primitive RBRACK
             | LBRACK ID RBRACK
        """

    def p_primitive(self, p):
        """
        primitive : INT     set_type
                  | FLOAT   set_type
                  | STRING  set_type
                  | BOOL    set_type
        """

    def p_string(self, p):
        """
        string : string_expr
               | string_expr string
        """

    def p_string_expr(self, p):
        """
        string_expr : STRINGLIT add_constant
                    | BSLASH LPAREN expression RPAREN
        """

    # -- SEMANTIC ACTIONS -----------------------

    def p_add_function(self, p):
        """
        add_function :
        """
        self.directory.add(p[-1])

    def p_end_function(self, p):
        """
        end_function :
        """
        self.quadGenerator.execute_remaining()
        self.directory.end_function(memory=self.memory)

    def p_add_constant(self, p):
        """
        add_constant :
        """
        self.constant_table.add(p[-1], self.memory)
        self.quadGenerator.push_constant(p[-1], self.constant_table)

    def p_add_var(self, p):
        """
        add_var :
        """
        self.directory.add_variable(p[-1])

    def p_execute_priority_1(self, p):
        """
        execute_priority_1 :
        """

        self.quadGenerator.execute_if_possible(1)

    def p_execute_priority_2(self, p):
        """
        execute_priority_2 :
        """

        self.quadGenerator.execute_if_possible(2)

    def p_will_set_type(self, p):
        """
        will_set_type :
        """
        self.directory.will_set_type(p[-1])

    # QuadGenerator Actions
    def p_push_operator(self, p):
        """
        push_operator :
        """
        type_ = OperationType(p[-1])
        priority = 0

        if type_ is OperationType.ASSIGN:
            priority = 0
        elif type_ is OperationType.ADD:
            priority = 1
        elif type_ is OperationType.SUBTRACT:
            priority = 1
        elif type_ is OperationType.MULTIPLY:
            priority = 2
        elif type_ is OperationType.DIVIDE:
            priority = 2

        operator = Operator(priority, p[-1])
        self.quadGenerator.push_operator(operator)

    def p_push_variable(self, p):
        """
         push_variable :
        """
        self.quadGenerator.push_variable(p[-1])

    def p_execute_remaining(self, p):
        """
         execute_remaining :
        """
        self.quadGenerator.execute_remaining()

    def p_set_type(self, p):
        """
        set_type :
        """
        id_ = self.directory.set_type(p[-1], memory=self.memory)
        if id_ is not None:
            self.quadGenerator.push_variable(id_)

    # -- ERROR -----------------------

    def p_error(self, p):
        if p is None:
            token = "end of file"
        else:
            token = f"{p.type}({p.value}) on line {p.lineno}"

        self.add_compiler_error(token, p.lineno)

    def display_debug(self):
        self.constant_table.display()
