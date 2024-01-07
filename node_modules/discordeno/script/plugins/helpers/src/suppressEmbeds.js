"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suppressEmbeds = void 0;
/** Suppress all the embeds in this message */
async function suppressEmbeds(bot, channelId, messageId) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId), { flags: 4 });
    return bot.transformers.message(bot, result);
}
exports.suppressEmbeds = suppressEmbeds;
