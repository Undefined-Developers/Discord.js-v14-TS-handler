"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildMemberAdd = void 0;
async function handleGuildMemberAdd(bot, data) {
    const payload = data.d;
    const guildId = bot.transformers.snowflake(payload.guild_id);
    const user = bot.transformers.user(bot, payload.user);
    const member = bot.transformers.member(bot, payload, guildId, user.id);
    bot.events.guildMemberAdd(bot, member, user);
}
exports.handleGuildMemberAdd = handleGuildMemberAdd;
