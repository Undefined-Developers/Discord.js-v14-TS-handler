import { Bot, Channel } from "../deps.js";
/** Create a copy of a channel */
export declare function cloneChannel(bot: Bot, channel: Channel, reason?: string): Promise<Channel>;
