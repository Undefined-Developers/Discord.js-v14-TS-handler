import type { Bot } from "../../bot.js";
/** Edit the nickname of the bot in this guild */
export declare function editBotNickname(bot: Bot, guildId: bigint, options: {
    nick: string | null;
    reason?: string;
}): Promise<string | undefined>;
