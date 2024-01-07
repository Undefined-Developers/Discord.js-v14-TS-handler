"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function getChannelWebhooks(bot) {
    const getChannelWebhooksOld = bot.helpers.getChannelWebhooks;
    bot.helpers.getChannelWebhooks = async function (channelId) {
        const channel = bot.channels.get(channelId);
        if (channel?.guildId) {
            (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, ["MANAGE_WEBHOOKS"]);
        }
        return await getChannelWebhooksOld(channelId);
    };
}
exports.default = getChannelWebhooks;
