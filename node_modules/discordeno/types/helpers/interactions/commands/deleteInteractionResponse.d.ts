import type { Bot } from "../../../bot.js";
/** To delete your response to a application command. If a message id is not provided, it will default to deleting the original response. */
export declare function deleteInteractionResponse(bot: Bot, token: string, messageId?: bigint): Promise<void>;
