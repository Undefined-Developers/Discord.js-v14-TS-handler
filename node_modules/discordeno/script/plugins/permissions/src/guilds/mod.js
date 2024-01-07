"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_js_1 = __importDefault(require("./events.js"));
const welcomeScreen_js_1 = __importDefault(require("./welcomeScreen.js"));
const widget_js_1 = __importDefault(require("./widget.js"));
const createGuild_js_1 = __importDefault(require("./createGuild.js"));
const deleteGuild_js_1 = __importDefault(require("./deleteGuild.js"));
const editGuild_js_1 = __importDefault(require("./editGuild.js"));
const getAuditLogs_js_1 = __importDefault(require("./getAuditLogs.js"));
const getBan_js_1 = __importDefault(require("./getBan.js"));
const getBans_js_1 = __importDefault(require("./getBans.js"));
const getPruneCount_js_1 = __importDefault(require("./getPruneCount.js"));
const getVanityUrl_js_1 = __importDefault(require("./getVanityUrl.js"));
function setupGuildPermChecks(bot) {
    (0, events_js_1.default)(bot);
    (0, createGuild_js_1.default)(bot);
    (0, deleteGuild_js_1.default)(bot);
    (0, editGuild_js_1.default)(bot);
    (0, welcomeScreen_js_1.default)(bot);
    (0, widget_js_1.default)(bot);
    (0, getAuditLogs_js_1.default)(bot);
    (0, getBan_js_1.default)(bot);
    (0, getBans_js_1.default)(bot);
    (0, getPruneCount_js_1.default)(bot);
    (0, getVanityUrl_js_1.default)(bot);
}
exports.default = setupGuildPermChecks;
