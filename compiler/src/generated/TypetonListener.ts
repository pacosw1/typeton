// Generated from ../grammar/Typeton.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `TypetonParser`.
 */
export interface TypetonListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `MulDiv`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMulDiv?: (ctx: MulDivContext) => void;
	/**
	 * Exit a parse tree produced by the `MulDiv`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMulDiv?: (ctx: MulDivContext) => void;

	/**
	 * Enter a parse tree produced by the `AddSub`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAddSub?: (ctx: AddSubContext) => void;
	/**
	 * Exit a parse tree produced by the `AddSub`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAddSub?: (ctx: AddSubContext) => void;

	/**
	 * Enter a parse tree produced by the `Compare`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterCompare?: (ctx: CompareContext) => void;
	/**
	 * Exit a parse tree produced by the `Compare`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitCompare?: (ctx: CompareContext) => void;

	/**
	 * Enter a parse tree produced by the `AndExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAndExpr?: (ctx: AndExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AndExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAndExpr?: (ctx: AndExprContext) => void;

	/**
	 * Enter a parse tree produced by the `OrExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOrExpr?: (ctx: OrExprContext) => void;
	/**
	 * Exit a parse tree produced by the `OrExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOrExpr?: (ctx: OrExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AddressOp`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAddressOp?: (ctx: AddressOpContext) => void;
	/**
	 * Exit a parse tree produced by the `AddressOp`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAddressOp?: (ctx: AddressOpContext) => void;

	/**
	 * Enter a parse tree produced by the `SinExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterSinExpr?: (ctx: SinExprContext) => void;
	/**
	 * Exit a parse tree produced by the `SinExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitSinExpr?: (ctx: SinExprContext) => void;

	/**
	 * Enter a parse tree produced by the `CosExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterCosExpr?: (ctx: CosExprContext) => void;
	/**
	 * Exit a parse tree produced by the `CosExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitCosExpr?: (ctx: CosExprContext) => void;

	/**
	 * Enter a parse tree produced by the `TanExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTanExpr?: (ctx: TanExprContext) => void;
	/**
	 * Exit a parse tree produced by the `TanExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTanExpr?: (ctx: TanExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AbsExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAbsExpr?: (ctx: AbsExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AbsExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAbsExpr?: (ctx: AbsExprContext) => void;

	/**
	 * Enter a parse tree produced by the `SqrtExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterSqrtExpr?: (ctx: SqrtExprContext) => void;
	/**
	 * Exit a parse tree produced by the `SqrtExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitSqrtExpr?: (ctx: SqrtExprContext) => void;

	/**
	 * Enter a parse tree produced by the `Atan2Expr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAtan2Expr?: (ctx: Atan2ExprContext) => void;
	/**
	 * Exit a parse tree produced by the `Atan2Expr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAtan2Expr?: (ctx: Atan2ExprContext) => void;

	/**
	 * Enter a parse tree produced by the `FloorExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterFloorExpr?: (ctx: FloorExprContext) => void;
	/**
	 * Exit a parse tree produced by the `FloorExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitFloorExpr?: (ctx: FloorExprContext) => void;

	/**
	 * Enter a parse tree produced by the `CeilExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterCeilExpr?: (ctx: CeilExprContext) => void;
	/**
	 * Exit a parse tree produced by the `CeilExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitCeilExpr?: (ctx: CeilExprContext) => void;

	/**
	 * Enter a parse tree produced by the `RoundExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterRoundExpr?: (ctx: RoundExprContext) => void;
	/**
	 * Exit a parse tree produced by the `RoundExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitRoundExpr?: (ctx: RoundExprContext) => void;

	/**
	 * Enter a parse tree produced by the `MinExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMinExpr?: (ctx: MinExprContext) => void;
	/**
	 * Exit a parse tree produced by the `MinExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMinExpr?: (ctx: MinExprContext) => void;

	/**
	 * Enter a parse tree produced by the `MaxExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMaxExpr?: (ctx: MaxExprContext) => void;
	/**
	 * Exit a parse tree produced by the `MaxExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMaxExpr?: (ctx: MaxExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ClampExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterClampExpr?: (ctx: ClampExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ClampExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitClampExpr?: (ctx: ClampExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AtomExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAtomExpr?: (ctx: AtomExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AtomExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAtomExpr?: (ctx: AtomExprContext) => void;

	/**
	 * Enter a parse tree produced by the `UnaryMinusExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnaryMinusExpr?: (ctx: UnaryMinusExprContext) => void;
	/**
	 * Exit a parse tree produced by the `UnaryMinusExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnaryMinusExpr?: (ctx: UnaryMinusExprContext) => void;

	/**
	 * Enter a parse tree produced by the `UnaryPlusExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnaryPlusExpr?: (ctx: UnaryPlusExprContext) => void;
	/**
	 * Exit a parse tree produced by the `UnaryPlusExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnaryPlusExpr?: (ctx: UnaryPlusExprContext) => void;

	/**
	 * Enter a parse tree produced by the `NotExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNotExpr?: (ctx: NotExprContext) => void;
	/**
	 * Exit a parse tree produced by the `NotExpr`
	 * labeled alternative in `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNotExpr?: (ctx: NotExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ScalarAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	enterScalarAssignment?: (ctx: ScalarAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by the `ScalarAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	exitScalarAssignment?: (ctx: ScalarAssignmentContext) => void;

	/**
	 * Enter a parse tree produced by the `CompoundAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	enterCompoundAssignment?: (ctx: CompoundAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by the `CompoundAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	exitCompoundAssignment?: (ctx: CompoundAssignmentContext) => void;

	/**
	 * Enter a parse tree produced by the `PostfixIncrement`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	enterPostfixIncrement?: (ctx: PostfixIncrementContext) => void;
	/**
	 * Exit a parse tree produced by the `PostfixIncrement`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	exitPostfixIncrement?: (ctx: PostfixIncrementContext) => void;

	/**
	 * Enter a parse tree produced by the `PostfixDecrement`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	enterPostfixDecrement?: (ctx: PostfixDecrementContext) => void;
	/**
	 * Exit a parse tree produced by the `PostfixDecrement`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	exitPostfixDecrement?: (ctx: PostfixDecrementContext) => void;

	/**
	 * Enter a parse tree produced by the `ArrayAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	enterArrayAssignment?: (ctx: ArrayAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrayAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	exitArrayAssignment?: (ctx: ArrayAssignmentContext) => void;

	/**
	 * Enter a parse tree produced by the `StructAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	enterStructAssignment?: (ctx: StructAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by the `StructAssignment`
	 * labeled alternative in `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	exitStructAssignment?: (ctx: StructAssignmentContext) => void;

	/**
	 * Enter a parse tree produced by the `ArrayAccess`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterArrayAccess?: (ctx: ArrayAccessContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrayAccess`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitArrayAccess?: (ctx: ArrayAccessContext) => void;

	/**
	 * Enter a parse tree produced by the `MethodCallAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterMethodCallAtom?: (ctx: MethodCallAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `MethodCallAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitMethodCallAtom?: (ctx: MethodCallAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `QualifiedNameAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterQualifiedNameAtom?: (ctx: QualifiedNameAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `QualifiedNameAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitQualifiedNameAtom?: (ctx: QualifiedNameAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `StructFieldAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterStructFieldAtom?: (ctx: StructFieldAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `StructFieldAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitStructFieldAtom?: (ctx: StructFieldAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `IdAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterIdAtom?: (ctx: IdAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `IdAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitIdAtom?: (ctx: IdAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `IntAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterIntAtom?: (ctx: IntAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `IntAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitIntAtom?: (ctx: IntAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `FloatAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterFloatAtom?: (ctx: FloatAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `FloatAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitFloatAtom?: (ctx: FloatAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `StringAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterStringAtom?: (ctx: StringAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `StringAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitStringAtom?: (ctx: StringAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `ParenAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterParenAtom?: (ctx: ParenAtomContext) => void;
	/**
	 * Exit a parse tree produced by the `ParenAtom`
	 * labeled alternative in `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitParenAtom?: (ctx: ParenAtomContext) => void;

	/**
	 * Enter a parse tree produced by the `ScalarVarDecl`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	enterScalarVarDecl?: (ctx: ScalarVarDeclContext) => void;
	/**
	 * Exit a parse tree produced by the `ScalarVarDecl`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	exitScalarVarDecl?: (ctx: ScalarVarDeclContext) => void;

	/**
	 * Enter a parse tree produced by the `ScalarVarDeclNoInit`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	enterScalarVarDeclNoInit?: (ctx: ScalarVarDeclNoInitContext) => void;
	/**
	 * Exit a parse tree produced by the `ScalarVarDeclNoInit`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	exitScalarVarDeclNoInit?: (ctx: ScalarVarDeclNoInitContext) => void;

	/**
	 * Enter a parse tree produced by the `ArrayVarDecl`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	enterArrayVarDecl?: (ctx: ArrayVarDeclContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrayVarDecl`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	exitArrayVarDecl?: (ctx: ArrayVarDeclContext) => void;

	/**
	 * Enter a parse tree produced by the `ArrayVarDeclInit`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	enterArrayVarDeclInit?: (ctx: ArrayVarDeclInitContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrayVarDeclInit`
	 * labeled alternative in `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	exitArrayVarDeclInit?: (ctx: ArrayVarDeclInitContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.forStmt`.
	 * @param ctx the parse tree
	 */
	enterForStmt?: (ctx: ForStmtContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.forStmt`.
	 * @param ctx the parse tree
	 */
	exitForStmt?: (ctx: ForStmtContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.forInit`.
	 * @param ctx the parse tree
	 */
	enterForInit?: (ctx: ForInitContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.forInit`.
	 * @param ctx the parse tree
	 */
	exitForInit?: (ctx: ForInitContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.forVarDecl`.
	 * @param ctx the parse tree
	 */
	enterForVarDecl?: (ctx: ForVarDeclContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.forVarDecl`.
	 * @param ctx the parse tree
	 */
	exitForVarDecl?: (ctx: ForVarDeclContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.whileStmt`.
	 * @param ctx the parse tree
	 */
	enterWhileStmt?: (ctx: WhileStmtContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.whileStmt`.
	 * @param ctx the parse tree
	 */
	exitWhileStmt?: (ctx: WhileStmtContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	enterIfStmt?: (ctx: IfStmtContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	exitIfStmt?: (ctx: IfStmtContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	enterVarDecl?: (ctx: VarDeclContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.varDecl`.
	 * @param ctx the parse tree
	 */
	exitVarDecl?: (ctx: VarDeclContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.constDecl`.
	 * @param ctx the parse tree
	 */
	enterConstDecl?: (ctx: ConstDeclContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.constDecl`.
	 * @param ctx the parse tree
	 */
	exitConstDecl?: (ctx: ConstDeclContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.assignment`.
	 * @param ctx the parse tree
	 */
	enterAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.assignment`.
	 * @param ctx the parse tree
	 */
	exitAssignment?: (ctx: AssignmentContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	enterSimpleAssignment?: (ctx: SimpleAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.simpleAssignment`.
	 * @param ctx the parse tree
	 */
	exitSimpleAssignment?: (ctx: SimpleAssignmentContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.printStmt`.
	 * @param ctx the parse tree
	 */
	enterPrintStmt?: (ctx: PrintStmtContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.printStmt`.
	 * @param ctx the parse tree
	 */
	exitPrintStmt?: (ctx: PrintStmtContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.arrayLiteral`.
	 * @param ctx the parse tree
	 */
	enterArrayLiteral?: (ctx: ArrayLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.arrayLiteral`.
	 * @param ctx the parse tree
	 */
	exitArrayLiteral?: (ctx: ArrayLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.argumentList`.
	 * @param ctx the parse tree
	 */
	enterArgumentList?: (ctx: ArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.argumentList`.
	 * @param ctx the parse tree
	 */
	exitArgumentList?: (ctx: ArgumentListContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	enterQualifiedName?: (ctx: QualifiedNameContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	exitQualifiedName?: (ctx: QualifiedNameContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.callableName`.
	 * @param ctx the parse tree
	 */
	enterCallableName?: (ctx: CallableNameContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.callableName`.
	 * @param ctx the parse tree
	 */
	exitCallableName?: (ctx: CallableNameContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.methodCall`.
	 * @param ctx the parse tree
	 */
	enterMethodCall?: (ctx: MethodCallContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.methodCall`.
	 * @param ctx the parse tree
	 */
	exitMethodCall?: (ctx: MethodCallContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.structFieldAccess`.
	 * @param ctx the parse tree
	 */
	enterStructFieldAccess?: (ctx: StructFieldAccessContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.structFieldAccess`.
	 * @param ctx the parse tree
	 */
	exitStructFieldAccess?: (ctx: StructFieldAccessContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.returnStmt`.
	 * @param ctx the parse tree
	 */
	enterReturnStmt?: (ctx: ReturnStmtContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.returnStmt`.
	 * @param ctx the parse tree
	 */
	exitReturnStmt?: (ctx: ReturnStmtContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.breakStmt`.
	 * @param ctx the parse tree
	 */
	enterBreakStmt?: (ctx: BreakStmtContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.breakStmt`.
	 * @param ctx the parse tree
	 */
	exitBreakStmt?: (ctx: BreakStmtContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.continueStmt`.
	 * @param ctx the parse tree
	 */
	enterContinueStmt?: (ctx: ContinueStmtContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.continueStmt`.
	 * @param ctx the parse tree
	 */
	exitContinueStmt?: (ctx: ContinueStmtContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.functionExpr`.
	 * @param ctx the parse tree
	 */
	enterFunctionExpr?: (ctx: FunctionExprContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.functionExpr`.
	 * @param ctx the parse tree
	 */
	exitFunctionExpr?: (ctx: FunctionExprContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.parameterList`.
	 * @param ctx the parse tree
	 */
	enterParameterList?: (ctx: ParameterListContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.parameterList`.
	 * @param ctx the parse tree
	 */
	exitParameterList?: (ctx: ParameterListContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.parameter`.
	 * @param ctx the parse tree
	 */
	enterParameter?: (ctx: ParameterContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.parameter`.
	 * @param ctx the parse tree
	 */
	exitParameter?: (ctx: ParameterContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.type`.
	 * @param ctx the parse tree
	 */
	enterType?: (ctx: TypeContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.type`.
	 * @param ctx the parse tree
	 */
	exitType?: (ctx: TypeContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.returnType`.
	 * @param ctx the parse tree
	 */
	enterReturnType?: (ctx: ReturnTypeContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.returnType`.
	 * @param ctx the parse tree
	 */
	exitReturnType?: (ctx: ReturnTypeContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	enterAtom?: (ctx: AtomContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.atom`.
	 * @param ctx the parse tree
	 */
	exitAtom?: (ctx: AtomContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.structDecl`.
	 * @param ctx the parse tree
	 */
	enterStructDecl?: (ctx: StructDeclContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.structDecl`.
	 * @param ctx the parse tree
	 */
	exitStructDecl?: (ctx: StructDeclContext) => void;

	/**
	 * Enter a parse tree produced by `TypetonParser.structField`.
	 * @param ctx the parse tree
	 */
	enterStructField?: (ctx: StructFieldContext) => void;
	/**
	 * Exit a parse tree produced by `TypetonParser.structField`.
	 * @param ctx the parse tree
	 */
	exitStructField?: (ctx: StructFieldContext) => void;
}

