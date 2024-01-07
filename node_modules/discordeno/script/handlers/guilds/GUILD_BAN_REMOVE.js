"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildBanRemove = void 0;
async function handleGuildBanRemove(bot, data) {
    const payload = data.d;
    await bot.events.guildBanRemove(bot, bot.transformers.user(bot, payload.user), bot.transformers.snowflake(payload.guild_id));
}
exports.handleGuildBanRemove = handleGuildBanRemove;
