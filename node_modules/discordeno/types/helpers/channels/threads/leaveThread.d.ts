import type { Bot } from "../../../bot.js";
/** Removes the bot from a thread. Requires the thread is not archived. */
export declare function leaveThread(bot: Bot, threadId: bigint): Promise<void>;
