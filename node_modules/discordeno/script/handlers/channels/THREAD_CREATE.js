"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleThreadCreate = void 0;
async function handleThreadCreate(bot, data) {
    const payload = data.d;
    bot.events.threadCreate(bot, bot.transformers.channel(bot, { channel: payload }));
}
exports.handleThreadCreate = handleThreadCreate;
