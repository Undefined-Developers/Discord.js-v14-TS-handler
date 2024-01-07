"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBits = exports.calculatePermissions = void 0;
const shared_js_1 = require("../types/shared.js");
/** This function converts a bitwise string to permission strings */
function calculatePermissions(permissionBits) {
    return Object.keys(shared_js_1.BitwisePermissionFlags).filter((permission) => {
        // Since Object.keys() not only returns the permission names but also the bit values we need to return false if it is a Number
        if (Number(permission))
            return false;
        // Check if permissionBits has this permission
        return permissionBits & BigInt(shared_js_1.BitwisePermissionFlags[permission]);
    });
}
exports.calculatePermissions = calculatePermissions;
/** This function converts an array of permissions into the bitwise string. */
function calculateBits(permissions) {
    return permissions
        .reduce((bits, perm) => {
        bits |= BigInt(shared_js_1.BitwisePermissionFlags[perm]);
        return bits;
    }, 0n)
        .toString();
}
exports.calculateBits = calculateBits;
