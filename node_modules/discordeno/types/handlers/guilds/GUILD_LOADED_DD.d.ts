import type { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleGuildLoaded(bot: Bot, data: DiscordGatewayPayload, shardId: number): void;
