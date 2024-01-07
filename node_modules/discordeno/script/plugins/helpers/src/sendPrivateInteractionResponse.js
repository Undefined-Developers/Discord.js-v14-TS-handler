"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPrivateInteractionResponse = void 0;
/**  sendInteractionResponse with ephemeral reply */
function sendPrivateInteractionResponse(bot, id, token, options) {
    if (options.data && !options.data?.flags)
        options.data.flags = 64; // private: true
    return bot.helpers.sendInteractionResponse(id, token, options);
}
exports.sendPrivateInteractionResponse = sendPrivateInteractionResponse;
