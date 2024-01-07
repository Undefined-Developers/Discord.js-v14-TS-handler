import { Bot } from "../bot.js";
import { DiscordEmoji } from "../types/discord.js";
import { EmojiToggles } from "./toggles/emoji.js";
export declare function transformEmoji(bot: Bot, payload: DiscordEmoji): {
    id?: bigint | undefined;
    name?: string | undefined;
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
    roles?: bigint[] | undefined;
    toggles: EmojiToggles;
};
export interface Emoji extends ReturnType<typeof transformEmoji> {
}
