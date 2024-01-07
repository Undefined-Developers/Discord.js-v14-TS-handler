import { Bot } from "../bot.js";
import { DiscordVoiceRegion } from "../types/discord.js";
export declare function transformVoiceRegion(bot: Bot, payload: DiscordVoiceRegion): {
    id: string;
    custom: boolean;
    name: string;
    optimal: boolean;
    deprecated: boolean;
};
export interface VoiceRegions extends ReturnType<typeof transformVoiceRegion> {
}
