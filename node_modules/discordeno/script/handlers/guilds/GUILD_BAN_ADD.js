"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildBanAdd = void 0;
async function handleGuildBanAdd(bot, data) {
    const payload = data.d;
    bot.events.guildBanAdd(bot, bot.transformers.user(bot, payload.user), bot.transformers.snowflake(payload.guild_id));
}
exports.handleGuildBanAdd = handleGuildBanAdd;
