import { CharStreams, CommonTokenStream } from "antlr4ts";
import { TypetonLexer } from "./generated/TypetonLexer";
import { TypetonParser } from "./generated/TypetonParser";
import { CompilerVisitor } from "./visitor";
import type { Quad } from "./visitor";
import * as fs from "fs";

export interface CompilerOptions {
  pretty?: boolean; // Print quads when running as standalone script
}

export function compile(input: string): Quad[] {
  const chars = CharStreams.fromString(input);
  const lexer = new TypetonLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new TypetonParser(tokens);

  const tree = parser.program();

  const visitor = new CompilerVisitor();
  visitor.setSourceText(input);
  visitor.visit(tree);

  return visitor.quads;
}

export function compileFile(filePath: string): Quad[] {
  const input = fs.readFileSync(filePath, "utf-8");
  return compile(input);
}

// Simple CLI entrypoint when executing directly
if (import.meta.main) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: bun run src/index.ts <input_file>");
    process.exit(1);
  }

  const inputFile = args[0];
  try {
    const quads = compileFile(inputFile ?? "");
    console.log("Generated Quads:");
    quads.forEach((q, i) => {
      console.log(`${i}: (${q.op}, ${q.left}, ${q.right}, ${q.res})`);
    });
  } catch (e) {
    console.error(`Error reading file ${inputFile}:`, e);
    process.exit(1);
  }
}
