import { Bot } from "../bot.js";
import { DiscordAttachment } from "../types/discord.js";
export declare function transformAttachment(bot: Bot, payload: DiscordAttachment): {
    height?: number | undefined;
    width?: number | undefined;
    contentType?: string | undefined;
    ephemeral?: boolean | undefined;
    filename: string;
    id: bigint;
    url: string;
    size: number;
    proxyUrl: string;
};
export interface Attachment extends ReturnType<typeof transformAttachment> {
}
