"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var chunk_ATMXZBUA_exports = {};
__export(chunk_ATMXZBUA_exports, {
  init_platformRegex: () => init_platformRegex,
  platformRegex: () => platformRegex,
  platformRegex_exports: () => platformRegex_exports
});
module.exports = __toCommonJS(chunk_ATMXZBUA_exports);
var import_chunk_FMZMOYZE = require("./chunk-FMZMOYZE.js");
var import_chunk_UPBZT3NW = require("./chunk-UPBZT3NW.js");
var require_escape_string_regexp = (0, import_chunk_UPBZT3NW.__commonJS)({
  "../../node_modules/.pnpm/escape-string-regexp@4.0.0/node_modules/escape-string-regexp/index.js"(exports, module2) {
    "use strict";
    module2.exports = (string) => {
      if (typeof string !== "string") {
        throw new TypeError("Expected a string");
      }
      return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    };
  }
});
var platformRegex_exports = {};
(0, import_chunk_UPBZT3NW.__export)(platformRegex_exports, {
  platformRegex: () => platformRegex
});
var import_escape_string_regexp, platformRegex;
var init_platformRegex = (0, import_chunk_UPBZT3NW.__esm)({
  "src/test-utils/platformRegex.ts"() {
    import_escape_string_regexp = (0, import_chunk_UPBZT3NW.__toESM)(require_escape_string_regexp());
    (0, import_chunk_FMZMOYZE.init_platforms)();
    platformRegex = new RegExp(
      "(" + [...import_chunk_FMZMOYZE.platforms].sort((a, b) => b.length - a.length).map((p) => (0, import_escape_string_regexp.default)(p)).join("|") + ")",
      "g"
    );
  }
});
