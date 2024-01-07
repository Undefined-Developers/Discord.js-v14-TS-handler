/**  sendInteractionResponse with ephemeral reply */
export function sendPrivateInteractionResponse(bot, id, token, options) {
    if (options.data && !options.data?.flags)
        options.data.flags = 64; // private: true
    return bot.helpers.sendInteractionResponse(id, token, options);
}
