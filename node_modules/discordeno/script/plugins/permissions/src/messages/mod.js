"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_js_1 = __importDefault(require("./create.js"));
const delete_js_1 = __importDefault(require("./delete.js"));
const get_js_1 = __importDefault(require("./get.js"));
const pin_js_1 = __importDefault(require("./pin.js"));
const reactions_js_1 = __importDefault(require("./reactions.js"));
function setupMessagesPermChecks(bot) {
    (0, reactions_js_1.default)(bot);
    (0, delete_js_1.default)(bot);
    (0, get_js_1.default)(bot);
    (0, pin_js_1.default)(bot);
    (0, create_js_1.default)(bot);
}
exports.default = setupMessagesPermChecks;
