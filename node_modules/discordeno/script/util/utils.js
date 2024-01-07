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
exports.hasProperty = exports.formatImageURL = exports.delay = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
/** Pause the execution for a given amount of milliseconds. */
function delay(ms) {
    return new Promise((res) => dntShim.setTimeout(() => {
        res();
    }, ms));
}
exports.delay = delay;
/** Help format an image url. */
function formatImageURL(url, size = 128, format) {
    return `${url}.${format || (url.includes("/a_") ? "gif" : "jpg")}?size=${size}`;
}
exports.formatImageURL = formatImageURL;
// Typescript is not so good as we developers so we need this little utility function to help it out
// Taken from https://fettblog.eu/typescript-hasownproperty/
/** TS save way to check if a property exists in an object */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}
exports.hasProperty = hasProperty;
