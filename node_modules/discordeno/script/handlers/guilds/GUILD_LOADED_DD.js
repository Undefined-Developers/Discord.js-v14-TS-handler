"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildLoaded = void 0;
function handleGuildLoaded(bot, data, shardId) {
    const payload = data.d;
    const guild = bot.transformers.guild(bot, { guild: payload, shardId });
    bot.events.guildLoaded(bot, guild);
}
exports.handleGuildLoaded = handleGuildLoaded;
