/** Edit a guild role. Requires the MANAGE_ROLES permission. */
export async function editRole(bot, guildId, id, options) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_ROLE(guildId, id), {
        name: options.name,
        color: options.color,
        hoist: options.hoist,
        mentionable: options.mentionable,
        permissions: bot.utils.calculateBits(options?.permissions || []),
        icon: options.icon,
        unicode_emoji: options.unicodeEmoji,
    });
    return bot.transformers.role(bot, { role: result, guildId });
}
