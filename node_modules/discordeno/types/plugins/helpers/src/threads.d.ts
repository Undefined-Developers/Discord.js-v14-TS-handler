import { Bot } from "../deps.js";
/** Sets a thread channel to be archived. */
export declare function archiveThread(bot: Bot, threadId: bigint): Promise<import("../deps.js").Channel>;
/** Sets a thread channel to be unarchived. */
export declare function unarchiveThread(bot: Bot, threadId: bigint): Promise<import("../deps.js").Channel>;
/** Sets a thread channel to be locked. */
export declare function lockThread(bot: Bot, threadId: bigint): Promise<import("../deps.js").Channel>;
/** Sets a thread channel to be unlocked. */
export declare function unlockThread(bot: Bot, threadId: bigint): Promise<import("../deps.js").Channel>;
/** Update a thread's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
export declare function editThread(bot: Bot, threadId: bigint, options: ModifyThread, reason?: string): Promise<import("../deps.js").Channel>;
/** https://discord.com/developers/docs/resources/channel#modify-channel-json-params-thread */
export interface ModifyThread {
    /** 1-100 character thread name */
    name?: string;
    /** Whether the thread is archived */
    archived?: boolean;
    /** Duration in minutes to automatically archive the thread after recent activity */
    autoArchiveDuration?: 60 | 1440 | 4320 | 10080;
    /** When a thread is locked, only users with `MANAGE_THREADS` can unarchive it */
    locked?: boolean;
    /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
    invitable?: boolean;
    /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `MANAGE_MESSAGES`, `MANAGE_THREAD` or `MANAGE_CHANNEL` are unaffected */
    rateLimitPerUser?: number;
}
