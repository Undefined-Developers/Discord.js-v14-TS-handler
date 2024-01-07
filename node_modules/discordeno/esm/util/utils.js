import * as dntShim from "../_dnt.shims.js";
/** Pause the execution for a given amount of milliseconds. */
export function delay(ms) {
    return new Promise((res) => dntShim.setTimeout(() => {
        res();
    }, ms));
}
/** Help format an image url. */
export function formatImageURL(url, size = 128, format) {
    return `${url}.${format || (url.includes("/a_") ? "gif" : "jpg")}?size=${size}`;
}
// Typescript is not so good as we developers so we need this little utility function to help it out
// Taken from https://fettblog.eu/typescript-hasownproperty/
/** TS save way to check if a property exists in an object */
export function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}
