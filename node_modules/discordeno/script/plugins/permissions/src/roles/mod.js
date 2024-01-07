"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const add_js_1 = __importDefault(require("./add.js"));
const create_js_1 = __importDefault(require("./create.js"));
const delete_js_1 = __importDefault(require("./delete.js"));
const edit_js_1 = __importDefault(require("./edit.js"));
const remove_js_1 = __importDefault(require("./remove.js"));
function setupRolePermChecks(bot) {
    (0, add_js_1.default)(bot);
    (0, create_js_1.default)(bot);
    (0, delete_js_1.default)(bot);
    (0, edit_js_1.default)(bot);
    (0, remove_js_1.default)(bot);
}
exports.default = setupRolePermChecks;
