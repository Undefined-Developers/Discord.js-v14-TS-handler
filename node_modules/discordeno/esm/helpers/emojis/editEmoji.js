/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export async function editEmoji(bot, guildId, id, options) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_EMOJI(guildId, id), {
        name: options.name,
        // NEED TERNARY TO SUPPORT NULL AS VALID
        roles: options.roles ? options.roles.map((role) => role.toString()) : options.roles,
    });
    return bot.transformers.emoji(bot, result);
}
