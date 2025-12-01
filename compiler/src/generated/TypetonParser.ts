// Generated from ../grammar/Typeton.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { TypetonListener } from "./TypetonListener";
import { TypetonVisitor } from "./TypetonVisitor";


export class TypetonParser extends Parser {
	public static readonly VAR = 1;
	public static readonly CONST = 2;
	public static readonly STRUCT = 3;
	public static readonly PRINT = 4;
	public static readonly FOR = 5;
	public static readonly WHILE = 6;
	public static readonly IF = 7;
	public static readonly ELSE = 8;
	public static readonly RETURN = 9;
	public static readonly BREAK = 10;
	public static readonly CONTINUE = 11;
	public static readonly TYPE_INT32 = 12;
	public static readonly TYPE_INT16 = 13;
	public static readonly TYPE_INT8 = 14;
	public static readonly TYPE_UINT32 = 15;
	public static readonly TYPE_UINT16 = 16;
	public static readonly TYPE_UINT8 = 17;
	public static readonly TYPE_FLOAT = 18;
	public static readonly TYPE_BOOL = 19;
	public static readonly TYPE_VOID = 20;
	public static readonly PLUS = 21;
	public static readonly MINUS = 22;
	public static readonly MULT = 23;
	public static readonly MOD = 24;
	public static readonly DIV = 25;
	public static readonly ASSIGN = 26;
	public static readonly PLUS_ASSIGN = 27;
	public static readonly MINUS_ASSIGN = 28;
	public static readonly MULT_ASSIGN = 29;
	public static readonly DIV_ASSIGN = 30;
	public static readonly MOD_ASSIGN = 31;
	public static readonly PLUSPLUS = 32;
	public static readonly MINUSMINUS = 33;
	public static readonly LESS_EQUAL = 34;
	public static readonly GREAT_EQUAL = 35;
	public static readonly EQUAL = 36;
	public static readonly NOT_EQUAL = 37;
	public static readonly LESS_THAN = 38;
	public static readonly GREAT_THAN = 39;
	public static readonly LOGICAL_AND = 40;
	public static readonly LOGICAL_OR = 41;
	public static readonly AMPERSAND = 42;
	public static readonly NOT = 43;
	public static readonly ABS = 44;
	public static readonly SQRT = 45;
	public static readonly ATAN2 = 46;
	public static readonly SIN = 47;
	public static readonly COS = 48;
	public static readonly TAN = 49;
	public static readonly FLOOR = 50;
	public static readonly CEIL = 51;
	public static readonly ROUND = 52;
	public static readonly MIN = 53;
	public static readonly MAX = 54;
	public static readonly CLAMP = 55;
	public static readonly LPAREN = 56;
	public static readonly RPAREN = 57;
	public static readonly LBRACKET = 58;
	public static readonly RBRACKET = 59;
	public static readonly LBRACE = 60;
	public static readonly RBRACE = 61;
	public static readonly COLON = 62;
	public static readonly SEMICOLON = 63;
	public static readonly COMMA = 64;
	public static readonly DOT = 65;
	public static readonly ARROW = 66;
	public static readonly ENCODER_KEYWORD = 67;
	public static readonly ID = 68;
	public static readonly INT_LIT = 69;
	public static readonly FLOAT_LIT = 70;
	public static readonly STRING_LIT = 71;
	public static readonly WS = 72;
	public static readonly COMMENT = 73;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_forStmt = 2;
	public static readonly RULE_forInit = 3;
	public static readonly RULE_forVarDecl = 4;
	public static readonly RULE_whileStmt = 5;
	public static readonly RULE_ifStmt = 6;
	public static readonly RULE_block = 7;
	public static readonly RULE_varDecl = 8;
	public static readonly RULE_constDecl = 9;
	public static readonly RULE_assignment = 10;
	public static readonly RULE_simpleAssignment = 11;
	public static readonly RULE_printStmt = 12;
	public static readonly RULE_arrayLiteral = 13;
	public static readonly RULE_argumentList = 14;
	public static readonly RULE_qualifiedName = 15;
	public static readonly RULE_callableName = 16;
	public static readonly RULE_methodCall = 17;
	public static readonly RULE_structFieldAccess = 18;
	public static readonly RULE_returnStmt = 19;
	public static readonly RULE_breakStmt = 20;
	public static readonly RULE_continueStmt = 21;
	public static readonly RULE_functionExpr = 22;
	public static readonly RULE_parameterList = 23;
	public static readonly RULE_parameter = 24;
	public static readonly RULE_type = 25;
	public static readonly RULE_returnType = 26;
	public static readonly RULE_expression = 27;
	public static readonly RULE_atom = 28;
	public static readonly RULE_structDecl = 29;
	public static readonly RULE_structField = 30;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "forStmt", "forInit", "forVarDecl", "whileStmt", 
		"ifStmt", "block", "varDecl", "constDecl", "assignment", "simpleAssignment", 
		"printStmt", "arrayLiteral", "argumentList", "qualifiedName", "callableName", 
		"methodCall", "structFieldAccess", "returnStmt", "breakStmt", "continueStmt", 
		"functionExpr", "parameterList", "parameter", "type", "returnType", "expression", 
		"atom", "structDecl", "structField",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'var'", "'const'", "'struct'", "'print'", "'for'", "'while'", 
		"'if'", "'else'", "'return'", "'break'", "'continue'", "'Int32'", "'Int16'", 
		"'Int8'", "'UInt32'", "'UInt16'", "'UInt8'", "'Float'", "'Bool'", "'void'", 
		"'+'", "'-'", "'*'", "'%'", "'/'", "'='", "'+='", "'-='", "'*='", "'/='", 
		"'%='", "'++'", "'--'", "'<='", "'>='", "'=='", "'!='", "'<'", "'>'", 
		"'&&'", "'||'", "'&'", "'!'", undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "'('", "')'", "'['", "']'", "'{'", "'}'", "':'", "';'", "','", 
		"'.'", "'=>'", "'Encoder'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "VAR", "CONST", "STRUCT", "PRINT", "FOR", "WHILE", "IF", "ELSE", 
		"RETURN", "BREAK", "CONTINUE", "TYPE_INT32", "TYPE_INT16", "TYPE_INT8", 
		"TYPE_UINT32", "TYPE_UINT16", "TYPE_UINT8", "TYPE_FLOAT", "TYPE_BOOL", 
		"TYPE_VOID", "PLUS", "MINUS", "MULT", "MOD", "DIV", "ASSIGN", "PLUS_ASSIGN", 
		"MINUS_ASSIGN", "MULT_ASSIGN", "DIV_ASSIGN", "MOD_ASSIGN", "PLUSPLUS", 
		"MINUSMINUS", "LESS_EQUAL", "GREAT_EQUAL", "EQUAL", "NOT_EQUAL", "LESS_THAN", 
		"GREAT_THAN", "LOGICAL_AND", "LOGICAL_OR", "AMPERSAND", "NOT", "ABS", 
		"SQRT", "ATAN2", "SIN", "COS", "TAN", "FLOOR", "CEIL", "ROUND", "MIN", 
		"MAX", "CLAMP", "LPAREN", "RPAREN", "LBRACKET", "RBRACKET", "LBRACE", 
		"RBRACE", "COLON", "SEMICOLON", "COMMA", "DOT", "ARROW", "ENCODER_KEYWORD", 
		"ID", "INT_LIT", "FLOAT_LIT", "STRING_LIT", "WS", "COMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(TypetonParser._LITERAL_NAMES, TypetonParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return TypetonParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Typeton.g4"; }

	// @Override
	public get ruleNames(): string[] { return TypetonParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return TypetonParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(TypetonParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, TypetonParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 65;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TypetonParser.VAR) | (1 << TypetonParser.CONST) | (1 << TypetonParser.STRUCT) | (1 << TypetonParser.PRINT) | (1 << TypetonParser.FOR) | (1 << TypetonParser.WHILE) | (1 << TypetonParser.IF) | (1 << TypetonParser.RETURN) | (1 << TypetonParser.BREAK) | (1 << TypetonParser.CONTINUE))) !== 0) || _la === TypetonParser.LBRACE || _la === TypetonParser.ID) {
				{
				{
				this.state = 62;
				this.statement();
				}
				}
				this.state = 67;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 68;
			this.match(TypetonParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, TypetonParser.RULE_statement);
		try {
			this.state = 85;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 70;
				this.structDecl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 71;
				this.varDecl();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 72;
				this.constDecl();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 73;
				this.assignment();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 74;
				this.printStmt();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 75;
				this.forStmt();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 76;
				this.whileStmt();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 77;
				this.ifStmt();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 78;
				this.breakStmt();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 79;
				this.continueStmt();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 80;
				this.block();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 81;
				this.methodCall();
				this.state = 82;
				this.match(TypetonParser.SEMICOLON);
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 84;
				this.returnStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forStmt(): ForStmtContext {
		let _localctx: ForStmtContext = new ForStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, TypetonParser.RULE_forStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 87;
			this.match(TypetonParser.FOR);
			this.state = 88;
			this.match(TypetonParser.LPAREN);
			this.state = 89;
			this.forInit();
			this.state = 90;
			this.match(TypetonParser.SEMICOLON);
			this.state = 91;
			this.expression(0);
			this.state = 92;
			this.match(TypetonParser.SEMICOLON);
			this.state = 93;
			this.simpleAssignment();
			this.state = 94;
			this.match(TypetonParser.RPAREN);
			this.state = 95;
			this.statement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forInit(): ForInitContext {
		let _localctx: ForInitContext = new ForInitContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, TypetonParser.RULE_forInit);
		try {
			this.state = 99;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TypetonParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 97;
				this.simpleAssignment();
				}
				break;
			case TypetonParser.VAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 98;
				this.forVarDecl();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forVarDecl(): ForVarDeclContext {
		let _localctx: ForVarDeclContext = new ForVarDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, TypetonParser.RULE_forVarDecl);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 101;
			this.match(TypetonParser.VAR);
			this.state = 102;
			this.match(TypetonParser.ID);
			this.state = 103;
			this.match(TypetonParser.COLON);
			this.state = 104;
			this.type();
			this.state = 105;
			this.match(TypetonParser.ASSIGN);
			this.state = 106;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whileStmt(): WhileStmtContext {
		let _localctx: WhileStmtContext = new WhileStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, TypetonParser.RULE_whileStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 108;
			this.match(TypetonParser.WHILE);
			this.state = 109;
			this.match(TypetonParser.LPAREN);
			this.state = 110;
			this.expression(0);
			this.state = 111;
			this.match(TypetonParser.RPAREN);
			this.state = 112;
			this.statement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifStmt(): IfStmtContext {
		let _localctx: IfStmtContext = new IfStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, TypetonParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 114;
			this.match(TypetonParser.IF);
			this.state = 115;
			this.match(TypetonParser.LPAREN);
			this.state = 116;
			this.expression(0);
			this.state = 117;
			this.match(TypetonParser.RPAREN);
			this.state = 118;
			this.statement();
			this.state = 121;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				this.state = 119;
				this.match(TypetonParser.ELSE);
				this.state = 120;
				this.statement();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, TypetonParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 123;
			this.match(TypetonParser.LBRACE);
			this.state = 127;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TypetonParser.VAR) | (1 << TypetonParser.CONST) | (1 << TypetonParser.STRUCT) | (1 << TypetonParser.PRINT) | (1 << TypetonParser.FOR) | (1 << TypetonParser.WHILE) | (1 << TypetonParser.IF) | (1 << TypetonParser.RETURN) | (1 << TypetonParser.BREAK) | (1 << TypetonParser.CONTINUE))) !== 0) || _la === TypetonParser.LBRACE || _la === TypetonParser.ID) {
				{
				{
				this.state = 124;
				this.statement();
				}
				}
				this.state = 129;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 130;
			this.match(TypetonParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varDecl(): VarDeclContext {
		let _localctx: VarDeclContext = new VarDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, TypetonParser.RULE_varDecl);
		try {
			this.state = 166;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				_localctx = new ScalarVarDeclContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 132;
				this.match(TypetonParser.VAR);
				this.state = 133;
				this.match(TypetonParser.ID);
				this.state = 134;
				this.match(TypetonParser.COLON);
				this.state = 135;
				this.type();
				this.state = 136;
				this.match(TypetonParser.ASSIGN);
				this.state = 137;
				this.expression(0);
				this.state = 138;
				this.match(TypetonParser.SEMICOLON);
				}
				break;

			case 2:
				_localctx = new ScalarVarDeclNoInitContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 140;
				this.match(TypetonParser.VAR);
				this.state = 141;
				this.match(TypetonParser.ID);
				this.state = 142;
				this.match(TypetonParser.COLON);
				this.state = 143;
				this.type();
				this.state = 144;
				this.match(TypetonParser.SEMICOLON);
				}
				break;

			case 3:
				_localctx = new ArrayVarDeclContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 146;
				this.match(TypetonParser.VAR);
				this.state = 147;
				this.match(TypetonParser.ID);
				this.state = 148;
				this.match(TypetonParser.COLON);
				this.state = 149;
				this.type();
				this.state = 150;
				this.match(TypetonParser.LBRACKET);
				this.state = 151;
				this.match(TypetonParser.INT_LIT);
				this.state = 152;
				this.match(TypetonParser.RBRACKET);
				this.state = 153;
				this.match(TypetonParser.SEMICOLON);
				}
				break;

			case 4:
				_localctx = new ArrayVarDeclInitContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 155;
				this.match(TypetonParser.VAR);
				this.state = 156;
				this.match(TypetonParser.ID);
				this.state = 157;
				this.match(TypetonParser.COLON);
				this.state = 158;
				this.type();
				this.state = 159;
				this.match(TypetonParser.LBRACKET);
				this.state = 160;
				this.match(TypetonParser.INT_LIT);
				this.state = 161;
				this.match(TypetonParser.RBRACKET);
				this.state = 162;
				this.match(TypetonParser.ASSIGN);
				this.state = 163;
				this.arrayLiteral();
				this.state = 164;
				this.match(TypetonParser.SEMICOLON);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constDecl(): ConstDeclContext {
		let _localctx: ConstDeclContext = new ConstDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, TypetonParser.RULE_constDecl);
		try {
			this.state = 182;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 168;
				this.match(TypetonParser.CONST);
				this.state = 169;
				this.match(TypetonParser.ID);
				this.state = 170;
				this.match(TypetonParser.ASSIGN);
				this.state = 171;
				this.functionExpr();
				this.state = 172;
				this.match(TypetonParser.SEMICOLON);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 174;
				this.match(TypetonParser.CONST);
				this.state = 175;
				this.match(TypetonParser.ID);
				this.state = 176;
				this.match(TypetonParser.COLON);
				this.state = 177;
				this.type();
				this.state = 178;
				this.match(TypetonParser.ASSIGN);
				this.state = 179;
				this.expression(0);
				this.state = 180;
				this.match(TypetonParser.SEMICOLON);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let _localctx: AssignmentContext = new AssignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, TypetonParser.RULE_assignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 184;
			this.simpleAssignment();
			this.state = 185;
			this.match(TypetonParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public simpleAssignment(): SimpleAssignmentContext {
		let _localctx: SimpleAssignmentContext = new SimpleAssignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, TypetonParser.RULE_simpleAssignment);
		try {
			this.state = 220;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				_localctx = new ScalarAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 187;
				this.match(TypetonParser.ID);
				this.state = 188;
				this.match(TypetonParser.ASSIGN);
				this.state = 189;
				this.expression(0);
				}
				break;

			case 2:
				_localctx = new CompoundAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 190;
				this.match(TypetonParser.ID);
				this.state = 191;
				this.match(TypetonParser.PLUS_ASSIGN);
				this.state = 192;
				this.expression(0);
				}
				break;

			case 3:
				_localctx = new CompoundAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 193;
				this.match(TypetonParser.ID);
				this.state = 194;
				this.match(TypetonParser.MINUS_ASSIGN);
				this.state = 195;
				this.expression(0);
				}
				break;

			case 4:
				_localctx = new CompoundAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 196;
				this.match(TypetonParser.ID);
				this.state = 197;
				this.match(TypetonParser.MULT_ASSIGN);
				this.state = 198;
				this.expression(0);
				}
				break;

			case 5:
				_localctx = new CompoundAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 199;
				this.match(TypetonParser.ID);
				this.state = 200;
				this.match(TypetonParser.DIV_ASSIGN);
				this.state = 201;
				this.expression(0);
				}
				break;

			case 6:
				_localctx = new CompoundAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 202;
				this.match(TypetonParser.ID);
				this.state = 203;
				this.match(TypetonParser.MOD_ASSIGN);
				this.state = 204;
				this.expression(0);
				}
				break;

			case 7:
				_localctx = new PostfixIncrementContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 205;
				this.match(TypetonParser.ID);
				this.state = 206;
				this.match(TypetonParser.PLUSPLUS);
				}
				break;

			case 8:
				_localctx = new PostfixDecrementContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 207;
				this.match(TypetonParser.ID);
				this.state = 208;
				this.match(TypetonParser.MINUSMINUS);
				}
				break;

			case 9:
				_localctx = new ArrayAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 209;
				this.match(TypetonParser.ID);
				this.state = 210;
				this.match(TypetonParser.LBRACKET);
				this.state = 211;
				this.expression(0);
				this.state = 212;
				this.match(TypetonParser.RBRACKET);
				this.state = 213;
				this.match(TypetonParser.ASSIGN);
				this.state = 214;
				this.expression(0);
				}
				break;

			case 10:
				_localctx = new StructAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 216;
				this.structFieldAccess();
				this.state = 217;
				this.match(TypetonParser.ASSIGN);
				this.state = 218;
				this.expression(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public printStmt(): PrintStmtContext {
		let _localctx: PrintStmtContext = new PrintStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, TypetonParser.RULE_printStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 222;
			this.match(TypetonParser.PRINT);
			this.state = 223;
			this.match(TypetonParser.LPAREN);
			this.state = 224;
			this.expression(0);
			this.state = 225;
			this.match(TypetonParser.RPAREN);
			this.state = 226;
			this.match(TypetonParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayLiteral(): ArrayLiteralContext {
		let _localctx: ArrayLiteralContext = new ArrayLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, TypetonParser.RULE_arrayLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 228;
			this.match(TypetonParser.LBRACKET);
			this.state = 229;
			this.expression(0);
			this.state = 234;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === TypetonParser.COMMA) {
				{
				{
				this.state = 230;
				this.match(TypetonParser.COMMA);
				this.state = 231;
				this.expression(0);
				}
				}
				this.state = 236;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 237;
			this.match(TypetonParser.RBRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public argumentList(): ArgumentListContext {
		let _localctx: ArgumentListContext = new ArgumentListContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, TypetonParser.RULE_argumentList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 239;
			this.expression(0);
			this.state = 244;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === TypetonParser.COMMA) {
				{
				{
				this.state = 240;
				this.match(TypetonParser.COMMA);
				this.state = 241;
				this.expression(0);
				}
				}
				this.state = 246;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedName(): QualifiedNameContext {
		let _localctx: QualifiedNameContext = new QualifiedNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, TypetonParser.RULE_qualifiedName);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 247;
			this.match(TypetonParser.ID);
			this.state = 248;
			this.match(TypetonParser.DOT);
			this.state = 249;
			this.match(TypetonParser.ENCODER_KEYWORD);
			this.state = 250;
			this.match(TypetonParser.DOT);
			this.state = 251;
			this.match(TypetonParser.ID);
			this.state = 256;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 252;
					this.match(TypetonParser.DOT);
					this.state = 253;
					this.match(TypetonParser.ID);
					}
					}
				}
				this.state = 258;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public callableName(): CallableNameContext {
		let _localctx: CallableNameContext = new CallableNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, TypetonParser.RULE_callableName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 259;
			this.match(TypetonParser.ID);
			this.state = 264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === TypetonParser.DOT) {
				{
				{
				this.state = 260;
				this.match(TypetonParser.DOT);
				this.state = 261;
				this.match(TypetonParser.ID);
				}
				}
				this.state = 266;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodCall(): MethodCallContext {
		let _localctx: MethodCallContext = new MethodCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, TypetonParser.RULE_methodCall);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 267;
			this.callableName();
			this.state = 268;
			this.match(TypetonParser.LPAREN);
			this.state = 270;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TypetonParser.PLUS) | (1 << TypetonParser.MINUS) | (1 << TypetonParser.MULT))) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & ((1 << (TypetonParser.AMPERSAND - 42)) | (1 << (TypetonParser.NOT - 42)) | (1 << (TypetonParser.ABS - 42)) | (1 << (TypetonParser.SQRT - 42)) | (1 << (TypetonParser.ATAN2 - 42)) | (1 << (TypetonParser.SIN - 42)) | (1 << (TypetonParser.COS - 42)) | (1 << (TypetonParser.TAN - 42)) | (1 << (TypetonParser.FLOOR - 42)) | (1 << (TypetonParser.CEIL - 42)) | (1 << (TypetonParser.ROUND - 42)) | (1 << (TypetonParser.MIN - 42)) | (1 << (TypetonParser.MAX - 42)) | (1 << (TypetonParser.CLAMP - 42)) | (1 << (TypetonParser.LPAREN - 42)) | (1 << (TypetonParser.ID - 42)) | (1 << (TypetonParser.INT_LIT - 42)) | (1 << (TypetonParser.FLOAT_LIT - 42)) | (1 << (TypetonParser.STRING_LIT - 42)))) !== 0)) {
				{
				this.state = 269;
				this.argumentList();
				}
			}

			this.state = 272;
			this.match(TypetonParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structFieldAccess(): StructFieldAccessContext {
		let _localctx: StructFieldAccessContext = new StructFieldAccessContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, TypetonParser.RULE_structFieldAccess);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 274;
			this.match(TypetonParser.ID);
			this.state = 277;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 275;
					this.match(TypetonParser.DOT);
					this.state = 276;
					this.match(TypetonParser.ID);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 279;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 13, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public returnStmt(): ReturnStmtContext {
		let _localctx: ReturnStmtContext = new ReturnStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, TypetonParser.RULE_returnStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 281;
			this.match(TypetonParser.RETURN);
			this.state = 283;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TypetonParser.PLUS) | (1 << TypetonParser.MINUS) | (1 << TypetonParser.MULT))) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & ((1 << (TypetonParser.AMPERSAND - 42)) | (1 << (TypetonParser.NOT - 42)) | (1 << (TypetonParser.ABS - 42)) | (1 << (TypetonParser.SQRT - 42)) | (1 << (TypetonParser.ATAN2 - 42)) | (1 << (TypetonParser.SIN - 42)) | (1 << (TypetonParser.COS - 42)) | (1 << (TypetonParser.TAN - 42)) | (1 << (TypetonParser.FLOOR - 42)) | (1 << (TypetonParser.CEIL - 42)) | (1 << (TypetonParser.ROUND - 42)) | (1 << (TypetonParser.MIN - 42)) | (1 << (TypetonParser.MAX - 42)) | (1 << (TypetonParser.CLAMP - 42)) | (1 << (TypetonParser.LPAREN - 42)) | (1 << (TypetonParser.ID - 42)) | (1 << (TypetonParser.INT_LIT - 42)) | (1 << (TypetonParser.FLOAT_LIT - 42)) | (1 << (TypetonParser.STRING_LIT - 42)))) !== 0)) {
				{
				this.state = 282;
				this.expression(0);
				}
			}

			this.state = 285;
			this.match(TypetonParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public breakStmt(): BreakStmtContext {
		let _localctx: BreakStmtContext = new BreakStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, TypetonParser.RULE_breakStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 287;
			this.match(TypetonParser.BREAK);
			this.state = 288;
			this.match(TypetonParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public continueStmt(): ContinueStmtContext {
		let _localctx: ContinueStmtContext = new ContinueStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, TypetonParser.RULE_continueStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 290;
			this.match(TypetonParser.CONTINUE);
			this.state = 291;
			this.match(TypetonParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionExpr(): FunctionExprContext {
		let _localctx: FunctionExprContext = new FunctionExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, TypetonParser.RULE_functionExpr);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 293;
			this.match(TypetonParser.LPAREN);
			this.state = 295;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TypetonParser.ID) {
				{
				this.state = 294;
				this.parameterList();
				}
			}

			this.state = 297;
			this.match(TypetonParser.RPAREN);
			this.state = 298;
			this.match(TypetonParser.COLON);
			this.state = 299;
			this.returnType();
			this.state = 300;
			this.match(TypetonParser.ARROW);
			this.state = 301;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameterList(): ParameterListContext {
		let _localctx: ParameterListContext = new ParameterListContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, TypetonParser.RULE_parameterList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 303;
			this.parameter();
			this.state = 308;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === TypetonParser.COMMA) {
				{
				{
				this.state = 304;
				this.match(TypetonParser.COMMA);
				this.state = 305;
				this.parameter();
				}
				}
				this.state = 310;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameter(): ParameterContext {
		let _localctx: ParameterContext = new ParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, TypetonParser.RULE_parameter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 311;
			this.match(TypetonParser.ID);
			this.state = 312;
			this.match(TypetonParser.COLON);
			this.state = 314;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TypetonParser.AMPERSAND) {
				{
				this.state = 313;
				this.match(TypetonParser.AMPERSAND);
				}
			}

			this.state = 316;
			this.type();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type(): TypeContext {
		let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, TypetonParser.RULE_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 318;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TypetonParser.TYPE_INT32) | (1 << TypetonParser.TYPE_INT16) | (1 << TypetonParser.TYPE_INT8) | (1 << TypetonParser.TYPE_UINT32) | (1 << TypetonParser.TYPE_UINT16) | (1 << TypetonParser.TYPE_UINT8) | (1 << TypetonParser.TYPE_FLOAT) | (1 << TypetonParser.TYPE_BOOL))) !== 0) || _la === TypetonParser.ID)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public returnType(): ReturnTypeContext {
		let _localctx: ReturnTypeContext = new ReturnTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, TypetonParser.RULE_returnType);
		try {
			this.state = 322;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TypetonParser.TYPE_INT32:
			case TypetonParser.TYPE_INT16:
			case TypetonParser.TYPE_INT8:
			case TypetonParser.TYPE_UINT32:
			case TypetonParser.TYPE_UINT16:
			case TypetonParser.TYPE_UINT8:
			case TypetonParser.TYPE_FLOAT:
			case TypetonParser.TYPE_BOOL:
			case TypetonParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 320;
				this.type();
				}
				break;
			case TypetonParser.TYPE_VOID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 321;
				this.match(TypetonParser.TYPE_VOID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 54;
		this.enterRecursionRule(_localctx, 54, TypetonParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 404;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TypetonParser.MULT:
			case TypetonParser.AMPERSAND:
				{
				_localctx = new AddressOpContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 325;
				_la = this._input.LA(1);
				if (!(_la === TypetonParser.MULT || _la === TypetonParser.AMPERSAND)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 326;
				this.expression(17);
				}
				break;
			case TypetonParser.SIN:
				{
				_localctx = new SinExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 327;
				this.match(TypetonParser.SIN);
				this.state = 328;
				this.match(TypetonParser.LPAREN);
				this.state = 329;
				this.expression(0);
				this.state = 330;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.COS:
				{
				_localctx = new CosExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 332;
				this.match(TypetonParser.COS);
				this.state = 333;
				this.match(TypetonParser.LPAREN);
				this.state = 334;
				this.expression(0);
				this.state = 335;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.TAN:
				{
				_localctx = new TanExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 337;
				this.match(TypetonParser.TAN);
				this.state = 338;
				this.match(TypetonParser.LPAREN);
				this.state = 339;
				this.expression(0);
				this.state = 340;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.ABS:
				{
				_localctx = new AbsExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 342;
				this.match(TypetonParser.ABS);
				this.state = 343;
				this.match(TypetonParser.LPAREN);
				this.state = 344;
				this.expression(0);
				this.state = 345;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.SQRT:
				{
				_localctx = new SqrtExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 347;
				this.match(TypetonParser.SQRT);
				this.state = 348;
				this.match(TypetonParser.LPAREN);
				this.state = 349;
				this.expression(0);
				this.state = 350;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.ATAN2:
				{
				_localctx = new Atan2ExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 352;
				this.match(TypetonParser.ATAN2);
				this.state = 353;
				this.match(TypetonParser.LPAREN);
				this.state = 354;
				this.expression(0);
				this.state = 355;
				this.match(TypetonParser.COMMA);
				this.state = 356;
				this.expression(0);
				this.state = 357;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.FLOOR:
				{
				_localctx = new FloorExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 359;
				this.match(TypetonParser.FLOOR);
				this.state = 360;
				this.match(TypetonParser.LPAREN);
				this.state = 361;
				this.expression(0);
				this.state = 362;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.CEIL:
				{
				_localctx = new CeilExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 364;
				this.match(TypetonParser.CEIL);
				this.state = 365;
				this.match(TypetonParser.LPAREN);
				this.state = 366;
				this.expression(0);
				this.state = 367;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.ROUND:
				{
				_localctx = new RoundExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 369;
				this.match(TypetonParser.ROUND);
				this.state = 370;
				this.match(TypetonParser.LPAREN);
				this.state = 371;
				this.expression(0);
				this.state = 372;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.MIN:
				{
				_localctx = new MinExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 374;
				this.match(TypetonParser.MIN);
				this.state = 375;
				this.match(TypetonParser.LPAREN);
				this.state = 376;
				this.expression(0);
				this.state = 377;
				this.match(TypetonParser.COMMA);
				this.state = 378;
				this.expression(0);
				this.state = 379;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.MAX:
				{
				_localctx = new MaxExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 381;
				this.match(TypetonParser.MAX);
				this.state = 382;
				this.match(TypetonParser.LPAREN);
				this.state = 383;
				this.expression(0);
				this.state = 384;
				this.match(TypetonParser.COMMA);
				this.state = 385;
				this.expression(0);
				this.state = 386;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.CLAMP:
				{
				_localctx = new ClampExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 388;
				this.match(TypetonParser.CLAMP);
				this.state = 389;
				this.match(TypetonParser.LPAREN);
				this.state = 390;
				this.expression(0);
				this.state = 391;
				this.match(TypetonParser.COMMA);
				this.state = 392;
				this.expression(0);
				this.state = 393;
				this.match(TypetonParser.COMMA);
				this.state = 394;
				this.expression(0);
				this.state = 395;
				this.match(TypetonParser.RPAREN);
				}
				break;
			case TypetonParser.LPAREN:
			case TypetonParser.ID:
			case TypetonParser.INT_LIT:
			case TypetonParser.FLOAT_LIT:
			case TypetonParser.STRING_LIT:
				{
				_localctx = new AtomExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 397;
				this.atom();
				}
				break;
			case TypetonParser.MINUS:
				{
				_localctx = new UnaryMinusExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 398;
				this.match(TypetonParser.MINUS);
				this.state = 399;
				this.expression(3);
				}
				break;
			case TypetonParser.PLUS:
				{
				_localctx = new UnaryPlusExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 400;
				this.match(TypetonParser.PLUS);
				this.state = 401;
				this.expression(2);
				}
				break;
			case TypetonParser.NOT:
				{
				_localctx = new NotExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 402;
				this.match(TypetonParser.NOT);
				this.state = 403;
				this.expression(1);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 423;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 421;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
					case 1:
						{
						_localctx = new MulDivContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, TypetonParser.RULE_expression);
						this.state = 406;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 407;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TypetonParser.MULT) | (1 << TypetonParser.MOD) | (1 << TypetonParser.DIV))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 408;
						this.expression(23);
						}
						break;

					case 2:
						{
						_localctx = new AddSubContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, TypetonParser.RULE_expression);
						this.state = 409;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 410;
						_la = this._input.LA(1);
						if (!(_la === TypetonParser.PLUS || _la === TypetonParser.MINUS)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 411;
						this.expression(22);
						}
						break;

					case 3:
						{
						_localctx = new CompareContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, TypetonParser.RULE_expression);
						this.state = 412;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 413;
						_la = this._input.LA(1);
						if (!(((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (TypetonParser.LESS_EQUAL - 34)) | (1 << (TypetonParser.GREAT_EQUAL - 34)) | (1 << (TypetonParser.EQUAL - 34)) | (1 << (TypetonParser.NOT_EQUAL - 34)) | (1 << (TypetonParser.LESS_THAN - 34)) | (1 << (TypetonParser.GREAT_THAN - 34)))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 414;
						this.expression(21);
						}
						break;

					case 4:
						{
						_localctx = new AndExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, TypetonParser.RULE_expression);
						this.state = 415;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 416;
						this.match(TypetonParser.LOGICAL_AND);
						this.state = 417;
						this.expression(20);
						}
						break;

					case 5:
						{
						_localctx = new OrExprContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, TypetonParser.RULE_expression);
						this.state = 418;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 419;
						this.match(TypetonParser.LOGICAL_OR);
						this.state = 420;
						this.expression(19);
						}
						break;
					}
					}
				}
				this.state = 425;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public atom(): AtomContext {
		let _localctx: AtomContext = new AtomContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, TypetonParser.RULE_atom);
		try {
			this.state = 442;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				_localctx = new ArrayAccessContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 426;
				this.match(TypetonParser.ID);
				this.state = 427;
				this.match(TypetonParser.LBRACKET);
				this.state = 428;
				this.expression(0);
				this.state = 429;
				this.match(TypetonParser.RBRACKET);
				}
				break;

			case 2:
				_localctx = new MethodCallAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 431;
				this.methodCall();
				}
				break;

			case 3:
				_localctx = new QualifiedNameAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 432;
				this.qualifiedName();
				}
				break;

			case 4:
				_localctx = new StructFieldAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 433;
				this.structFieldAccess();
				}
				break;

			case 5:
				_localctx = new IdAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 434;
				this.match(TypetonParser.ID);
				}
				break;

			case 6:
				_localctx = new IntAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 435;
				this.match(TypetonParser.INT_LIT);
				}
				break;

			case 7:
				_localctx = new FloatAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 436;
				this.match(TypetonParser.FLOAT_LIT);
				}
				break;

			case 8:
				_localctx = new StringAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 437;
				this.match(TypetonParser.STRING_LIT);
				}
				break;

			case 9:
				_localctx = new ParenAtomContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 438;
				this.match(TypetonParser.LPAREN);
				this.state = 439;
				this.expression(0);
				this.state = 440;
				this.match(TypetonParser.RPAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structDecl(): StructDeclContext {
		let _localctx: StructDeclContext = new StructDeclContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, TypetonParser.RULE_structDecl);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 444;
			this.match(TypetonParser.STRUCT);
			this.state = 445;
			this.match(TypetonParser.ID);
			this.state = 446;
			this.match(TypetonParser.LBRACE);
			this.state = 448;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 447;
				this.structField();
				}
				}
				this.state = 450;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === TypetonParser.ID);
			this.state = 452;
			this.match(TypetonParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structField(): StructFieldContext {
		let _localctx: StructFieldContext = new StructFieldContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, TypetonParser.RULE_structField);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 454;
			this.match(TypetonParser.ID);
			this.state = 455;
			this.match(TypetonParser.COLON);
			this.state = 456;
			this.type();
			this.state = 457;
			this.match(TypetonParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 27:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 22);

		case 1:
			return this.precpred(this._ctx, 21);

		case 2:
			return this.precpred(this._ctx, 20);

		case 3:
			return this.precpred(this._ctx, 19);

		case 4:
			return this.precpred(this._ctx, 18);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03K\u01CE\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x03\x02\x07\x02B\n\x02" +
		"\f\x02\x0E\x02E\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x05\x03X\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x05\x05f\n\x05" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07" +
		"\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x05\b|\n\b\x03\t\x03\t\x07\t\x80\n\t\f\t\x0E\t\x83\v\t\x03\t\x03\t" +
		"\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\xA9" +
		"\n\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v" +
		"\x03\v\x03\v\x03\v\x05\v\xB9\n\v\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\xDF\n\r\x03\x0E\x03\x0E\x03\x0E" +
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\xEB\n" +
		"\x0F\f\x0F\x0E\x0F\xEE\v\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x07" +
		"\x10\xF5\n\x10\f\x10\x0E\x10\xF8\v\x10\x03\x11\x03\x11\x03\x11\x03\x11" +
		"\x03\x11\x03\x11\x03\x11\x07\x11\u0101\n\x11\f\x11\x0E\x11\u0104\v\x11" +
		"\x03\x12\x03\x12\x03\x12\x07\x12\u0109\n\x12\f\x12\x0E\x12\u010C\v\x12" +
		"\x03\x13\x03\x13\x03\x13\x05\x13\u0111\n\x13\x03\x13\x03\x13\x03\x14\x03" +
		"\x14\x03\x14\x06\x14\u0118\n\x14\r\x14\x0E\x14\u0119\x03\x15\x03\x15\x05" +
		"\x15\u011E\n\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17" +
		"\x03\x17\x03\x18\x03\x18\x05\x18\u012A\n\x18\x03\x18\x03\x18\x03\x18\x03" +
		"\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x07\x19\u0135\n\x19\f\x19" +
		"\x0E\x19\u0138\v\x19\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u013D\n\x1A\x03\x1A" +
		"\x03\x1A\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x05\x1C\u0145\n\x1C\x03\x1D\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03" +
		"\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u0197\n\x1D" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u01A8\n\x1D\f" +
		"\x1D\x0E\x1D\u01AB\v\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x05\x1E\u01BD\n\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x06\x1F\u01C3" +
		"\n\x1F\r\x1F\x0E\x1F\u01C4\x03\x1F\x03\x1F\x03 \x03 \x03 \x03 \x03 \x03" +
		" \x02\x02\x038!\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10" +
		"\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02" +
		"$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02" +
		"\x02\x07\x04\x02\x0E\x15FF\x04\x02\x19\x19,,\x03\x02\x19\x1B\x03\x02\x17" +
		"\x18\x03\x02$)\x02\u01F4\x02C\x03\x02\x02\x02\x04W\x03\x02\x02\x02\x06" +
		"Y\x03\x02\x02\x02\be\x03\x02\x02\x02\ng\x03\x02\x02\x02\fn\x03\x02\x02" +
		"\x02\x0Et\x03\x02\x02\x02\x10}\x03\x02\x02\x02\x12\xA8\x03\x02\x02\x02" +
		"\x14\xB8\x03\x02\x02\x02\x16\xBA\x03\x02\x02\x02\x18\xDE\x03\x02\x02\x02" +
		"\x1A\xE0\x03\x02\x02\x02\x1C\xE6\x03\x02\x02\x02\x1E\xF1\x03\x02\x02\x02" +
		" \xF9\x03\x02\x02\x02\"\u0105\x03\x02\x02\x02$\u010D\x03\x02\x02\x02&" +
		"\u0114\x03\x02\x02\x02(\u011B\x03\x02\x02\x02*\u0121\x03\x02\x02\x02," +
		"\u0124\x03\x02\x02\x02.\u0127\x03\x02\x02\x020\u0131\x03\x02\x02\x022" +
		"\u0139\x03\x02\x02\x024\u0140\x03\x02\x02\x026\u0144\x03\x02\x02\x028" +
		"\u0196\x03\x02\x02\x02:\u01BC\x03\x02\x02\x02<\u01BE\x03\x02\x02\x02>" +
		"\u01C8\x03\x02\x02\x02@B\x05\x04\x03\x02A@\x03\x02\x02\x02BE\x03\x02\x02" +
		"\x02CA\x03\x02\x02\x02CD\x03\x02\x02\x02DF\x03\x02\x02\x02EC\x03\x02\x02" +
		"\x02FG\x07\x02\x02\x03G\x03\x03\x02\x02\x02HX\x05<\x1F\x02IX\x05\x12\n" +
		"\x02JX\x05\x14\v\x02KX\x05\x16\f\x02LX\x05\x1A\x0E\x02MX\x05\x06\x04\x02" +
		"NX\x05\f\x07\x02OX\x05\x0E\b\x02PX\x05*\x16\x02QX\x05,\x17\x02RX\x05\x10" +
		"\t\x02ST\x05$\x13\x02TU\x07A\x02\x02UX\x03\x02\x02\x02VX\x05(\x15\x02" +
		"WH\x03\x02\x02\x02WI\x03\x02\x02\x02WJ\x03\x02\x02\x02WK\x03\x02\x02\x02" +
		"WL\x03\x02\x02\x02WM\x03\x02\x02\x02WN\x03\x02\x02\x02WO\x03\x02\x02\x02" +
		"WP\x03\x02\x02\x02WQ\x03\x02\x02\x02WR\x03\x02\x02\x02WS\x03\x02\x02\x02" +
		"WV\x03\x02\x02\x02X\x05\x03\x02\x02\x02YZ\x07\x07\x02\x02Z[\x07:\x02\x02" +
		"[\\\x05\b\x05\x02\\]\x07A\x02\x02]^\x058\x1D\x02^_\x07A\x02\x02_`\x05" +
		"\x18\r\x02`a\x07;\x02\x02ab\x05\x04\x03\x02b\x07\x03\x02\x02\x02cf\x05" +
		"\x18\r\x02df\x05\n\x06\x02ec\x03\x02\x02\x02ed\x03\x02\x02\x02f\t\x03" +
		"\x02\x02\x02gh\x07\x03\x02\x02hi\x07F\x02\x02ij\x07@\x02\x02jk\x054\x1B" +
		"\x02kl\x07\x1C\x02\x02lm\x058\x1D\x02m\v\x03\x02\x02\x02no\x07\b\x02\x02" +
		"op\x07:\x02\x02pq\x058\x1D\x02qr\x07;\x02\x02rs\x05\x04\x03\x02s\r\x03" +
		"\x02\x02\x02tu\x07\t\x02\x02uv\x07:\x02\x02vw\x058\x1D\x02wx\x07;\x02" +
		"\x02x{\x05\x04\x03\x02yz\x07\n\x02\x02z|\x05\x04\x03\x02{y\x03\x02\x02" +
		"\x02{|\x03\x02\x02\x02|\x0F\x03\x02\x02\x02}\x81\x07>\x02\x02~\x80\x05" +
		"\x04\x03\x02\x7F~\x03\x02\x02\x02\x80\x83\x03\x02\x02\x02\x81\x7F\x03" +
		"\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x84\x03\x02\x02\x02\x83\x81\x03" +
		"\x02\x02\x02\x84\x85\x07?\x02\x02\x85\x11\x03\x02\x02\x02\x86\x87\x07" +
		"\x03\x02\x02\x87\x88\x07F\x02\x02\x88\x89\x07@\x02\x02\x89\x8A\x054\x1B" +
		"\x02\x8A\x8B\x07\x1C\x02\x02\x8B\x8C\x058\x1D\x02\x8C\x8D\x07A\x02\x02" +
		"\x8D\xA9\x03\x02\x02\x02\x8E\x8F\x07\x03\x02\x02\x8F\x90\x07F\x02\x02" +
		"\x90\x91\x07@\x02\x02\x91\x92\x054\x1B\x02\x92\x93\x07A\x02\x02\x93\xA9" +
		"\x03\x02\x02\x02\x94\x95\x07\x03\x02\x02\x95\x96\x07F\x02\x02\x96\x97" +
		"\x07@\x02\x02\x97\x98\x054\x1B\x02\x98\x99\x07<\x02\x02\x99\x9A\x07G\x02" +
		"\x02\x9A\x9B\x07=\x02\x02\x9B\x9C\x07A\x02\x02\x9C\xA9\x03\x02\x02\x02" +
		"\x9D\x9E\x07\x03\x02\x02\x9E\x9F\x07F\x02\x02\x9F\xA0\x07@\x02\x02\xA0" +
		"\xA1\x054\x1B\x02\xA1\xA2\x07<\x02\x02\xA2\xA3\x07G\x02\x02\xA3\xA4\x07" +
		"=\x02\x02\xA4\xA5\x07\x1C\x02\x02\xA5\xA6\x05\x1C\x0F\x02\xA6\xA7\x07" +
		"A\x02\x02\xA7\xA9\x03\x02\x02\x02\xA8\x86\x03\x02\x02\x02\xA8\x8E\x03" +
		"\x02\x02\x02\xA8\x94\x03\x02\x02\x02\xA8\x9D\x03\x02\x02\x02\xA9\x13\x03" +
		"\x02\x02\x02\xAA\xAB\x07\x04\x02\x02\xAB\xAC\x07F\x02\x02\xAC\xAD\x07" +
		"\x1C\x02\x02\xAD\xAE\x05.\x18\x02\xAE\xAF\x07A\x02\x02\xAF\xB9\x03\x02" +
		"\x02\x02\xB0\xB1\x07\x04\x02\x02\xB1\xB2\x07F\x02\x02\xB2\xB3\x07@\x02" +
		"\x02\xB3\xB4\x054\x1B\x02\xB4\xB5\x07\x1C\x02\x02\xB5\xB6\x058\x1D\x02" +
		"\xB6\xB7\x07A\x02\x02\xB7\xB9\x03\x02\x02\x02\xB8\xAA\x03\x02\x02\x02" +
		"\xB8\xB0\x03\x02\x02\x02\xB9\x15\x03\x02\x02\x02\xBA\xBB\x05\x18\r\x02" +
		"\xBB\xBC\x07A\x02\x02\xBC\x17\x03\x02\x02\x02\xBD\xBE\x07F\x02\x02\xBE" +
		"\xBF\x07\x1C\x02\x02\xBF\xDF\x058\x1D\x02\xC0\xC1\x07F\x02\x02\xC1\xC2" +
		"\x07\x1D\x02\x02\xC2\xDF\x058\x1D\x02\xC3\xC4\x07F\x02\x02\xC4\xC5\x07" +
		"\x1E\x02\x02\xC5\xDF\x058\x1D\x02\xC6\xC7\x07F\x02\x02\xC7\xC8\x07\x1F" +
		"\x02\x02\xC8\xDF\x058\x1D\x02\xC9\xCA\x07F\x02\x02\xCA\xCB\x07 \x02\x02" +
		"\xCB\xDF\x058\x1D\x02\xCC\xCD\x07F\x02\x02\xCD\xCE\x07!\x02\x02\xCE\xDF" +
		"\x058\x1D\x02\xCF\xD0\x07F\x02\x02\xD0\xDF\x07\"\x02\x02\xD1\xD2\x07F" +
		"\x02\x02\xD2\xDF\x07#\x02\x02\xD3\xD4\x07F\x02\x02\xD4\xD5\x07<\x02\x02" +
		"\xD5\xD6\x058\x1D\x02\xD6\xD7\x07=\x02\x02\xD7\xD8\x07\x1C\x02\x02\xD8" +
		"\xD9\x058\x1D\x02\xD9\xDF\x03\x02\x02\x02\xDA\xDB\x05&\x14\x02\xDB\xDC" +
		"\x07\x1C\x02\x02\xDC\xDD\x058\x1D\x02\xDD\xDF\x03\x02\x02\x02\xDE\xBD" +
		"\x03\x02\x02\x02\xDE\xC0\x03\x02\x02\x02\xDE\xC3\x03\x02\x02\x02\xDE\xC6" +
		"\x03\x02\x02\x02\xDE\xC9\x03\x02\x02\x02\xDE\xCC\x03\x02\x02\x02\xDE\xCF" +
		"\x03\x02\x02\x02\xDE\xD1\x03\x02\x02\x02\xDE\xD3\x03\x02\x02\x02\xDE\xDA" +
		"\x03\x02\x02\x02\xDF\x19\x03\x02\x02\x02\xE0\xE1\x07\x06\x02\x02\xE1\xE2" +
		"\x07:\x02\x02\xE2\xE3\x058\x1D\x02\xE3\xE4\x07;\x02\x02\xE4\xE5\x07A\x02" +
		"\x02\xE5\x1B\x03\x02\x02\x02\xE6\xE7\x07<\x02\x02\xE7\xEC\x058\x1D\x02" +
		"\xE8\xE9\x07B\x02\x02\xE9\xEB\x058\x1D\x02\xEA\xE8\x03\x02\x02\x02\xEB" +
		"\xEE\x03\x02\x02\x02\xEC\xEA\x03\x02\x02\x02\xEC\xED\x03\x02\x02\x02\xED" +
		"\xEF\x03\x02\x02\x02\xEE\xEC\x03\x02\x02\x02\xEF\xF0\x07=\x02\x02\xF0" +
		"\x1D\x03\x02\x02\x02\xF1\xF6\x058\x1D\x02\xF2\xF3\x07B\x02\x02\xF3\xF5" +
		"\x058\x1D\x02\xF4\xF2\x03\x02\x02\x02\xF5\xF8\x03\x02\x02\x02\xF6\xF4" +
		"\x03\x02\x02\x02\xF6\xF7\x03\x02\x02\x02\xF7\x1F\x03\x02\x02\x02\xF8\xF6" +
		"\x03\x02\x02\x02\xF9\xFA\x07F\x02\x02\xFA\xFB\x07C\x02\x02\xFB\xFC\x07" +
		"E\x02\x02\xFC\xFD\x07C\x02\x02\xFD\u0102\x07F\x02\x02\xFE\xFF\x07C\x02" +
		"\x02\xFF\u0101\x07F\x02\x02\u0100\xFE\x03\x02\x02\x02\u0101\u0104\x03" +
		"\x02\x02\x02\u0102\u0100\x03\x02\x02\x02\u0102\u0103\x03\x02\x02\x02\u0103" +
		"!\x03\x02\x02\x02\u0104\u0102\x03\x02\x02\x02\u0105\u010A\x07F\x02\x02" +
		"\u0106\u0107\x07C\x02\x02\u0107\u0109\x07F\x02\x02\u0108\u0106\x03\x02" +
		"\x02\x02\u0109\u010C\x03\x02\x02\x02\u010A\u0108\x03\x02\x02\x02\u010A" +
		"\u010B\x03\x02\x02\x02\u010B#\x03\x02\x02\x02\u010C\u010A\x03\x02\x02" +
		"\x02\u010D\u010E\x05\"\x12\x02\u010E\u0110\x07:\x02\x02\u010F\u0111\x05" +
		"\x1E\x10\x02\u0110\u010F\x03\x02\x02\x02\u0110\u0111\x03\x02\x02\x02\u0111" +
		"\u0112\x03\x02\x02\x02\u0112\u0113\x07;\x02\x02\u0113%\x03\x02\x02\x02" +
		"\u0114\u0117\x07F\x02\x02\u0115\u0116\x07C\x02\x02\u0116\u0118\x07F\x02" +
		"\x02\u0117\u0115\x03\x02\x02\x02\u0118\u0119\x03\x02\x02\x02\u0119\u0117" +
		"\x03\x02\x02\x02\u0119\u011A\x03\x02\x02\x02\u011A\'\x03\x02\x02\x02\u011B" +
		"\u011D\x07\v\x02\x02\u011C\u011E\x058\x1D\x02\u011D\u011C\x03\x02\x02" +
		"\x02\u011D\u011E\x03\x02\x02\x02\u011E\u011F\x03\x02\x02\x02\u011F\u0120" +
		"\x07A\x02\x02\u0120)\x03\x02\x02\x02\u0121\u0122\x07\f\x02\x02\u0122\u0123" +
		"\x07A\x02\x02\u0123+\x03\x02\x02\x02\u0124\u0125\x07\r\x02\x02\u0125\u0126" +
		"\x07A\x02\x02\u0126-\x03\x02\x02\x02\u0127\u0129\x07:\x02\x02\u0128\u012A" +
		"\x050\x19\x02\u0129\u0128\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02" +
		"\u012A\u012B\x03\x02\x02\x02\u012B\u012C\x07;\x02\x02\u012C\u012D\x07" +
		"@\x02\x02\u012D\u012E\x056\x1C\x02\u012E\u012F\x07D\x02\x02\u012F\u0130" +
		"\x05\x10\t\x02\u0130/\x03\x02\x02\x02\u0131\u0136\x052\x1A\x02\u0132\u0133" +
		"\x07B\x02\x02\u0133\u0135\x052\x1A\x02\u0134\u0132\x03\x02\x02\x02\u0135" +
		"\u0138\x03\x02\x02\x02\u0136\u0134\x03\x02\x02\x02\u0136\u0137\x03\x02" +
		"\x02\x02\u01371\x03\x02\x02\x02\u0138\u0136\x03\x02\x02\x02\u0139\u013A" +
		"\x07F\x02\x02\u013A\u013C\x07@\x02\x02\u013B\u013D\x07,\x02\x02\u013C" +
		"\u013B\x03\x02\x02\x02\u013C\u013D\x03\x02\x02\x02\u013D\u013E\x03\x02" +
		"\x02\x02\u013E\u013F\x054\x1B\x02\u013F3\x03\x02\x02\x02\u0140\u0141\t" +
		"\x02\x02\x02\u01415\x03\x02\x02\x02\u0142\u0145\x054\x1B\x02\u0143\u0145" +
		"\x07\x16\x02\x02\u0144\u0142\x03\x02\x02\x02\u0144\u0143\x03\x02\x02\x02" +
		"\u01457\x03\x02\x02\x02\u0146\u0147\b\x1D\x01\x02\u0147\u0148\t\x03\x02" +
		"\x02\u0148\u0197\x058\x1D\x13\u0149\u014A\x071\x02\x02\u014A\u014B\x07" +
		":\x02\x02\u014B\u014C\x058\x1D\x02\u014C\u014D\x07;\x02\x02\u014D\u0197" +
		"\x03\x02\x02\x02\u014E\u014F\x072\x02\x02\u014F\u0150\x07:\x02\x02\u0150" +
		"\u0151\x058\x1D\x02\u0151\u0152\x07;\x02\x02\u0152\u0197\x03\x02\x02\x02" +
		"\u0153\u0154\x073\x02\x02\u0154\u0155\x07:\x02\x02\u0155\u0156\x058\x1D" +
		"\x02\u0156\u0157\x07;\x02\x02\u0157\u0197\x03\x02\x02\x02\u0158\u0159" +
		"\x07.\x02\x02\u0159\u015A\x07:\x02\x02\u015A\u015B\x058\x1D\x02\u015B" +
		"\u015C\x07;\x02\x02\u015C\u0197\x03\x02\x02\x02\u015D\u015E\x07/\x02\x02" +
		"\u015E\u015F\x07:\x02\x02\u015F\u0160\x058\x1D\x02\u0160\u0161\x07;\x02" +
		"\x02\u0161\u0197\x03\x02\x02\x02\u0162\u0163\x070\x02\x02\u0163\u0164" +
		"\x07:\x02\x02\u0164\u0165\x058\x1D\x02\u0165\u0166\x07B\x02\x02\u0166" +
		"\u0167\x058\x1D\x02\u0167\u0168\x07;\x02\x02\u0168\u0197\x03\x02\x02\x02" +
		"\u0169\u016A\x074\x02\x02\u016A\u016B\x07:\x02\x02\u016B\u016C\x058\x1D" +
		"\x02\u016C\u016D\x07;\x02\x02\u016D\u0197\x03\x02\x02\x02\u016E\u016F" +
		"\x075\x02\x02\u016F\u0170\x07:\x02\x02\u0170\u0171\x058\x1D\x02\u0171" +
		"\u0172\x07;\x02\x02\u0172\u0197\x03\x02\x02\x02\u0173\u0174\x076\x02\x02" +
		"\u0174\u0175\x07:\x02\x02\u0175\u0176\x058\x1D\x02\u0176\u0177\x07;\x02" +
		"\x02\u0177\u0197\x03\x02\x02\x02\u0178\u0179\x077\x02\x02\u0179\u017A" +
		"\x07:\x02\x02\u017A\u017B\x058\x1D\x02\u017B\u017C\x07B\x02\x02\u017C" +
		"\u017D\x058\x1D\x02\u017D\u017E\x07;\x02\x02\u017E\u0197\x03\x02\x02\x02" +
		"\u017F\u0180\x078\x02\x02\u0180\u0181\x07:\x02\x02\u0181\u0182\x058\x1D" +
		"\x02\u0182\u0183\x07B\x02\x02\u0183\u0184\x058\x1D\x02\u0184\u0185\x07" +
		";\x02\x02\u0185\u0197\x03\x02\x02\x02\u0186\u0187\x079\x02\x02\u0187\u0188" +
		"\x07:\x02\x02\u0188\u0189\x058\x1D\x02\u0189\u018A\x07B\x02\x02\u018A" +
		"\u018B\x058\x1D\x02\u018B\u018C\x07B\x02\x02\u018C\u018D\x058\x1D\x02" +
		"\u018D\u018E\x07;\x02\x02\u018E\u0197\x03\x02\x02\x02\u018F\u0197\x05" +
		":\x1E\x02\u0190\u0191\x07\x18\x02\x02\u0191\u0197\x058\x1D\x05\u0192\u0193" +
		"\x07\x17\x02\x02\u0193\u0197\x058\x1D\x04\u0194\u0195\x07-\x02\x02\u0195" +
		"\u0197\x058\x1D\x03\u0196\u0146\x03\x02\x02\x02\u0196\u0149\x03\x02\x02" +
		"\x02\u0196\u014E\x03\x02\x02\x02\u0196\u0153\x03\x02\x02\x02\u0196\u0158" +
		"\x03\x02\x02\x02\u0196\u015D\x03\x02\x02\x02\u0196\u0162\x03\x02\x02\x02" +
		"\u0196\u0169\x03\x02\x02\x02\u0196\u016E\x03\x02\x02\x02\u0196\u0173\x03" +
		"\x02\x02\x02\u0196\u0178\x03\x02\x02\x02\u0196\u017F\x03\x02\x02\x02\u0196" +
		"\u0186\x03\x02\x02\x02\u0196\u018F\x03\x02\x02\x02\u0196\u0190\x03\x02" +
		"\x02\x02\u0196\u0192\x03\x02\x02\x02\u0196\u0194\x03\x02\x02\x02\u0197" +
		"\u01A9\x03\x02\x02\x02\u0198\u0199\f\x18\x02\x02\u0199\u019A\t\x04\x02" +
		"\x02\u019A\u01A8\x058\x1D\x19\u019B\u019C\f\x17\x02\x02\u019C\u019D\t" +
		"\x05\x02\x02\u019D\u01A8\x058\x1D\x18\u019E\u019F\f\x16\x02\x02\u019F" +
		"\u01A0\t\x06\x02\x02\u01A0\u01A8\x058\x1D\x17\u01A1\u01A2\f\x15\x02\x02" +
		"\u01A2\u01A3\x07*\x02\x02\u01A3\u01A8\x058\x1D\x16\u01A4\u01A5\f\x14\x02" +
		"\x02\u01A5\u01A6\x07+\x02\x02\u01A6\u01A8\x058\x1D\x15\u01A7\u0198\x03" +
		"\x02\x02\x02\u01A7\u019B\x03\x02\x02\x02\u01A7\u019E\x03\x02\x02\x02\u01A7" +
		"\u01A1\x03\x02\x02\x02\u01A7\u01A4\x03\x02\x02\x02\u01A8\u01AB\x03\x02" +
		"\x02\x02\u01A9\u01A7\x03\x02\x02\x02\u01A9\u01AA\x03\x02\x02\x02\u01AA" +
		"9\x03\x02\x02\x02\u01AB\u01A9\x03\x02\x02\x02\u01AC\u01AD\x07F\x02\x02" +
		"\u01AD\u01AE\x07<\x02\x02\u01AE\u01AF\x058\x1D\x02\u01AF\u01B0\x07=\x02" +
		"\x02\u01B0\u01BD\x03\x02\x02\x02\u01B1\u01BD\x05$\x13\x02\u01B2\u01BD" +
		"\x05 \x11\x02\u01B3\u01BD\x05&\x14\x02\u01B4\u01BD\x07F\x02\x02\u01B5" +
		"\u01BD\x07G\x02\x02\u01B6\u01BD\x07H\x02\x02\u01B7\u01BD\x07I\x02\x02" +
		"\u01B8\u01B9\x07:\x02\x02\u01B9\u01BA\x058\x1D\x02\u01BA\u01BB\x07;\x02" +
		"\x02\u01BB\u01BD\x03\x02\x02\x02\u01BC\u01AC\x03\x02\x02\x02\u01BC\u01B1" +
		"\x03\x02\x02\x02\u01BC\u01B2\x03\x02\x02\x02\u01BC\u01B3\x03\x02\x02\x02" +
		"\u01BC\u01B4\x03\x02\x02\x02\u01BC\u01B5\x03\x02\x02\x02\u01BC\u01B6\x03" +
		"\x02\x02\x02\u01BC\u01B7\x03\x02\x02\x02\u01BC\u01B8\x03\x02\x02\x02\u01BD" +
		";\x03\x02\x02\x02\u01BE\u01BF\x07\x05\x02\x02\u01BF\u01C0\x07F\x02\x02" +
		"\u01C0\u01C2\x07>\x02\x02\u01C1\u01C3\x05> \x02\u01C2\u01C1\x03\x02\x02" +
		"\x02\u01C3\u01C4\x03\x02\x02\x02\u01C4\u01C2\x03\x02\x02\x02\u01C4\u01C5" +
		"\x03\x02\x02\x02\u01C5\u01C6\x03\x02\x02\x02\u01C6\u01C7\x07?\x02\x02" +
		"\u01C7=\x03\x02\x02\x02\u01C8\u01C9\x07F\x02\x02\u01C9\u01CA\x07@\x02" +
		"\x02\u01CA\u01CB\x054\x1B\x02\u01CB\u01CC\x07A\x02\x02\u01CC?\x03\x02" +
		"\x02\x02\x1ACWe{\x81\xA8\xB8\xDE\xEC\xF6\u0102\u010A\u0110\u0119\u011D" +
		"\u0129\u0136\u013C\u0144\u0196\u01A7\u01A9\u01BC\u01C4";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TypetonParser.__ATN) {
			TypetonParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(TypetonParser._serializedATN));
		}

		return TypetonParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(TypetonParser.EOF, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_program; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public structDecl(): StructDeclContext | undefined {
		return this.tryGetRuleContext(0, StructDeclContext);
	}
	public varDecl(): VarDeclContext | undefined {
		return this.tryGetRuleContext(0, VarDeclContext);
	}
	public constDecl(): ConstDeclContext | undefined {
		return this.tryGetRuleContext(0, ConstDeclContext);
	}
	public assignment(): AssignmentContext | undefined {
		return this.tryGetRuleContext(0, AssignmentContext);
	}
	public printStmt(): PrintStmtContext | undefined {
		return this.tryGetRuleContext(0, PrintStmtContext);
	}
	public forStmt(): ForStmtContext | undefined {
		return this.tryGetRuleContext(0, ForStmtContext);
	}
	public whileStmt(): WhileStmtContext | undefined {
		return this.tryGetRuleContext(0, WhileStmtContext);
	}
	public ifStmt(): IfStmtContext | undefined {
		return this.tryGetRuleContext(0, IfStmtContext);
	}
	public breakStmt(): BreakStmtContext | undefined {
		return this.tryGetRuleContext(0, BreakStmtContext);
	}
	public continueStmt(): ContinueStmtContext | undefined {
		return this.tryGetRuleContext(0, ContinueStmtContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public methodCall(): MethodCallContext | undefined {
		return this.tryGetRuleContext(0, MethodCallContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.SEMICOLON, 0); }
	public returnStmt(): ReturnStmtContext | undefined {
		return this.tryGetRuleContext(0, ReturnStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_statement; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForStmtContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(TypetonParser.FOR, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public forInit(): ForInitContext {
		return this.getRuleContext(0, ForInitContext);
	}
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.SEMICOLON);
		} else {
			return this.getToken(TypetonParser.SEMICOLON, i);
		}
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public simpleAssignment(): SimpleAssignmentContext {
		return this.getRuleContext(0, SimpleAssignmentContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_forStmt; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterForStmt) {
			listener.enterForStmt(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitForStmt) {
			listener.exitForStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitForStmt) {
			return visitor.visitForStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForInitContext extends ParserRuleContext {
	public simpleAssignment(): SimpleAssignmentContext | undefined {
		return this.tryGetRuleContext(0, SimpleAssignmentContext);
	}
	public forVarDecl(): ForVarDeclContext | undefined {
		return this.tryGetRuleContext(0, ForVarDeclContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_forInit; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterForInit) {
			listener.enterForInit(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitForInit) {
			listener.exitForInit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitForInit) {
			return visitor.visitForInit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForVarDeclContext extends ParserRuleContext {
	public VAR(): TerminalNode { return this.getToken(TypetonParser.VAR, 0); }
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public COLON(): TerminalNode { return this.getToken(TypetonParser.COLON, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public ASSIGN(): TerminalNode { return this.getToken(TypetonParser.ASSIGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_forVarDecl; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterForVarDecl) {
			listener.enterForVarDecl(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitForVarDecl) {
			listener.exitForVarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitForVarDecl) {
			return visitor.visitForVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhileStmtContext extends ParserRuleContext {
	public WHILE(): TerminalNode { return this.getToken(TypetonParser.WHILE, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_whileStmt; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterWhileStmt) {
			listener.enterWhileStmt(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitWhileStmt) {
			listener.exitWhileStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitWhileStmt) {
			return visitor.visitWhileStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStmtContext extends ParserRuleContext {
	public IF(): TerminalNode { return this.getToken(TypetonParser.IF, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.ELSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_ifStmt; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterIfStmt) {
			listener.enterIfStmt(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitIfStmt) {
			listener.exitIfStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitIfStmt) {
			return visitor.visitIfStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(TypetonParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(TypetonParser.RBRACE, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_block; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterBlock) {
			listener.enterBlock(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitBlock) {
			listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarDeclContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_varDecl; }
	public copyFrom(ctx: VarDeclContext): void {
		super.copyFrom(ctx);
	}
}
export class ScalarVarDeclContext extends VarDeclContext {
	public VAR(): TerminalNode { return this.getToken(TypetonParser.VAR, 0); }
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public COLON(): TerminalNode { return this.getToken(TypetonParser.COLON, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public ASSIGN(): TerminalNode { return this.getToken(TypetonParser.ASSIGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	constructor(ctx: VarDeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterScalarVarDecl) {
			listener.enterScalarVarDecl(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitScalarVarDecl) {
			listener.exitScalarVarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitScalarVarDecl) {
			return visitor.visitScalarVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ScalarVarDeclNoInitContext extends VarDeclContext {
	public VAR(): TerminalNode { return this.getToken(TypetonParser.VAR, 0); }
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public COLON(): TerminalNode { return this.getToken(TypetonParser.COLON, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	constructor(ctx: VarDeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterScalarVarDeclNoInit) {
			listener.enterScalarVarDeclNoInit(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitScalarVarDeclNoInit) {
			listener.exitScalarVarDeclNoInit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitScalarVarDeclNoInit) {
			return visitor.visitScalarVarDeclNoInit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrayVarDeclContext extends VarDeclContext {
	public VAR(): TerminalNode { return this.getToken(TypetonParser.VAR, 0); }
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public COLON(): TerminalNode { return this.getToken(TypetonParser.COLON, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public LBRACKET(): TerminalNode { return this.getToken(TypetonParser.LBRACKET, 0); }
	public INT_LIT(): TerminalNode { return this.getToken(TypetonParser.INT_LIT, 0); }
	public RBRACKET(): TerminalNode { return this.getToken(TypetonParser.RBRACKET, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	constructor(ctx: VarDeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterArrayVarDecl) {
			listener.enterArrayVarDecl(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitArrayVarDecl) {
			listener.exitArrayVarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitArrayVarDecl) {
			return visitor.visitArrayVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrayVarDeclInitContext extends VarDeclContext {
	public VAR(): TerminalNode { return this.getToken(TypetonParser.VAR, 0); }
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public COLON(): TerminalNode { return this.getToken(TypetonParser.COLON, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public LBRACKET(): TerminalNode { return this.getToken(TypetonParser.LBRACKET, 0); }
	public INT_LIT(): TerminalNode { return this.getToken(TypetonParser.INT_LIT, 0); }
	public RBRACKET(): TerminalNode { return this.getToken(TypetonParser.RBRACKET, 0); }
	public ASSIGN(): TerminalNode { return this.getToken(TypetonParser.ASSIGN, 0); }
	public arrayLiteral(): ArrayLiteralContext {
		return this.getRuleContext(0, ArrayLiteralContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	constructor(ctx: VarDeclContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterArrayVarDeclInit) {
			listener.enterArrayVarDeclInit(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitArrayVarDeclInit) {
			listener.exitArrayVarDeclInit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitArrayVarDeclInit) {
			return visitor.visitArrayVarDeclInit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstDeclContext extends ParserRuleContext {
	public CONST(): TerminalNode { return this.getToken(TypetonParser.CONST, 0); }
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public ASSIGN(): TerminalNode { return this.getToken(TypetonParser.ASSIGN, 0); }
	public functionExpr(): FunctionExprContext | undefined {
		return this.tryGetRuleContext(0, FunctionExprContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.COLON, 0); }
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_constDecl; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterConstDecl) {
			listener.enterConstDecl(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitConstDecl) {
			listener.exitConstDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitConstDecl) {
			return visitor.visitConstDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	public simpleAssignment(): SimpleAssignmentContext {
		return this.getRuleContext(0, SimpleAssignmentContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_assignment; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterAssignment) {
			listener.enterAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitAssignment) {
			listener.exitAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitAssignment) {
			return visitor.visitAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleAssignmentContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_simpleAssignment; }
	public copyFrom(ctx: SimpleAssignmentContext): void {
		super.copyFrom(ctx);
	}
}
export class ScalarAssignmentContext extends SimpleAssignmentContext {
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public ASSIGN(): TerminalNode { return this.getToken(TypetonParser.ASSIGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: SimpleAssignmentContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterScalarAssignment) {
			listener.enterScalarAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitScalarAssignment) {
			listener.exitScalarAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitScalarAssignment) {
			return visitor.visitScalarAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CompoundAssignmentContext extends SimpleAssignmentContext {
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public PLUS_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.PLUS_ASSIGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public MINUS_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.MINUS_ASSIGN, 0); }
	public MULT_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.MULT_ASSIGN, 0); }
	public DIV_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.DIV_ASSIGN, 0); }
	public MOD_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.MOD_ASSIGN, 0); }
	constructor(ctx: SimpleAssignmentContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterCompoundAssignment) {
			listener.enterCompoundAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitCompoundAssignment) {
			listener.exitCompoundAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitCompoundAssignment) {
			return visitor.visitCompoundAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PostfixIncrementContext extends SimpleAssignmentContext {
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public PLUSPLUS(): TerminalNode { return this.getToken(TypetonParser.PLUSPLUS, 0); }
	constructor(ctx: SimpleAssignmentContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterPostfixIncrement) {
			listener.enterPostfixIncrement(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitPostfixIncrement) {
			listener.exitPostfixIncrement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitPostfixIncrement) {
			return visitor.visitPostfixIncrement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PostfixDecrementContext extends SimpleAssignmentContext {
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public MINUSMINUS(): TerminalNode { return this.getToken(TypetonParser.MINUSMINUS, 0); }
	constructor(ctx: SimpleAssignmentContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterPostfixDecrement) {
			listener.enterPostfixDecrement(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitPostfixDecrement) {
			listener.exitPostfixDecrement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitPostfixDecrement) {
			return visitor.visitPostfixDecrement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrayAssignmentContext extends SimpleAssignmentContext {
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public LBRACKET(): TerminalNode { return this.getToken(TypetonParser.LBRACKET, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public RBRACKET(): TerminalNode { return this.getToken(TypetonParser.RBRACKET, 0); }
	public ASSIGN(): TerminalNode { return this.getToken(TypetonParser.ASSIGN, 0); }
	constructor(ctx: SimpleAssignmentContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterArrayAssignment) {
			listener.enterArrayAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitArrayAssignment) {
			listener.exitArrayAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitArrayAssignment) {
			return visitor.visitArrayAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StructAssignmentContext extends SimpleAssignmentContext {
	public structFieldAccess(): StructFieldAccessContext {
		return this.getRuleContext(0, StructFieldAccessContext);
	}
	public ASSIGN(): TerminalNode { return this.getToken(TypetonParser.ASSIGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: SimpleAssignmentContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterStructAssignment) {
			listener.enterStructAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitStructAssignment) {
			listener.exitStructAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitStructAssignment) {
			return visitor.visitStructAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrintStmtContext extends ParserRuleContext {
	public PRINT(): TerminalNode { return this.getToken(TypetonParser.PRINT, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_printStmt; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterPrintStmt) {
			listener.enterPrintStmt(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitPrintStmt) {
			listener.exitPrintStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitPrintStmt) {
			return visitor.visitPrintStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayLiteralContext extends ParserRuleContext {
	public LBRACKET(): TerminalNode { return this.getToken(TypetonParser.LBRACKET, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public RBRACKET(): TerminalNode { return this.getToken(TypetonParser.RBRACKET, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.COMMA);
		} else {
			return this.getToken(TypetonParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_arrayLiteral; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterArrayLiteral) {
			listener.enterArrayLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitArrayLiteral) {
			listener.exitArrayLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitArrayLiteral) {
			return visitor.visitArrayLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentListContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.COMMA);
		} else {
			return this.getToken(TypetonParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_argumentList; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterArgumentList) {
			listener.enterArgumentList(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitArgumentList) {
			listener.exitArgumentList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitArgumentList) {
			return visitor.visitArgumentList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedNameContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.ID);
		} else {
			return this.getToken(TypetonParser.ID, i);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.DOT);
		} else {
			return this.getToken(TypetonParser.DOT, i);
		}
	}
	public ENCODER_KEYWORD(): TerminalNode { return this.getToken(TypetonParser.ENCODER_KEYWORD, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_qualifiedName; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterQualifiedName) {
			listener.enterQualifiedName(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitQualifiedName) {
			listener.exitQualifiedName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitQualifiedName) {
			return visitor.visitQualifiedName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CallableNameContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.ID);
		} else {
			return this.getToken(TypetonParser.ID, i);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.DOT);
		} else {
			return this.getToken(TypetonParser.DOT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_callableName; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterCallableName) {
			listener.enterCallableName(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitCallableName) {
			listener.exitCallableName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitCallableName) {
			return visitor.visitCallableName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodCallContext extends ParserRuleContext {
	public callableName(): CallableNameContext {
		return this.getRuleContext(0, CallableNameContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	public argumentList(): ArgumentListContext | undefined {
		return this.tryGetRuleContext(0, ArgumentListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_methodCall; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterMethodCall) {
			listener.enterMethodCall(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitMethodCall) {
			listener.exitMethodCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitMethodCall) {
			return visitor.visitMethodCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructFieldAccessContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.ID);
		} else {
			return this.getToken(TypetonParser.ID, i);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.DOT);
		} else {
			return this.getToken(TypetonParser.DOT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_structFieldAccess; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterStructFieldAccess) {
			listener.enterStructFieldAccess(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitStructFieldAccess) {
			listener.exitStructFieldAccess(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitStructFieldAccess) {
			return visitor.visitStructFieldAccess(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnStmtContext extends ParserRuleContext {
	public RETURN(): TerminalNode { return this.getToken(TypetonParser.RETURN, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_returnStmt; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterReturnStmt) {
			listener.enterReturnStmt(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitReturnStmt) {
			listener.exitReturnStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitReturnStmt) {
			return visitor.visitReturnStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BreakStmtContext extends ParserRuleContext {
	public BREAK(): TerminalNode { return this.getToken(TypetonParser.BREAK, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_breakStmt; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterBreakStmt) {
			listener.enterBreakStmt(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitBreakStmt) {
			listener.exitBreakStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitBreakStmt) {
			return visitor.visitBreakStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContinueStmtContext extends ParserRuleContext {
	public CONTINUE(): TerminalNode { return this.getToken(TypetonParser.CONTINUE, 0); }
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_continueStmt; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterContinueStmt) {
			listener.enterContinueStmt(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitContinueStmt) {
			listener.exitContinueStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitContinueStmt) {
			return visitor.visitContinueStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionExprContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	public COLON(): TerminalNode { return this.getToken(TypetonParser.COLON, 0); }
	public returnType(): ReturnTypeContext {
		return this.getRuleContext(0, ReturnTypeContext);
	}
	public ARROW(): TerminalNode { return this.getToken(TypetonParser.ARROW, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public parameterList(): ParameterListContext | undefined {
		return this.tryGetRuleContext(0, ParameterListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_functionExpr; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterFunctionExpr) {
			listener.enterFunctionExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitFunctionExpr) {
			listener.exitFunctionExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitFunctionExpr) {
			return visitor.visitFunctionExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterListContext extends ParserRuleContext {
	public parameter(): ParameterContext[];
	public parameter(i: number): ParameterContext;
	public parameter(i?: number): ParameterContext | ParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParameterContext);
		} else {
			return this.getRuleContext(i, ParameterContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.COMMA);
		} else {
			return this.getToken(TypetonParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_parameterList; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterParameterList) {
			listener.enterParameterList(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitParameterList) {
			listener.exitParameterList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitParameterList) {
			return visitor.visitParameterList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public COLON(): TerminalNode { return this.getToken(TypetonParser.COLON, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public AMPERSAND(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.AMPERSAND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_parameter; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterParameter) {
			listener.enterParameter(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitParameter) {
			listener.exitParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitParameter) {
			return visitor.visitParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	public TYPE_INT32(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.TYPE_INT32, 0); }
	public TYPE_INT16(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.TYPE_INT16, 0); }
	public TYPE_INT8(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.TYPE_INT8, 0); }
	public TYPE_UINT32(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.TYPE_UINT32, 0); }
	public TYPE_UINT16(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.TYPE_UINT16, 0); }
	public TYPE_UINT8(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.TYPE_UINT8, 0); }
	public TYPE_FLOAT(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.TYPE_FLOAT, 0); }
	public TYPE_BOOL(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.TYPE_BOOL, 0); }
	public ID(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_type; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterType) {
			listener.enterType(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitType) {
			listener.exitType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitType) {
			return visitor.visitType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnTypeContext extends ParserRuleContext {
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public TYPE_VOID(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.TYPE_VOID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_returnType; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterReturnType) {
			listener.enterReturnType(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitReturnType) {
			listener.exitReturnType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitReturnType) {
			return visitor.visitReturnType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class MulDivContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public MULT(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.MULT, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.MOD, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterMulDiv) {
			listener.enterMulDiv(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitMulDiv) {
			listener.exitMulDiv(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitMulDiv) {
			return visitor.visitMulDiv(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AddSubContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.MINUS, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterAddSub) {
			listener.enterAddSub(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitAddSub) {
			listener.exitAddSub(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitAddSub) {
			return visitor.visitAddSub(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CompareContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public LESS_THAN(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.LESS_THAN, 0); }
	public GREAT_THAN(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.GREAT_THAN, 0); }
	public LESS_EQUAL(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.LESS_EQUAL, 0); }
	public GREAT_EQUAL(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.GREAT_EQUAL, 0); }
	public EQUAL(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.EQUAL, 0); }
	public NOT_EQUAL(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.NOT_EQUAL, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterCompare) {
			listener.enterCompare(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitCompare) {
			listener.exitCompare(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitCompare) {
			return visitor.visitCompare(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public LOGICAL_AND(): TerminalNode { return this.getToken(TypetonParser.LOGICAL_AND, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterAndExpr) {
			listener.enterAndExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitAndExpr) {
			listener.exitAndExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitAndExpr) {
			return visitor.visitAndExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExprContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public LOGICAL_OR(): TerminalNode { return this.getToken(TypetonParser.LOGICAL_OR, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterOrExpr) {
			listener.enterOrExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitOrExpr) {
			listener.exitOrExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitOrExpr) {
			return visitor.visitOrExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AddressOpContext extends ExpressionContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public AMPERSAND(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.AMPERSAND, 0); }
	public MULT(): TerminalNode | undefined { return this.tryGetToken(TypetonParser.MULT, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterAddressOp) {
			listener.enterAddressOp(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitAddressOp) {
			listener.exitAddressOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitAddressOp) {
			return visitor.visitAddressOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SinExprContext extends ExpressionContext {
	public SIN(): TerminalNode { return this.getToken(TypetonParser.SIN, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterSinExpr) {
			listener.enterSinExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitSinExpr) {
			listener.exitSinExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitSinExpr) {
			return visitor.visitSinExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CosExprContext extends ExpressionContext {
	public COS(): TerminalNode { return this.getToken(TypetonParser.COS, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterCosExpr) {
			listener.enterCosExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitCosExpr) {
			listener.exitCosExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitCosExpr) {
			return visitor.visitCosExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TanExprContext extends ExpressionContext {
	public TAN(): TerminalNode { return this.getToken(TypetonParser.TAN, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterTanExpr) {
			listener.enterTanExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitTanExpr) {
			listener.exitTanExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitTanExpr) {
			return visitor.visitTanExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AbsExprContext extends ExpressionContext {
	public ABS(): TerminalNode { return this.getToken(TypetonParser.ABS, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterAbsExpr) {
			listener.enterAbsExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitAbsExpr) {
			listener.exitAbsExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitAbsExpr) {
			return visitor.visitAbsExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SqrtExprContext extends ExpressionContext {
	public SQRT(): TerminalNode { return this.getToken(TypetonParser.SQRT, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterSqrtExpr) {
			listener.enterSqrtExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitSqrtExpr) {
			listener.exitSqrtExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitSqrtExpr) {
			return visitor.visitSqrtExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class Atan2ExprContext extends ExpressionContext {
	public ATAN2(): TerminalNode { return this.getToken(TypetonParser.ATAN2, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode { return this.getToken(TypetonParser.COMMA, 0); }
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterAtan2Expr) {
			listener.enterAtan2Expr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitAtan2Expr) {
			listener.exitAtan2Expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitAtan2Expr) {
			return visitor.visitAtan2Expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FloorExprContext extends ExpressionContext {
	public FLOOR(): TerminalNode { return this.getToken(TypetonParser.FLOOR, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterFloorExpr) {
			listener.enterFloorExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitFloorExpr) {
			listener.exitFloorExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitFloorExpr) {
			return visitor.visitFloorExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CeilExprContext extends ExpressionContext {
	public CEIL(): TerminalNode { return this.getToken(TypetonParser.CEIL, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterCeilExpr) {
			listener.enterCeilExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitCeilExpr) {
			listener.exitCeilExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitCeilExpr) {
			return visitor.visitCeilExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RoundExprContext extends ExpressionContext {
	public ROUND(): TerminalNode { return this.getToken(TypetonParser.ROUND, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterRoundExpr) {
			listener.enterRoundExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitRoundExpr) {
			listener.exitRoundExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitRoundExpr) {
			return visitor.visitRoundExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MinExprContext extends ExpressionContext {
	public MIN(): TerminalNode { return this.getToken(TypetonParser.MIN, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode { return this.getToken(TypetonParser.COMMA, 0); }
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterMinExpr) {
			listener.enterMinExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitMinExpr) {
			listener.exitMinExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitMinExpr) {
			return visitor.visitMinExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MaxExprContext extends ExpressionContext {
	public MAX(): TerminalNode { return this.getToken(TypetonParser.MAX, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode { return this.getToken(TypetonParser.COMMA, 0); }
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterMaxExpr) {
			listener.enterMaxExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitMaxExpr) {
			listener.exitMaxExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitMaxExpr) {
			return visitor.visitMaxExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ClampExprContext extends ExpressionContext {
	public CLAMP(): TerminalNode { return this.getToken(TypetonParser.CLAMP, 0); }
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TypetonParser.COMMA);
		} else {
			return this.getToken(TypetonParser.COMMA, i);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterClampExpr) {
			listener.enterClampExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitClampExpr) {
			listener.exitClampExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitClampExpr) {
			return visitor.visitClampExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AtomExprContext extends ExpressionContext {
	public atom(): AtomContext {
		return this.getRuleContext(0, AtomContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterAtomExpr) {
			listener.enterAtomExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitAtomExpr) {
			listener.exitAtomExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitAtomExpr) {
			return visitor.visitAtomExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryMinusExprContext extends ExpressionContext {
	public MINUS(): TerminalNode { return this.getToken(TypetonParser.MINUS, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterUnaryMinusExpr) {
			listener.enterUnaryMinusExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitUnaryMinusExpr) {
			listener.exitUnaryMinusExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitUnaryMinusExpr) {
			return visitor.visitUnaryMinusExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryPlusExprContext extends ExpressionContext {
	public PLUS(): TerminalNode { return this.getToken(TypetonParser.PLUS, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterUnaryPlusExpr) {
			listener.enterUnaryPlusExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitUnaryPlusExpr) {
			listener.exitUnaryPlusExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitUnaryPlusExpr) {
			return visitor.visitUnaryPlusExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotExprContext extends ExpressionContext {
	public NOT(): TerminalNode { return this.getToken(TypetonParser.NOT, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterNotExpr) {
			listener.enterNotExpr(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitNotExpr) {
			listener.exitNotExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitNotExpr) {
			return visitor.visitNotExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_atom; }
	public copyFrom(ctx: AtomContext): void {
		super.copyFrom(ctx);
	}
}
export class ArrayAccessContext extends AtomContext {
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public LBRACKET(): TerminalNode { return this.getToken(TypetonParser.LBRACKET, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RBRACKET(): TerminalNode { return this.getToken(TypetonParser.RBRACKET, 0); }
	constructor(ctx: AtomContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterArrayAccess) {
			listener.enterArrayAccess(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitArrayAccess) {
			listener.exitArrayAccess(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitArrayAccess) {
			return visitor.visitArrayAccess(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MethodCallAtomContext extends AtomContext {
	public methodCall(): MethodCallContext {
		return this.getRuleContext(0, MethodCallContext);
	}
	constructor(ctx: AtomContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterMethodCallAtom) {
			listener.enterMethodCallAtom(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitMethodCallAtom) {
			listener.exitMethodCallAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitMethodCallAtom) {
			return visitor.visitMethodCallAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QualifiedNameAtomContext extends AtomContext {
	public qualifiedName(): QualifiedNameContext {
		return this.getRuleContext(0, QualifiedNameContext);
	}
	constructor(ctx: AtomContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterQualifiedNameAtom) {
			listener.enterQualifiedNameAtom(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitQualifiedNameAtom) {
			listener.exitQualifiedNameAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitQualifiedNameAtom) {
			return visitor.visitQualifiedNameAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StructFieldAtomContext extends AtomContext {
	public structFieldAccess(): StructFieldAccessContext {
		return this.getRuleContext(0, StructFieldAccessContext);
	}
	constructor(ctx: AtomContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterStructFieldAtom) {
			listener.enterStructFieldAtom(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitStructFieldAtom) {
			listener.exitStructFieldAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitStructFieldAtom) {
			return visitor.visitStructFieldAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IdAtomContext extends AtomContext {
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	constructor(ctx: AtomContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterIdAtom) {
			listener.enterIdAtom(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitIdAtom) {
			listener.exitIdAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitIdAtom) {
			return visitor.visitIdAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IntAtomContext extends AtomContext {
	public INT_LIT(): TerminalNode { return this.getToken(TypetonParser.INT_LIT, 0); }
	constructor(ctx: AtomContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterIntAtom) {
			listener.enterIntAtom(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitIntAtom) {
			listener.exitIntAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitIntAtom) {
			return visitor.visitIntAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FloatAtomContext extends AtomContext {
	public FLOAT_LIT(): TerminalNode { return this.getToken(TypetonParser.FLOAT_LIT, 0); }
	constructor(ctx: AtomContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterFloatAtom) {
			listener.enterFloatAtom(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitFloatAtom) {
			listener.exitFloatAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitFloatAtom) {
			return visitor.visitFloatAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringAtomContext extends AtomContext {
	public STRING_LIT(): TerminalNode { return this.getToken(TypetonParser.STRING_LIT, 0); }
	constructor(ctx: AtomContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterStringAtom) {
			listener.enterStringAtom(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitStringAtom) {
			listener.exitStringAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitStringAtom) {
			return visitor.visitStringAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenAtomContext extends AtomContext {
	public LPAREN(): TerminalNode { return this.getToken(TypetonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(TypetonParser.RPAREN, 0); }
	constructor(ctx: AtomContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterParenAtom) {
			listener.enterParenAtom(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitParenAtom) {
			listener.exitParenAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitParenAtom) {
			return visitor.visitParenAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructDeclContext extends ParserRuleContext {
	public STRUCT(): TerminalNode { return this.getToken(TypetonParser.STRUCT, 0); }
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public LBRACE(): TerminalNode { return this.getToken(TypetonParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(TypetonParser.RBRACE, 0); }
	public structField(): StructFieldContext[];
	public structField(i: number): StructFieldContext;
	public structField(i?: number): StructFieldContext | StructFieldContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StructFieldContext);
		} else {
			return this.getRuleContext(i, StructFieldContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_structDecl; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterStructDecl) {
			listener.enterStructDecl(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitStructDecl) {
			listener.exitStructDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitStructDecl) {
			return visitor.visitStructDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructFieldContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(TypetonParser.ID, 0); }
	public COLON(): TerminalNode { return this.getToken(TypetonParser.COLON, 0); }
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(TypetonParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TypetonParser.RULE_structField; }
	// @Override
	public enterRule(listener: TypetonListener): void {
		if (listener.enterStructField) {
			listener.enterStructField(this);
		}
	}
	// @Override
	public exitRule(listener: TypetonListener): void {
		if (listener.exitStructField) {
			listener.exitStructField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypetonVisitor<Result>): Result {
		if (visitor.visitStructField) {
			return visitor.visitStructField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


