"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enablePermissionsPlugin = void 0;
require("../../_dnt.polyfills.js");
const mod_js_1 = __importDefault(require("./src/channels/mod.js"));
const discovery_js_1 = __importDefault(require("./src/discovery.js"));
const editMember_js_1 = __importDefault(require("./src/editMember.js"));
const emojis_js_1 = __importDefault(require("./src/emojis.js"));
const mod_js_2 = __importDefault(require("./src/guilds/mod.js"));
const integrations_js_1 = __importDefault(require("./src/integrations.js"));
const mod_js_3 = __importDefault(require("./src/interactions/mod.js"));
const invites_js_1 = __importDefault(require("./src/invites.js"));
const mod_js_4 = __importDefault(require("./src/members/mod.js"));
const mod_js_5 = __importDefault(require("./src/messages/mod.js"));
const mod_js_6 = __importDefault(require("./src/misc/mod.js"));
const mod_js_7 = __importDefault(require("./src/roles/mod.js"));
const mod_js_8 = __importDefault(require("./src/webhooks/mod.js"));
// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
function enablePermissionsPlugin(bot) {
    // PERM CHECKS REQUIRE CACHE DUH!
    if (!bot.enabledPlugins?.has("CACHE")) {
        throw new Error("The PERMISSIONS plugin requires the CACHE plugin first.");
    }
    // MARK THIS PLUGIN BEING USED
    bot.enabledPlugins.add("PERMISSIONS");
    // BEGIN OVERRIDING HELPER FUNCTIONS
    (0, mod_js_1.default)(bot);
    (0, discovery_js_1.default)(bot);
    (0, emojis_js_1.default)(bot);
    (0, editMember_js_1.default)(bot);
    (0, mod_js_2.default)(bot);
    (0, integrations_js_1.default)(bot);
    (0, mod_js_3.default)(bot);
    (0, invites_js_1.default)(bot);
    (0, mod_js_4.default)(bot);
    (0, mod_js_5.default)(bot);
    (0, mod_js_6.default)(bot);
    (0, mod_js_7.default)(bot);
    (0, mod_js_8.default)(bot);
    // PLUGINS MUST RETURN THE BOT
    return bot;
}
exports.enablePermissionsPlugin = enablePermissionsPlugin;
// EXPORT ALL UTIL FUNCTIONS
__exportStar(require("./src/permissions.js"), exports);
__exportStar(require("./src/components.js"), exports);
// DEFAULT MAKES IT SLIGHTLY EASIER TO USE
exports.default = enablePermissionsPlugin;
