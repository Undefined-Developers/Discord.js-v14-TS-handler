import { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleThreadMembersUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void>;
