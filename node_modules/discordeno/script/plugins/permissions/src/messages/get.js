"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.getMessage = void 0;
const permissions_js_1 = require("../permissions.js");
function getMessage(bot) {
    const getMessageOld = bot.helpers.getMessage;
    bot.helpers.getMessage = async function (channelId, messageId) {
        const channel = bot.channels.get(channelId);
        if (channel?.guildId) {
            (0, permissions_js_1.requireBotChannelPermissions)(bot, channel, [
                "READ_MESSAGE_HISTORY",
            ]);
        }
        return await getMessageOld(channelId, messageId);
    };
}
exports.getMessage = getMessage;
function getMessages(bot) {
    const getMessagesOld = bot.helpers.getMessages;
    bot.helpers.getMessages = async function (channelId, options) {
        const channel = bot.channels.get(channelId);
        if (channel?.guildId) {
            (0, permissions_js_1.requireBotChannelPermissions)(bot, channel, [
                "READ_MESSAGE_HISTORY",
                "VIEW_CHANNEL",
            ]);
        }
        return await getMessagesOld(channelId, options);
    };
}
exports.getMessages = getMessages;
function setupGetMessagePermChecks(bot) {
    getMessage(bot);
    getMessages(bot);
}
exports.default = setupGetMessagePermChecks;
