import type { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleGuildUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number): void;
