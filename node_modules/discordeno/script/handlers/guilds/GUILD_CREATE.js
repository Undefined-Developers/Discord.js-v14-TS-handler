"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildCreate = void 0;
function handleGuildCreate(bot, data, shardId) {
    const payload = data.d;
    bot.events.guildCreate(bot, bot.transformers.guild(bot, { guild: payload, shardId }));
}
exports.handleGuildCreate = handleGuildCreate;
