/** Edits command permissions for a specific command for your application in a guild. */
export async function editApplicationCommandPermissions(bot, guildId, commandId, 
/** Bearer token which has the `applications.commands.permissions.update` scope and also access to this guild.  */
bearerToken, options) {
    const result = await bot.rest.runMethod(bot.rest, "PUT", bot.constants.routes.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId), {
        permissions: options,
    }, {
        headers: { authorization: `Bearer ${bearerToken}` },
    });
    return bot.transformers.applicationCommandPermission(bot, result);
}
