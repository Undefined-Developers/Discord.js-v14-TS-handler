import type { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleGuildDelete(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void>;
