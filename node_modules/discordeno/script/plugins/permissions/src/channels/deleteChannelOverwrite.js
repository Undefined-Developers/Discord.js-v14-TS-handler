"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function deleteChannelOverwrite(bot) {
    const deleteChannelOverwriteOld = bot.helpers.deleteChannelOverwrite;
    bot.helpers.deleteChannelOverwrite = async function (channelId, overwriteId) {
        const channel = bot.channels.get(channelId);
        if (channel?.guildId) {
            (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, ["MANAGE_ROLES"]);
        }
        return await deleteChannelOverwriteOld(channelId, overwriteId);
    };
}
exports.default = deleteChannelOverwrite;
