/** Fetches the global command for the given Id. If a guildId is provided, the guild command will be fetched. */
export async function getApplicationCommand(bot, commandId, options) {
    const result = await bot.rest.runMethod(bot.rest, "GET", options?.guildId
        ? bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, options.guildId, commandId, options?.withLocalizations)
        : bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId, options?.withLocalizations));
    return bot.transformers.applicationCommand(bot, result);
}
