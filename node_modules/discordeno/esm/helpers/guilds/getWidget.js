/** Returns the widget for the guild. */
export async function getWidget(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_WIDGET_JSON(guildId));
    return bot.transformers.widget(bot, result);
}
