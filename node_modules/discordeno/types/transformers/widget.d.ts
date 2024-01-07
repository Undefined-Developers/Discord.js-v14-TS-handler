import { Bot } from "../bot.js";
import { DiscordGuildWidget } from "../types/discord.js";
export declare function transformWidget(bot: Bot, payload: DiscordGuildWidget): {
    id: bigint;
    name: string;
    members: {
        id: bigint;
        username: string;
        discriminator: string;
        avatar: bigint | undefined;
        status: string;
        avatarUrl: string;
    }[];
    channels: {
        id: bigint;
        name: string;
        position: number;
    }[];
    instant_invite: string;
    presenceCount: number;
};
export interface GuildWidget extends ReturnType<typeof transformWidget> {
}
