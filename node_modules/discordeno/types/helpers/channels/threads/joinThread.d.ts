import type { Bot } from "../../../bot.js";
/** Adds the bot to the thread. Cannot join an archived thread. */
export declare function joinThread(bot: Bot, threadId: bigint): Promise<void>;
