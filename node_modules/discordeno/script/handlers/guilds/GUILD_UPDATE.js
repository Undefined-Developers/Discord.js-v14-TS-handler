"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildUpdate = void 0;
function handleGuildUpdate(bot, data, shardId) {
    const payload = data.d;
    bot.events.guildUpdate(bot, bot.transformers.guild(bot, { guild: payload, shardId }));
}
exports.handleGuildUpdate = handleGuildUpdate;
