"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addToThread_js_1 = __importDefault(require("./addToThread.js"));
const getArchivedThreads_js_1 = __importDefault(require("./getArchivedThreads.js"));
const getThreadMembers_js_1 = __importDefault(require("./getThreadMembers.js"));
const joinThread_js_1 = __importDefault(require("./joinThread.js"));
const leaveThread_js_1 = __importDefault(require("./leaveThread.js"));
const removeThreadMember_js_1 = __importDefault(require("./removeThreadMember.js"));
function setupThreadPermChecks(bot) {
    (0, addToThread_js_1.default)(bot);
    (0, getArchivedThreads_js_1.default)(bot);
    (0, getThreadMembers_js_1.default)(bot);
    (0, joinThread_js_1.default)(bot);
    (0, leaveThread_js_1.default)(bot);
    (0, removeThreadMember_js_1.default)(bot);
}
exports.default = setupThreadPermChecks;
