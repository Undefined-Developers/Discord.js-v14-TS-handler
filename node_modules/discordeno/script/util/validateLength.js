"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLength = void 0;
/** Validates the length of a string in JS. Certain characters in JS can have multiple numbers in length in unicode and discords api is in python which treats length differently. */
function validateLength(text, options) {
    const length = [...text].length;
    // Text is too long
    if (options.max && length > options.max)
        return false;
    // Text is too short
    if (options.min && length < options.min)
        return false;
    return true;
}
exports.validateLength = validateLength;
