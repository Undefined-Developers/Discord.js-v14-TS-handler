"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStageInstanceCreate = void 0;
function handleStageInstanceCreate(bot, data) {
    const payload = data.d;
    bot.events.stageInstanceCreate(bot, {
        id: bot.transformers.snowflake(payload.id),
        guildId: bot.transformers.snowflake(payload.guild_id),
        channelId: bot.transformers.snowflake(payload.channel_id),
        topic: payload.topic,
    });
}
exports.handleStageInstanceCreate = handleStageInstanceCreate;
