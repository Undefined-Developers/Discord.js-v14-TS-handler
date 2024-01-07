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
var chunk_L4VWERKP_exports = {};
__export(chunk_L4VWERKP_exports, {
  getNodeAPIName: () => getNodeAPIName
});
module.exports = __toCommonJS(chunk_L4VWERKP_exports);
var NODE_API_QUERY_ENGINE_URL_BASE = "libquery_engine";
function getNodeAPIName(platform, type) {
  const isUrl = type === "url";
  if (platform.includes("windows")) {
    return isUrl ? `query_engine.dll.node` : `query_engine-${platform}.dll.node`;
  } else if (platform.includes("darwin")) {
    return isUrl ? `${NODE_API_QUERY_ENGINE_URL_BASE}.dylib.node` : `${NODE_API_QUERY_ENGINE_URL_BASE}-${platform}.dylib.node`;
  } else {
    return isUrl ? `${NODE_API_QUERY_ENGINE_URL_BASE}.so.node` : `${NODE_API_QUERY_ENGINE_URL_BASE}-${platform}.so.node`;
  }
}
