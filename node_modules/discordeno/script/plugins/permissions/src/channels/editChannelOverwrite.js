"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function editChannelOverwrite(bot) {
    const editChannelOverwriteOld = bot.helpers.editChannelOverwrite;
    bot.helpers.editChannelOverwrite = async function (channelId, overwrite) {
        const channel = bot.channels.get(channelId);
        if (channel?.guildId) {
            (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, ["MANAGE_ROLES"]);
        }
        return await editChannelOverwriteOld(channelId, overwrite);
    };
}
exports.default = editChannelOverwrite;
