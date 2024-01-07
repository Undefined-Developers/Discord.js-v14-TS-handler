"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVoiceServerUpdate = void 0;
async function handleVoiceServerUpdate(bot, data) {
    const payload = data.d;
    bot.events.voiceServerUpdate(bot, {
        token: payload.token,
        guildId: bot.transformers.snowflake(payload.guild_id),
        endpoint: payload.endpoint ?? undefined,
    });
}
exports.handleVoiceServerUpdate = handleVoiceServerUpdate;
