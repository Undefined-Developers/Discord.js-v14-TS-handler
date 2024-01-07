/** Validates the length of a string in JS. Certain characters in JS can have multiple numbers in length in unicode and discords api is in python which treats length differently. */
export declare function validateLength(text: string, options: {
    max?: number;
    min?: number;
}): boolean;
