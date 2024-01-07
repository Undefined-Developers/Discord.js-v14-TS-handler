import type { Bot } from "../../../bot.js";
/** Removes a user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. */
export declare function removeThreadMember(bot: Bot, threadId: bigint, userId: bigint): Promise<void>;
