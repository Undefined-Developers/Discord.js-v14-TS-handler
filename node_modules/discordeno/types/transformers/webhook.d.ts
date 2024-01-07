import { Bot } from "../bot.js";
import { DiscordWebhook } from "../types/discord.js";
export declare function transformWebhook(bot: Bot, payload: DiscordWebhook): {
    url?: string | undefined;
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
    avatar?: bigint | undefined;
    guildId?: bigint | undefined;
    applicationId?: bigint | undefined;
    channelId?: bigint | undefined;
    token?: string | undefined;
    sourceGuild?: {
        icon?: bigint | undefined;
        id: bigint;
        name: string;
    } | undefined;
    sourceChannel?: {
        id: bigint;
        name: string;
    } | undefined;
    type: import("../types/shared.js").WebhookTypes;
    id: bigint;
    name: string;
};
export interface Webhook extends ReturnType<typeof transformWebhook> {
}
