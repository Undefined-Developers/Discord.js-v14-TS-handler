export function handleIntegrationUpdate(bot, data) {
    bot.events.integrationUpdate(bot, bot.transformers.integration(bot, data.d));
}
