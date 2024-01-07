import { VoiceStateToggles } from "./toggles/voice.js";
export function transformVoiceState(bot, payload) {
    const voiceState = {
        toggles: new VoiceStateToggles(payload.voiceState),
        requestToSpeakTimestamp: payload.voiceState.request_to_speak_timestamp
            ? Date.parse(payload.voiceState.request_to_speak_timestamp)
            : undefined,
        sessionId: payload.voiceState.session_id,
        channelId: payload.voiceState.channel_id ? bot.transformers.snowflake(payload.voiceState.channel_id) : undefined,
        guildId: payload.guildId ||
            (payload.voiceState.guild_id ? bot.transformers.snowflake(payload.voiceState.guild_id) : 0n),
        userId: payload.voiceState.user_id ? bot.transformers.snowflake(payload.voiceState.user_id) : 0n,
    };
    return voiceState;
}
