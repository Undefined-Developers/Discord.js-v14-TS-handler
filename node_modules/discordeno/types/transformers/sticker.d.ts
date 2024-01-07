import { Bot } from "../bot.js";
import { DiscordSticker, DiscordStickerPack } from "../types/discord.js";
export declare function transformSticker(bot: Bot, payload: DiscordSticker): {
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
    guildId?: bigint | undefined;
    available?: boolean | undefined;
    packId?: bigint | undefined;
    sortValue?: number | undefined;
    description: string;
    type: import("../types/shared.js").StickerTypes;
    id: bigint;
    name: string;
    tags: string;
    formatType: import("../types/shared.js").StickerFormatTypes;
};
export declare function transformStickerPack(bot: Bot, payload: DiscordStickerPack): {
    coverStickerId?: bigint | undefined;
    bannerAssetId?: bigint | undefined;
    description: string;
    id: bigint;
    name: string;
    stickers: Sticker[];
    skuId: bigint;
};
export interface Sticker extends ReturnType<typeof transformSticker> {
}
export interface StickerPack extends ReturnType<typeof transformStickerPack> {
}
