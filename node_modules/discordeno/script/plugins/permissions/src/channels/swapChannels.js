"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function swapChannels(bot) {
    const swapChannelsOld = bot.helpers.swapChannels;
    bot.helpers.swapChannels = async function (guildId, channelPositions) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_CHANNELS"]);
        return await swapChannelsOld(guildId, channelPositions);
    };
}
exports.default = swapChannels;
