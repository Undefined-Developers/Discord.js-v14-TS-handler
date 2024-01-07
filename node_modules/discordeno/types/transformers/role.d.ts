import { Bot } from "../bot.js";
import { DiscordRole } from "../types/discord.js";
import { RoleToggles } from "./toggles/role.js";
export declare function transformRole(bot: Bot, payload: {
    role: DiscordRole;
} & {
    guildId: bigint;
}): {
    icon?: bigint | undefined;
    botId?: bigint | undefined;
    integrationId?: bigint | undefined;
    unicodeEmoji?: string | undefined;
    id: bigint;
    name: string;
    color: number;
    position: number;
    guildId: bigint;
    permissions: bigint;
    toggles: RoleToggles;
};
export interface Role extends ReturnType<typeof transformRole> {
}
