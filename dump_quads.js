import { compileFile } from './compiler/src/index.ts';
import fs from 'fs';
const quads = compileFile('programs/memory_test.ty');
const format = value => {
    if (typeof value === 'number') {
        return value.toString();
    }
    if (!value || value === '') {
        return '0';
    }
    return value;
};

const lines = quads.map(q => `${q.op} ${format(q.left)} ${format(q.right)} ${format(q.res)}`);
fs.writeFileSync('/tmp/typeton-quads.txt', lines.join('\n'));
