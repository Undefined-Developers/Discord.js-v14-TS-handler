"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = void 0;
const deno_js_1 = require("../../deps/unpkg_com__evan/wasm_0.0.93/target/ed25519/deno.js");
function verifySignature({ publicKey, signature, timestamp, body }) {
    const isValid = (0, deno_js_1.verify)(hexToUint8Array(publicKey), hexToUint8Array(signature), new TextEncoder().encode(timestamp + body));
    return { isValid, body };
}
exports.verifySignature = verifySignature;
/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex) {
    return new Uint8Array(hex.match(/.{1,2}/g).map((val) => parseInt(val, 16)));
}
