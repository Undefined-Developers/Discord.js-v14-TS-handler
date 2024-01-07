"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStageInstanceUpdate = void 0;
function handleStageInstanceUpdate(bot, data) {
    const payload = data.d;
    bot.events.stageInstanceUpdate(bot, {
        id: bot.transformers.snowflake(payload.id),
        guildId: bot.transformers.snowflake(payload.guild_id),
        channelId: bot.transformers.snowflake(payload.channel_id),
        topic: payload.topic,
    });
}
exports.handleStageInstanceUpdate = handleStageInstanceUpdate;
