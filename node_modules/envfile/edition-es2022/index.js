"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.parse = void 0;
// perhaps in the future we can use @bevry/json's toJSON and parseJSON and JSON.stringify to support more advanced types
/** Parse an envfile string. */
function parse(src) {
    const result = {};
    const lines = src.toString().split('\n');
    for (const line of lines) {
        const match = line.match(/^([^=:#]+?)[=:](.*)/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/['"]+/g, '');
            result[key] = value;
        }
    }
    return result;
}
exports.parse = parse;
/** Turn an object into an envfile string. */
function stringify(obj) {
    let result = '';
    for (const [key, value] of Object.entries(obj)) {
        if (key) {
            const line = `${key}=${String(value)}`;
            result += line + '\n';
        }
    }
    return result;
}
exports.stringify = stringify;
