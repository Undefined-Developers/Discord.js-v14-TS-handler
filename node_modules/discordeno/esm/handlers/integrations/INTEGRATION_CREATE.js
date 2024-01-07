export function handleIntegrationCreate(bot, data) {
    bot.events.integrationCreate(bot, bot.transformers.integration(bot, data.d));
}
