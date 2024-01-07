import { Bot, CreateMessage } from "../deps.js";
/** Sends a text message. */
export declare function sendTextMessage(bot: Bot, channelId: bigint, content: string | CreateMessage): Promise<import("../deps.js").Message>;
