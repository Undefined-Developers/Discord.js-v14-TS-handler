import '../../_dnt.polyfills.js';
import { Bot } from "./deps.js";
export declare let uniqueFilePathCounter: number;
export declare let paths: string[];
/** Recursively generates an array of unique paths to import using `fileLoader()`
 * (**Is** windows compatible)
 */
export declare function importDirectory(path: string): Promise<void>;
/** Writes, then imports all everything in fileloader.ts */
export declare function fileLoader(): Promise<void>;
/** This function will import the specified directories */
export declare function fastFileLoader(
/** An array of directories to import recursively. */
paths: string[], 
/** A function that will run before recursively setting a part of `paths`.
 * `path` contains the path that will be imported, useful for logging
 */
between?: (path: string, uniqueFilePathCounter: number, paths: string[]) => void, 
/** A function that runs before **actually** importing all the files. */
before?: (uniqueFilePathCounter: number, paths: string[]) => void): Promise<void>;
/** Extend the Bot with the Plugin's added functions */
export interface BotWithFileLoader extends Bot {
    /** Recursively generates an array of unique paths to import using `fileLoader()`
     * (**Is** windows compatible)
     */
    importDirectory: (path: string) => void;
    /** Writes, then imports all everything in fileloader.ts */
    fileLoader: () => void;
    /** This function will import the specified directories */
    fastFileLoader: (
    /** An array of directories to import recursively. */
    paths: string[], 
    /** A function that will run before recursively setting a part of `paths`.
     * `path` contains the path that will be imported, useful for logging
     */
    between?: (path: string, uniqueFilePathCounter: number, paths: string[]) => void, 
    /** A function that runs before **actually** importing all the files. */
    before?: (uniqueFilePathCounter: number, paths: string[]) => void) => void;
}
/** Pass in a (compatible) bot instance, and get sweet file loader goodness.
 * Remember to capture the output of this function!
 */
export declare function enableFileLoaderPlugin(rawBot: Bot): BotWithFileLoader;
