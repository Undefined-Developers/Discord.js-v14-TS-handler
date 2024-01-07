/** We don't normalize anything, so it is just strings and strings. */
export type Data = Record<string, string>;
/** We typecast the value as a string so that it is compatible with envfiles.  */
export type Input = Record<string, any>;
/** Parse an envfile string. */
export declare function parse(src: string): Data;
/** Turn an object into an envfile string. */
export declare function stringify(obj: Input): string;
//# sourceMappingURL=index.d.ts.map