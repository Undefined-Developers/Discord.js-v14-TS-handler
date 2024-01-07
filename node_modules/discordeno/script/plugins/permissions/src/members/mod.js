"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ban_js_1 = __importDefault(require("./ban.js"));
const editBot_js_1 = __importDefault(require("./editBot.js"));
const editMember_js_1 = __importDefault(require("./editMember.js"));
const kickMember_js_1 = __importDefault(require("./kickMember.js"));
const pruneMembers_js_1 = __importDefault(require("./pruneMembers.js"));
function setupMemberPermChecks(bot) {
    (0, ban_js_1.default)(bot);
    (0, editBot_js_1.default)(bot);
    (0, editMember_js_1.default)(bot);
    (0, kickMember_js_1.default)(bot);
    (0, pruneMembers_js_1.default)(bot);
}
exports.default = setupMemberPermChecks;
