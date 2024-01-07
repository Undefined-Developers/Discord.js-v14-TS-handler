"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWidget = void 0;
/** Returns the widget for the guild. */
async function getWidget(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_WIDGET_JSON(guildId));
    return bot.transformers.widget(bot, result);
}
exports.getWidget = getWidget;
