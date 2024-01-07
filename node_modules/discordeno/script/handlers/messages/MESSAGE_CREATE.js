"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessageCreate = void 0;
async function handleMessageCreate(bot, data) {
    const payload = data.d;
    bot.events.messageCreate(bot, bot.transformers.message(bot, payload));
}
exports.handleMessageCreate = handleMessageCreate;
