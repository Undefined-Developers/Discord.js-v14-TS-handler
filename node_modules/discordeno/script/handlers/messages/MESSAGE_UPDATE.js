"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessageUpdate = void 0;
async function handleMessageUpdate(bot, data) {
    const payload = data.d;
    if (!payload.edited_timestamp)
        return;
    bot.events.messageUpdate(bot, bot.transformers.message(bot, payload));
}
exports.handleMessageUpdate = handleMessageUpdate;
