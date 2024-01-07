"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createForumPost_js_1 = __importDefault(require("./createForumPost.js"));
function setupThreadPermChecks(bot) {
    (0, createForumPost_js_1.default)(bot);
}
exports.default = setupThreadPermChecks;
