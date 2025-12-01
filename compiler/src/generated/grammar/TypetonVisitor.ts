// Generated from ../grammar/Typeton.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { MulDivContext } from "./TypetonParser";
import { AddSubContext } from "./TypetonParser";
import { CompareContext } from "./TypetonParser";
import { AndExprContext } from "./TypetonParser";
import { OrExprContext } from "./TypetonParser";
import { AddressOpContext } from "./TypetonParser";
import { SinExprContext } from "./TypetonParser";
import { CosExprContext } from "./TypetonParser";
import { TanExprContext } from "./TypetonParser";
import { AbsExprContext } from "./TypetonParser";
import { SqrtExprContext } from "./TypetonParser";
import { Atan2ExprContext } from "./TypetonParser";
import { FloorExprContext } from "./TypetonParser";
import { CeilExprContext } from "./TypetonParser";
import { RoundExprContext } from "./TypetonParser";
import { MinExprContext } from "./TypetonParser";
import { MaxExprContext } from "./TypetonParser";
import { ClampExprContext } from "./TypetonParser";
import { AtomExprContext } from "./TypetonParser";
import { UnaryMinusExprContext } from "./TypetonParser";
import { UnaryPlusExprContext } from "./TypetonParser";
import { NotExprContext } from "./TypetonParser";
import { ScalarAssignmentContext } from "./TypetonParser";
import { CompoundAssignmentContext } from "./TypetonParser";
import { PostfixIncrementContext } from "./TypetonParser";
import { PostfixDecrementContext } from "./TypetonParser";
import { ArrayAssignmentContext } from "./TypetonParser";
import { StructAssignmentContext } from "./TypetonParser";
import { ArrayAccessContext } from "./TypetonParser";
import { MethodCallAtomContext } from "./TypetonParser";
import { QualifiedNameAtomContext } from "./TypetonParser";
import { StructFieldAtomContext } from "./TypetonParser";
import { IdAtomContext } from "./TypetonParser";
import { IntAtomContext } from "./TypetonParser";
import { FloatAtomContext } from "./TypetonParser";
import { StringAtomContext } from "./TypetonParser";
import { ParenAtomContext } from "./TypetonParser";
import { ScalarVarDeclContext } from "./TypetonParser";
import { ScalarVarDeclNoInitContext } from "./TypetonParser";
import { ArrayVarDeclContext } from "./TypetonParser";
import { ArrayVarDeclInitContext } from "./TypetonParser";
import { ProgramContext } from "./TypetonParser";
import { StatementContext } from "./TypetonParser";
import { ForStmtContext } from "./TypetonParser";
import { ForInitContext } from "./TypetonParser";
import { ForVarDeclContext } from "./TypetonParser";
import { WhileStmtContext } from "./TypetonParser";
import { IfStmtContext } from "./TypetonParser";
import { BlockContext } from "./TypetonParser";
import { VarDeclContext } from "./TypetonParser";
import { ConstDeclContext } from "./TypetonParser";
import { AssignmentContext } from "./TypetonParser";
import { SimpleAssignmentContext } from "./TypetonParser";
import { PrintStmtContext } from "./TypetonParser";
import { ArrayLiteralContext } from "./TypetonParser";
import { ArgumentListContext } from "./TypetonParser";
import { QualifiedNameContext } from "./TypetonParser";
import { CallableNameContext } from "./TypetonParser";
import { MethodCallContext } from "./TypetonParser";
import { StructFieldAccessContext } from "./TypetonParser";
import { ReturnStmtContext } from "./TypetonParser";
import { BreakStmtContext } from "./TypetonParser";
import { ContinueStmtContext } from "./TypetonParser";
import { FunctionExprContext } from "./TypetonParser";
import { ParameterListContext } from "./TypetonParser";
import { ParameterContext } from "./TypetonParser";
import { TypeContext } from "./TypetonParser";
import { ReturnTypeContext } from "./TypetonParser";
import { ExpressionContext } from "./TypetonParser";
import { AtomContext } from "./TypetonParser";
import { StructDeclContext } from "./TypetonParser";
import { StructFieldContext } from "./TypetonParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `TypetonParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface TypetonVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `MulDiv`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMulDiv?: (ctx: MulDivContext) => Result;

	/**
	 * Visit a parse tree produced by the `AddSub`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddSub?: (ctx: AddSubContext) => Result;

	/**
	 * Visit a parse tree produced by the `Compare`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompare?: (ctx: CompareContext) => Result;

	/**
	 * Visit a parse tree produced by the `AndExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpr?: (ctx: AndExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `OrExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpr?: (ctx: OrExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AddressOp`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddressOp?: (ctx: AddressOpContext) => Result;

	/**
	 * Visit a parse tree produced by the `SinExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSinExpr?: (ctx: SinExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `CosExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCosExpr?: (ctx: CosExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `TanExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTanExpr?: (ctx: TanExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AbsExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAbsExpr?: (ctx: AbsExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `SqrtExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSqrtExpr?: (ctx: SqrtExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `Atan2Expr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtan2Expr?: (ctx: Atan2ExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `FloorExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloorExpr?: (ctx: FloorExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `CeilExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCeilExpr?: (ctx: CeilExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `RoundExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRoundExpr?: (ctx: RoundExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `MinExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMinExpr?: (ctx: MinExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `MaxExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMaxExpr?: (ctx: MaxExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ClampExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClampExpr?: (ctx: ClampExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AtomExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomExpr?: (ctx: AtomExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnaryMinusExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryMinusExpr?: (ctx: UnaryMinusExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnaryPlusExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryPlusExpr?: (ctx: UnaryPlusExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NotExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotExpr?: (ctx: NotExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ScalarAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScalarAssignment?: (ctx: ScalarAssignmentContext) => Result;

	/**
	 * Visit a parse tree produced by the `CompoundAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompoundAssignment?: (ctx: CompoundAssignmentContext) => Result;

	/**
	 * Visit a parse tree produced by the `PostfixIncrement`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostfixIncrement?: (ctx: PostfixIncrementContext) => Result;

	/**
	 * Visit a parse tree produced by the `PostfixDecrement`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostfixDecrement?: (ctx: PostfixDecrementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ArrayAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayAssignment?: (ctx: ArrayAssignmentContext) => Result;

	/**
	 * Visit a parse tree produced by the `StructAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructAssignment?: (ctx: StructAssignmentContext) => Result;

	/**
	 * Visit a parse tree produced by the `ArrayAccess`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayAccess?: (ctx: ArrayAccessContext) => Result;

	/**
	 * Visit a parse tree produced by the `MethodCallAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodCallAtom?: (ctx: MethodCallAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `QualifiedNameAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedNameAtom?: (ctx: QualifiedNameAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `StructFieldAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructFieldAtom?: (ctx: StructFieldAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `IdAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdAtom?: (ctx: IdAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `IntAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntAtom?: (ctx: IntAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `FloatAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloatAtom?: (ctx: FloatAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringAtom?: (ctx: StringAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `ParenAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenAtom?: (ctx: ParenAtomContext) => Result;

	/**
	 * Visit a parse tree produced by the `ScalarVarDecl`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScalarVarDecl?: (ctx: ScalarVarDeclContext) => Result;

	/**
	 * Visit a parse tree produced by the `ScalarVarDeclNoInit`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScalarVarDeclNoInit?: (ctx: ScalarVarDeclNoInitContext) => Result;

	/**
	 * Visit a parse tree produced by the `ArrayVarDecl`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayVarDecl?: (ctx: ArrayVarDeclContext) => Result;

	/**
	 * Visit a parse tree produced by the `ArrayVarDeclInit`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayVarDeclInit?: (ctx: ArrayVarDeclInitContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.forStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForStmt?: (ctx: ForStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.forInit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForInit?: (ctx: ForInitContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.forVarDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForVarDecl?: (ctx: ForVarDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.whileStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhileStmt?: (ctx: WhileStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.ifStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStmt?: (ctx: IfStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarDecl?: (ctx: VarDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.constDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstDecl?: (ctx: ConstDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment?: (ctx: AssignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleAssignment?: (ctx: SimpleAssignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.printStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrintStmt?: (ctx: PrintStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.arrayLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayLiteral?: (ctx: ArrayLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.argumentList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgumentList?: (ctx: ArgumentListContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.qualifiedName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedName?: (ctx: QualifiedNameContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.callableName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallableName?: (ctx: CallableNameContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.methodCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodCall?: (ctx: MethodCallContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.structFieldAccess`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructFieldAccess?: (ctx: StructFieldAccessContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.returnStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnStmt?: (ctx: ReturnStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.breakStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreakStmt?: (ctx: BreakStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.continueStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinueStmt?: (ctx: ContinueStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.functionExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionExpr?: (ctx: FunctionExprContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.parameterList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterList?: (ctx: ParameterListContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.parameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter?: (ctx: ParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.returnType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnType?: (ctx: ReturnTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtom?: (ctx: AtomContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.structDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructDecl?: (ctx: StructDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `TypetonParser.structField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructField?: (ctx: StructFieldContext) => Result;
}

