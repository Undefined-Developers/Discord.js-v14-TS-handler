"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTextMessage = void 0;
/** Sends a text message. */
async function sendTextMessage(bot, channelId, content) {
    if (typeof content === "string")
        content = { content };
    return bot.helpers.sendMessage(channelId, content);
}
exports.sendTextMessage = sendTextMessage;
