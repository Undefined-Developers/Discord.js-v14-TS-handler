import type { Emoji } from "./emoji.js";
import { Bot } from "../bot.js";
import { Collection } from "../util/collection.js";
import { DiscordGuild } from "../types/discord.js";
import { GuildToggles } from "./toggles/guild.js";
export declare function transformGuild(bot: Bot, payload: {
    guild: DiscordGuild;
} & {
    shardId: number;
}): {
    description?: string | null | undefined;
    banner?: bigint | undefined;
    icon?: bigint | undefined;
    splash?: bigint | undefined;
    applicationId?: bigint | undefined;
    approximateMemberCount?: number | undefined;
    approximatePresenceCount?: number | undefined;
    maxMembers?: number | undefined;
    maxPresences?: number | undefined;
    maxVideoChannelUsers?: number | undefined;
    premiumSubscriptionCount?: number | undefined;
    stageInstances?: {
        id: bigint;
        guildId: bigint;
        topic: string;
        channelId: bigint;
    }[] | undefined;
    vanityUrlCode?: string | null | undefined;
    welcomeScreen?: {
        description?: string | undefined;
        welcomeChannels: {
            channelId: bigint;
            description: string;
            emojiId: bigint | undefined;
            emojiName: string | undefined;
        }[];
    } | undefined;
    discoverySplash?: bigint | undefined;
    joinedAt?: number | undefined;
    afkChannelId?: bigint | undefined;
    widgetChannelId?: bigint | undefined;
    systemChannelId?: bigint | undefined;
    rulesChannelId?: bigint | undefined;
    publicUpdatesChannelId?: bigint | undefined;
    id: bigint;
    name: string;
    permissions: bigint;
    roles: Collection<bigint, import("./role.js").Role>;
    emojis: Collection<bigint, Emoji>;
    channels: Collection<bigint, import("./channel.js").Channel>;
    premiumProgressBarEnabled: boolean;
    toggles: GuildToggles;
    ownerId: bigint;
    memberCount: number;
    afkTimeout: number;
    defaultMessageNotifications: import("../types/shared.js").DefaultMessageNotificationLevels;
    explicitContentFilter: import("../types/shared.js").ExplicitContentFilterLevels;
    mfaLevel: import("../types/shared.js").MfaLevels;
    nsfwLevel: import("../types/shared.js").GuildNsfwLevel;
    preferredLocale: string;
    premiumTier: import("../types/shared.js").PremiumTiers;
    systemChannelFlags: import("../types/shared.js").SystemChannelFlags;
    verificationLevel: import("../types/shared.js").VerificationLevels;
    shardId: number;
    voiceStates: Collection<bigint, import("./voiceState.js").VoiceState>;
};
export interface Guild extends ReturnType<typeof transformGuild> {
}
