"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function followChannel(bot) {
    const followChannelOld = bot.helpers.followChannel;
    bot.helpers.followChannel = async function (sourceChannelId, targetChannelId) {
        const channel = bot.channels.get(targetChannelId);
        if (channel?.guildId) {
            (0, permissions_js_1.requireBotChannelPermissions)(bot, channel, ["MANAGE_WEBHOOKS"]);
        }
        return await followChannelOld(sourceChannelId, targetChannelId);
    };
}
exports.default = followChannel;
