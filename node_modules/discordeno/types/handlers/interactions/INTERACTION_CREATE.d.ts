import { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleInteractionCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void>;
