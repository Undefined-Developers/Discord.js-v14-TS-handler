import type { Bot } from "../../bot.js";
/** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permission. Only channels to be modified are required. */
export declare function swapChannels(bot: Bot, guildId: bigint, channelPositions: ModifyGuildChannelPositions[]): Promise<void>;
/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export interface ModifyGuildChannelPositions {
    /** Channel id */
    id: string;
    /** Sorting position of the channel */
    position: number | null;
    /** Syncs the permission overwrites with the new parent, if moving to a new category */
    lockPositions?: boolean | null;
    /** The new parent ID for the channel that is moved */
    parentId?: string | null;
}
