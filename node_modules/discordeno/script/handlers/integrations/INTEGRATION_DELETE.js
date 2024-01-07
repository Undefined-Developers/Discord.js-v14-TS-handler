"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIntegrationDelete = void 0;
function handleIntegrationDelete(bot, data) {
    const payload = data.d;
    bot.events.integrationDelete(bot, {
        id: bot.transformers.snowflake(payload.id),
        guildId: bot.transformers.snowflake(payload.guild_id),
        applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
    });
}
exports.handleIntegrationDelete = handleIntegrationDelete;
