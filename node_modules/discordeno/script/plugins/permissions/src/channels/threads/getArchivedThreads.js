"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../../permissions.js");
function getArchivedThreads(bot) {
    const getArchivedThreadsOld = bot.helpers.getArchivedThreads;
    bot.helpers.getArchivedThreads = async function (channelId, options) {
        const channel = await bot.channels.get(channelId);
        if (channel) {
            await (0, permissions_js_1.requireBotChannelPermissions)(bot, channel, options?.type === "private" ? ["READ_MESSAGE_HISTORY", "MANAGE_THREADS"] : ["READ_MESSAGE_HISTORY"]);
        }
        return await getArchivedThreadsOld(channelId, options);
    };
}
exports.default = getArchivedThreads;
