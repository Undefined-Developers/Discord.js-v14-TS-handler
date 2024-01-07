import { verify } from "../../deps/unpkg_com__evan/wasm_0.0.93/target/ed25519/deno.js";
export function verifySignature({ publicKey, signature, timestamp, body }) {
    const isValid = verify(hexToUint8Array(publicKey), hexToUint8Array(signature), new TextEncoder().encode(timestamp + body));
    return { isValid, body };
}
/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex) {
    return new Uint8Array(hex.match(/.{1,2}/g).map((val) => parseInt(val, 16)));
}
