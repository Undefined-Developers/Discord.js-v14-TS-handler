import { Bot } from "../bot.js";
import { DiscordAutoModerationActionExecution } from "../types/discord.js";
export declare function transformAutoModerationActionExecution(bot: Bot, payload: DiscordAutoModerationActionExecution): {
    channelId?: bigint | undefined;
    messageId?: bigint | undefined;
    alertSystemMessageId?: bigint | undefined;
    content: string;
    action: {
        type: import("../types/discord.js").AutoModerationActionType;
        metadata: {
            channelId?: bigint | undefined;
            durationSeconds?: number | undefined;
        };
    };
    guildId: bigint;
    userId: bigint;
    ruleTriggerType: import("../types/discord.js").AutoModerationTriggerTypes;
    ruleId: bigint;
    matchedKeyword: string;
    matchedContent: string;
};
export interface AutoModerationActionExecution extends ReturnType<typeof transformAutoModerationActionExecution> {
}
