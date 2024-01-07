import { Bot } from "../../bot.js";
import { DiscordGatewayPayload } from "../../types/discord.js";
export declare function handleGuildMemberRemove(bot: Bot, data: DiscordGatewayPayload): Promise<void>;
