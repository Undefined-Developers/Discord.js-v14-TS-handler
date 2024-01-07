/** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
export async function editDiscovery(bot, guildId, data) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.DISCOVERY_METADATA(guildId), {
        primary_category_id: data.primaryCategoryId,
        keywords: data.keywords,
        emoji_discoverability_enabled: data.emojiDiscoverabilityEnabled,
    });
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
