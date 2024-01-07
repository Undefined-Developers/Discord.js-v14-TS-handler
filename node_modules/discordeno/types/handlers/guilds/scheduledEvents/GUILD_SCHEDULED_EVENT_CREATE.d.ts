import type { Bot } from "../../../bot.js";
import { DiscordGatewayPayload } from "../../../types/discord.js";
export declare function handleGuildScheduledEventCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number): void;
