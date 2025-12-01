"use strict";
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
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const antlr4ts_1 = require("antlr4ts");
const antlr4ts_2 = require("antlr4ts");
const ParseTreeWalker_1 = require("antlr4ts/tree/ParseTreeWalker");
const TypetonLexer_1 = require("./grammar/TypetonLexer");
const TypetonParser_1 = require("./grammar/TypetonParser");
const SymbolTable_1 = require("./SymbolTable");
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
const typetonExecutable = process.env.TYPETON_CLI ?? 'typeton';
let semanticChecksDisabled = false;
const keywordDefinitions = [
    {
        label: 'var',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'Declare a mutable variable',
        documentation: '```typeton\nvar name: Type = value;\n```\nUse this keyword to expose memory that can change after initialization.'
    },
    {
        label: 'const',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'Declare an immutable constant or function',
        documentation: '```typeton\nconst name = (params): Type => { ... };\n```\nUse `const` when you want a value or function that cannot be reassigned.'
    },
    {
        label: 'struct',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'Declare a structured record',
        documentation: '```typeton\nstruct Name { field: Type; }\n```\nDefines a custom grouped data layout that can be nested.'
    },
    {
        label: 'return',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'Exit a function early',
        documentation: '```typeton\nreturn value;\n```\nExits the current function and optionally returns a value to the caller.'
    },
    {
        label: 'if',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'Conditional branch',
        documentation: '```typeton\nif (condition) { ... }\n```\nExecutes the block only when the condition evaluates to `true`.'
    },
    {
        label: 'else',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'Alternate branch for `if`',
        documentation: '```typeton\nelse { ... }\n```\nRuns when the preceding `if` condition evaluates to `false`.'
    },
    {
        label: 'for',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'For loop',
        documentation: '```typeton\nfor (var i: Int32 = 0; i < 10; i++) {\n    print(i);\n}\n```\nRuns the initializer, executes the body while the condition holds, and performs the update every iteration.'
    },
    {
        label: 'while',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'While loop',
        documentation: '```typeton\nvar count: Int32 = 0;\nwhile (count < 5) {\n    count += 1;\n}\n```\nRepeats the block while the condition stays `true` and stops as soon as it becomes `false`.'
    },
    {
        label: 'break',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'Exit loop immediately',
        documentation: '```typeton\nif (condition) {\n    break;\n}\n```\nTerminates the innermost loop when executed.'
    },
    {
        label: 'continue',
        kind: node_1.CompletionItemKind.Keyword,
        detail: 'Skip to the next iteration',
        documentation: '```typeton\nif (condition) {\n    continue;\n}\n```\nSkips the rest of the current loop iteration.'
    }
];
const typeDefinitions = [
    {
        label: 'Int',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Signed 32-bit integer (alias)',
        documentation: 'Alias for a 32-bit integer that is commonly used across programs.'
    },
    {
        label: 'Int32',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Signed 32-bit integer',
        documentation: 'Range: -2,147,483,648 to 2,147,483,647.'
    },
    {
        label: 'Int16',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Signed 16-bit integer',
        documentation: 'Range: -32,768 to 32,767.'
    },
    {
        label: 'Int8',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Signed 8-bit integer',
        documentation: 'Range: -128 to 127.'
    },
    {
        label: 'UInt32',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Unsigned 32-bit integer',
        documentation: 'Range: 0 to 4,294,967,295.'
    },
    {
        label: 'UInt16',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Unsigned 16-bit integer',
        documentation: 'Range: 0 to 65,535.'
    },
    {
        label: 'UInt8',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Unsigned 8-bit integer',
        documentation: 'Range: 0 to 255.'
    },
    {
        label: 'Float',
        kind: node_1.CompletionItemKind.Class,
        detail: '32-bit floating point',
        documentation: 'Single-precision floating point value.'
    },
    {
        label: 'Float32',
        kind: node_1.CompletionItemKind.Class,
        detail: '32-bit floating point (alias)',
        documentation: 'Synonym for `Float`.'
    },
    {
        label: 'Bool',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Boolean type',
        documentation: 'Represents `true` or `false`.'
    },
    {
        label: 'String',
        kind: node_1.CompletionItemKind.Class,
        detail: 'String (text) type',
        documentation: 'Represents immutable UTF-8 text values.'
    }
];
const printFunction = {
    label: 'print',
    kind: node_1.CompletionItemKind.Function,
    detail: 'Print a value to the console',
    documentation: '```typeton\nprint(value);\n```\nEmits the value to the runtime output stream.'
};
const mathFunctionDefinitions = [
    {
        label: 'ABS',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Absolute value',
        documentation: '```typeton\nABS(value)\n```\nReturns the absolute value of `value`.'
    },
    {
        label: 'SQRT',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Square root',
        documentation: '```typeton\nSQRT(value)\n```\nReturns the square root of `value`.'
    },
    {
        label: 'ATAN2',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Arctangent of y/x',
        documentation: '```typeton\nATAN2(y, x)\n```\nReturns the angle (degrees) from the vector components.'
    },
    {
        label: 'SIN',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Sine in degrees',
        documentation: '```typeton\nSIN(angle)\n```\nReturns the sine of `angle` expressed in degrees.'
    },
    {
        label: 'COS',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Cosine in degrees',
        documentation: '```typeton\nCOS(angle)\n```\nReturns the cosine of `angle` expressed in degrees.'
    },
    {
        label: 'TAN',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Tangent in degrees',
        documentation: '```typeton\nTAN(angle)\n```\nReturns the tangent of `angle` expressed in degrees.'
    },
    {
        label: 'FLOOR',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Round down',
        documentation: '```typeton\nFLOOR(value)\n```\nRounds `value` toward negative infinity.'
    },
    {
        label: 'CEIL',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Round up',
        documentation: '```typeton\nCEIL(value)\n```\nRounds `value` toward positive infinity.'
    },
    {
        label: 'ROUND',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Round to nearest integer',
        documentation: '```typeton\nROUND(value)\n```\nRounds `value` to the nearest integer.'
    },
    {
        label: 'MIN',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Minimum of two values',
        documentation: '```typeton\nMIN(a, b)\n```\nReturns the smaller of `a` and `b`.'
    },
    {
        label: 'MAX',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Maximum of two values',
        documentation: '```typeton\nMAX(a, b)\n```\nReturns the larger of `a` and `b`.'
    },
    {
        label: 'CLAMP',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Clamp between min and max',
        documentation: '```typeton\nCLAMP(value, min, max)\n```\nRestricts `value` to the `[min, max]` range.'
    }
];
const motionCommandDefinitions = [
    {
        label: 'move_abs',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Move to absolute position',
        documentation: '```typeton\nmove_abs(axis, position)\n```\nDirects the axis to an absolute target position.'
    },
    {
        label: 'move_rel',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Move relative distance',
        documentation: '```typeton\nmove_rel(axis, distance)\n```\nStarts a relative move on the given axis.'
    },
    {
        label: 'home',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Home the axis',
        documentation: '```typeton\nhome(axis)\n```\nDrives the axis toward its zero/home reference.'
    },
    {
        label: 'set_position',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Set current encoder position',
        documentation: '```typeton\nset_position(axis, pos)\n```\nOverrides the encoder value for the axis.'
    },
    {
        label: 'get_position',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Get current axis position',
        documentation: '```typeton\nvar pos = get_position(axis)\n```\nReads the last known position of the axis.'
    },
    {
        label: 'set_velocity',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Set motion velocity',
        documentation: '```typeton\nset_velocity(axis, vel)\n```\nLimits how fast the axis can run.'
    },
    {
        label: 'set_accel',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Set acceleration',
        documentation: '```typeton\nset_accel(axis, accel)\n```\nAdjusts the acceleration ramp for the axis.'
    },
    {
        label: 'wait_move',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Wait for move completion',
        documentation: '```typeton\nwait_move(axis)\n```\nBlocks until the previous motion finishes.'
    },
    {
        label: 'enable_motor',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Enable the motor',
        documentation: '```typeton\nenable_motor(axis)\n```\nTurns on the motor driver for the axis.'
    },
    {
        label: 'disable_motor',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Disable the motor',
        documentation: '```typeton\ndisable_motor(axis)\n```\nTurns off the motor driver for the axis.'
    }
];
const encoderMethodDefinitions = [
    {
        label: 'waitForAngle',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Wait for encoder angle',
        documentation: '```typeton\nX.waitForAngle(target)\n```\nSuspends until the encoder reaches the specified angle.'
    },
    {
        label: 'waitForCounts',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Wait for encoder counts',
        documentation: '```typeton\nY.waitForCounts(count)\n```\nSuspends until the encoder reaches the count target.'
    },
    {
        label: 'jog',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Jog the axis',
        documentation: '```typeton\nZ.jog(distance)\n```\nStarts a jog move on the axis.'
    },
    {
        label: 'moveAbsolute',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Alternate absolute move',
        documentation: '```typeton\nX.moveAbsolute(position)\n```\nMoves the axis to an absolute encoder position.'
    },
    {
        label: 'setGearMaster',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Set gear master index',
        documentation: '```typeton\nX.setGearMaster(level)\n```\nMarks the axis as the master at the provided level.'
    },
    {
        label: 'setGearRatio',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Set gear ratio',
        documentation: '```typeton\nY.setGearRatio(ratio)\n```\nApplies a gear ratio to the axis.'
    },
    {
        label: 'setGearBlend',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Blend master and slave motion',
        documentation: '```typeton\nX.setGearBlend(distance, mode)\n```\nBlends the motion between master and slave axes using the `MASTER` or `SLAVE` flag.'
    }
];
const inputHelperDefinitions = [
    {
        label: 'Input.setType',
        kind: node_1.CompletionItemKind.Method,
        detail: 'Configure input polarity',
        documentation: '```typeton\nInput.setType(channel, polarity)\n```\nDefines whether the channel is active-high or active-low.'
    },
    {
        label: 'Input.read',
        kind: node_1.CompletionItemKind.Method,
        detail: 'Read configured pin via Input object',
        documentation: '```typeton\nInput.read(channel)\n```\nAlternate method to read the configured input channel.'
    },
    {
        label: 'ReadInput',
        kind: node_1.CompletionItemKind.Function,
        detail: 'Read digital pin',
        documentation: '```typeton\nReadInput(channel)\n```\nReads the configured input channel and returns a `Bool`.'
    }
];
const runtimeConstantDefinitions = [
    {
        label: 'X',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Encoder axis 0',
        documentation: 'Represents the first encoder axis (0).'
    },
    {
        label: 'Y',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Encoder axis 1',
        documentation: 'Represents the second encoder axis (1).'
    },
    {
        label: 'Z',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Encoder axis 2',
        documentation: 'Represents the third encoder axis (2).'
    },
    {
        label: 'Encoder',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Access encoder properties',
        documentation: 'Used in `X.Encoder.Angle` or similar property access chains.'
    },
    {
        label: 'Angle',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Encoder angle property',
        documentation: 'Retrieves the latest calibrated angle from an encoder.'
    },
    {
        label: 'Counts',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Encoder count property',
        documentation: 'Retrieves the raw counts produced by the encoder.'
    },
    {
        label: 'Input',
        kind: node_1.CompletionItemKind.Class,
        detail: 'Input helper object',
        documentation: 'Provides the `.setType` and `.read` helpers for reading digital inputs.'
    },
    {
        label: 'MASTER',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Gear master flag',
        documentation: 'Used with `setGearBlend` to designate this node as the master axis.'
    },
    {
        label: 'SLAVE',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Gear slave flag',
        documentation: 'Used with `setGearBlend` to designate the slave axis.'
    },
    {
        label: 'LOW',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Active-low polarity flag',
        documentation: 'Use with `Input.setType(channel, LOW)` to configure active-low inputs.'
    },
    {
        label: 'HIGH',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Active-high polarity flag',
        documentation: 'Use with `Input.setType(channel, HIGH)` to configure active-high inputs.'
    }
];
const axisPropertyDefinition = {
    label: 'Encoder',
    kind: node_1.CompletionItemKind.Class,
    detail: 'Encoder properties for this axis',
    documentation: '```typeton\nX.Encoder.Angle\n```\nExpose encoder-specific properties for the axis.'
};
const encoderPropertyDefinitions = [
    {
        label: 'Angle',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Float',
        documentation: 'Retrieves the latest calibrated angle from an encoder (Float).'
    },
    {
        label: 'Counts',
        kind: node_1.CompletionItemKind.Constant,
        detail: 'Int32',
        documentation: 'Retrieves the raw counts produced by the encoder (Int32).'
    }
];
const inputDotMethodDefinitions = [
    {
        label: 'setType',
        kind: node_1.CompletionItemKind.Method,
        detail: 'Configure input polarity',
        documentation: '```typeton\nInput.setType(channel, polarity)\n```\nDefines whether the channel is active-high or active-low.'
    },
    {
        label: 'read',
        kind: node_1.CompletionItemKind.Method,
        detail: 'Read configured pin via Input object',
        documentation: '```typeton\nInput.read(channel)\n```\nAlternate method to read the configured input channel.'
    }
];
const builtInDefinitions = [
    ...keywordDefinitions,
    ...typeDefinitions,
    printFunction,
    ...mathFunctionDefinitions,
    ...motionCommandDefinitions,
    ...encoderMethodDefinitions,
    ...inputHelperDefinitions,
    ...runtimeConstantDefinitions
];
const axisMethodCompletions = encoderMethodDefinitions.map(toCompletionItem);
const axisTopLevelCompletions = [toCompletionItem(axisPropertyDefinition), ...axisMethodCompletions];
const encoderPropertyCompletionItems = encoderPropertyDefinitions.map(toCompletionItem);
const inputDotCompletions = inputDotMethodDefinitions.map(toCompletionItem);
const axisNames = new Set(['X', 'Y', 'Z']);
const documentStates = new Map();
const builtInCompletions = buildBuiltInCompletions();
const builtInHoverDocs = buildHoverDocumentMap(builtInCompletions);
connection.onInitialize((_params) => ({
    capabilities: {
        textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
        completionProvider: {
            resolveProvider: false,
            triggerCharacters: ['.', ':', ' ', '(', ',', '[']
        },
        hoverProvider: true
    }
}));
documents.onDidOpen((event) => {
    validateTextDocument(event.document);
});
documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
});
documents.onDidClose((event) => {
    documentStates.delete(event.document.uri);
    connection.sendDiagnostics({ uri: event.document.uri, diagnostics: [] });
});
connection.onCompletion((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return [];
    }
    const state = getDocumentState(document);
    const dotContext = getDotCompletionContext(document, params.position);
    if (dotContext) {
        return provideDotCompletion(dotContext, state);
    }
    const symbolItems = createSymbolCompletions(state.symbolTable);
    return mergeCompletions(builtInCompletions, symbolItems);
});
connection.onHover((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return null;
    }
    const word = getWordAtPosition(document, params.position);
    if (!word) {
        return null;
    }
    const builtinDoc = builtInHoverDocs.get(word.toLowerCase());
    if (builtinDoc) {
        return { contents: builtinDoc };
    }
    const state = documentStates.get(document.uri);
    const symbol = state?.symbolTable.getSymbol(word);
    if (symbol) {
        return {
            contents: {
                kind: node_1.MarkupKind.Markdown,
                value: symbol.documentation ?? `\`${symbol.name}\` • ${symbol.type}`
            }
        };
    }
    return null;
});
documents.listen(connection);
connection.listen();
function validateTextDocument(textDocument) {
    const state = parseDocument(textDocument);
    documentStates.set(textDocument.uri, state);
    connection.sendDiagnostics({
        uri: textDocument.uri,
        diagnostics: state.diagnostics
    });
}
function getDocumentState(document) {
    let state = documentStates.get(document.uri);
    if (!state) {
        state = parseDocument(document);
        documentStates.set(document.uri, state);
    }
    return state;
}
function parseDocument(document) {
    const chars = antlr4ts_1.CharStreams.fromString(document.getText());
    const lexer = new TypetonLexer_1.TypetonLexer(chars);
    const tokens = new antlr4ts_1.CommonTokenStream(lexer);
    const parser = new TypetonParser_1.TypetonParser(tokens);
    const errorListener = new DiagnosticErrorListener(document);
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);
    const tree = parser.program();
    const symbolTable = new SymbolTable_1.SymbolTable();
    ParseTreeWalker_1.ParseTreeWalker.DEFAULT.walk(symbolTable, tree);
    const syntaxDiagnostics = errorListener.getDiagnostics();
    const semanticDiagnostics = syntaxDiagnostics.length === 0 ? runSemanticDiagnostics(document) : [];
    return {
        symbolTable,
        diagnostics: [...syntaxDiagnostics, ...semanticDiagnostics]
    };
}
function runSemanticDiagnostics(document) {
    if (semanticChecksDisabled) {
        return [];
    }
    const tempFile = createTempDocument(document.getText());
    try {
        const result = (0, child_process_1.spawnSync)(typetonExecutable, ['compile', tempFile.path], {
            encoding: 'utf8',
            maxBuffer: 5 * 1024 * 1024
        });
        if (result.error) {
            handleSemanticSpawnError(result.error);
            return [];
        }
        if ((result.status ?? 0) === 0) {
            return [];
        }
        const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
        return parseCompilerDiagnostics(output, document);
    }
    catch (error) {
        connection.console.warn(`Typeton semantic diagnostics failed: ${error.message}`);
        return [];
    }
    finally {
        tempFile.cleanup();
    }
}
function createTempDocument(content) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'typeton-lsp-'));
    const filePath = path.join(dir, 'document.ty');
    fs.writeFileSync(filePath, content, 'utf8');
    return {
        path: filePath,
        cleanup: () => {
            try {
                fs.rmSync(dir, { recursive: true, force: true });
            }
            catch {
                // ignore cleanup errors
            }
        }
    };
}
function handleSemanticSpawnError(error) {
    if (error.code === 'ENOENT' && !semanticChecksDisabled) {
        semanticChecksDisabled = true;
        connection.console.warn(`Typeton CLI '${typetonExecutable}' was not found on PATH. Semantic diagnostics have been disabled.`);
    }
}
function parseCompilerDiagnostics(output, document) {
    const failureMarker = 'Compilation failed:';
    const markerIndex = output.lastIndexOf(failureMarker);
    const relevant = markerIndex >= 0 ? output.slice(markerIndex + failureMarker.length) : output;
    const lines = relevant
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith('❌'));
    if (lines.length === 0) {
        return [];
    }
    const headline = lines[0] ?? 'Compilation failed';
    const locationMatch = /\(line\s+(\d+):(\d+)\)/i.exec(headline);
    const message = locationMatch ? headline.replace(locationMatch[0], '').trim() : headline;
    const range = extractRangeFromLocation(document, locationMatch);
    const diagnostic = {
        severity: node_1.DiagnosticSeverity.Error,
        message: message || 'Compilation failed',
        range,
        source: 'typeton'
    };
    if (lines.length > 1) {
        diagnostic.relatedInformation = [
            {
                location: {
                    uri: document.uri,
                    range
                },
                message: lines.slice(1, Math.min(lines.length, 3)).join('\n')
            }
        ];
    }
    return [diagnostic];
}
function extractRangeFromLocation(document, match) {
    if (!match) {
        return node_1.Range.create(node_1.Position.create(0, 0), node_1.Position.create(0, 1));
    }
    const line = Math.max(Number(match[1]) - 1, 0);
    const column = Math.max(Number(match[2]), 0);
    const start = clampPosition(document, line, column);
    const end = clampPosition(document, line, column + 1);
    return node_1.Range.create(start, end);
}
function clampPosition(document, line, character) {
    const safeLine = Math.min(Math.max(line, 0), Math.max(document.lineCount - 1, 0));
    const lineLength = getLineLength(document, safeLine);
    const safeChar = Math.min(Math.max(character, 0), Math.max(lineLength, 0));
    return node_1.Position.create(safeLine, safeChar);
}
function getLineLength(document, line) {
    const startOffset = document.offsetAt(node_1.Position.create(line, 0));
    const endOffset = line + 1 < document.lineCount
        ? document.offsetAt(node_1.Position.create(line + 1, 0))
        : document.getText().length;
    return Math.max(0, endOffset - startOffset);
}
function getWordAtPosition(document, position) {
    const text = document.getText();
    const offset = document.offsetAt(position);
    if (offset === undefined || offset < 0) {
        return null;
    }
    let start = offset;
    while (start > 0 && /[a-zA-Z0-9_]/.test(text[start - 1])) {
        start--;
    }
    let end = offset;
    while (end < text.length && /[a-zA-Z0-9_]/.test(text[end])) {
        end++;
    }
    if (start === end) {
        return null;
    }
    return text.substring(start, end);
}
function createSymbolCompletions(symbolTable) {
    const builder = [];
    for (const symbol of symbolTable.getAllSymbols()) {
        builder.push({
            label: symbol.name,
            kind: symbol.kind === 'function' ? node_1.CompletionItemKind.Function : node_1.CompletionItemKind.Variable,
            detail: symbol.type,
            documentation: symbol.documentation
                ? { kind: node_1.MarkupKind.Markdown, value: symbol.documentation }
                : undefined
        });
    }
    return builder;
}
function mergeCompletions(builtIns, custom) {
    const seen = new Set(builtIns.map((item) => item.label.toLowerCase()));
    const merged = [...builtIns];
    for (const item of custom) {
        const key = item.label.toLowerCase();
        if (seen.has(key)) {
            continue;
        }
        seen.add(key);
        merged.push(item);
    }
    return merged;
}
function buildHoverDocumentMap(items) {
    const map = new Map();
    for (const item of items) {
        if (!item.documentation || !item.label) {
            continue;
        }
        const documentation = typeof item.documentation === 'string'
            ? { kind: node_1.MarkupKind.Markdown, value: item.documentation }
            : item.documentation;
        map.set(item.label.toLowerCase(), documentation);
    }
    return map;
}
function buildBuiltInCompletions() {
    return builtInDefinitions.map(toCompletionItem);
}
function toCompletionItem(definition) {
    return {
        label: definition.label,
        kind: definition.kind,
        detail: definition.detail,
        documentation: {
            kind: node_1.MarkupKind.Markdown,
            value: definition.documentation
        }
    };
}
function getDotCompletionContext(document, position) {
    const offset = document.offsetAt(position);
    if (offset <= 0) {
        return null;
    }
    const text = document.getText().slice(0, offset);
    let idx = text.length - 1;
    while (idx >= 0 && /\s/.test(text[idx])) {
        idx--;
    }
    if (idx < 0) {
        return null;
    }
    let start = idx;
    while (start >= 0 && /[a-zA-Z0-9_.]/.test(text[start])) {
        start--;
    }
    const segment = text.slice(start + 1, idx + 1);
    if (!segment.includes('.')) {
        return null;
    }
    const sanitized = segment.replace(/\s+/g, '');
    if (!sanitized) {
        return null;
    }
    const hasTrailingDot = sanitized.endsWith('.');
    const parts = sanitized.split('.');
    const receiverParts = hasTrailingDot
        ? parts.filter((part) => part.length > 0)
        : parts.slice(0, parts.length - 1).filter((part) => part.length > 0);
    const partial = hasTrailingDot ? '' : parts[parts.length - 1] ?? '';
    if (receiverParts.length === 0) {
        return null;
    }
    return {
        receiverPath: receiverParts,
        partial
    };
}
function provideDotCompletion(context, state) {
    const base = context.receiverPath[0];
    if (axisNames.has(base.toUpperCase())) {
        return filterCompletions(getAxisDotCompletions(context.receiverPath), context.partial);
    }
    if (base.toLowerCase() === 'input') {
        return filterCompletions(inputDotCompletions, context.partial);
    }
    const structType = resolveStructType(state.symbolTable, context.receiverPath);
    if (structType) {
        return getStructFieldCompletions(state.symbolTable, structType, context.partial);
    }
    return [];
}
function getAxisDotCompletions(path) {
    if (path.length === 1) {
        return axisTopLevelCompletions;
    }
    if (path[1].toLowerCase() === 'encoder') {
        return encoderPropertyCompletionItems;
    }
    return [];
}
function resolveStructType(symbolTable, path) {
    if (path.length === 0) {
        return null;
    }
    const rootSymbol = symbolTable.getSymbol(path[0]);
    if (!rootSymbol) {
        return null;
    }
    let currentType = rootSymbol.type;
    if (path.length === 1) {
        return normalizeTypeForLookup(currentType);
    }
    for (let i = 1; i < path.length; i++) {
        const structName = normalizeTypeForLookup(currentType);
        if (!structName) {
            return null;
        }
        const fields = symbolTable.getStructFields(structName);
        if (!fields) {
            return null;
        }
        const field = fields.find((entry) => entry.name === path[i]);
        if (!field) {
            return null;
        }
        currentType = field.type;
    }
    return normalizeTypeForLookup(currentType);
}
function normalizeTypeForLookup(type) {
    if (!type) {
        return null;
    }
    const normalized = type.replace(/&/g, '').replace(/\[[^\]]*\]/g, '').trim();
    return normalized || null;
}
function getStructFieldCompletions(symbolTable, structType, partial) {
    const fields = symbolTable.getStructFields(structType);
    if (!fields) {
        return [];
    }
    const items = fields.map((field) => ({
        label: field.name,
        kind: node_1.CompletionItemKind.Field,
        detail: field.type,
        documentation: {
            kind: node_1.MarkupKind.Markdown,
            value: `Field \`${field.name}\` of type \`${field.type}\`.`,
        }
    }));
    return filterCompletions(items, partial);
}
function filterCompletions(items, partial) {
    if (!partial) {
        return items;
    }
    const lowerPartial = partial.toLowerCase();
    return items.filter((item) => item.label.toLowerCase().startsWith(lowerPartial));
}
class DiagnosticErrorListener {
    constructor(document) {
        this.document = document;
        this.diagnostics = [];
        this.documentText = document.getText();
    }
    getDiagnostics() {
        return this.diagnostics;
    }
    syntaxError(_recognizer, offendingSymbol, line, charPositionInLine, msg, _ex) {
        const safeLine = Math.max(line - 1, 0);
        const safeChar = Math.max(charPositionInLine, 0);
        const diagnosticRange = this.createDiagnosticRange(offendingSymbol, safeLine, safeChar);
        this.diagnostics.push({
            severity: node_1.DiagnosticSeverity.Error,
            range: diagnosticRange,
            message: `Syntax error: ${msg}`,
            source: 'typeton'
        });
    }
    createDiagnosticRange(offendingSymbol, safeLine, safeChar) {
        const fallbackStart = clampPosition(this.document, safeLine, safeChar);
        const fallbackEnd = clampPosition(this.document, safeLine, safeChar + 1);
        const fallbackRange = node_1.Range.create(fallbackStart, fallbackEnd);
        const fallbackOffset = this.document.offsetAt(fallbackStart);
        if (!offendingSymbol) {
            return fallbackRange;
        }
        if (this.isEndOfFileToken(offendingSymbol)) {
            return this.rangeForTrailingToken() ?? fallbackRange;
        }
        const symbolText = offendingSymbol.text ?? '';
        if (this.isWhitespace(symbolText)) {
            return this.rangeBeforeOffset(offendingSymbol.startIndex ?? fallbackOffset) ?? fallbackRange;
        }
        const tokenOffsets = this.getTokenOffsets(offendingSymbol);
        if (!tokenOffsets) {
            return fallbackRange;
        }
        const start = this.document.positionAt(tokenOffsets.start);
        const end = this.document.positionAt(tokenOffsets.end);
        return node_1.Range.create(start, end);
    }
    getTokenOffsets(token) {
        if (token.startIndex == null || token.startIndex < 0) {
            return null;
        }
        const start = Math.max(0, token.startIndex);
        const estimatedLength = token.stopIndex != null && token.stopIndex >= token.startIndex
            ? token.stopIndex - token.startIndex + 1
            : Math.max(token.text?.length ?? 0, 1);
        const end = Math.min(this.documentText.length, start + Math.max(estimatedLength, 1));
        return { start, end };
    }
    rangeBeforeOffset(offset) {
        if (!Number.isFinite(offset)) {
            return null;
        }
        const bounds = this.findPreviousTokenBounds(offset);
        if (!bounds) {
            return null;
        }
        const start = this.document.positionAt(bounds.start);
        const end = this.document.positionAt(bounds.end);
        return node_1.Range.create(start, end);
    }
    findPreviousTokenBounds(initialOffset) {
        if (this.documentText.length === 0) {
            return null;
        }
        let idx = Math.min(initialOffset - 1, this.documentText.length - 1);
        while (idx >= 0 && /\s/.test(this.documentText[idx])) {
            idx--;
        }
        if (idx < 0) {
            return null;
        }
        let start = idx;
        if (this.isIdentifierChar(this.documentText[idx])) {
            while (start > 0 && this.isIdentifierChar(this.documentText[start - 1])) {
                start--;
            }
        }
        return { start, end: idx + 1 };
    }
    rangeForTrailingToken() {
        const bounds = this.findPreviousTokenBounds(this.documentText.length);
        if (!bounds) {
            return null;
        }
        const start = this.document.positionAt(bounds.start);
        const end = this.document.positionAt(bounds.end);
        return node_1.Range.create(start, end);
    }
    isIdentifierChar(char) {
        return /[A-Za-z0-9_]/.test(char);
    }
    isWhitespace(text) {
        return text.length === 0 || text.trim().length === 0;
    }
    isEndOfFileToken(token) {
        return token.type === antlr4ts_2.Token.EOF || token.text === '<EOF>';
    }
}
//# sourceMappingURL=server.js.map