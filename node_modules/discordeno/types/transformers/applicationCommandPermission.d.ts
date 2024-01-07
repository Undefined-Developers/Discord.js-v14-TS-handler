import { Bot } from "../bot.js";
import { DiscordGuildApplicationCommandPermissions } from "../types/discord.js";
export declare function transformApplicationCommandPermission(bot: Bot, payload: DiscordGuildApplicationCommandPermissions): {
    id: bigint;
    guildId: bigint;
    permissions: {
        id: bigint;
        type: import("../types/shared.js").ApplicationCommandPermissionTypes;
        permission: boolean;
    }[];
    applicationId: bigint;
};
export interface ApplicationCommandPermission extends ReturnType<typeof transformApplicationCommandPermission> {
}
