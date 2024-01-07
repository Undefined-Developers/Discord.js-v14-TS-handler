import '../../_dnt.polyfills.js';
import * as dntShim from "../../_dnt.shims.js";
// iMpOrTaNt to make sure files can be reloaded properly!
export let uniqueFilePathCounter = 0;
export let paths = [];
/** Recursively generates an array of unique paths to import using `fileLoader()`
 * (**Is** windows compatible)
 */
export async function importDirectory(path) {
    path = path.replaceAll("\\", "/");
    const files = dntShim.Deno.readDirSync(dntShim.Deno.realPathSync(path));
    for (const file of files) {
        if (!file.name)
            continue;
        const currentPath = `${path}/${file.name}`;
        if (file.isFile) {
            if (!currentPath.endsWith(".ts"))
                continue;
            paths.push(`import "${dntShim.Deno.mainModule.substring(0, dntShim.Deno.mainModule.lastIndexOf("/"))}/${currentPath.substring(currentPath.indexOf("src/"))}#${uniqueFilePathCounter}";`);
            continue;
        }
        // Recursive function!
        await importDirectory(currentPath);
    }
    uniqueFilePathCounter++;
}
/** Writes, then imports all everything in fileloader.ts */
export async function fileLoader() {
    await dntShim.Deno.writeTextFile("fileloader.ts", paths.join("\n").replaceAll("\\", "/"));
    await import(`${dntShim.Deno.mainModule.substring(0, dntShim.Deno.mainModule.lastIndexOf("/"))}/fileloader.ts#${uniqueFilePathCounter}`);
    paths = [];
}
/** This function will import the specified directories */
export async function fastFileLoader(
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
            between(path, uniqueFilePathCounter, paths);
        importDirectory(path);
    }));
    if (before)
        before(uniqueFilePathCounter, paths);
    await fileLoader();
}
/** Pass in a (compatible) bot instance, and get sweet file loader goodness.
 * Remember to capture the output of this function!
 */
export function enableFileLoaderPlugin(rawBot) {
    const bot = rawBot;
    bot.importDirectory = importDirectory;
    bot.fileLoader = fileLoader;
    bot.fastFileLoader = fastFileLoader;
    return bot;
}
