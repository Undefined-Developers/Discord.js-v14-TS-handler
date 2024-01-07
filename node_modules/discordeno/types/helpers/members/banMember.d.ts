import type { Bot } from "../../bot.js";
/** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
export declare function banMember(bot: Bot, guildId: bigint, id: bigint, options?: CreateGuildBan): Promise<void>;
/** https://discord.com/developers/docs/resources/guild#create-guild-ban */
export interface CreateGuildBan {
    /** Number of days to delete messages for (0-7) */
    deleteMessageDays?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    /** Reason for the ban */
    reason?: string;
}
