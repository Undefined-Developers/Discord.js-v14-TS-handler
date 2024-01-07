"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildRoleDelete = void 0;
async function handleGuildRoleDelete(bot, data) {
    const payload = data.d;
    bot.events.roleDelete(bot, {
        roleId: bot.transformers.snowflake(payload.role_id),
        guildId: bot.transformers.snowflake(payload.guild_id),
    });
}
exports.handleGuildRoleDelete = handleGuildRoleDelete;
