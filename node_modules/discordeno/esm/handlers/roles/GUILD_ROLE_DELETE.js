export async function handleGuildRoleDelete(bot, data) {
    const payload = data.d;
    bot.events.roleDelete(bot, {
        roleId: bot.transformers.snowflake(payload.role_id),
        guildId: bot.transformers.snowflake(payload.guild_id),
    });
}
