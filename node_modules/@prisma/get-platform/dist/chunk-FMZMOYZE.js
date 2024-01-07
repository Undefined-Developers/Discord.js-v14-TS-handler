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
var chunk_FMZMOYZE_exports = {};
__export(chunk_FMZMOYZE_exports, {
  init_platforms: () => init_platforms,
  platforms: () => platforms
});
module.exports = __toCommonJS(chunk_FMZMOYZE_exports);
var import_chunk_UPBZT3NW = require("./chunk-UPBZT3NW.js");
var platforms;
var init_platforms = (0, import_chunk_UPBZT3NW.__esm)({
  "src/platforms.ts"() {
    platforms = [
      "darwin",
      "darwin-arm64",
      "debian-openssl-1.0.x",
      "debian-openssl-1.1.x",
      "debian-openssl-3.0.x",
      "rhel-openssl-1.0.x",
      "rhel-openssl-1.1.x",
      "rhel-openssl-3.0.x",
      "linux-arm64-openssl-1.1.x",
      "linux-arm64-openssl-1.0.x",
      "linux-arm64-openssl-3.0.x",
      "linux-arm-openssl-1.1.x",
      "linux-arm-openssl-1.0.x",
      "linux-arm-openssl-3.0.x",
      "linux-musl",
      "linux-musl-openssl-3.0.x",
      "linux-musl-arm64-openssl-1.1.x",
      "linux-musl-arm64-openssl-3.0.x",
      "linux-nixos",
      "linux-static-x64",
      "linux-static-arm64",
      "windows",
      "freebsd11",
      "freebsd12",
      "freebsd13",
      "openbsd",
      "netbsd",
      "arm"
    ];
  }
});
