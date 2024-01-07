"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpinMessage = exports.pinMessage = void 0;
const permissions_js_1 = require("../permissions.js");
function pinMessage(bot) {
    const pinMessageOld = bot.helpers.pinMessage;
    bot.helpers.pinMessage = async function (channelId, messageId) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, [
            "MANAGE_MESSAGES",
        ]);
        return await pinMessageOld(channelId, messageId);
    };
}
exports.pinMessage = pinMessage;
function unpinMessage(bot) {
    const unpinMessageOld = bot.helpers.unpinMessage;
    bot.helpers.unpinMessage = async function (channelId, messageId) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, [
            "MANAGE_MESSAGES",
        ]);
        return await unpinMessageOld(channelId, messageId);
    };
}
exports.unpinMessage = unpinMessage;
function setupPinMessagePermChecks(bot) {
    pinMessage(bot);
    unpinMessage(bot);
}
exports.default = setupPinMessagePermChecks;
