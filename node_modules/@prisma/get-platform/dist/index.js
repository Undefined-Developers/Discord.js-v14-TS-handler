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
var dist_exports = {};
__export(dist_exports, {
  assertNodeAPISupported: () => import_chunk_O5EOXX3N.assertNodeAPISupported,
  getNodeAPIName: () => import_chunk_L4VWERKP.getNodeAPIName,
  getPlatform: () => import_chunk_SD2UGOOM.getPlatform,
  getPlatformInfo: () => import_chunk_SD2UGOOM.getPlatformInfo,
  getos: () => import_chunk_SD2UGOOM.getos,
  jestConsoleContext: () => import_chunk_LVABMATQ.jestConsoleContext,
  jestContext: () => import_chunk_LVABMATQ.jestContext,
  jestProcessContext: () => import_chunk_LVABMATQ.jestProcessContext,
  link: () => import_chunk_NRBYW3FO.link,
  platforms: () => import_chunk_FMZMOYZE.platforms
});
module.exports = __toCommonJS(dist_exports);
var import_chunk_O5EOXX3N = require("./chunk-O5EOXX3N.js");
var import_chunk_L4VWERKP = require("./chunk-L4VWERKP.js");
var import_chunk_SD2UGOOM = require("./chunk-SD2UGOOM.js");
var import_chunk_NRBYW3FO = require("./chunk-NRBYW3FO.js");
var import_chunk_XC47443Z = require("./chunk-XC47443Z.js");
var import_chunk_XFO73BBC = require("./chunk-XFO73BBC.js");
var import_chunk_FMZMOYZE = require("./chunk-FMZMOYZE.js");
var import_chunk_6HZWON4S = require("./chunk-6HZWON4S.js");
var import_chunk_LVABMATQ = require("./chunk-LVABMATQ.js");
var import_chunk_UPBZT3NW = require("./chunk-UPBZT3NW.js");
(0, import_chunk_FMZMOYZE.init_platforms)();
