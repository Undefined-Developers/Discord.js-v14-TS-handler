import type { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleGuildBanAdd(bot: Bot, data: DiscordGatewayPayload): Promise<void>;
