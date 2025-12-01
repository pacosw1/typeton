"use strict";
// Generated from ../grammar/Typeton.g4 by ANTLR 4.9.0-SNAPSHOT
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqrtExprContext = exports.AbsExprContext = exports.TanExprContext = exports.CosExprContext = exports.SinExprContext = exports.AddressOpContext = exports.OrExprContext = exports.AndExprContext = exports.CompareContext = exports.AddSubContext = exports.MulDivContext = exports.ExpressionContext = exports.ReturnTypeContext = exports.TypeContext = exports.ParameterContext = exports.ParameterListContext = exports.FunctionExprContext = exports.ContinueStmtContext = exports.BreakStmtContext = exports.ReturnStmtContext = exports.StructFieldAccessContext = exports.MethodCallContext = exports.CallableNameContext = exports.QualifiedNameContext = exports.ArgumentListContext = exports.ArrayLiteralContext = exports.PrintStmtContext = exports.StructAssignmentContext = exports.ArrayAssignmentContext = exports.PostfixDecrementContext = exports.PostfixIncrementContext = exports.CompoundAssignmentContext = exports.ScalarAssignmentContext = exports.SimpleAssignmentContext = exports.AssignmentContext = exports.ConstDeclContext = exports.ArrayVarDeclInitContext = exports.ArrayVarDeclContext = exports.ScalarVarDeclNoInitContext = exports.ScalarVarDeclContext = exports.VarDeclContext = exports.BlockContext = exports.IfStmtContext = exports.WhileStmtContext = exports.ForVarDeclContext = exports.ForInitContext = exports.ForStmtContext = exports.StatementContext = exports.ProgramContext = exports.TypetonParser = void 0;
exports.StructFieldContext = exports.StructDeclContext = exports.ParenAtomContext = exports.StringAtomContext = exports.FloatAtomContext = exports.IntAtomContext = exports.IdAtomContext = exports.StructFieldAtomContext = exports.QualifiedNameAtomContext = exports.MethodCallAtomContext = exports.ArrayAccessContext = exports.AtomContext = exports.NotExprContext = exports.UnaryPlusExprContext = exports.UnaryMinusExprContext = exports.AtomExprContext = exports.ClampExprContext = exports.MaxExprContext = exports.MinExprContext = exports.RoundExprContext = exports.CeilExprContext = exports.FloorExprContext = exports.Atan2ExprContext = void 0;
const ATN_1 = require("antlr4ts/atn/ATN");
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const FailedPredicateException_1 = require("antlr4ts/FailedPredicateException");
const NoViableAltException_1 = require("antlr4ts/NoViableAltException");
const Parser_1 = require("antlr4ts/Parser");
const ParserRuleContext_1 = require("antlr4ts/ParserRuleContext");
const ParserATNSimulator_1 = require("antlr4ts/atn/ParserATNSimulator");
const RecognitionException_1 = require("antlr4ts/RecognitionException");
const Token_1 = require("antlr4ts/Token");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = __importStar(require("antlr4ts/misc/Utils"));
class TypetonParser extends Parser_1.Parser {
    // @Override
    // @NotNull
    get vocabulary() {
        return TypetonParser.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    // @Override
    get grammarFileName() { return "Typeton.g4"; }
    // @Override
    get ruleNames() { return TypetonParser.ruleNames; }
    // @Override
    get serializedATN() { return TypetonParser._serializedATN; }
    createFailedPredicateException(predicate, message) {
        return new FailedPredicateException_1.FailedPredicateException(this, predicate, message);
    }
    constructor(input) {
        super(input);
        this._interp = new ParserATNSimulator_1.ParserATNSimulator(TypetonParser._ATN, this);
    }
    // @RuleVersion(0)
    program() {
        let _localctx = new ProgramContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, TypetonParser.RULE_program);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    statement() {
        let _localctx = new StatementContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, TypetonParser.RULE_statement);
        try {
            this.state = 85;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 1, this._ctx)) {
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    forStmt() {
        let _localctx = new ForStmtContext(this._ctx, this.state);
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    forInit() {
        let _localctx = new ForInitContext(this._ctx, this.state);
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
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    forVarDecl() {
        let _localctx = new ForVarDeclContext(this._ctx, this.state);
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    whileStmt() {
        let _localctx = new WhileStmtContext(this._ctx, this.state);
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    ifStmt() {
        let _localctx = new IfStmtContext(this._ctx, this.state);
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
                switch (this.interpreter.adaptivePredict(this._input, 3, this._ctx)) {
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    block() {
        let _localctx = new BlockContext(this._ctx, this.state);
        this.enterRule(_localctx, 14, TypetonParser.RULE_block);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    varDecl() {
        let _localctx = new VarDeclContext(this._ctx, this.state);
        this.enterRule(_localctx, 16, TypetonParser.RULE_varDecl);
        try {
            this.state = 166;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 5, this._ctx)) {
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    constDecl() {
        let _localctx = new ConstDeclContext(this._ctx, this.state);
        this.enterRule(_localctx, 18, TypetonParser.RULE_constDecl);
        try {
            this.state = 182;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 6, this._ctx)) {
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    assignment() {
        let _localctx = new AssignmentContext(this._ctx, this.state);
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    simpleAssignment() {
        let _localctx = new SimpleAssignmentContext(this._ctx, this.state);
        this.enterRule(_localctx, 22, TypetonParser.RULE_simpleAssignment);
        try {
            this.state = 220;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 7, this._ctx)) {
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    printStmt() {
        let _localctx = new PrintStmtContext(this._ctx, this.state);
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    arrayLiteral() {
        let _localctx = new ArrayLiteralContext(this._ctx, this.state);
        this.enterRule(_localctx, 26, TypetonParser.RULE_arrayLiteral);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    argumentList() {
        let _localctx = new ArgumentListContext(this._ctx, this.state);
        this.enterRule(_localctx, 28, TypetonParser.RULE_argumentList);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    qualifiedName() {
        let _localctx = new QualifiedNameContext(this._ctx, this.state);
        this.enterRule(_localctx, 30, TypetonParser.RULE_qualifiedName);
        try {
            let _alt;
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
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    callableName() {
        let _localctx = new CallableNameContext(this._ctx, this.state);
        this.enterRule(_localctx, 32, TypetonParser.RULE_callableName);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    methodCall() {
        let _localctx = new MethodCallContext(this._ctx, this.state);
        this.enterRule(_localctx, 34, TypetonParser.RULE_methodCall);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    structFieldAccess() {
        let _localctx = new StructFieldAccessContext(this._ctx, this.state);
        this.enterRule(_localctx, 36, TypetonParser.RULE_structFieldAccess);
        try {
            let _alt;
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
                            throw new NoViableAltException_1.NoViableAltException(this);
                    }
                    this.state = 279;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 13, this._ctx);
                } while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    returnStmt() {
        let _localctx = new ReturnStmtContext(this._ctx, this.state);
        this.enterRule(_localctx, 38, TypetonParser.RULE_returnStmt);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    breakStmt() {
        let _localctx = new BreakStmtContext(this._ctx, this.state);
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    continueStmt() {
        let _localctx = new ContinueStmtContext(this._ctx, this.state);
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    functionExpr() {
        let _localctx = new FunctionExprContext(this._ctx, this.state);
        this.enterRule(_localctx, 44, TypetonParser.RULE_functionExpr);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    parameterList() {
        let _localctx = new ParameterListContext(this._ctx, this.state);
        this.enterRule(_localctx, 46, TypetonParser.RULE_parameterList);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    parameter() {
        let _localctx = new ParameterContext(this._ctx, this.state);
        this.enterRule(_localctx, 48, TypetonParser.RULE_parameter);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    type() {
        let _localctx = new TypeContext(this._ctx, this.state);
        this.enterRule(_localctx, 50, TypetonParser.RULE_type);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 318;
                _la = this._input.LA(1);
                if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TypetonParser.TYPE_INT32) | (1 << TypetonParser.TYPE_INT16) | (1 << TypetonParser.TYPE_INT8) | (1 << TypetonParser.TYPE_UINT32) | (1 << TypetonParser.TYPE_UINT16) | (1 << TypetonParser.TYPE_UINT8) | (1 << TypetonParser.TYPE_FLOAT) | (1 << TypetonParser.TYPE_BOOL))) !== 0) || _la === TypetonParser.ID)) {
                    this._errHandler.recoverInline(this);
                }
                else {
                    if (this._input.LA(1) === Token_1.Token.EOF) {
                        this.matchedEOF = true;
                    }
                    this._errHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    returnType() {
        let _localctx = new ReturnTypeContext(this._ctx, this.state);
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
                    throw new NoViableAltException_1.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    expression(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let _localctx = new ExpressionContext(this._ctx, _parentState);
        let _prevctx = _localctx;
        let _startState = 54;
        this.enterRecursionRule(_localctx, 54, TypetonParser.RULE_expression, _p);
        let _la;
        try {
            let _alt;
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
                            }
                            else {
                                if (this._input.LA(1) === Token_1.Token.EOF) {
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
                        throw new NoViableAltException_1.NoViableAltException(this);
                }
                this._ctx._stop = this._input.tryLT(-1);
                this.state = 423;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
                while (_alt !== 2 && _alt !== ATN_1.ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = _localctx;
                        {
                            this.state = 421;
                            this._errHandler.sync(this);
                            switch (this.interpreter.adaptivePredict(this._input, 20, this._ctx)) {
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
                                        }
                                        else {
                                            if (this._input.LA(1) === Token_1.Token.EOF) {
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
                                        }
                                        else {
                                            if (this._input.LA(1) === Token_1.Token.EOF) {
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
                                        }
                                        else {
                                            if (this._input.LA(1) === Token_1.Token.EOF) {
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return _localctx;
    }
    // @RuleVersion(0)
    atom() {
        let _localctx = new AtomContext(this._ctx, this.state);
        this.enterRule(_localctx, 56, TypetonParser.RULE_atom);
        try {
            this.state = 442;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 22, this._ctx)) {
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    structDecl() {
        let _localctx = new StructDeclContext(this._ctx, this.state);
        this.enterRule(_localctx, 58, TypetonParser.RULE_structDecl);
        let _la;
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    structField() {
        let _localctx = new StructFieldContext(this._ctx, this.state);
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
            if (re instanceof RecognitionException_1.RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    sempred(_localctx, ruleIndex, predIndex) {
        switch (ruleIndex) {
            case 27:
                return this.expression_sempred(_localctx, predIndex);
        }
        return true;
    }
    expression_sempred(_localctx, predIndex) {
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
    static get _ATN() {
        if (!TypetonParser.__ATN) {
            TypetonParser.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(TypetonParser._serializedATN));
        }
        return TypetonParser.__ATN;
    }
}
exports.TypetonParser = TypetonParser;
TypetonParser.VAR = 1;
TypetonParser.CONST = 2;
TypetonParser.STRUCT = 3;
TypetonParser.PRINT = 4;
TypetonParser.FOR = 5;
TypetonParser.WHILE = 6;
TypetonParser.IF = 7;
TypetonParser.ELSE = 8;
TypetonParser.RETURN = 9;
TypetonParser.BREAK = 10;
TypetonParser.CONTINUE = 11;
TypetonParser.TYPE_INT32 = 12;
TypetonParser.TYPE_INT16 = 13;
TypetonParser.TYPE_INT8 = 14;
TypetonParser.TYPE_UINT32 = 15;
TypetonParser.TYPE_UINT16 = 16;
TypetonParser.TYPE_UINT8 = 17;
TypetonParser.TYPE_FLOAT = 18;
TypetonParser.TYPE_BOOL = 19;
TypetonParser.TYPE_VOID = 20;
TypetonParser.PLUS = 21;
TypetonParser.MINUS = 22;
TypetonParser.MULT = 23;
TypetonParser.MOD = 24;
TypetonParser.DIV = 25;
TypetonParser.ASSIGN = 26;
TypetonParser.PLUS_ASSIGN = 27;
TypetonParser.MINUS_ASSIGN = 28;
TypetonParser.MULT_ASSIGN = 29;
TypetonParser.DIV_ASSIGN = 30;
TypetonParser.MOD_ASSIGN = 31;
TypetonParser.PLUSPLUS = 32;
TypetonParser.MINUSMINUS = 33;
TypetonParser.LESS_EQUAL = 34;
TypetonParser.GREAT_EQUAL = 35;
TypetonParser.EQUAL = 36;
TypetonParser.NOT_EQUAL = 37;
TypetonParser.LESS_THAN = 38;
TypetonParser.GREAT_THAN = 39;
TypetonParser.LOGICAL_AND = 40;
TypetonParser.LOGICAL_OR = 41;
TypetonParser.AMPERSAND = 42;
TypetonParser.NOT = 43;
TypetonParser.ABS = 44;
TypetonParser.SQRT = 45;
TypetonParser.ATAN2 = 46;
TypetonParser.SIN = 47;
TypetonParser.COS = 48;
TypetonParser.TAN = 49;
TypetonParser.FLOOR = 50;
TypetonParser.CEIL = 51;
TypetonParser.ROUND = 52;
TypetonParser.MIN = 53;
TypetonParser.MAX = 54;
TypetonParser.CLAMP = 55;
TypetonParser.LPAREN = 56;
TypetonParser.RPAREN = 57;
TypetonParser.LBRACKET = 58;
TypetonParser.RBRACKET = 59;
TypetonParser.LBRACE = 60;
TypetonParser.RBRACE = 61;
TypetonParser.COLON = 62;
TypetonParser.SEMICOLON = 63;
TypetonParser.COMMA = 64;
TypetonParser.DOT = 65;
TypetonParser.ARROW = 66;
TypetonParser.ENCODER_KEYWORD = 67;
TypetonParser.ID = 68;
TypetonParser.INT_LIT = 69;
TypetonParser.FLOAT_LIT = 70;
TypetonParser.STRING_LIT = 71;
TypetonParser.WS = 72;
TypetonParser.COMMENT = 73;
TypetonParser.RULE_program = 0;
TypetonParser.RULE_statement = 1;
TypetonParser.RULE_forStmt = 2;
TypetonParser.RULE_forInit = 3;
TypetonParser.RULE_forVarDecl = 4;
TypetonParser.RULE_whileStmt = 5;
TypetonParser.RULE_ifStmt = 6;
TypetonParser.RULE_block = 7;
TypetonParser.RULE_varDecl = 8;
TypetonParser.RULE_constDecl = 9;
TypetonParser.RULE_assignment = 10;
TypetonParser.RULE_simpleAssignment = 11;
TypetonParser.RULE_printStmt = 12;
TypetonParser.RULE_arrayLiteral = 13;
TypetonParser.RULE_argumentList = 14;
TypetonParser.RULE_qualifiedName = 15;
TypetonParser.RULE_callableName = 16;
TypetonParser.RULE_methodCall = 17;
TypetonParser.RULE_structFieldAccess = 18;
TypetonParser.RULE_returnStmt = 19;
TypetonParser.RULE_breakStmt = 20;
TypetonParser.RULE_continueStmt = 21;
TypetonParser.RULE_functionExpr = 22;
TypetonParser.RULE_parameterList = 23;
TypetonParser.RULE_parameter = 24;
TypetonParser.RULE_type = 25;
TypetonParser.RULE_returnType = 26;
TypetonParser.RULE_expression = 27;
TypetonParser.RULE_atom = 28;
TypetonParser.RULE_structDecl = 29;
TypetonParser.RULE_structField = 30;
// tslint:disable:no-trailing-whitespace
TypetonParser.ruleNames = [
    "program", "statement", "forStmt", "forInit", "forVarDecl", "whileStmt",
    "ifStmt", "block", "varDecl", "constDecl", "assignment", "simpleAssignment",
    "printStmt", "arrayLiteral", "argumentList", "qualifiedName", "callableName",
    "methodCall", "structFieldAccess", "returnStmt", "breakStmt", "continueStmt",
    "functionExpr", "parameterList", "parameter", "type", "returnType", "expression",
    "atom", "structDecl", "structField",
];
TypetonParser._LITERAL_NAMES = [
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
TypetonParser._SYMBOLIC_NAMES = [
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
TypetonParser.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(TypetonParser._LITERAL_NAMES, TypetonParser._SYMBOLIC_NAMES, []);
TypetonParser._serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03K\u01CE\x04\x02" +
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
class ProgramContext extends ParserRuleContext_1.ParserRuleContext {
    EOF() { return this.getToken(TypetonParser.EOF, 0); }
    statement(i) {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }
        else {
            return this.getRuleContext(i, StatementContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_program; }
    // @Override
    enterRule(listener) {
        if (listener.enterProgram) {
            listener.enterProgram(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitProgram) {
            listener.exitProgram(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ProgramContext = ProgramContext;
class StatementContext extends ParserRuleContext_1.ParserRuleContext {
    structDecl() {
        return this.tryGetRuleContext(0, StructDeclContext);
    }
    varDecl() {
        return this.tryGetRuleContext(0, VarDeclContext);
    }
    constDecl() {
        return this.tryGetRuleContext(0, ConstDeclContext);
    }
    assignment() {
        return this.tryGetRuleContext(0, AssignmentContext);
    }
    printStmt() {
        return this.tryGetRuleContext(0, PrintStmtContext);
    }
    forStmt() {
        return this.tryGetRuleContext(0, ForStmtContext);
    }
    whileStmt() {
        return this.tryGetRuleContext(0, WhileStmtContext);
    }
    ifStmt() {
        return this.tryGetRuleContext(0, IfStmtContext);
    }
    breakStmt() {
        return this.tryGetRuleContext(0, BreakStmtContext);
    }
    continueStmt() {
        return this.tryGetRuleContext(0, ContinueStmtContext);
    }
    block() {
        return this.tryGetRuleContext(0, BlockContext);
    }
    methodCall() {
        return this.tryGetRuleContext(0, MethodCallContext);
    }
    SEMICOLON() { return this.tryGetToken(TypetonParser.SEMICOLON, 0); }
    returnStmt() {
        return this.tryGetRuleContext(0, ReturnStmtContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_statement; }
    // @Override
    enterRule(listener) {
        if (listener.enterStatement) {
            listener.enterStatement(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStatement) {
            listener.exitStatement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.StatementContext = StatementContext;
class ForStmtContext extends ParserRuleContext_1.ParserRuleContext {
    FOR() { return this.getToken(TypetonParser.FOR, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    forInit() {
        return this.getRuleContext(0, ForInitContext);
    }
    SEMICOLON(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.SEMICOLON);
        }
        else {
            return this.getToken(TypetonParser.SEMICOLON, i);
        }
    }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    simpleAssignment() {
        return this.getRuleContext(0, SimpleAssignmentContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    statement() {
        return this.getRuleContext(0, StatementContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_forStmt; }
    // @Override
    enterRule(listener) {
        if (listener.enterForStmt) {
            listener.enterForStmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitForStmt) {
            listener.exitForStmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitForStmt) {
            return visitor.visitForStmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ForStmtContext = ForStmtContext;
class ForInitContext extends ParserRuleContext_1.ParserRuleContext {
    simpleAssignment() {
        return this.tryGetRuleContext(0, SimpleAssignmentContext);
    }
    forVarDecl() {
        return this.tryGetRuleContext(0, ForVarDeclContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_forInit; }
    // @Override
    enterRule(listener) {
        if (listener.enterForInit) {
            listener.enterForInit(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitForInit) {
            listener.exitForInit(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitForInit) {
            return visitor.visitForInit(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ForInitContext = ForInitContext;
class ForVarDeclContext extends ParserRuleContext_1.ParserRuleContext {
    VAR() { return this.getToken(TypetonParser.VAR, 0); }
    ID() { return this.getToken(TypetonParser.ID, 0); }
    COLON() { return this.getToken(TypetonParser.COLON, 0); }
    type() {
        return this.getRuleContext(0, TypeContext);
    }
    ASSIGN() { return this.getToken(TypetonParser.ASSIGN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_forVarDecl; }
    // @Override
    enterRule(listener) {
        if (listener.enterForVarDecl) {
            listener.enterForVarDecl(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitForVarDecl) {
            listener.exitForVarDecl(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitForVarDecl) {
            return visitor.visitForVarDecl(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ForVarDeclContext = ForVarDeclContext;
class WhileStmtContext extends ParserRuleContext_1.ParserRuleContext {
    WHILE() { return this.getToken(TypetonParser.WHILE, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    statement() {
        return this.getRuleContext(0, StatementContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_whileStmt; }
    // @Override
    enterRule(listener) {
        if (listener.enterWhileStmt) {
            listener.enterWhileStmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitWhileStmt) {
            listener.exitWhileStmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitWhileStmt) {
            return visitor.visitWhileStmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.WhileStmtContext = WhileStmtContext;
class IfStmtContext extends ParserRuleContext_1.ParserRuleContext {
    IF() { return this.getToken(TypetonParser.IF, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    statement(i) {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }
        else {
            return this.getRuleContext(i, StatementContext);
        }
    }
    ELSE() { return this.tryGetToken(TypetonParser.ELSE, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_ifStmt; }
    // @Override
    enterRule(listener) {
        if (listener.enterIfStmt) {
            listener.enterIfStmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitIfStmt) {
            listener.exitIfStmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitIfStmt) {
            return visitor.visitIfStmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.IfStmtContext = IfStmtContext;
class BlockContext extends ParserRuleContext_1.ParserRuleContext {
    LBRACE() { return this.getToken(TypetonParser.LBRACE, 0); }
    RBRACE() { return this.getToken(TypetonParser.RBRACE, 0); }
    statement(i) {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }
        else {
            return this.getRuleContext(i, StatementContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_block; }
    // @Override
    enterRule(listener) {
        if (listener.enterBlock) {
            listener.enterBlock(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitBlock) {
            listener.exitBlock(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.BlockContext = BlockContext;
class VarDeclContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_varDecl; }
    copyFrom(ctx) {
        super.copyFrom(ctx);
    }
}
exports.VarDeclContext = VarDeclContext;
class ScalarVarDeclContext extends VarDeclContext {
    VAR() { return this.getToken(TypetonParser.VAR, 0); }
    ID() { return this.getToken(TypetonParser.ID, 0); }
    COLON() { return this.getToken(TypetonParser.COLON, 0); }
    type() {
        return this.getRuleContext(0, TypeContext);
    }
    ASSIGN() { return this.getToken(TypetonParser.ASSIGN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterScalarVarDecl) {
            listener.enterScalarVarDecl(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitScalarVarDecl) {
            listener.exitScalarVarDecl(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitScalarVarDecl) {
            return visitor.visitScalarVarDecl(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ScalarVarDeclContext = ScalarVarDeclContext;
class ScalarVarDeclNoInitContext extends VarDeclContext {
    VAR() { return this.getToken(TypetonParser.VAR, 0); }
    ID() { return this.getToken(TypetonParser.ID, 0); }
    COLON() { return this.getToken(TypetonParser.COLON, 0); }
    type() {
        return this.getRuleContext(0, TypeContext);
    }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterScalarVarDeclNoInit) {
            listener.enterScalarVarDeclNoInit(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitScalarVarDeclNoInit) {
            listener.exitScalarVarDeclNoInit(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitScalarVarDeclNoInit) {
            return visitor.visitScalarVarDeclNoInit(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ScalarVarDeclNoInitContext = ScalarVarDeclNoInitContext;
class ArrayVarDeclContext extends VarDeclContext {
    VAR() { return this.getToken(TypetonParser.VAR, 0); }
    ID() { return this.getToken(TypetonParser.ID, 0); }
    COLON() { return this.getToken(TypetonParser.COLON, 0); }
    type() {
        return this.getRuleContext(0, TypeContext);
    }
    LBRACKET() { return this.getToken(TypetonParser.LBRACKET, 0); }
    INT_LIT() { return this.getToken(TypetonParser.INT_LIT, 0); }
    RBRACKET() { return this.getToken(TypetonParser.RBRACKET, 0); }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterArrayVarDecl) {
            listener.enterArrayVarDecl(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArrayVarDecl) {
            listener.exitArrayVarDecl(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArrayVarDecl) {
            return visitor.visitArrayVarDecl(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ArrayVarDeclContext = ArrayVarDeclContext;
class ArrayVarDeclInitContext extends VarDeclContext {
    VAR() { return this.getToken(TypetonParser.VAR, 0); }
    ID() { return this.getToken(TypetonParser.ID, 0); }
    COLON() { return this.getToken(TypetonParser.COLON, 0); }
    type() {
        return this.getRuleContext(0, TypeContext);
    }
    LBRACKET() { return this.getToken(TypetonParser.LBRACKET, 0); }
    INT_LIT() { return this.getToken(TypetonParser.INT_LIT, 0); }
    RBRACKET() { return this.getToken(TypetonParser.RBRACKET, 0); }
    ASSIGN() { return this.getToken(TypetonParser.ASSIGN, 0); }
    arrayLiteral() {
        return this.getRuleContext(0, ArrayLiteralContext);
    }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterArrayVarDeclInit) {
            listener.enterArrayVarDeclInit(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArrayVarDeclInit) {
            listener.exitArrayVarDeclInit(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArrayVarDeclInit) {
            return visitor.visitArrayVarDeclInit(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ArrayVarDeclInitContext = ArrayVarDeclInitContext;
class ConstDeclContext extends ParserRuleContext_1.ParserRuleContext {
    CONST() { return this.getToken(TypetonParser.CONST, 0); }
    ID() { return this.getToken(TypetonParser.ID, 0); }
    ASSIGN() { return this.getToken(TypetonParser.ASSIGN, 0); }
    functionExpr() {
        return this.tryGetRuleContext(0, FunctionExprContext);
    }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    COLON() { return this.tryGetToken(TypetonParser.COLON, 0); }
    type() {
        return this.tryGetRuleContext(0, TypeContext);
    }
    expression() {
        return this.tryGetRuleContext(0, ExpressionContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_constDecl; }
    // @Override
    enterRule(listener) {
        if (listener.enterConstDecl) {
            listener.enterConstDecl(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitConstDecl) {
            listener.exitConstDecl(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitConstDecl) {
            return visitor.visitConstDecl(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ConstDeclContext = ConstDeclContext;
class AssignmentContext extends ParserRuleContext_1.ParserRuleContext {
    simpleAssignment() {
        return this.getRuleContext(0, SimpleAssignmentContext);
    }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_assignment; }
    // @Override
    enterRule(listener) {
        if (listener.enterAssignment) {
            listener.enterAssignment(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAssignment) {
            listener.exitAssignment(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAssignment) {
            return visitor.visitAssignment(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.AssignmentContext = AssignmentContext;
class SimpleAssignmentContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_simpleAssignment; }
    copyFrom(ctx) {
        super.copyFrom(ctx);
    }
}
exports.SimpleAssignmentContext = SimpleAssignmentContext;
class ScalarAssignmentContext extends SimpleAssignmentContext {
    ID() { return this.getToken(TypetonParser.ID, 0); }
    ASSIGN() { return this.getToken(TypetonParser.ASSIGN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterScalarAssignment) {
            listener.enterScalarAssignment(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitScalarAssignment) {
            listener.exitScalarAssignment(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitScalarAssignment) {
            return visitor.visitScalarAssignment(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ScalarAssignmentContext = ScalarAssignmentContext;
class CompoundAssignmentContext extends SimpleAssignmentContext {
    ID() { return this.getToken(TypetonParser.ID, 0); }
    PLUS_ASSIGN() { return this.tryGetToken(TypetonParser.PLUS_ASSIGN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    MINUS_ASSIGN() { return this.tryGetToken(TypetonParser.MINUS_ASSIGN, 0); }
    MULT_ASSIGN() { return this.tryGetToken(TypetonParser.MULT_ASSIGN, 0); }
    DIV_ASSIGN() { return this.tryGetToken(TypetonParser.DIV_ASSIGN, 0); }
    MOD_ASSIGN() { return this.tryGetToken(TypetonParser.MOD_ASSIGN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterCompoundAssignment) {
            listener.enterCompoundAssignment(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitCompoundAssignment) {
            listener.exitCompoundAssignment(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitCompoundAssignment) {
            return visitor.visitCompoundAssignment(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.CompoundAssignmentContext = CompoundAssignmentContext;
class PostfixIncrementContext extends SimpleAssignmentContext {
    ID() { return this.getToken(TypetonParser.ID, 0); }
    PLUSPLUS() { return this.getToken(TypetonParser.PLUSPLUS, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterPostfixIncrement) {
            listener.enterPostfixIncrement(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPostfixIncrement) {
            listener.exitPostfixIncrement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitPostfixIncrement) {
            return visitor.visitPostfixIncrement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.PostfixIncrementContext = PostfixIncrementContext;
class PostfixDecrementContext extends SimpleAssignmentContext {
    ID() { return this.getToken(TypetonParser.ID, 0); }
    MINUSMINUS() { return this.getToken(TypetonParser.MINUSMINUS, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterPostfixDecrement) {
            listener.enterPostfixDecrement(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPostfixDecrement) {
            listener.exitPostfixDecrement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitPostfixDecrement) {
            return visitor.visitPostfixDecrement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.PostfixDecrementContext = PostfixDecrementContext;
class ArrayAssignmentContext extends SimpleAssignmentContext {
    ID() { return this.getToken(TypetonParser.ID, 0); }
    LBRACKET() { return this.getToken(TypetonParser.LBRACKET, 0); }
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    RBRACKET() { return this.getToken(TypetonParser.RBRACKET, 0); }
    ASSIGN() { return this.getToken(TypetonParser.ASSIGN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterArrayAssignment) {
            listener.enterArrayAssignment(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArrayAssignment) {
            listener.exitArrayAssignment(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArrayAssignment) {
            return visitor.visitArrayAssignment(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ArrayAssignmentContext = ArrayAssignmentContext;
class StructAssignmentContext extends SimpleAssignmentContext {
    structFieldAccess() {
        return this.getRuleContext(0, StructFieldAccessContext);
    }
    ASSIGN() { return this.getToken(TypetonParser.ASSIGN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterStructAssignment) {
            listener.enterStructAssignment(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStructAssignment) {
            listener.exitStructAssignment(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructAssignment) {
            return visitor.visitStructAssignment(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.StructAssignmentContext = StructAssignmentContext;
class PrintStmtContext extends ParserRuleContext_1.ParserRuleContext {
    PRINT() { return this.getToken(TypetonParser.PRINT, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_printStmt; }
    // @Override
    enterRule(listener) {
        if (listener.enterPrintStmt) {
            listener.enterPrintStmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPrintStmt) {
            listener.exitPrintStmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitPrintStmt) {
            return visitor.visitPrintStmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.PrintStmtContext = PrintStmtContext;
class ArrayLiteralContext extends ParserRuleContext_1.ParserRuleContext {
    LBRACKET() { return this.getToken(TypetonParser.LBRACKET, 0); }
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    RBRACKET() { return this.getToken(TypetonParser.RBRACKET, 0); }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.COMMA);
        }
        else {
            return this.getToken(TypetonParser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_arrayLiteral; }
    // @Override
    enterRule(listener) {
        if (listener.enterArrayLiteral) {
            listener.enterArrayLiteral(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArrayLiteral) {
            listener.exitArrayLiteral(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArrayLiteral) {
            return visitor.visitArrayLiteral(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ArrayLiteralContext = ArrayLiteralContext;
class ArgumentListContext extends ParserRuleContext_1.ParserRuleContext {
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.COMMA);
        }
        else {
            return this.getToken(TypetonParser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_argumentList; }
    // @Override
    enterRule(listener) {
        if (listener.enterArgumentList) {
            listener.enterArgumentList(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArgumentList) {
            listener.exitArgumentList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArgumentList) {
            return visitor.visitArgumentList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ArgumentListContext = ArgumentListContext;
class QualifiedNameContext extends ParserRuleContext_1.ParserRuleContext {
    ID(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.ID);
        }
        else {
            return this.getToken(TypetonParser.ID, i);
        }
    }
    DOT(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.DOT);
        }
        else {
            return this.getToken(TypetonParser.DOT, i);
        }
    }
    ENCODER_KEYWORD() { return this.getToken(TypetonParser.ENCODER_KEYWORD, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_qualifiedName; }
    // @Override
    enterRule(listener) {
        if (listener.enterQualifiedName) {
            listener.enterQualifiedName(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitQualifiedName) {
            listener.exitQualifiedName(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitQualifiedName) {
            return visitor.visitQualifiedName(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.QualifiedNameContext = QualifiedNameContext;
class CallableNameContext extends ParserRuleContext_1.ParserRuleContext {
    ID(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.ID);
        }
        else {
            return this.getToken(TypetonParser.ID, i);
        }
    }
    DOT(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.DOT);
        }
        else {
            return this.getToken(TypetonParser.DOT, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_callableName; }
    // @Override
    enterRule(listener) {
        if (listener.enterCallableName) {
            listener.enterCallableName(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitCallableName) {
            listener.exitCallableName(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitCallableName) {
            return visitor.visitCallableName(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.CallableNameContext = CallableNameContext;
class MethodCallContext extends ParserRuleContext_1.ParserRuleContext {
    callableName() {
        return this.getRuleContext(0, CallableNameContext);
    }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    argumentList() {
        return this.tryGetRuleContext(0, ArgumentListContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_methodCall; }
    // @Override
    enterRule(listener) {
        if (listener.enterMethodCall) {
            listener.enterMethodCall(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitMethodCall) {
            listener.exitMethodCall(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitMethodCall) {
            return visitor.visitMethodCall(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.MethodCallContext = MethodCallContext;
class StructFieldAccessContext extends ParserRuleContext_1.ParserRuleContext {
    ID(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.ID);
        }
        else {
            return this.getToken(TypetonParser.ID, i);
        }
    }
    DOT(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.DOT);
        }
        else {
            return this.getToken(TypetonParser.DOT, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_structFieldAccess; }
    // @Override
    enterRule(listener) {
        if (listener.enterStructFieldAccess) {
            listener.enterStructFieldAccess(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStructFieldAccess) {
            listener.exitStructFieldAccess(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructFieldAccess) {
            return visitor.visitStructFieldAccess(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.StructFieldAccessContext = StructFieldAccessContext;
class ReturnStmtContext extends ParserRuleContext_1.ParserRuleContext {
    RETURN() { return this.getToken(TypetonParser.RETURN, 0); }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    expression() {
        return this.tryGetRuleContext(0, ExpressionContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_returnStmt; }
    // @Override
    enterRule(listener) {
        if (listener.enterReturnStmt) {
            listener.enterReturnStmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitReturnStmt) {
            listener.exitReturnStmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitReturnStmt) {
            return visitor.visitReturnStmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ReturnStmtContext = ReturnStmtContext;
class BreakStmtContext extends ParserRuleContext_1.ParserRuleContext {
    BREAK() { return this.getToken(TypetonParser.BREAK, 0); }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_breakStmt; }
    // @Override
    enterRule(listener) {
        if (listener.enterBreakStmt) {
            listener.enterBreakStmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitBreakStmt) {
            listener.exitBreakStmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitBreakStmt) {
            return visitor.visitBreakStmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.BreakStmtContext = BreakStmtContext;
class ContinueStmtContext extends ParserRuleContext_1.ParserRuleContext {
    CONTINUE() { return this.getToken(TypetonParser.CONTINUE, 0); }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_continueStmt; }
    // @Override
    enterRule(listener) {
        if (listener.enterContinueStmt) {
            listener.enterContinueStmt(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitContinueStmt) {
            listener.exitContinueStmt(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitContinueStmt) {
            return visitor.visitContinueStmt(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ContinueStmtContext = ContinueStmtContext;
class FunctionExprContext extends ParserRuleContext_1.ParserRuleContext {
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    COLON() { return this.getToken(TypetonParser.COLON, 0); }
    returnType() {
        return this.getRuleContext(0, ReturnTypeContext);
    }
    ARROW() { return this.getToken(TypetonParser.ARROW, 0); }
    block() {
        return this.getRuleContext(0, BlockContext);
    }
    parameterList() {
        return this.tryGetRuleContext(0, ParameterListContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_functionExpr; }
    // @Override
    enterRule(listener) {
        if (listener.enterFunctionExpr) {
            listener.enterFunctionExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFunctionExpr) {
            listener.exitFunctionExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFunctionExpr) {
            return visitor.visitFunctionExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.FunctionExprContext = FunctionExprContext;
class ParameterListContext extends ParserRuleContext_1.ParserRuleContext {
    parameter(i) {
        if (i === undefined) {
            return this.getRuleContexts(ParameterContext);
        }
        else {
            return this.getRuleContext(i, ParameterContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.COMMA);
        }
        else {
            return this.getToken(TypetonParser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_parameterList; }
    // @Override
    enterRule(listener) {
        if (listener.enterParameterList) {
            listener.enterParameterList(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitParameterList) {
            listener.exitParameterList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitParameterList) {
            return visitor.visitParameterList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ParameterListContext = ParameterListContext;
class ParameterContext extends ParserRuleContext_1.ParserRuleContext {
    ID() { return this.getToken(TypetonParser.ID, 0); }
    COLON() { return this.getToken(TypetonParser.COLON, 0); }
    type() {
        return this.getRuleContext(0, TypeContext);
    }
    AMPERSAND() { return this.tryGetToken(TypetonParser.AMPERSAND, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_parameter; }
    // @Override
    enterRule(listener) {
        if (listener.enterParameter) {
            listener.enterParameter(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitParameter) {
            listener.exitParameter(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitParameter) {
            return visitor.visitParameter(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ParameterContext = ParameterContext;
class TypeContext extends ParserRuleContext_1.ParserRuleContext {
    TYPE_INT32() { return this.tryGetToken(TypetonParser.TYPE_INT32, 0); }
    TYPE_INT16() { return this.tryGetToken(TypetonParser.TYPE_INT16, 0); }
    TYPE_INT8() { return this.tryGetToken(TypetonParser.TYPE_INT8, 0); }
    TYPE_UINT32() { return this.tryGetToken(TypetonParser.TYPE_UINT32, 0); }
    TYPE_UINT16() { return this.tryGetToken(TypetonParser.TYPE_UINT16, 0); }
    TYPE_UINT8() { return this.tryGetToken(TypetonParser.TYPE_UINT8, 0); }
    TYPE_FLOAT() { return this.tryGetToken(TypetonParser.TYPE_FLOAT, 0); }
    TYPE_BOOL() { return this.tryGetToken(TypetonParser.TYPE_BOOL, 0); }
    ID() { return this.tryGetToken(TypetonParser.ID, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_type; }
    // @Override
    enterRule(listener) {
        if (listener.enterType) {
            listener.enterType(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitType) {
            listener.exitType(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitType) {
            return visitor.visitType(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.TypeContext = TypeContext;
class ReturnTypeContext extends ParserRuleContext_1.ParserRuleContext {
    type() {
        return this.tryGetRuleContext(0, TypeContext);
    }
    TYPE_VOID() { return this.tryGetToken(TypetonParser.TYPE_VOID, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_returnType; }
    // @Override
    enterRule(listener) {
        if (listener.enterReturnType) {
            listener.enterReturnType(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitReturnType) {
            listener.exitReturnType(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitReturnType) {
            return visitor.visitReturnType(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ReturnTypeContext = ReturnTypeContext;
class ExpressionContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_expression; }
    copyFrom(ctx) {
        super.copyFrom(ctx);
    }
}
exports.ExpressionContext = ExpressionContext;
class MulDivContext extends ExpressionContext {
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    MULT() { return this.tryGetToken(TypetonParser.MULT, 0); }
    DIV() { return this.tryGetToken(TypetonParser.DIV, 0); }
    MOD() { return this.tryGetToken(TypetonParser.MOD, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterMulDiv) {
            listener.enterMulDiv(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitMulDiv) {
            listener.exitMulDiv(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitMulDiv) {
            return visitor.visitMulDiv(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.MulDivContext = MulDivContext;
class AddSubContext extends ExpressionContext {
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    PLUS() { return this.tryGetToken(TypetonParser.PLUS, 0); }
    MINUS() { return this.tryGetToken(TypetonParser.MINUS, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAddSub) {
            listener.enterAddSub(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAddSub) {
            listener.exitAddSub(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAddSub) {
            return visitor.visitAddSub(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.AddSubContext = AddSubContext;
class CompareContext extends ExpressionContext {
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    LESS_THAN() { return this.tryGetToken(TypetonParser.LESS_THAN, 0); }
    GREAT_THAN() { return this.tryGetToken(TypetonParser.GREAT_THAN, 0); }
    LESS_EQUAL() { return this.tryGetToken(TypetonParser.LESS_EQUAL, 0); }
    GREAT_EQUAL() { return this.tryGetToken(TypetonParser.GREAT_EQUAL, 0); }
    EQUAL() { return this.tryGetToken(TypetonParser.EQUAL, 0); }
    NOT_EQUAL() { return this.tryGetToken(TypetonParser.NOT_EQUAL, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterCompare) {
            listener.enterCompare(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitCompare) {
            listener.exitCompare(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitCompare) {
            return visitor.visitCompare(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.CompareContext = CompareContext;
class AndExprContext extends ExpressionContext {
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    LOGICAL_AND() { return this.getToken(TypetonParser.LOGICAL_AND, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAndExpr) {
            listener.enterAndExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAndExpr) {
            listener.exitAndExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAndExpr) {
            return visitor.visitAndExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.AndExprContext = AndExprContext;
class OrExprContext extends ExpressionContext {
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    LOGICAL_OR() { return this.getToken(TypetonParser.LOGICAL_OR, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterOrExpr) {
            listener.enterOrExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitOrExpr) {
            listener.exitOrExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitOrExpr) {
            return visitor.visitOrExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.OrExprContext = OrExprContext;
class AddressOpContext extends ExpressionContext {
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    AMPERSAND() { return this.tryGetToken(TypetonParser.AMPERSAND, 0); }
    MULT() { return this.tryGetToken(TypetonParser.MULT, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAddressOp) {
            listener.enterAddressOp(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAddressOp) {
            listener.exitAddressOp(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAddressOp) {
            return visitor.visitAddressOp(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.AddressOpContext = AddressOpContext;
class SinExprContext extends ExpressionContext {
    SIN() { return this.getToken(TypetonParser.SIN, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSinExpr) {
            listener.enterSinExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSinExpr) {
            listener.exitSinExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSinExpr) {
            return visitor.visitSinExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.SinExprContext = SinExprContext;
class CosExprContext extends ExpressionContext {
    COS() { return this.getToken(TypetonParser.COS, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterCosExpr) {
            listener.enterCosExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitCosExpr) {
            listener.exitCosExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitCosExpr) {
            return visitor.visitCosExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.CosExprContext = CosExprContext;
class TanExprContext extends ExpressionContext {
    TAN() { return this.getToken(TypetonParser.TAN, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterTanExpr) {
            listener.enterTanExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitTanExpr) {
            listener.exitTanExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTanExpr) {
            return visitor.visitTanExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.TanExprContext = TanExprContext;
class AbsExprContext extends ExpressionContext {
    ABS() { return this.getToken(TypetonParser.ABS, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAbsExpr) {
            listener.enterAbsExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAbsExpr) {
            listener.exitAbsExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAbsExpr) {
            return visitor.visitAbsExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.AbsExprContext = AbsExprContext;
class SqrtExprContext extends ExpressionContext {
    SQRT() { return this.getToken(TypetonParser.SQRT, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterSqrtExpr) {
            listener.enterSqrtExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSqrtExpr) {
            listener.exitSqrtExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSqrtExpr) {
            return visitor.visitSqrtExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.SqrtExprContext = SqrtExprContext;
class Atan2ExprContext extends ExpressionContext {
    ATAN2() { return this.getToken(TypetonParser.ATAN2, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    COMMA() { return this.getToken(TypetonParser.COMMA, 0); }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAtan2Expr) {
            listener.enterAtan2Expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAtan2Expr) {
            listener.exitAtan2Expr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAtan2Expr) {
            return visitor.visitAtan2Expr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.Atan2ExprContext = Atan2ExprContext;
class FloorExprContext extends ExpressionContext {
    FLOOR() { return this.getToken(TypetonParser.FLOOR, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFloorExpr) {
            listener.enterFloorExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFloorExpr) {
            listener.exitFloorExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFloorExpr) {
            return visitor.visitFloorExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.FloorExprContext = FloorExprContext;
class CeilExprContext extends ExpressionContext {
    CEIL() { return this.getToken(TypetonParser.CEIL, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterCeilExpr) {
            listener.enterCeilExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitCeilExpr) {
            listener.exitCeilExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitCeilExpr) {
            return visitor.visitCeilExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.CeilExprContext = CeilExprContext;
class RoundExprContext extends ExpressionContext {
    ROUND() { return this.getToken(TypetonParser.ROUND, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterRoundExpr) {
            listener.enterRoundExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitRoundExpr) {
            listener.exitRoundExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitRoundExpr) {
            return visitor.visitRoundExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.RoundExprContext = RoundExprContext;
class MinExprContext extends ExpressionContext {
    MIN() { return this.getToken(TypetonParser.MIN, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    COMMA() { return this.getToken(TypetonParser.COMMA, 0); }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterMinExpr) {
            listener.enterMinExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitMinExpr) {
            listener.exitMinExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitMinExpr) {
            return visitor.visitMinExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.MinExprContext = MinExprContext;
class MaxExprContext extends ExpressionContext {
    MAX() { return this.getToken(TypetonParser.MAX, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    COMMA() { return this.getToken(TypetonParser.COMMA, 0); }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterMaxExpr) {
            listener.enterMaxExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitMaxExpr) {
            listener.exitMaxExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitMaxExpr) {
            return visitor.visitMaxExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.MaxExprContext = MaxExprContext;
class ClampExprContext extends ExpressionContext {
    CLAMP() { return this.getToken(TypetonParser.CLAMP, 0); }
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression(i) {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }
        else {
            return this.getRuleContext(i, ExpressionContext);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(TypetonParser.COMMA);
        }
        else {
            return this.getToken(TypetonParser.COMMA, i);
        }
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterClampExpr) {
            listener.enterClampExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitClampExpr) {
            listener.exitClampExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitClampExpr) {
            return visitor.visitClampExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ClampExprContext = ClampExprContext;
class AtomExprContext extends ExpressionContext {
    atom() {
        return this.getRuleContext(0, AtomContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterAtomExpr) {
            listener.enterAtomExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitAtomExpr) {
            listener.exitAtomExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAtomExpr) {
            return visitor.visitAtomExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.AtomExprContext = AtomExprContext;
class UnaryMinusExprContext extends ExpressionContext {
    MINUS() { return this.getToken(TypetonParser.MINUS, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterUnaryMinusExpr) {
            listener.enterUnaryMinusExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitUnaryMinusExpr) {
            listener.exitUnaryMinusExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitUnaryMinusExpr) {
            return visitor.visitUnaryMinusExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.UnaryMinusExprContext = UnaryMinusExprContext;
class UnaryPlusExprContext extends ExpressionContext {
    PLUS() { return this.getToken(TypetonParser.PLUS, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterUnaryPlusExpr) {
            listener.enterUnaryPlusExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitUnaryPlusExpr) {
            listener.exitUnaryPlusExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitUnaryPlusExpr) {
            return visitor.visitUnaryPlusExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.UnaryPlusExprContext = UnaryPlusExprContext;
class NotExprContext extends ExpressionContext {
    NOT() { return this.getToken(TypetonParser.NOT, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterNotExpr) {
            listener.enterNotExpr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitNotExpr) {
            listener.exitNotExpr(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitNotExpr) {
            return visitor.visitNotExpr(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.NotExprContext = NotExprContext;
class AtomContext extends ParserRuleContext_1.ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_atom; }
    copyFrom(ctx) {
        super.copyFrom(ctx);
    }
}
exports.AtomContext = AtomContext;
class ArrayAccessContext extends AtomContext {
    ID() { return this.getToken(TypetonParser.ID, 0); }
    LBRACKET() { return this.getToken(TypetonParser.LBRACKET, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RBRACKET() { return this.getToken(TypetonParser.RBRACKET, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterArrayAccess) {
            listener.enterArrayAccess(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArrayAccess) {
            listener.exitArrayAccess(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArrayAccess) {
            return visitor.visitArrayAccess(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ArrayAccessContext = ArrayAccessContext;
class MethodCallAtomContext extends AtomContext {
    methodCall() {
        return this.getRuleContext(0, MethodCallContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterMethodCallAtom) {
            listener.enterMethodCallAtom(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitMethodCallAtom) {
            listener.exitMethodCallAtom(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitMethodCallAtom) {
            return visitor.visitMethodCallAtom(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.MethodCallAtomContext = MethodCallAtomContext;
class QualifiedNameAtomContext extends AtomContext {
    qualifiedName() {
        return this.getRuleContext(0, QualifiedNameContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterQualifiedNameAtom) {
            listener.enterQualifiedNameAtom(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitQualifiedNameAtom) {
            listener.exitQualifiedNameAtom(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitQualifiedNameAtom) {
            return visitor.visitQualifiedNameAtom(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.QualifiedNameAtomContext = QualifiedNameAtomContext;
class StructFieldAtomContext extends AtomContext {
    structFieldAccess() {
        return this.getRuleContext(0, StructFieldAccessContext);
    }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterStructFieldAtom) {
            listener.enterStructFieldAtom(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStructFieldAtom) {
            listener.exitStructFieldAtom(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructFieldAtom) {
            return visitor.visitStructFieldAtom(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.StructFieldAtomContext = StructFieldAtomContext;
class IdAtomContext extends AtomContext {
    ID() { return this.getToken(TypetonParser.ID, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterIdAtom) {
            listener.enterIdAtom(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitIdAtom) {
            listener.exitIdAtom(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitIdAtom) {
            return visitor.visitIdAtom(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.IdAtomContext = IdAtomContext;
class IntAtomContext extends AtomContext {
    INT_LIT() { return this.getToken(TypetonParser.INT_LIT, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterIntAtom) {
            listener.enterIntAtom(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitIntAtom) {
            listener.exitIntAtom(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitIntAtom) {
            return visitor.visitIntAtom(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.IntAtomContext = IntAtomContext;
class FloatAtomContext extends AtomContext {
    FLOAT_LIT() { return this.getToken(TypetonParser.FLOAT_LIT, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterFloatAtom) {
            listener.enterFloatAtom(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFloatAtom) {
            listener.exitFloatAtom(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFloatAtom) {
            return visitor.visitFloatAtom(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.FloatAtomContext = FloatAtomContext;
class StringAtomContext extends AtomContext {
    STRING_LIT() { return this.getToken(TypetonParser.STRING_LIT, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterStringAtom) {
            listener.enterStringAtom(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStringAtom) {
            listener.exitStringAtom(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStringAtom) {
            return visitor.visitStringAtom(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.StringAtomContext = StringAtomContext;
class ParenAtomContext extends AtomContext {
    LPAREN() { return this.getToken(TypetonParser.LPAREN, 0); }
    expression() {
        return this.getRuleContext(0, ExpressionContext);
    }
    RPAREN() { return this.getToken(TypetonParser.RPAREN, 0); }
    constructor(ctx) {
        super(ctx.parent, ctx.invokingState);
        this.copyFrom(ctx);
    }
    // @Override
    enterRule(listener) {
        if (listener.enterParenAtom) {
            listener.enterParenAtom(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitParenAtom) {
            listener.exitParenAtom(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitParenAtom) {
            return visitor.visitParenAtom(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.ParenAtomContext = ParenAtomContext;
class StructDeclContext extends ParserRuleContext_1.ParserRuleContext {
    STRUCT() { return this.getToken(TypetonParser.STRUCT, 0); }
    ID() { return this.getToken(TypetonParser.ID, 0); }
    LBRACE() { return this.getToken(TypetonParser.LBRACE, 0); }
    RBRACE() { return this.getToken(TypetonParser.RBRACE, 0); }
    structField(i) {
        if (i === undefined) {
            return this.getRuleContexts(StructFieldContext);
        }
        else {
            return this.getRuleContext(i, StructFieldContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_structDecl; }
    // @Override
    enterRule(listener) {
        if (listener.enterStructDecl) {
            listener.enterStructDecl(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStructDecl) {
            listener.exitStructDecl(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructDecl) {
            return visitor.visitStructDecl(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.StructDeclContext = StructDeclContext;
class StructFieldContext extends ParserRuleContext_1.ParserRuleContext {
    ID() { return this.getToken(TypetonParser.ID, 0); }
    COLON() { return this.getToken(TypetonParser.COLON, 0); }
    type() {
        return this.getRuleContext(0, TypeContext);
    }
    SEMICOLON() { return this.getToken(TypetonParser.SEMICOLON, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return TypetonParser.RULE_structField; }
    // @Override
    enterRule(listener) {
        if (listener.enterStructField) {
            listener.enterStructField(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitStructField) {
            listener.exitStructField(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructField) {
            return visitor.visitStructField(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
exports.StructFieldContext = StructFieldContext;
//# sourceMappingURL=TypetonParser.js.map