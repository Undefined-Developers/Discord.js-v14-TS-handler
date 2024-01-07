"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildRoleCreate = void 0;
async function handleGuildRoleCreate(bot, data) {
    const payload = data.d;
    bot.events.roleCreate(bot, bot.transformers.role(bot, { role: payload.role, guildId: bot.transformers.snowflake(payload.guild_id) }));
}
exports.handleGuildRoleCreate = handleGuildRoleCreate;
