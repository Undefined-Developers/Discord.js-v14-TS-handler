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
var getPlatform_exports = {};
__export(getPlatform_exports, {
  computeLibSSLSpecificPaths: () => import_chunk_SD2UGOOM.computeLibSSLSpecificPaths,
  getArchFromUname: () => import_chunk_SD2UGOOM.getArchFromUname,
  getPlatform: () => import_chunk_SD2UGOOM.getPlatform,
  getPlatformInfo: () => import_chunk_SD2UGOOM.getPlatformInfo,
  getPlatformInfoMemoized: () => import_chunk_SD2UGOOM.getPlatformInfoMemoized,
  getPlatformInternal: () => import_chunk_SD2UGOOM.getPlatformInternal,
  getSSLVersion: () => import_chunk_SD2UGOOM.getSSLVersion,
  getos: () => import_chunk_SD2UGOOM.getos,
  parseDistro: () => import_chunk_SD2UGOOM.parseDistro,
  parseLibSSLVersion: () => import_chunk_SD2UGOOM.parseLibSSLVersion,
  parseOpenSSLVersion: () => import_chunk_SD2UGOOM.parseOpenSSLVersion,
  resolveDistro: () => import_chunk_SD2UGOOM.resolveDistro
});
module.exports = __toCommonJS(getPlatform_exports);
var import_chunk_SD2UGOOM = require("./chunk-SD2UGOOM.js");
var import_chunk_NRBYW3FO = require("./chunk-NRBYW3FO.js");
var import_chunk_XC47443Z = require("./chunk-XC47443Z.js");
var import_chunk_XFO73BBC = require("./chunk-XFO73BBC.js");
var import_chunk_UPBZT3NW = require("./chunk-UPBZT3NW.js");
