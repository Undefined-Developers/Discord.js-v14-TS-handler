"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildIntegrationsUpdate = void 0;
async function handleGuildIntegrationsUpdate(bot, data) {
    const payload = data.d;
    bot.events.integrationUpdate(bot, { guildId: bot.transformers.snowflake(payload.guild_id) });
}
exports.handleGuildIntegrationsUpdate = handleGuildIntegrationsUpdate;
