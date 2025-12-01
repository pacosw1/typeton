import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import {
    ScalarVarDeclContext,
    ScalarVarDeclNoInitContext,
    ArrayVarDeclContext,
    ArrayVarDeclInitContext,
    ConstDeclContext,
    FunctionExprContext,
    ParameterContext,
    StructDeclContext,
    StructFieldContext
} from './grammar/TypetonParser';
import { TypetonListener } from './grammar/TypetonListener';

export interface StructFieldInfo {
    name: string;
    type: string;
}

export interface Symbol {
    name: string;
    type: string;
    kind: 'variable' | 'function' | 'parameter';
    documentation?: string;
}

export class SymbolTable implements TypetonListener {
    private symbols: Map<string, Symbol> = new Map();
    private structDefinitions: Map<string, StructFieldInfo[]> = new Map();

    constructor() {}

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(ctx: ParserRuleContext): void {}
    exitEveryRule(ctx: ParserRuleContext): void {}

    enterScalarVarDecl(ctx: ScalarVarDeclContext) {
        this.addVariable(ctx.ID().text, ctx.type().text);
    }

    enterScalarVarDeclNoInit(ctx: ScalarVarDeclNoInitContext) {
        this.addVariable(ctx.ID().text, ctx.type().text);
    }

    enterArrayVarDecl(ctx: ArrayVarDeclContext) {
        this.addArray(ctx.ID().text, ctx.type().text, ctx.INT_LIT().text);
    }

    enterArrayVarDeclInit(ctx: ArrayVarDeclInitContext) {
        this.addArray(ctx.ID().text, ctx.type().text, ctx.INT_LIT().text);
    }

    enterConstDecl(ctx: ConstDeclContext) {
        const name = ctx.ID().text;
        const func = ctx.functionExpr();
        if (!func) {
            const typeText = ctx.type()?.text ?? 'unknown';
            this.addConstant(name, typeText);
            return;
        }

        const signature = this.buildFunctionSignature(func);
        const detail = `(${signature.params}) => ${signature.returnType}`;
        const docParts = [
            `Function \`${name}\``,
            `Return: \`${signature.returnType}\``,
            signature.params ? `Parameters: ${signature.params}` : 'Parameters: none'
        ];

        this.symbols.set(name, {
            name,
            type: detail,
            kind: 'function',
            documentation: docParts.join('\n\n')
        });
    }

    private addVariable(name: string, type: string) {
        this.symbols.set(name, {
            name,
            type,
            kind: 'variable',
            documentation: `Variable \`${name}\` of type \`${type}\``
        });
    }

    private addArray(name: string, type: string, size: string) {
        this.symbols.set(name, {
            name,
            type: `${type}[${size}]`,
            kind: 'variable',
            documentation: `Array \`${name}\` of type \`${type}\` with size ${size}`
        });
    }

    private addConstant(name: string, type: string) {
        this.symbols.set(name, {
            name,
            type,
            kind: 'variable',
            documentation: `Constant \`${name}\` of type \`${type}\``
        });
    }

    enterStructDecl(ctx: StructDeclContext) {
        const structName = ctx.ID().text;
        const fields = ctx.structField().map((field: StructFieldContext) => ({
            name: field.ID().text,
            type: field.type().text
        }));

        this.structDefinitions.set(structName, fields);
    }

    private buildFunctionSignature(funcCtx: FunctionExprContext) {
        const params = funcCtx.parameterList()?.parameter() ?? [];
        const formatted = params
            .map((param: ParameterContext) => {
                const paramType = param.type().text;
                const paramName = param.ID().text;
                const prefix = param.AMPERSAND() ? '&' : '';
                return `${paramName}: ${prefix}${paramType}`;
            })
            .join(', ');
        return {
            params: formatted,
            returnType: funcCtx.returnType().text
        };
    }

    getStructFields(structName: string | undefined): StructFieldInfo[] | undefined {
        if (!structName) {
            return undefined;
        }
        return this.structDefinitions.get(structName);
    }
    getSymbol(name: string): Symbol | undefined {
        return this.symbols.get(name);
    }

    getAllSymbols(): IterableIterator<Symbol> {
        return this.symbols.values();
    }
}
