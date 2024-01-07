"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableFileLoaderPlugin = exports.fastFileLoader = exports.fileLoader = exports.importDirectory = exports.paths = exports.uniqueFilePathCounter = void 0;
require("../../_dnt.polyfills.js");
const dntShim = __importStar(require("../../_dnt.shims.js"));
// iMpOrTaNt to make sure files can be reloaded properly!
exports.uniqueFilePathCounter = 0;
exports.paths = [];
/** Recursively generates an array of unique paths to import using `fileLoader()`
 * (**Is** windows compatible)
 */
async function importDirectory(path) {
    path = path.replaceAll("\\", "/");
    const files = dntShim.Deno.readDirSync(dntShim.Deno.realPathSync(path));
    for (const file of files) {
        if (!file.name)
            continue;
        const currentPath = `${path}/${file.name}`;
        if (file.isFile) {
            if (!currentPath.endsWith(".ts"))
                continue;
            exports.paths.push(`import "${dntShim.Deno.mainModule.substring(0, dntShim.Deno.mainModule.lastIndexOf("/"))}/${currentPath.substring(currentPath.indexOf("src/"))}#${exports.uniqueFilePathCounter}";`);
            continue;
        }
        // Recursive function!
        await importDirectory(currentPath);
    }
    exports.uniqueFilePathCounter++;
}
exports.importDirectory = importDirectory;
/** Writes, then imports all everything in fileloader.ts */
async function fileLoader() {
    await dntShim.Deno.writeTextFile("fileloader.ts", exports.paths.join("\n").replaceAll("\\", "/"));
    await Promise.resolve().then(() => __importStar(require(`${dntShim.Deno.mainModule.substring(0, dntShim.Deno.mainModule.lastIndexOf("/"))}/fileloader.ts#${exports.uniqueFilePathCounter}`)));
    exports.paths = [];
}
exports.fileLoader = fileLoader;
/** This function will import the specified directories */
async function fastFileLoader(
/** An array of directories to import recursively. */
paths, 
/** A function that will run before recursively setting a part of `paths`.
 * `path` contains the path that will be imported, useful for logging
 */
between, 
/** A function that runs before **actually** importing all the files. */
before) {
    await Promise.all([...paths].map((path) => {
        if (between)
            between(path, exports.uniqueFilePathCounter, paths);
        importDirectory(path);
    }));
    if (before)
        before(exports.uniqueFilePathCounter, paths);
    await fileLoader();
}
exports.fastFileLoader = fastFileLoader;
/** Pass in a (compatible) bot instance, and get sweet file loader goodness.
 * Remember to capture the output of this function!
 */
function enableFileLoaderPlugin(rawBot) {
    const bot = rawBot;
    bot.importDirectory = importDirectory;
    bot.fileLoader = fileLoader;
    bot.fastFileLoader = fastFileLoader;
    return bot;
}
exports.enableFileLoaderPlugin = enableFileLoaderPlugin;
