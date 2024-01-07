"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStageInstanceDelete = void 0;
function handleStageInstanceDelete(bot, data) {
    const payload = data.d;
    bot.events.stageInstanceDelete(bot, {
        id: bot.transformers.snowflake(payload.id),
        guildId: bot.transformers.snowflake(payload.guild_id),
        channelId: bot.transformers.snowflake(payload.channel_id),
        topic: payload.topic,
    });
}
exports.handleStageInstanceDelete = handleStageInstanceDelete;
