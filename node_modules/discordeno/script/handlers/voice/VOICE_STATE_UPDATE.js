"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVoiceStateUpdate = void 0;
async function handleVoiceStateUpdate(bot, data) {
    const payload = data.d;
    if (!payload.guild_id)
        return;
    const guildId = bot.transformers.snowflake(payload.guild_id);
    bot.events.voiceStateUpdate(bot, bot.transformers.voiceState(bot, { voiceState: payload, guildId }));
}
exports.handleVoiceStateUpdate = handleVoiceStateUpdate;
