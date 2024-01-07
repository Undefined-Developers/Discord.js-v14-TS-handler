"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableCacheSweepers = void 0;
const dispatchRequirements_js_1 = require("./dispatchRequirements.js");
/** Enables sweepers for your bot but will require, enabling cache first. */
function enableCacheSweepers(bot) {
    bot.guilds.startSweeper({
        filter: function (guild, _, bot) {
            // Reset activity for next interval
            if (bot.activeGuildIds.delete(guild.id))
                return false;
            // This is inactive guild. Not a single thing has happened for at least 30 minutes.
            // Not a reaction, not a message, not any event!
            bot.dispatchedGuildIds.add(guild.id);
            return true;
        },
        interval: 3660000,
        bot,
    });
    bot.channels.startSweeper({
        filter: function channelSweeper(channel, key, bot) {
            // If this is in a guild and the guild was dispatched, then we can dispatch the channel
            if (channel.guildId && bot.dispatchedGuildIds.has(channel.guildId)) {
                bot.dispatchedChannelIds.add(channel.id);
                return true;
            }
            // THE KEY DM CHANNELS ARE STORED BY IS THE USER ID. If the user is not cached, we dont need to cache their dm channel.
            if (!channel.guildId && !bot.members.has(key))
                return true;
            return false;
        },
        interval: 3660000,
        bot,
    });
    const setMember = bot.members.set.bind(bot.members);
    bot.members.set = function (id, member) {
        return setMember(id, {
            ...member,
            cachedAt: Date.now(),
        });
    };
    bot.members.startSweeper({
        filter: function memberSweeper(member, _, bot) {
            // Don't sweep the bot else strange things will happen
            if (member.id === bot.id)
                return false;
            // Only sweep members who were not active the last 30 minutes
            return Date.now() - member.cachedAt > 1800000;
        },
        interval: 300000,
        bot,
    });
    bot.messages.startSweeper({
        filter: function messageSweeper(message) {
            // DM messages aren't needed
            if (!message.guildId)
                return true;
            // Only delete messages older than 10 minutes
            return Date.now() - message.timestamp > 600000;
        },
        interval: 300000,
        bot,
    });
    bot.presences.startSweeper({ filter: () => true, interval: 300000, bot });
    // DISPATCH REQUIREMENTS
    const handleDiscordPayloadOld = bot.gateway.manager.createShardOptions.events.message;
    bot.gateway.manager.createShardOptions.events.message = async function (shard, data) {
        // RUN DISPATCH CHECK
        await (0, dispatchRequirements_js_1.dispatchRequirements)(bot, data, shard);
        // RUN OLD HANDLER
        handleDiscordPayloadOld(shard, data);
    };
}
exports.enableCacheSweepers = enableCacheSweepers;
