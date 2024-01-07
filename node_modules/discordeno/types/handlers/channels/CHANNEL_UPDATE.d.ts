import type { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleChannelUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void>;
