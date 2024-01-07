import { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleMessageDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void>;
