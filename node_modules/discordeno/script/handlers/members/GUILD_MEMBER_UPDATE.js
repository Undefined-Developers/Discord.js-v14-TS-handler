"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildMemberUpdate = void 0;
async function handleGuildMemberUpdate(bot, data) {
    const payload = data.d;
    const user = bot.transformers.user(bot, payload.user);
    bot.events.guildMemberUpdate(bot, bot.transformers.member(bot, payload, bot.transformers.snowflake(payload.guild_id), user.id), user);
}
exports.handleGuildMemberUpdate = handleGuildMemberUpdate;
