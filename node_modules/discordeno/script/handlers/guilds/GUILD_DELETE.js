"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildDelete = void 0;
async function handleGuildDelete(bot, data, shardId) {
    const payload = data.d;
    bot.events.guildDelete(bot, bot.transformers.snowflake(payload.id), shardId);
}
exports.handleGuildDelete = handleGuildDelete;
