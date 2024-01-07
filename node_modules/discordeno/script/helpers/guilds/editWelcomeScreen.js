"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editWelcomeScreen = void 0;
async function editWelcomeScreen(bot, guildId, options) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_WELCOME_SCREEN(guildId), {
        enabled: options.enabled,
        welcome_screen: options.welcomeScreen?.map((welcomeScreen) => ({
            channel_id: welcomeScreen.channelId,
            description: welcomeScreen.description,
            emoji_id: welcomeScreen.emojiId,
            emoji_name: welcomeScreen.emojiName,
        })),
        description: options.description,
    });
    return bot.transformers.welcomeScreen(bot, result);
}
exports.editWelcomeScreen = editWelcomeScreen;
