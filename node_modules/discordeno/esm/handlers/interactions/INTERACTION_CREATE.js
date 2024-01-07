export async function handleInteractionCreate(bot, data) {
    bot.cache.unrepliedInteractions.add(bot.transformers.snowflake(data.d.id));
    bot.events.interactionCreate(bot, bot.transformers.interaction(bot, data.d));
}
