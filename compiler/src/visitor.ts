import type { TypetonVisitor } from "./generated/TypetonVisitor";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { Buffer } from "buffer";
import {
  ProgramContext,
  ForStmtContext,
  WhileStmtContext,
  ExpressionContext,
  IfStmtContext,
  BlockContext,
  ScalarAssignmentContext,
  ArrayAssignmentContext,
  PrintStmtContext,
  MulDivContext,
  AddSubContext,
  IntAtomContext,
  FloatAtomContext,
  IdAtomContext,
  ParenAtomContext,
  ScalarVarDeclContext,
  ArrayVarDeclContext,
  ArrayVarDeclInitContext,
  ScalarVarDeclNoInitContext,
  StructDeclContext,
  ArrayLiteralContext,
  ArrayAccessContext,
  CompareContext,
  OrExprContext,
  AndExprContext,
  SinExprContext,
  CosExprContext,
  TanExprContext,
  AbsExprContext,
  SqrtExprContext,
  Atan2ExprContext,
  FloorExprContext,
  CeilExprContext,
  RoundExprContext,
  MinExprContext,
  MaxExprContext,
  ClampExprContext,
  AddressOpContext,
  MethodCallAtomContext,
  MethodCallContext,
  ForInitContext,
  ForVarDeclContext,
  StructAssignmentContext,
  StructFieldAtomContext,
  QualifiedNameAtomContext,
  CallableNameContext,
  StringAtomContext,
  ConstDeclContext,
  FunctionExprContext,
  ReturnStmtContext,
  ParameterContext,
  BreakStmtContext,
  ContinueStmtContext,
  CompoundAssignmentContext,
  PostfixIncrementContext,
  PostfixDecrementContext,
} from "./generated/TypetonParser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { MemoryAllocator } from "./memory";

export interface Quad {
  op: string;
  left: number | string;
  right: number | string;
  res: number | string;
}

export class CompilerVisitor
  extends AbstractParseTreeVisitor<string>
  implements TypetonVisitor<string>
{
  public quads: Quad[] = [];
  private globalMemory: MemoryAllocator;
  private currentMemory: MemoryAllocator;
  private constFunctionBindings: Set<string> = new Set();
  private functions: Map<string, FunctionInfo> = new Map();
  private currentFunction: FunctionContext | null = null;
  private structDefinitions: Map<string, StructDefinition> = new Map();
  private structPointerTypes: Map<number, string> = new Map();
  private referenceOperands: Set<string> = new Set();
  private errorContext?: ParserRuleContext;
  private sourceLines: string[] = [];
  private loopStack: LoopContext[] = [];
  private operandTypes: Map<string, string> = new Map();

  constructor() {
    super();
    this.globalMemory = new MemoryAllocator("global");
    this.currentMemory = this.globalMemory;
  }

  setSourceText(text: string) {
    this.sourceLines = text.split(/\r?\n/);
  }

  protected defaultResult(): string {
    return "";
  }

  visitProgram(ctx: ProgramContext): string {
    this.visitChildren(ctx);
    if (!this.functions.has("main")) {
      this.throwWithLocation("Program must declare a `main` function", ctx);
    }
    this.invokeMainIfPresent();
    return "";
  }

  private invokeMainIfPresent() {
    if (!this.functions.has("main")) {
      return;
    }
    this.emitFunctionCall("main", []);
  }

  visitStructDecl(ctx: StructDeclContext): string {
    const name = ctx.ID().text;
    if (this.structDefinitions.has(name)) {
      this.throwWithLocation(`Struct '${name}' is already defined`, ctx);
    }
    const fields: StructFieldDefinition[] = ctx
      .structField()
      .map((fieldCtx) => {
        const fieldName = fieldCtx.ID().text;
        const fieldType = fieldCtx.type().text;
        if (!this.isBuiltinType(fieldType) && !this.structDefinitions.has(fieldType)) {
          throw this.throwWithLocation(
            `Unknown field type '${fieldType}' in struct '${name}'`,
            fieldCtx
          );
        }
        return { name: fieldName, type: fieldType };
      });
    const fieldNames = new Set(fields.map((f) => f.name));
    if (fieldNames.size !== fields.length) {
      throw this.throwWithLocation(
        `Struct '${name}' has duplicate field names`,
        ctx
      );
    }
    this.structDefinitions.set(name, { name, fields });
    return "";
  }

  visitScalarVarDecl(ctx: ScalarVarDeclContext): string {
    const id = ctx.ID().text;
    const type = ctx.type().text;
    if (this.constFunctionBindings.has(id)) {
      throw new Error(`Identifier '${id}' already declared as const`);
    }
    if (this.isStructType(type)) {
      return this.emitStructVariableDeclaration(id, type);
    }
    return this.emitScalarDeclaration(id, type, ctx.expression());
  }

  visitConstDecl(ctx: ConstDeclContext): string {
    const name = ctx.ID().text;

    if (ctx.functionExpr()) {
      if (this.currentFunction) {
        throw new Error("Function declarations are only allowed at the top level");
      }
      if (this.constFunctionBindings.has(name)) {
        throw new Error(`Constant '${name}' already declared`);
      }
      if (this.globalMemory.hasSymbol(name)) {
        throw new Error(`Identifier '${name}' already declared as variable`);
      }
      this.constFunctionBindings.add(name);
      this.emitFunctionDeclaration(name, ctx.functionExpr()!);
      return "";
    }

    if (this.constFunctionBindings.has(name)) {
      throw new Error(`Identifier '${name}' already declared as const function`);
    }

    const typeNode = ctx.type();
    const expression = ctx.expression();
    if (!typeNode || !expression) {
      throw new Error("Const variable declarations must include a type and initializer");
    }
    const type = typeNode.text;
    if (this.isStructType(type)) {
      this.emitStructVariableDeclaration(name, type);
    } else {
      this.emitScalarDeclaration(name, type, expression);
    }
    this.currentMemory.markImmutable(name);
    return "";
  }

  visitScalarVarDeclNoInit(ctx: ScalarVarDeclNoInitContext): string {
    const id = ctx.ID().text;
    const type = ctx.type().text;
    if (this.constFunctionBindings.has(id)) {
      throw new Error(`Identifier '${id}' already declared as const`);
    }
    if (this.isStructType(type)) {
      return this.emitStructVariableDeclaration(id, type);
    }
    const address = this.currentMemory.allocate(id, type);
    this.setOperandType(address, type);
    this.quads.push({
      op: "=",
      left: this.formatLiteral(0),
      right: "",
      res: address,
    });
    return address.toString();
  }

  visitArrayVarDecl(ctx: ArrayVarDeclContext): string {
    const id = ctx.ID().text;
    const type = ctx.type().text;
    const length = Number(ctx.INT_LIT().text);
    if (this.constFunctionBindings.has(id)) {
      throw new Error(`Identifier '${id}' already declared as const`);
    }
    if (this.isStructType(type)) {
      throw new Error("Struct arrays are not supported yet");
    }
    this.currentMemory.allocateArray(id, type, length);
    return "";
  }

  visitArrayVarDeclInit(ctx: ArrayVarDeclInitContext): string {
    const id = ctx.ID().text;
    const type = ctx.type().text;
    const length = Number(ctx.INT_LIT().text);
    const values = this.visitArrayLiteral(ctx.arrayLiteral());
    if (this.constFunctionBindings.has(id)) {
      throw new Error(`Identifier '${id}' already declared as const`);
    }
    if (this.isStructType(type)) {
      throw new Error("Struct arrays are not supported yet");
    }
    this.currentMemory.allocateArray(id, type, length);

    values.forEach((value, idx) => {
      if (idx >= length) {
        throw new Error(`Too many initialization values for '${id}'`);
      }
      this.emitArrayStore(id, idx.toString(), value);
    });
    return "";
  }

  visitScalarAssignment(ctx: ScalarAssignmentContext): string {
    const id = ctx.ID().text;
    const address = this.ensureMutableVariable(id, ctx);
    const exprResult = this.visit(ctx.expression());
    this.emitStore(address, exprResult);
    return address.toString();
  }

  visitCompoundAssignment(ctx: CompoundAssignmentContext): string {
    const id = ctx.ID().text;
    const address = this.ensureMutableVariable(id, ctx);
    const exprResult = this.visit(ctx.expression());
    const quadOp = this.resolveCompoundOp(ctx);
    const temp = this.emitBinaryOp(quadOp, address, exprResult, ctx);
    this.emitStore(address, temp);
    return address.toString();
  }

  visitPostfixIncrement(ctx: PostfixIncrementContext): string {
    const id = ctx.ID().text;
    const address = this.ensureMutableVariable(id, ctx);
    const temp = this.emitBinaryOp("ADD_I32", address, this.formatLiteral(1), ctx);
    this.emitStore(address, temp);
    return address.toString();
  }

  visitPostfixDecrement(ctx: PostfixDecrementContext): string {
    const id = ctx.ID().text;
    const address = this.ensureMutableVariable(id, ctx);
    const temp = this.emitBinaryOp("SUB_I32", address, this.formatLiteral(1), ctx);
    this.emitStore(address, temp);
    return address.toString();
  }

  visitArrayAssignment(ctx: ArrayAssignmentContext): string {
    const id = ctx.ID().text;
    const indexOperand = this.visit(ctx.expression(0));
    const valueOperand = this.visit(ctx.expression(1));
    this.emitArrayStore(id, indexOperand, valueOperand);
    return "";
  }

  visitStructAssignment(ctx: StructAssignmentContext): string {
    const ids = ctx.structFieldAccess().ID().map((token) => token.text);
    const resolution = this.resolveStructFieldAccess(ids);
    if (resolution.isStruct) {
      throw new Error("Assign to struct fields individually; whole-struct assignment is not supported");
    }
    const valueOperand = this.visit(ctx.expression());
    this.quads.push({
      op: "=",
      left: valueOperand,
      right: "",
      res: `&${resolution.addressTemp}`,
    });
    return "";
  }

  visitForStmt(ctx: ForStmtContext): string {
    this.handleForInit(ctx.forInit());

    const loopCtx: LoopContext = { breakQuads: [], continueQuads: [], continueTarget: null };
    this.loopStack.push(loopCtx);

    const loopStartIndex = this.quads.length;

    const condition = this.visit(ctx.expression());
    const falseJumpIndex = this.quads.length;
    this.quads.push({
      op: "GOTOF",
      left: condition,
      right: "",
      res: 0,
    });

    this.visit(ctx.statement());

    const continueTargetIndex = this.quads.length;
    this.applyContinueTargets(loopCtx, continueTargetIndex);

    this.visit(ctx.simpleAssignment());

    this.quads.push({
      op: "GOTO",
      left: "",
      right: "",
      res: loopStartIndex,
    });

    const loopEnd = this.quads.length;
    this.quads[falseJumpIndex].res = loopEnd;
    this.applyBreakTargets(loopCtx, loopEnd);
    this.loopStack.pop();
    return "";
  }

  visitWhileStmt(ctx: WhileStmtContext): string {
    const loopStartIndex = this.quads.length;
    const loopCtx: LoopContext = {
      breakQuads: [],
      continueQuads: [],
      continueTarget: loopStartIndex,
    };
    this.loopStack.push(loopCtx);

    const condition = this.visit(ctx.expression());
    const falseJumpIndex = this.quads.length;
    this.quads.push({
      op: "GOTOF",
      left: condition,
      right: "",
      res: 0,
    });

    this.visit(ctx.statement());

    this.quads.push({
      op: "GOTO",
      left: "",
      right: "",
      res: loopStartIndex,
    });

    const loopEnd = this.quads.length;
    this.quads[falseJumpIndex].res = loopEnd;
    this.applyBreakTargets(loopCtx, loopEnd);
    this.loopStack.pop();
    return "";
  }

  visitIfStmt(ctx: IfStmtContext): string {
    const condition = this.visit(ctx.expression());
    const falseJumpIndex = this.quads.length;

    this.quads.push({
      op: "GOTOF",
      left: condition,
      right: "",
      res: 0,
    });

    this.visit(ctx.statement(0));
    const hasElse = ctx.statement().length > 1;

    if (hasElse) {
      const skipElseIndex = this.quads.length;
      this.quads.push({
        op: "GOTO",
        left: "",
        right: "",
        res: 0,
      });

      this.quads[falseJumpIndex]!.res = this.quads.length;
      this.visit(ctx.statement(1));
      this.quads[skipElseIndex]!.res = this.quads.length;
    } else {
      this.quads[falseJumpIndex]!.res = this.quads.length;
    }

    return "";
  }

  visitBlock(ctx: BlockContext): string {
    ctx.statement().forEach((stmt) => this.visit(stmt));
    return "";
  }

  visitPrintStmt(ctx: PrintStmtContext): string {
    const exprResult = this.visit(ctx.expression());
    this.quads.push({
      op: "PRINT",
      left: exprResult,
      right: "",
      res: "",
    });
    return "";
  }

  visitMulDiv(ctx: MulDivContext): string {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    let op = "MUL_I32";
    if (ctx.DIV()) {
      op = "DIV_I32";
    } else if (ctx.MOD()) {
      op = "MOD_I32";
    }
    const leftType = this.getOperandType(left, ctx.expression(0));
    const rightType = this.getOperandType(right, ctx.expression(1));
    const resultType = this.ensureNumericOperands(
      leftType,
      rightType,
      ctx.DIV() ? "division" : ctx.MOD() ? "modulus" : "multiplication",
      ctx
    );
    if (ctx.MOD() && !this.isIntegerType(resultType)) {
      this.throwWithLocation(
        "Modulus operator only supports integer operands",
        ctx
      );
    }
    if (this.areNumericLiterals(left, right)) {
      const leftNum = this.parseNumericLiteral(left);
      const rightNum = this.parseNumericLiteral(right);
      if (op === "DIV_I32" && rightNum === 0) {
        throw new Error("Division by zero in constant expression");
      }
      if (op === "MOD_I32" && rightNum === 0) {
        throw new Error("Modulus by zero in constant expression");
      }
      let result = 0;
      switch (op) {
        case "MUL_I32":
          result = leftNum * rightNum;
          break;
        case "DIV_I32":
          result = Math.trunc(leftNum / rightNum);
          break;
        case "MOD_I32":
          result = leftNum % rightNum;
          break;
      }
      return this.formatLiteralWithType(result, resultType);
    }
    const tempAddr = this.allocateTemp(resultType);

    this.quads.push({
      op,
      left,
      right,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitAddSub(ctx: AddSubContext): string {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const op = ctx.PLUS() ? "ADD_I32" : "SUB_I32";
    const leftType = this.getOperandType(left, ctx.expression(0));
    const rightType = this.getOperandType(right, ctx.expression(1));
    const resultType = this.ensureNumericOperands(
      leftType,
      rightType,
      ctx.PLUS() ? "addition" : "subtraction",
      ctx
    );
    if (this.areNumericLiterals(left, right)) {
      const leftNum = this.parseNumericLiteral(left);
      const rightNum = this.parseNumericLiteral(right);
      const result =
        op === "ADD_I32" ? leftNum + rightNum : leftNum - rightNum;
      return this.formatLiteralWithType(result, resultType);
    }
    const tempAddr = this.allocateTemp(resultType);

    this.quads.push({
      op,
      left,
      right,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitCompare(ctx: CompareContext): string {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    let op = "OP_EQUAL";
    if (ctx.LESS_THAN()) {
      op = "OP_LESS_THAN";
    } else if (ctx.GREAT_THAN()) {
      op = "OP_GREAT_THAN";
    } else if (ctx.LESS_EQUAL()) {
      op = "OP_LESS_EQUAL";
    } else if (ctx.GREAT_EQUAL()) {
      op = "OP_GREAT_EQUAL";
    } else if (ctx.NOT_EQUAL()) {
      op = "OP_NOT_EQUAL";
    }
    if (this.areNumericLiterals(left, right)) {
      const leftNum = this.parseNumericLiteral(left);
      const rightNum = this.parseNumericLiteral(right);
      let boolResult = false;
      switch (op) {
        case "OP_LESS_THAN":
          boolResult = leftNum < rightNum;
          break;
        case "OP_GREAT_THAN":
          boolResult = leftNum > rightNum;
          break;
        case "OP_LESS_EQUAL":
          boolResult = leftNum <= rightNum;
          break;
        case "OP_GREAT_EQUAL":
          boolResult = leftNum >= rightNum;
          break;
        case "OP_NOT_EQUAL":
          boolResult = leftNum !== rightNum;
          break;
        case "OP_EQUAL":
          boolResult = leftNum === rightNum;
          break;
      }
      return boolResult ? "1" : "0";
    }

    const tempAddr = this.allocateTemp("Bool");
    this.quads.push({
      op,
      left,
      right,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitOrExpr(ctx: OrExprContext): string {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const tempAddr = this.allocateTemp("Bool");
    this.quads.push({
      op: "OP_OR",
      left,
      right,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitAndExpr(ctx: AndExprContext): string {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    const tempAddr = this.allocateTemp("Bool");
    this.quads.push({
      op: "OP_AND",
      left,
      right,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitSinExpr(ctx: SinExprContext): string {
    const operand = this.visit(ctx.expression());
    if (this.isNumericLiteral(operand)) {
      const radians = this.parseNumericLiteral(operand) * (Math.PI / 180);
      return this.formatLiteral(Math.sin(radians));
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "SIN_DEG",
      left: operand,
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitCosExpr(ctx: CosExprContext): string {
    const operand = this.visit(ctx.expression());
    if (this.isNumericLiteral(operand)) {
      const radians = this.parseNumericLiteral(operand) * (Math.PI / 180);
      return this.formatLiteral(Math.cos(radians));
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "COS_DEG",
      left: operand,
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitTanExpr(ctx: TanExprContext): string {
    const operand = this.visit(ctx.expression());
    if (this.isNumericLiteral(operand)) {
      const radians = this.parseNumericLiteral(operand) * (Math.PI / 180);
      return this.formatLiteral(Math.tan(radians));
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "TAN_DEG",
      left: operand,
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitAbsExpr(ctx: AbsExprContext): string {
    const operand = this.visit(ctx.expression());
    if (this.isNumericLiteral(operand)) {
      return this.formatLiteral(Math.abs(this.parseNumericLiteral(operand)));
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "ABS",
      left: operand,
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitSqrtExpr(ctx: SqrtExprContext): string {
    const operand = this.visit(ctx.expression());
    if (this.isNumericLiteral(operand)) {
      const value = this.parseNumericLiteral(operand);
      return this.formatLiteral(value >= 0 ? Math.sqrt(value) : 0);
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "SQRT",
      left: operand,
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitAtan2Expr(ctx: Atan2ExprContext): string {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    if (this.areNumericLiterals(left, right)) {
      const leftNum = this.parseNumericLiteral(left);
      const rightNum = this.parseNumericLiteral(right);
      return this.formatLiteral((Math.atan2(leftNum, rightNum) * 180) / Math.PI);
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "ATAN2",
      left,
      right,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitFloorExpr(ctx: FloorExprContext): string {
    const operand = this.visit(ctx.expression());
    if (this.isNumericLiteral(operand)) {
      return this.formatLiteral(Math.floor(this.parseNumericLiteral(operand)));
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "FLOOR",
      left: operand,
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitCeilExpr(ctx: CeilExprContext): string {
    const operand = this.visit(ctx.expression());
    if (this.isNumericLiteral(operand)) {
      return this.formatLiteral(Math.ceil(this.parseNumericLiteral(operand)));
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "CEIL",
      left: operand,
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitRoundExpr(ctx: RoundExprContext): string {
    const operand = this.visit(ctx.expression());
    if (this.isNumericLiteral(operand)) {
      return this.formatLiteral(Math.round(this.parseNumericLiteral(operand)));
    }
    const tempAddr = this.allocateTemp("Int32");
    this.quads.push({
      op: "ROUND",
      left: operand,
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitMinExpr(ctx: MinExprContext): string {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    if (this.areNumericLiterals(left, right)) {
      const leftNum = this.parseNumericLiteral(left);
      const rightNum = this.parseNumericLiteral(right);
      return this.formatLiteral(Math.min(leftNum, rightNum));
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "MIN",
      left,
      right,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitMaxExpr(ctx: MaxExprContext): string {
    const left = this.visit(ctx.expression(0));
    const right = this.visit(ctx.expression(1));
    if (this.areNumericLiterals(left, right)) {
      const leftNum = this.parseNumericLiteral(left);
      const rightNum = this.parseNumericLiteral(right);
      return this.formatLiteral(Math.max(leftNum, rightNum));
    }
    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "MAX",
      left,
      right,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitClampExpr(ctx: ClampExprContext): string {
    const value = this.visit(ctx.expression(0));
    const minValue = this.visit(ctx.expression(1));
    const maxValue = this.visit(ctx.expression(2));
    if (this.areNumericLiterals(value, minValue, maxValue)) {
      const val = this.parseNumericLiteral(value);
      const min = this.parseNumericLiteral(minValue);
      const max = this.parseNumericLiteral(maxValue);
      return this.formatLiteral(Math.max(min, Math.min(val, max)));
    }
    const tempUpper = this.allocateTemp("Float");
    this.quads.push({
      op: "MIN",
      left: value,
      right: maxValue,
      res: tempUpper,
    });
    const clampTemp = this.allocateTemp("Float");
    this.quads.push({
      op: "MAX",
      left: tempUpper,
      right: minValue,
      res: clampTemp,
    });
    return clampTemp.toString();
  }

  visitAddressOp(ctx: AddressOpContext): string {
    const operand = this.visit(ctx.expression());
    if (ctx.AMPERSAND()) {
      this.referenceOperands.add(operand);
      return operand;
    }
    const tempAddr = this.allocateTemp("Int32");
    this.quads.push({
      op: "DEREF",
      left: operand,
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitIntAtom(ctx: IntAtomContext): string {
    const value = Number(ctx.text);
    if (Number.isNaN(value)) {
      return ctx.text;
    }
    return this.formatLiteral(value);
  }

  visitFloatAtom(ctx: FloatAtomContext): string {
    this.setOperandType(ctx.text, "Float");
    return ctx.text;
  }

  visitStringAtom(ctx: StringAtomContext): string {
    return this.encodeStringLiteral(ctx.STRING_LIT().text);
  }

  visitIdAtom(ctx: IdAtomContext): string {
    const id = ctx.text;
    const specialLiteral = this.resolveSpecialIdentifier(id);
    if (specialLiteral !== null) {
      return specialLiteral;
    }
    if (this.constFunctionBindings.has(id)) {
      throw new Error(`Function '${id}' must be invoked, not used as a value`);
    }
    const address = this.resolveVariableAddress(id);
    if (this.structPointerTypes.has(address)) {
      const tempAddr = this.allocateTemp("Int32");
      this.quads.push({
        op: "=",
        left: address,
        right: "",
        res: tempAddr,
      });
      return tempAddr.toString();
    }
    return address.toString();
  }

  visitArrayAccess(ctx: ArrayAccessContext): string {
    const id = ctx.ID().text;
    const indexOperand = this.visit(ctx.expression());
    const elementAddress = this.emitArrayElementAddress(id, indexOperand);
    const elementType = this.getArrayElementType(id);
    const operand = `*${elementAddress}`;
    this.setOperandType(operand, elementType);
    return operand;
  }

  visitMethodCall(ctx: MethodCallContext): string {
    return this.emitMethodCall(ctx);
  }

  visitMethodCallAtom(ctx: MethodCallAtomContext): string {
    return this.emitMethodCall(ctx.methodCall());
  }

  visitStructFieldAtom(ctx: StructFieldAtomContext): string {
    const ids = ctx.structFieldAccess().ID().map((token) => token.text);
    const resolution = this.resolveStructFieldAccess(ids);
    if (resolution.isStruct) {
      const tempAddr = this.allocateTemp("Int32");
      this.quads.push({
        op: "=",
        left: resolution.addressTemp,
        right: "",
        res: tempAddr,
      });
      this.structPointerTypes.set(tempAddr, resolution.fieldType);
      return tempAddr.toString();
    }
    const operand = `*${resolution.addressTemp}`;
    this.setOperandType(operand, resolution.fieldType);
    return operand;
  }

  visitReturnStmt(ctx: ReturnStmtContext): string {
    if (!this.currentFunction) {
      throw new Error("Return statements are only valid inside functions");
    }
    const funcCtx = this.currentFunction;
    const hasExpression = !!ctx.expression();
    const returnTypeIsVoid = this.isVoidType(funcCtx.info.returnType);

    if (!hasExpression) {
      if (!returnTypeIsVoid) {
        throw new Error(
          `Function '${funcCtx.info.name}' must return a value of type '${funcCtx.info.returnType}'`
        );
      }
      this.quads.push({
        op: "RETURN",
        left: "",
        right: "",
        res: "",
      });
      funcCtx.hasReturn = true;
      return "";
    }

    if (returnTypeIsVoid) {
      throw new Error(`Void function '${funcCtx.info.name}' cannot return a value`);
    }

    const valueOperand = this.visit(ctx.expression()!);
    const pointerTemp = this.allocateTemp("Int32");
    this.quads.push({
      op: "=",
      left: funcCtx.info.returnPointerAddress,
      right: "",
      res: pointerTemp,
    });
    this.quads.push({
      op: "=",
      left: valueOperand,
      right: "",
      res: `&${pointerTemp}`,
    });
    this.quads.push({
      op: "RETURN",
      left: "",
      right: "",
      res: "",
    });
    funcCtx.hasReturn = true;
    return "";
  }

  visitBreakStmt(ctx: BreakStmtContext): string {
    const loopCtx = this.loopStack.at(-1);
    if (!loopCtx) {
      this.throwWithLocation("Break statements must be inside a loop", ctx);
    }
    const quadIndex = this.quads.length;
    this.quads.push({
      op: "GOTO",
      left: "",
      right: "",
      res: 0,
    });
    loopCtx.breakQuads.push(quadIndex);
    return "";
  }

  visitContinueStmt(ctx: ContinueStmtContext): string {
    const loopCtx = this.loopStack.at(-1);
    if (!loopCtx) {
      this.throwWithLocation("Continue statements must be inside a loop", ctx);
    }
    const quadIndex = this.quads.length;
    const target = loopCtx.continueTarget;
    this.quads.push({
      op: "GOTO",
      left: "",
      right: "",
      res: target ?? 0,
    });
    if (target === null) {
      loopCtx.continueQuads.push(quadIndex);
    }
    return "";
  }

  visitQualifiedNameAtom(ctx: QualifiedNameAtomContext): string {
    const qualified = ctx.qualifiedName();
    const ids = qualified.ID().map((token) => token.text);
    if (ids.length < 2) {
      throw new Error(
        `Qualified name '${ctx.text}' is not a supported runtime constant`
      );
    }

    const axis = this.resolveEncoderAxis(ids[0] ?? "");
    const propertyParts = ids.slice(1);
    const propertyCode = this.resolveEncoderProperty(propertyParts);

    const tempAddr = this.allocateTemp("Float");
    this.quads.push({
      op: "GET_ENCODER",
      left: axis,
      right: propertyCode,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  visitParenAtom(ctx: ParenAtomContext): string {
    return this.visit(ctx.expression());
  }

  visitArrayLiteral(ctx: ArrayLiteralContext): string[] {
    return ctx.expression().map((expr) => this.visit(expr));
  }

  visitForVarDecl(ctx: ForVarDeclContext): string {
    const id = ctx.ID().text;
    const type = ctx.type().text;
    if (this.isStructType(type)) {
      return this.emitStructVariableDeclaration(id, type);
    }
    return this.emitScalarDeclaration(id, type, ctx.expression());
  }

  private handleForInit(ctx: ForInitContext | undefined) {
    if (!ctx) {
      return;
    }
    if (ctx.simpleAssignment()) {
      this.visit(ctx.simpleAssignment()!);
    } else if (ctx.forVarDecl()) {
      this.visitForVarDecl(ctx.forVarDecl()!);
    }
  }

  private emitArrayStore(
    name: string,
    indexOperand: string,
    valueOperand: string
  ) {
    const element = this.emitArrayElementAddress(name, indexOperand);
    this.quads.push({
      op: "=",
      left: valueOperand,
      right: "",
      res: `&${element}`,
    });
  }

  private emitArrayElementAddress(name: string, indexOperand: string): string {
    const base = this.resolveArrayBase(name);
    const tempAddr = this.allocateTemp("Int32");
    this.quads.push({
      op: "ADD_I32",
      left: `ADDR:${base}`,
      right: indexOperand,
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  private emitScalarDeclaration(
    id: string,
    type: string,
    expression: ExpressionContext
  ) {
    const address = this.currentMemory.allocate(id, type);
    this.setOperandType(address, type);
    const exprResult = this.visit(expression);

    this.quads.push({
      op: "=",
      left: exprResult,
      right: "",
      res: address,
    });

    return address.toString();
  }

  private emitStructVariableDeclaration(id: string, structName: string): string {
    const pointerAddress = this.currentMemory.allocate(id, "Int32");
    this.setOperandType(pointerAddress, "Int32");
    this.structPointerTypes.set(pointerAddress, structName);
    const descriptorBase = this.initializeStructInstance(structName);
    this.quads.push({
      op: "=",
      left: `ADDR:${descriptorBase}`,
      right: "",
      res: pointerAddress,
    });
    return pointerAddress.toString();
  }

  private initializeStructInstance(structName: string): number {
    const definition = this.getStructDefinition(structName);
    const descriptorBase = this.currentMemory.allocateStructDescriptor(
      definition.fields.length
    );
    definition.fields.forEach((field, idx) => {
      const slotAddr = descriptorBase + idx;
      if (this.isStructType(field.type)) {
        const nestedDescriptor = this.initializeStructInstance(field.type);
        this.quads.push({
          op: "=",
          left: `ADDR:${nestedDescriptor}`,
          right: "",
          res: slotAddr,
        });
      } else {
        const fieldAddr = this.currentMemory.allocateAnonymous(field.type);
        this.quads.push({
          op: "=",
          left: `ADDR:${fieldAddr}`,
          right: "",
          res: slotAddr,
        });
      }
    });
    return descriptorBase;
  }

  private resolveStructFieldAccess(ids: string[]): StructFieldResolution {
    if (ids.length < 2) {
      throw new Error("Struct field access must include at least one field");
    }
    const baseName = ids[0] ?? "";
    const baseAddress = this.resolveVariableAddress(baseName);
    const structName = this.structPointerTypes.get(baseAddress);
    if (!structName) {
      throw new Error(`'${baseName}' is not a struct variable`);
    }
    let currentStruct = structName;
    let pointerTemp = this.allocateTemp("Int32");
    this.quads.push({
      op: "=",
      left: baseAddress,
      right: "",
      res: pointerTemp,
    });
    let result: StructFieldResolution | null = null;
    for (let index = 1; index < ids.length; index++) {
      const fieldName = ids[index] ?? "";
      const definition = this.getStructDefinition(currentStruct);
      const fieldIndex = definition.fields.findIndex(
        (field) => field.name === fieldName
      );
      if (fieldIndex === -1) {
        throw new Error(
          `Struct '${currentStruct}' does not contain field '${fieldName}'`
        );
      }
      const descriptorSlot = this.allocateTemp("Int32");
      this.quads.push({
        op: "ADD_I32",
        left: pointerTemp,
        right: this.formatLiteral(fieldIndex),
        res: descriptorSlot,
      });
      const fieldPointer = this.allocateTemp("Int32");
      this.quads.push({
        op: "DEREF",
        left: descriptorSlot,
        right: "",
        res: fieldPointer,
      });
      const fieldType = definition.fields[fieldIndex]!.type;
      const isStructField = this.isStructType(fieldType);
      if (index < ids.length - 1) {
        if (!isStructField) {
          throw new Error(
            `Field '${fieldName}' of '${currentStruct}' is not a struct, cannot access '${ids[index + 1]}'`
          );
        }
        currentStruct = fieldType;
        pointerTemp = fieldPointer;
      } else {
        result = {
          addressTemp: fieldPointer,
          fieldType,
          isStruct: isStructField,
        };
      }
    }
    if (!result) {
      throw new Error("Failed to resolve struct field access");
    }
    return result;
  }

  private encodeStringLiteral(literal: string): string {
    const raw = JSON.parse(literal);
    const hex = Buffer.from(raw, "utf8").toString("hex");
    return `STR:${hex}`;
  }

  private resolveVariableAddress(name: string): number {
    if (this.currentMemory.hasSymbol(name)) {
      return this.currentMemory.getAddress(name);
    }
    if (
      this.currentMemory !== this.globalMemory &&
      this.globalMemory.hasSymbol(name)
    ) {
      return this.globalMemory.getAddress(name);
    }
    throw new Error(`Variable '${name}' not found.`);
  }

  private resolveArrayBase(name: string): number {
    if (this.currentMemory.hasArray(name)) {
      return this.currentMemory.getArrayBase(name);
    }
    if (
      this.currentMemory !== this.globalMemory &&
      this.globalMemory.hasArray(name)
    ) {
      return this.globalMemory.getArrayBase(name);
    }
    throw new Error(`Array '${name}' not found.`);
  }

  private resolveArrayLength(name: string): number {
    if (this.currentMemory.hasArray(name)) {
      return this.currentMemory.getArrayLength(name);
    }
    if (
      this.currentMemory !== this.globalMemory &&
      this.globalMemory.hasArray(name)
    ) {
      return this.globalMemory.getArrayLength(name);
    }
    throw new Error(`Array '${name}' not found.`);
  }

  private resolveBlendModeLiteral(value: string, callText: string): string {
    if (!value || value === "") {
      return "1";
    }
    const upper = value.toUpperCase();
    if (upper === "MASTER") {
      return "1";
    }
    if (upper === "SLAVE") {
      return "0";
    }
    if (this.isNumericLiteral(value)) {
      const numeric = this.parseNumericLiteral(value);
      if (numeric === 0 || numeric === 1) {
        return numeric.toString();
      }
    }
    throw new Error(
      `setGearBlend mode argument in '${callText}' must be MASTER, SLAVE, or literal 0/1`
    );
  }

  private extractCallableIds(node: CallableNameContext | undefined): string[] {
    if (!node) {
      return [];
    }
    return node.ID().map((token) => token.text);
  }

  private resolveSpecialIdentifier(name: string): string | null {
    const upper = name.toUpperCase();
    if (upper === "LOW" || upper === "FALSE" || upper === "SLAVE") {
      return "0";
    }
    if (upper === "HIGH" || upper === "TRUE" || upper === "MASTER") {
      return "1";
    }
    if (
      this.currentMemory.hasSymbol(name) ||
      (this.currentMemory !== this.globalMemory &&
        this.globalMemory.hasSymbol(name)) ||
      this.constFunctionBindings.has(name)
    ) {
      return null;
    }
    if (upper === "X" || upper === "Y" || upper === "Z") {
      return this.resolveEncoderAxis(upper).toString();
    }
    return null;
  }

  private allocateTemp(type: string): number {
    const address = this.currentMemory.allocateTemp(type);
    this.setOperandType(address, type);
    return address;
  }

  private setOperandType(operand: number | string, type: string) {
    if (!type) {
      return;
    }
    const key = typeof operand === "number" ? operand.toString() : operand;
    if (!key) {
      return;
    }
    this.operandTypes.set(key, type);
  }

  private getOperandType(
    operand: number | string,
    ctx?: ParserRuleContext
  ): string {
    const key = typeof operand === "number" ? operand.toString() : operand;
    if (this.operandTypes.has(key)) {
      return this.operandTypes.get(key)!;
    }
    if (key.startsWith("*") && this.operandTypes.has(key)) {
      return this.operandTypes.get(key)!;
    }
    if (key.startsWith("&") || key.startsWith("ADDR:")) {
      return "Int32";
    }
    if (key.startsWith("STR:")) {
      return "String";
    }
    if (this.isNumericLiteral(key)) {
      return key.includes(".") ? "Float" : "Int32";
    }
    if (ctx) {
      this.throwWithLocation(
        `Cannot determine type for operand '${key}'`,
        ctx
      );
    }
    return "Int32";
  }

  private getArrayElementType(name: string): string {
    if (this.currentMemory.hasArray(name)) {
      return this.currentMemory.getType(name);
    }
    if (
      this.currentMemory !== this.globalMemory &&
      this.globalMemory.hasArray(name)
    ) {
      return this.globalMemory.getType(name);
    }
    throw new Error(`Array '${name}' not found.`);
  }

  private isImmutableSymbol(name: string): boolean {
    if (this.currentMemory.hasSymbol(name) && this.currentMemory.isImmutable(name)) {
      return true;
    }
    if (
      this.currentMemory !== this.globalMemory &&
      this.globalMemory.hasSymbol(name) &&
      this.globalMemory.isImmutable(name)
    ) {
      return true;
    }
    return false;
  }

  private isIntegerType(type: string): boolean {
    switch (type) {
      case "Int32":
      case "Int16":
      case "Int8":
      case "UInt32":
      case "UInt16":
      case "UInt8":
        return true;
      default:
        return false;
    }
  }

  private isFloatType(type: string): boolean {
    return type === "Float";
  }

  private isNumericType(type: string): boolean {
    return this.isIntegerType(type) || this.isFloatType(type);
  }

  private ensureNumericOperands(
    leftType: string,
    rightType: string,
    opDescription: string,
    ctx: ParserRuleContext
  ): string {
    if (!this.isNumericType(leftType) || !this.isNumericType(rightType)) {
      this.throwWithLocation(
        `'${opDescription}' requires numeric operands`,
        ctx
      );
    }
    if (leftType !== rightType) {
      this.throwWithLocation(
        `Cannot ${opDescription} values of type '${leftType}' and '${rightType}'`,
        ctx
      );
    }
    return leftType;
  }

  private formatLiteralWithType(value: number, type: string): string {
    if (this.isFloatType(type)) {
      const text = value.toString();
      return text.includes(".") ? text : `${text}.0`;
    }
    return this.formatLiteral(value);
  }

  private isVoidType(type: string): boolean {
    return type.toLowerCase() === "void";
  }

  private isBuiltinType(type: string): boolean {
    switch (type) {
      case "Int8":
      case "Int32":
      case "Int16":
      case "UInt32":
      case "UInt16":
      case "UInt8":
      case "Float":
      case "Bool":
        return true;
      default:
        return false;
    }
  }

  private isStructType(type: string): boolean {
    return this.structDefinitions.has(type);
  }

  private getStructDefinition(name: string): StructDefinition {
    const def = this.structDefinitions.get(name);
    if (!def) {
      throw new Error(`Struct '${name}' is not defined`);
    }
    return def;
  }

  private isNumericLiteral(value: string): boolean {
    if (!value || value === "") {
      return false;
    }
    if (value.startsWith("ADDR:")) {
      const literal = value.slice(5);
      if (!literal) {
        return false;
      }
      return !Number.isNaN(Number(literal));
    }
    if (
      value.startsWith("&") ||
      value.startsWith("*") ||
      value.startsWith("STR:")
    ) {
      return false;
    }
    if (this.isAddressReference(value)) {
      return false;
    }
    return !Number.isNaN(Number(value));
  }

  private areNumericLiterals(...values: string[]): boolean {
    return values.every((val) => this.isNumericLiteral(val));
  }

  private formatLiteral(value: number): string {
    const text = value.toString();
    if (Number.isInteger(value) && this.isAddressReference(text)) {
      return `ADDR:${text}`;
    }
    return text;
  }

  private parseNumericLiteral(value: string): number {
    if (value.startsWith("ADDR:")) {
      return Number(value.slice(5));
    }
    return Number(value);
  }

  private isAddressReference(value: string): boolean {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      return false;
    }
    return (
      (numeric >= 1000 && numeric < 2000) ||
      (numeric >= 2000 && numeric < 3000) ||
      (numeric >= 3000 && numeric < 4000) ||
      (numeric >= 4000 && numeric < 5000) ||
      (numeric >= 5000 && numeric < 7000) ||
      (numeric >= 7000 && numeric < 8000) ||
      (numeric >= 8000 && numeric < 9000)
    );
  }

  private emitMethodCall(call: MethodCallContext) {
    const ids = this.extractCallableIds(call.callableName());
    if (ids.length === 0) {
      throw new Error("Method call missing qualifier");
    }

    const args =
      call
        .argumentList()
        ?.expression()
        .map((expr) => this.visit(expr)) ?? [];

    const primaryName = ids[0] ?? "";
    if (ids.length === 1 && this.functions.has(primaryName)) {
      return this.emitFunctionCall(primaryName, args);
    }
    const first = primaryName.toLowerCase();
    if (first === "input") {
      return this.emitInputCall(ids, args);
    }
    if (ids.length === 1 && first === "readinput") {
      return this.emitReadInput(args);
    }

    const axis = this.resolveEncoderAxis(ids[0] ?? "");
    const methodName = ids[ids.length - 1] ?? "";
    if (methodName.toLowerCase() === "setgearblend") {
      this.emitGearBlend(axis, args, call.text);
      return "";
    }
    const methodConfig = this.resolveEncoderMethod(methodName);

    if (args.length < methodConfig.minArgs || args.length > methodConfig.maxArgs) {
      throw new Error(
        `Method '${call.text}' expects ${methodConfig.minArgs}${
          methodConfig.minArgs === methodConfig.maxArgs
            ? ""
            : `-${methodConfig.maxArgs}`
        } argument(s)`
      );
    }

    const argumentOperand = args[0] ?? "0";
    this.quads.push({
      op: methodConfig.op,
      left: axis,
      right: argumentOperand,
      res: "",
    });
    return "";
  }

  private emitFunctionCall(name: string, args: string[]): string {
    const info = this.functions.get(name);
    if (!info) {
      throw new Error(`Function '${name}' is not defined`);
    }
    if (args.length !== info.params.length) {
      throw new Error(
        `Function '${name}' expects ${info.params.length} argument(s), got ${args.length}`
      );
    }
    this.quads.push({
      op: "ERA",
      left: info.startQuad,
      right: "",
      res: "",
    });
    info.params.forEach((param, idx) => {
      if (param.requiresReference && !this.referenceOperands.has(args[idx])) {
        throw new Error(
          `Argument ${idx + 1} for function '${name}' must use '&' to pass '${param.type}'`
        );
      }
      if (this.referenceOperands.has(args[idx])) {
        this.referenceOperands.delete(args[idx]);
      }
      this.quads.push({
        op: "PARAM",
        left: args[idx],
        right: "",
        res: param.address,
      });
    });
    let resultTemp = "";
    if (!this.isVoidType(info.returnType)) {
      resultTemp = this.allocateTemp(info.returnType).toString();
      this.quads.push({
        op: "PARAM",
        left: `ADDR:${resultTemp}`,
        right: "",
        res: info.returnPointerAddress,
      });
    }
    this.quads.push({
      op: "GOSUB",
      left: info.startQuad,
      right: "",
      res: "",
    });
    return resultTemp;
  }

  private emitGearBlend(axis: number, args: string[], callText: string) {
    if (args.length === 0) {
      throw new Error(`Method '${callText}' requires at least one argument`);
    }
    const countsOperand = args[0];
    const modeLiteral =
      args.length > 1
        ? this.resolveBlendModeLiteral(args[1] ?? "", callText)
        : "1";
    this.quads.push({
      op: "SET_GEAR_BLEND",
      left: axis,
      right: countsOperand,
      res: modeLiteral,
    });
  }

  private emitFunctionDeclaration(name: string, funcCtx: FunctionExprContext) {
    if (this.functions.has(name)) {
      throw new Error(`Function '${name}' already declared`);
    }
    const skipGotoIndex = this.quads.length;
    this.quads.push({
      op: "GOTO",
      left: "",
      right: "",
      res: 0,
    });

    const startQuad = this.quads.length;
    const previousMemory = this.currentMemory;
    const previousFunction = this.currentFunction;
    this.currentMemory = new MemoryAllocator("local");

    const params: FunctionParameterInfo[] = [];
    const paramNodes = funcCtx.parameterList()?.parameter() ?? [];
    paramNodes.forEach((paramNode: ParameterContext) => {
      const paramName = paramNode.ID().text;
      const paramType = paramNode.type().text;
      const needsReference = !!paramNode.AMPERSAND();
      const isStruct = this.isStructType(paramType);
      if (needsReference && !isStruct) {
        throw new Error(
          `Parameter '${paramName}' uses '&' but '${paramType}' is not a struct`
        );
      }
      if (isStruct && !needsReference) {
        throw new Error(
          `Struct parameter '${paramName}' must be declared with '&${paramType}'`
        );
      }
      const address = this.currentMemory.allocate(
        paramName,
        isStruct ? "Int32" : paramType
      );
      this.setOperandType(address, isStruct ? "Int32" : paramType);
      if (isStruct) {
        this.structPointerTypes.set(address, paramType);
      }
      params.push({
        name: paramName,
        type: paramType,
        address,
        isStruct,
        requiresReference: needsReference,
      });
    });

    const returnPointerAddress = this.currentMemory.allocate(
      `__retptr_${name}`,
      "Int32"
    );
    this.setOperandType(returnPointerAddress, "Int32");

    const functionInfo: FunctionInfo = {
      name,
      returnType: funcCtx.returnType().text,
      params,
      startQuad,
      returnPointerAddress,
    };

    this.functions.set(name, functionInfo);
    this.currentFunction = {
      info: functionInfo,
      hasReturn: this.isVoidType(functionInfo.returnType),
    };

    this.visit(funcCtx.block());

    if (!this.currentFunction.hasReturn) {
      throw new Error(`Function '${name}' is missing a return statement`);
    }

    this.quads.push({
      op: "ENDFUNC",
      left: "",
      right: "",
      res: "",
    });

    this.quads[skipGotoIndex].res = this.quads.length;

    this.currentMemory = previousMemory;
    this.currentFunction = previousFunction;
  }

  private emitInputCall(qualifiedIds: string[], args: string[]): string {
    if (qualifiedIds.length < 2) {
      throw new Error("Input.* calls must include a method name");
    }
    const method = qualifiedIds[qualifiedIds.length - 1]?.toLowerCase() ?? "";
    switch (method) {
      case "settype":
        if (args.length !== 2) {
          throw new Error("Input.setType(channel, polarity) expects 2 arguments");
        }
        this.quads.push({
          op: "SET_INPUT_TYPE",
          left: args[0],
          right: args[1],
          res: "",
        });
        return "";
      case "read":
      case "readinput":
        return this.emitReadInput(args);
      default:
        throw new Error(`Unsupported Input method '${method}'`);
    }
  }

  private emitReadInput(args: string[]): string {
    if (args.length !== 1) {
      throw new Error("ReadInput(channel) expects exactly 1 argument");
    }
    const tempAddr = this.allocateTemp("Bool");
    this.quads.push({
      op: "READ_INPUT",
      left: args[0],
      right: "",
      res: tempAddr,
    });
    return tempAddr.toString();
  }

  private resolveEncoderAxis(name: string): number {
    switch (name.toUpperCase()) {
      case "X":
        return 0;
      case "Y":
        return 1;
      case "Z":
        return 2;
      default:
        throw new Error(`Unsupported encoder axis '${name}'`);
    }
  }

  private resolveEncoderProperty(parts: string[]): number {
    if (parts.length === 0) {
      throw new Error("Encoder property chain missing property name");
    }
    const property = parts[parts.length - 1]?.toLowerCase() ?? "";
    switch (property) {
      case "angle":
        return ENCODER_PROPERTY_ANGLE;
      case "counts":
        return ENCODER_PROPERTY_COUNTS;
      default:
        throw new Error(`Unsupported encoder property '${property}'`);
    }
  }

  private resolveEncoderMethod(name: string): EncoderMethodConfig {
    const config = ENCODER_METHOD_CONFIGS[name.toLowerCase()];
    if (config === undefined) {
      throw new Error(`Unsupported encoder method '${name}'`);
    }
    return config;
  }

  private applyBreakTargets(loopCtx: LoopContext, target: number) {
    loopCtx.breakQuads.forEach((index) => {
      this.quads[index].res = target;
    });
  }

  private applyContinueTargets(loopCtx: LoopContext, target: number) {
    loopCtx.continueTarget = target;
    loopCtx.continueQuads.forEach((index) => {
      this.quads[index].res = target;
    });
  }

  private ensureMutableVariable(id: string, ctx?: ParserRuleContext): number {
    if (this.isImmutableSymbol(id)) {
      this.throwWithLocation(`Cannot assign to constant '${id}'`, ctx);
    }
    const address = this.resolveVariableAddress(id);
    if (this.structPointerTypes.has(address)) {
      this.throwWithLocation(
        "Assign to struct fields individually; whole-struct assignment is not supported",
        ctx
      );
    }
    return address;
  }

  private emitStore(address: number, valueOperand: string) {
    this.quads.push({
      op: "=",
      left: valueOperand,
      right: "",
      res: address,
    });
  }

  private emitBinaryOp(
    op: string,
    left: number | string,
    right: string,
    ctx: ParserRuleContext
  ): string {
    const leftType = this.getOperandType(left, ctx);
    const rightType = this.getOperandType(right, ctx);
    const resultType = this.ensureNumericOperands(leftType, rightType, op, ctx);
    const temp = this.allocateTemp(resultType).toString();
    this.quads.push({
      op,
      left,
      right,
      res: temp,
    });
    return temp;
  }

  private resolveCompoundOp(ctx: CompoundAssignmentContext): string {
    if (ctx.PLUS_ASSIGN()) {
      return "ADD_I32";
    }
    if (ctx.MINUS_ASSIGN()) {
      return "SUB_I32";
    }
    if (ctx.MULT_ASSIGN()) {
      return "MUL_I32";
    }
    if (ctx.DIV_ASSIGN()) {
      return "DIV_I32";
    }
    if (ctx.MOD_ASSIGN()) {
      return "MOD_I32";
    }
    return "ADD_I32";
  }

  private throwWithLocation(message: string, ctx?: ParserRuleContext): never {
    const token = ctx?.start;
    const line = token?.line;
    const column = token?.charPositionInLine;
    let location = "unknown location";
    let snippet = "";

    if (line !== undefined && column !== undefined && this.sourceLines[line - 1] !== undefined) {
      const lineText = this.sourceLines[line - 1];
      const caret = " ".repeat(Math.max(column, 0)) + "^";
      location = `${line}:${column}`;
      snippet = `\n${lineText}\n${caret}`;
    }

    throw new Error(`${message} (line ${location})${snippet}`);
  }
}

const ENCODER_PROPERTY_ANGLE = 0;
const ENCODER_PROPERTY_COUNTS = 1;

interface EncoderMethodConfig {
  op: string;
  minArgs: number;
  maxArgs: number;
}

interface StructFieldDefinition {
  name: string;
  type: string;
}

interface StructDefinition {
  name: string;
  fields: StructFieldDefinition[];
}

interface FunctionParameterInfo {
  name: string;
  type: string;
  address: number;
  isStruct: boolean;
  requiresReference: boolean;
}

interface FunctionInfo {
  name: string;
  returnType: string;
  params: FunctionParameterInfo[];
  startQuad: number;
  returnPointerAddress: number;
}

interface FunctionContext {
  info: FunctionInfo;
  hasReturn: boolean;
}

interface StructFieldResolution {
  addressTemp: number;
  fieldType: string;
  isStruct: boolean;
}

interface LoopContext {
  breakQuads: number[];
  continueQuads: number[];
  continueTarget: number | null;
}

const ENCODER_METHOD_CONFIGS: Record<string, EncoderMethodConfig> = {
  waitforangle: { op: "WAIT_FOR_ANGLE", minArgs: 1, maxArgs: 1 },
  waitforcounts: { op: "WAIT_FOR_COUNTS", minArgs: 1, maxArgs: 1 },
  jog: { op: "JOG", minArgs: 1, maxArgs: 1 },
  moveabsolute: { op: "MOVE_ABS", minArgs: 1, maxArgs: 1 },
  setgearmaster: { op: "SET_GEAR_MASTER", minArgs: 1, maxArgs: 1 },
  setgearratio: { op: "SET_GEAR_RATIO", minArgs: 1, maxArgs: 1 },
};
