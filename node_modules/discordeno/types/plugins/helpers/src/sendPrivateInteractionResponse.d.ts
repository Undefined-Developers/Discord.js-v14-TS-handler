import type { Bot, InteractionResponse, Message } from "../deps.js";
/**  sendInteractionResponse with ephemeral reply */
export declare function sendPrivateInteractionResponse(bot: Bot, id: bigint, token: string, options: InteractionResponse): Promise<Message | undefined>;
