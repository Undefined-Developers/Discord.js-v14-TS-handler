"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhooksUpdate = void 0;
function handleWebhooksUpdate(bot, data) {
    const payload = data.d;
    bot.events.webhooksUpdate(bot, {
        channelId: bot.transformers.snowflake(payload.channel_id),
        guildId: bot.transformers.snowflake(payload.guild_id),
    });
}
exports.handleWebhooksUpdate = handleWebhooksUpdate;
