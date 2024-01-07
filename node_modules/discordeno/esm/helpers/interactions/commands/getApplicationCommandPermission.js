/** Fetches command permissions for a specific command for your application in a guild. Returns a GuildApplicationCommandPermissions object. */
export async function getApplicationCommandPermission(bot, guildId, commandId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId));
    return bot.transformers.applicationCommandPermission(bot, result);
}
