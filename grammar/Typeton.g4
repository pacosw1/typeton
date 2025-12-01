grammar Typeton;

/* Lexer Rules */

// Keywords
VAR: 'var';
CONST: 'const';
STRUCT: 'struct';
PRINT: 'print';
FOR: 'for';
WHILE: 'while';
IF: 'if';
ELSE: 'else';
RETURN: 'return';
BREAK: 'break';
CONTINUE: 'continue';

// Types
TYPE_INT32: 'Int32';
TYPE_INT16: 'Int16';
TYPE_INT8: 'Int8';
TYPE_UINT32: 'UInt32';
TYPE_UINT16: 'UInt16';
TYPE_UINT8: 'UInt8';
TYPE_FLOAT: 'Float';
TYPE_BOOL: 'Bool';
TYPE_VOID: 'void';

// Operators
PLUS: '+';
MINUS: '-';
MULT: '*';
MOD: '%';
DIV: '/';
ASSIGN: '=';
PLUS_ASSIGN: '+=';
MINUS_ASSIGN: '-=';
MULT_ASSIGN: '*=';
DIV_ASSIGN: '/=';
MOD_ASSIGN: '%=';
PLUSPLUS: '++';
MINUSMINUS: '--';
LESS_EQUAL: '<=';
GREAT_EQUAL: '>=';
EQUAL: '==';
NOT_EQUAL: '!=';
LESS_THAN: '<';
GREAT_THAN: '>';
LOGICAL_AND: '&&';
LOGICAL_OR: '||';
AMPERSAND: '&';
NOT: '!';
ABS: [aA][bB][sS];
SQRT: [sS][qQ][rR][tT];
ATAN2: [aA][tT][aA][nN]['2'];
SIN: [sS][iI][nN];
COS: [cC][oO][sS];
TAN: [tT][aA][nN];
FLOOR: [fF][lL][oO][oO][rR];
CEIL: [cC][eE][iI][lL];
ROUND: [rR][oO][uU][nN][dD];
MIN: [mM][iI][nN];
MAX: [mM][aA][xX];
CLAMP: [cC][lL][aA][mM][pP];

// Punctuation
LPAREN: '(';
RPAREN: ')';
LBRACKET: '[';
RBRACKET: ']';
LBRACE: '{';
RBRACE: '}';
COLON: ':';
SEMICOLON: ';';
COMMA: ',';
DOT: '.';
ARROW: '=>';

ENCODER_KEYWORD: 'Encoder';

// Literals
ID: [a-zA-Z_][a-zA-Z0-9_]*;
INT_LIT: [0-9]+;
FLOAT_LIT: [0-9]+ '.' [0-9]+;
STRING_LIT: '"' (~["\\] | '\\' .)* '"';

// Whitespace and Comments
WS: [ \t\r\n]+ -> skip;
COMMENT: '//' ~[\r\n]* -> skip;

/* Parser Rules */

program: statement* EOF;

statement
    : structDecl
    | varDecl
    | constDecl
    | assignment
    | printStmt
    | forStmt
    | whileStmt
    | ifStmt
    | breakStmt
    | continueStmt
    | block
    | methodCall SEMICOLON
    | returnStmt
    ;

forStmt
    : FOR LPAREN forInit SEMICOLON expression SEMICOLON simpleAssignment RPAREN statement
    ;

forInit
    : simpleAssignment
    | forVarDecl
    ;

forVarDecl
    : VAR ID COLON type ASSIGN expression
    ;

whileStmt
    : WHILE LPAREN expression RPAREN statement
    ;

ifStmt
    : IF LPAREN expression RPAREN statement (ELSE statement)?
    ;

block
    : LBRACE statement* RBRACE
    ;

varDecl
    : VAR ID COLON type ASSIGN expression SEMICOLON                                    # ScalarVarDecl
    | VAR ID COLON type SEMICOLON                                                      # ScalarVarDeclNoInit
    | VAR ID COLON type LBRACKET INT_LIT RBRACKET SEMICOLON                           # ArrayVarDecl
    | VAR ID COLON type LBRACKET INT_LIT RBRACKET ASSIGN arrayLiteral SEMICOLON      # ArrayVarDeclInit
    ;

constDecl
    : CONST ID ASSIGN functionExpr SEMICOLON
    | CONST ID COLON type ASSIGN expression SEMICOLON
    ;

assignment
    : simpleAssignment SEMICOLON
    ;

simpleAssignment
    : ID ASSIGN expression                                                   # ScalarAssignment
    | ID PLUS_ASSIGN expression                                              # CompoundAssignment
    | ID MINUS_ASSIGN expression                                             # CompoundAssignment
    | ID MULT_ASSIGN expression                                              # CompoundAssignment
    | ID DIV_ASSIGN expression                                               # CompoundAssignment
    | ID MOD_ASSIGN expression                                               # CompoundAssignment
    | ID PLUSPLUS                                                           # PostfixIncrement
    | ID MINUSMINUS                                                         # PostfixDecrement
    | ID LBRACKET expression RBRACKET ASSIGN expression                     # ArrayAssignment
    | structFieldAccess ASSIGN expression                                   # StructAssignment
    ;

printStmt: PRINT LPAREN expression RPAREN SEMICOLON;

arrayLiteral: LBRACKET expression (COMMA expression)* RBRACKET;
argumentList: expression (COMMA expression)*;
qualifiedName: ID DOT ENCODER_KEYWORD DOT ID (DOT ID)*;
callableName: ID (DOT ID)*;
methodCall: callableName LPAREN argumentList? RPAREN;

structFieldAccess: ID (DOT ID)+;

returnStmt
    : RETURN expression? SEMICOLON
    ;

breakStmt
    : BREAK SEMICOLON
    ;

continueStmt
    : CONTINUE SEMICOLON
    ;

functionExpr
    : LPAREN parameterList? RPAREN COLON returnType ARROW block
    ;

parameterList
    : parameter (COMMA parameter)*
    ;

parameter
    : ID COLON AMPERSAND? type
    ;

type
    : TYPE_INT32
    | TYPE_INT16
    | TYPE_INT8
    | TYPE_UINT32
    | TYPE_UINT16
    | TYPE_UINT8
    | TYPE_FLOAT
    | TYPE_BOOL
    | ID
    ;

returnType
    : type
    | TYPE_VOID
    ;

expression
    : expression (MULT | DIV | MOD) expression # MulDiv
    | expression (PLUS | MINUS) expression # AddSub
    | expression (LESS_THAN | GREAT_THAN | LESS_EQUAL | GREAT_EQUAL | EQUAL | NOT_EQUAL) expression # Compare
    | expression LOGICAL_AND expression # AndExpr
    | expression LOGICAL_OR expression # OrExpr
    | (AMPERSAND | MULT) expression # AddressOp
    | SIN LPAREN expression RPAREN # SinExpr
    | COS LPAREN expression RPAREN # CosExpr
    | TAN LPAREN expression RPAREN # TanExpr
    | ABS LPAREN expression RPAREN # AbsExpr
    | SQRT LPAREN expression RPAREN # SqrtExpr
    | ATAN2 LPAREN expression COMMA expression RPAREN # Atan2Expr
    | FLOOR LPAREN expression RPAREN # FloorExpr
    | CEIL LPAREN expression RPAREN # CeilExpr
    | ROUND LPAREN expression RPAREN # RoundExpr
    | MIN LPAREN expression COMMA expression RPAREN # MinExpr
    | MAX LPAREN expression COMMA expression RPAREN # MaxExpr
    | CLAMP LPAREN expression COMMA expression COMMA expression RPAREN # ClampExpr
    | atom # AtomExpr
    | MINUS expression # UnaryMinusExpr
    | PLUS expression # UnaryPlusExpr
    | NOT expression # NotExpr
    ;

atom
    : ID LBRACKET expression RBRACKET # ArrayAccess
    | methodCall # MethodCallAtom
    | qualifiedName # QualifiedNameAtom
    | structFieldAccess # StructFieldAtom
    | ID # IdAtom
    | INT_LIT # IntAtom
    | FLOAT_LIT # FloatAtom
    | STRING_LIT # StringAtom
    | LPAREN expression RPAREN # ParenAtom
    ;
structDecl
    : STRUCT ID LBRACE structField+ RBRACE
    ;

structField
    : ID COLON type SEMICOLON
    ;
