import type { Bot } from "../../../bot.js";
/** Adds a user to a thread. Requires the ability to send messages in the thread. Requires the thread is not archived. */
export declare function addToThread(bot: Bot, threadId: bigint, userId: bigint): Promise<void>;
