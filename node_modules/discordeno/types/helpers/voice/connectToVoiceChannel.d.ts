import type { Bot } from "../../bot.js";
import { AtLeastOne } from "../../types/shared.js";
/** Connect or join a voice channel inside a guild. By default, the "selfDeaf" option is true. Requires `CONNECT` and `VIEW_CHANNEL` permissions. */
export declare function connectToVoiceChannel(bot: Bot, guildId: bigint, channelId: bigint, options?: AtLeastOne<Omit<UpdateVoiceState, "guildId" | "channelId">>): Promise<void>;
/** https://discord.com/developers/docs/topics/gateway#update-voice-state */
export interface UpdateVoiceState {
    /** id of the guild */
    guildId: string;
    /** id of the voice channel client wants to join (null if disconnecting) */
    channelId: string | null;
    /** Is the client muted */
    selfMute: boolean;
    /** Is the client deafened */
    selfDeaf: boolean;
}
