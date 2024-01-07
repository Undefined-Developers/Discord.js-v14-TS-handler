import { Bot } from "../bot.js";
import { DiscordStageInstance } from "../types/discord.js";
export declare function transformStageInstance(bot: Bot, payload: DiscordStageInstance): {
    guildScheduledEventId?: bigint | undefined;
    id: bigint;
    guildId: bigint;
    topic: string;
    channelId: bigint;
};
export interface StageInstance extends ReturnType<typeof transformStageInstance> {
}
