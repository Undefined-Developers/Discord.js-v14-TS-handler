import { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleVoiceStateUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void>;
