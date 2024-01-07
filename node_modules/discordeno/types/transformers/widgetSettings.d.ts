import { Bot } from "../bot.js";
import { DiscordGuildWidgetSettings } from "../types/discord.js";
export declare function transformWidgetSettings(bot: Bot, payload: DiscordGuildWidgetSettings): {
    channelId?: string | undefined;
    enabled: boolean;
};
export interface GuildWidgetSettings extends ReturnType<typeof transformWidgetSettings> {
}
