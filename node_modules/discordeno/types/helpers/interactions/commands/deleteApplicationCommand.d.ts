import type { Bot } from "../../../bot.js";
/** Deletes a application command. */
export declare function deleteApplicationCommand(bot: Bot, id: bigint, guildId?: bigint): Promise<void>;
