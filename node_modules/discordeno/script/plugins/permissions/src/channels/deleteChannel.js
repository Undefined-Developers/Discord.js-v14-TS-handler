"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deps_js_1 = require("../../deps.js");
const permissions_js_1 = require("../permissions.js");
function deleteChannel(bot) {
    const deleteChannelOld = bot.helpers.deleteChannel;
    bot.helpers.deleteChannel = async function (channelId, reason) {
        const channel = bot.channels.get(channelId);
        if (channel?.guildId) {
            const guild = bot.guilds.get(channel.guildId);
            if (!guild)
                throw new Error("GUILD_NOT_FOUND");
            if (guild.rulesChannelId === channelId) {
                throw new Error("RULES_CHANNEL_CANNOT_BE_DELETED");
            }
            if (guild.publicUpdatesChannelId === channelId) {
                throw new Error("UPDATES_CHANNEL_CANNOT_BE_DELETED");
            }
            const isThread = [
                deps_js_1.ChannelTypes.GuildNewsThread,
                deps_js_1.ChannelTypes.GuildPublicThread,
                deps_js_1.ChannelTypes.GuildPrivateThread,
            ].includes(channel.type);
            (0, permissions_js_1.requireBotGuildPermissions)(bot, guild, isThread ? ["MANAGE_THREADS"] : ["MANAGE_CHANNELS"]);
        }
        return await deleteChannelOld(channelId, reason);
    };
}
exports.default = deleteChannel;
