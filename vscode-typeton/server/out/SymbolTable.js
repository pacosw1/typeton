"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolTable = void 0;
class SymbolTable {
    constructor() {
        this.symbols = new Map();
        this.structDefinitions = new Map();
    }
    visitTerminal(node) { }
    visitErrorNode(node) { }
    enterEveryRule(ctx) { }
    exitEveryRule(ctx) { }
    enterScalarVarDecl(ctx) {
        this.addVariable(ctx.ID().text, ctx.type().text);
    }
    enterScalarVarDeclNoInit(ctx) {
        this.addVariable(ctx.ID().text, ctx.type().text);
    }
    enterArrayVarDecl(ctx) {
        this.addArray(ctx.ID().text, ctx.type().text, ctx.INT_LIT().text);
    }
    enterArrayVarDeclInit(ctx) {
        this.addArray(ctx.ID().text, ctx.type().text, ctx.INT_LIT().text);
    }
    enterConstDecl(ctx) {
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
    addVariable(name, type) {
        this.symbols.set(name, {
            name,
            type,
            kind: 'variable',
            documentation: `Variable \`${name}\` of type \`${type}\``
        });
    }
    addArray(name, type, size) {
        this.symbols.set(name, {
            name,
            type: `${type}[${size}]`,
            kind: 'variable',
            documentation: `Array \`${name}\` of type \`${type}\` with size ${size}`
        });
    }
    addConstant(name, type) {
        this.symbols.set(name, {
            name,
            type,
            kind: 'variable',
            documentation: `Constant \`${name}\` of type \`${type}\``
        });
    }
    enterStructDecl(ctx) {
        const structName = ctx.ID().text;
        const fields = ctx.structField().map((field) => ({
            name: field.ID().text,
            type: field.type().text
        }));
        this.structDefinitions.set(structName, fields);
    }
    buildFunctionSignature(funcCtx) {
        const params = funcCtx.parameterList()?.parameter() ?? [];
        const formatted = params
            .map((param) => {
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
    getStructFields(structName) {
        if (!structName) {
            return undefined;
        }
        return this.structDefinitions.get(structName);
    }
    getSymbol(name) {
        return this.symbols.get(name);
    }
    getAllSymbols() {
        return this.symbols.values();
    }
}
exports.SymbolTable = SymbolTable;
//# sourceMappingURL=SymbolTable.js.map