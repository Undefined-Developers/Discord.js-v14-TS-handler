import type { Bot } from "../../bot.js";
import { OverwriteTypes, PermissionStrings } from "../../types/shared.js";
/** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export declare function editChannelOverwrite(bot: Bot, channelId: bigint, overwrite: OverwriteReadable): Promise<void>;
export interface OverwriteReadable {
    /** Role or user id */
    id: bigint;
    /** Either 0 (role) or 1 (member) */
    type: OverwriteTypes;
    /** Permission bit set */
    allow?: PermissionStrings[];
    /** Permission bit set */
    deny?: PermissionStrings[];
}
export interface Overwrite {
    /** Role or user id */
    id: bigint;
    /** Either 0 (role) or 1 (member) */
    type: OverwriteTypes;
    /** Permission bit set */
    allow?: bigint;
    /** Permission bit set */
    deny?: bigint;
}
