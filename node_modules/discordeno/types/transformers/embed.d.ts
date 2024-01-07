import { Bot } from "../bot.js";
import { DiscordEmbed } from "../types/discord.js";
export declare function transformEmbed(bot: Bot, payload: DiscordEmbed): {
    description?: string | undefined;
    type?: import("../types/shared.js").EmbedTypes | undefined;
    url?: string | undefined;
    color?: number | undefined;
    footer?: {
        iconUrl?: string | undefined;
        proxyIconUrl?: string | undefined;
        text: string;
    } | undefined;
    title?: string | undefined;
    video?: {
        height?: number | undefined;
        width?: number | undefined;
        url?: string | undefined;
        proxyUrl?: string | undefined;
    } | undefined;
    image?: {
        height?: number | undefined;
        width?: number | undefined;
        proxyUrl?: string | undefined;
        url: string;
    } | undefined;
    timestamp?: number | undefined;
    thumbnail?: {
        height?: number | undefined;
        width?: number | undefined;
        proxyUrl?: string | undefined;
        url: string;
    } | undefined;
    provider?: {
        url?: string | undefined;
        name?: string | undefined;
    } | undefined;
    author?: {
        url?: string | undefined;
        iconUrl?: string | undefined;
        proxyIconUrl?: string | undefined;
        name: string;
    } | undefined;
    fields?: {
        inline?: boolean | undefined;
        name: string;
        value: string;
    }[] | undefined;
};
export interface Embed extends ReturnType<typeof transformEmbed> {
}
