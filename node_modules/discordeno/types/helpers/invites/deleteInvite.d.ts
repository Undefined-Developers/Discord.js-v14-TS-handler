import type { Bot } from "../../bot.js";
/** Deletes an invite for the given code. Requires `MANAGE_CHANNELS` or `MANAGE_GUILD` permission */
export declare function deleteInvite(bot: Bot, inviteCode: string): Promise<void>;
