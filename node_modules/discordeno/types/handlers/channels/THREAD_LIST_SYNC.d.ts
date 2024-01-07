import { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleThreadListSync(bot: Bot, data: DiscordGatewayPayload): Promise<{
    guildId: bigint;
    channelIds: bigint[] | undefined;
    threads: import("../../mod.js").Channel[];
    members: {
        id: bigint | undefined;
        userId: bigint | undefined;
        joinTimestamp: number;
    }[];
}>;
