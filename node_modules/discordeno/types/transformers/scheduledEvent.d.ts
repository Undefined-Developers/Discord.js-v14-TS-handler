import { Bot } from "../bot.js";
import { DiscordScheduledEvent } from "../types/discord.js";
export declare function transformScheduledEvent(bot: Bot, payload: DiscordScheduledEvent): {
    description?: string | undefined;
    location?: string | undefined;
    image?: bigint | undefined;
    channelId?: bigint | undefined;
    scheduledEndTime?: number | undefined;
    entityId?: bigint | undefined;
    creator?: {
        avatar?: bigint | undefined;
        locale?: string | undefined;
        flags?: import("../types/shared.js").UserFlags | undefined;
        email?: string | undefined;
        premiumType?: import("../types/shared.js").PremiumTypes | undefined;
        publicFlags?: import("../types/shared.js").UserFlags | undefined;
        id: bigint;
        discriminator: string;
        username: string;
        toggles: import("./mod.js").UserToggles;
    } | undefined;
    id: bigint;
    name: string;
    status: import("../types/shared.js").ScheduledEventStatus;
    guildId: bigint;
    creatorId: bigint;
    scheduledStartTime: number;
    privacyLevel: import("../types/shared.js").ScheduledEventPrivacyLevel;
    entityType: import("../types/shared.js").ScheduledEventEntityType;
    userCount: number;
};
export interface ScheduledEvent extends ReturnType<typeof transformScheduledEvent> {
}
