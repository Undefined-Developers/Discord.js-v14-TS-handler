"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildPreview = void 0;
/** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
async function getGuildPreview(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_PREVIEW(guildId));
    return {
        id: bot.transformers.snowflake(result.id),
        name: result.name,
        icon: result.icon ?? undefined,
        splash: result.splash ?? undefined,
        discoverySplash: result.discovery_splash ?? undefined,
        emojis: result.emojis.map((emoji) => bot.transformers.emoji(bot, emoji)),
        features: result.features,
        approximateMemberCount: result.approximate_member_count,
        approximatePresenceCount: result.approximate_presence_count,
        description: result.description ?? undefined,
        stickers: result.stickers.map((sticker) => bot.transformers.sticker(bot, sticker)),
    };
}
exports.getGuildPreview = getGuildPreview;
