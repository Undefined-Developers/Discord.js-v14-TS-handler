"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscovery = void 0;
/** Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission. */
async function getDiscovery(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.DISCOVERY_METADATA(guildId));
    return {
        guildId,
        primaryCategoryId: result.primary_category_id,
        keywords: result.keywords ?? undefined,
        emojiDiscoverabilityEnabled: result.emoji_discoverability_enabled,
        partnerActionedTimestamp: result.partner_actioned_timestamp
            ? Date.parse(result.partner_actioned_timestamp)
            : undefined,
        partnerApplicationTimestamp: result.partner_application_timestamp
            ? Date.parse(result.partner_application_timestamp)
            : undefined,
        categoryIds: result.category_ids,
    };
}
exports.getDiscovery = getDiscovery;
