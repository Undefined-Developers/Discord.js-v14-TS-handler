import type { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleChannelCreate(bot: Bot, payload: DiscordGatewayPayload): Promise<void>;
