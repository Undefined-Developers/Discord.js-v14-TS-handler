"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildScheduledEventUserRemove = void 0;
function handleGuildScheduledEventUserRemove(bot, data) {
    const payload = data.d;
    return bot.events.scheduledEventUserRemove(bot, {
        guildScheduledEventId: bot.transformers.snowflake(payload.guild_scheduled_event_id),
        userId: bot.transformers.snowflake(payload.user_id),
        guildId: bot.transformers.snowflake(payload.guild_id),
    });
}
exports.handleGuildScheduledEventUserRemove = handleGuildScheduledEventUserRemove;
