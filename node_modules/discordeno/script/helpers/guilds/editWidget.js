"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editWidget = void 0;
/** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
async function editWidget(bot, guildId, enabled, channelId) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_WIDGET(guildId), {
        enabled,
        channel_id: channelId,
    });
    return bot.transformers.widgetSettings(bot, result);
}
exports.editWidget = editWidget;
