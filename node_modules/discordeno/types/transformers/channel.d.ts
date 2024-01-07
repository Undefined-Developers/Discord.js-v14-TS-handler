import { Bot } from "../bot.js";
import { DiscordChannel } from "../types/discord.js";
export declare function packOverwrites(allow: string, deny: string, id: string, type: number): bigint;
export declare function separateOverwrites(v: bigint): [number, bigint, bigint, bigint];
export declare function transformChannel(bot: Bot, payload: {
    channel: DiscordChannel;
} & {
    guildId?: bigint;
}): {
    name?: string | undefined;
    position?: number | undefined;
    flags?: import("../types/shared.js").ChannelFlags | undefined;
    topic?: string | undefined;
    bitrate?: number | undefined;
    nsfw?: boolean | undefined;
    permissions?: bigint | undefined;
    archived?: boolean | undefined;
    locked?: boolean | undefined;
    invitable?: boolean | undefined;
    applicationId?: bigint | undefined;
    userLimit?: number | undefined;
    rateLimitPerUser?: number | undefined;
    rtcRegion?: string | undefined;
    videoQualityMode?: import("../types/shared.js").VideoQualityModes | undefined;
    lastPinTimestamp?: number | undefined;
    lastMessageId?: bigint | undefined;
    ownerId?: bigint | undefined;
    parentId?: bigint | undefined;
    memberCount?: number | undefined;
    messageCount?: number | undefined;
    archiveTimestamp?: number | undefined;
    autoArchiveDuration?: 60 | 1440 | 4320 | 10080 | undefined;
    createTimestamp?: number | undefined;
    newlyCreated?: boolean | undefined;
    type: import("../types/shared.js").ChannelTypes;
    id: bigint;
    guildId: bigint;
    permissionOverwrites: bigint[];
    botIsMember: boolean;
};
export interface Channel extends ReturnType<typeof transformChannel> {
}
