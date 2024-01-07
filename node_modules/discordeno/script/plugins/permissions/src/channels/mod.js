"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mod_js_1 = __importDefault(require("./threads/mod.js"));
const mod_js_2 = __importDefault(require("./forums/mod.js"));
const stage_js_1 = __importDefault(require("./stage.js"));
const deleteChannel_js_1 = __importDefault(require("./deleteChannel.js"));
const deleteChannelOverwrite_js_1 = __importDefault(require("./deleteChannelOverwrite.js"));
const editChannel_js_1 = __importDefault(require("./editChannel.js"));
const editChannelOverwrite_js_1 = __importDefault(require("./editChannelOverwrite.js"));
const followChannel_js_1 = __importDefault(require("./followChannel.js"));
const getChannelWebhooks_js_1 = __importDefault(require("./getChannelWebhooks.js"));
const swapChannels_js_1 = __importDefault(require("./swapChannels.js"));
function setupChannelPermChecks(bot) {
    (0, mod_js_1.default)(bot);
    (0, mod_js_2.default)(bot);
    (0, stage_js_1.default)(bot);
    (0, deleteChannel_js_1.default)(bot);
    (0, deleteChannelOverwrite_js_1.default)(bot);
    (0, editChannel_js_1.default)(bot);
    (0, editChannelOverwrite_js_1.default)(bot);
    (0, followChannel_js_1.default)(bot);
    (0, getChannelWebhooks_js_1.default)(bot);
    (0, swapChannels_js_1.default)(bot);
}
exports.default = setupChannelPermChecks;
