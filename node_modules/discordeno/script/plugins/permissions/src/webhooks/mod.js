"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createWebhook_js_1 = __importDefault(require("./createWebhook.js"));
const deleteWebhook_js_1 = __importDefault(require("./deleteWebhook.js"));
const editWebhook_js_1 = __importDefault(require("./editWebhook.js"));
const message_js_1 = __importDefault(require("./message.js"));
function setupWebhooksPermChecks(bot) {
    (0, createWebhook_js_1.default)(bot);
    (0, deleteWebhook_js_1.default)(bot);
    (0, editWebhook_js_1.default)(bot);
    (0, message_js_1.default)(bot);
}
exports.default = setupWebhooksPermChecks;
