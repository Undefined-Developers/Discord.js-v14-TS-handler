/** Returns a guild widget settings object. Requires the MANAGE_GUILD permission. */
export async function getWidgetSettings(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_WIDGET(guildId));
    return bot.transformers.widgetSettings(bot, result);
}
