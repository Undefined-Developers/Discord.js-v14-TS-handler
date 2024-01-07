import { Bot } from "../bot.js";
import { DiscordIntegrationCreateUpdate } from "../types/discord.js";
export declare function transformIntegration(bot: Bot, payload: DiscordIntegrationCreateUpdate): {
    application?: {
        bot?: {
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
        icon?: bigint | undefined;
        description: string;
        id: bigint;
        name: string;
    } | undefined;
    user?: {
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
    enabled?: boolean | undefined;
    syncing?: boolean | undefined;
    roleId?: bigint | undefined;
    enableEmoticons?: boolean | undefined;
    expireBehavior?: import("../types/shared.js").IntegrationExpireBehaviors | undefined;
    expireGracePeriod?: number | undefined;
    syncedAt?: number | undefined;
    subscriberCount?: number | undefined;
    revoked?: boolean | undefined;
    type: "twitch" | "youtube" | "discord";
    id: bigint;
    name: string;
    guildId: bigint;
    account: {
        id: bigint;
        name: string;
    };
};
export interface Integration extends ReturnType<typeof transformIntegration> {
}
