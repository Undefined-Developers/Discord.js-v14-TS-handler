import { Bot } from "../bot.js";
import { DiscordVoiceState } from "../types/discord.js";
import { VoiceStateToggles } from "./toggles/voice.js";
export declare function transformVoiceState(bot: Bot, payload: {
    voiceState: DiscordVoiceState;
} & {
    guildId: bigint;
}): {
    channelId?: bigint | undefined;
    requestToSpeakTimestamp?: number | undefined;
    guildId: bigint;
    toggles: VoiceStateToggles;
    userId: bigint;
    sessionId: string;
};
export interface VoiceState extends ReturnType<typeof transformVoiceState> {
}
