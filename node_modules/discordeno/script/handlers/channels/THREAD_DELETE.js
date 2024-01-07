"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleThreadDelete = void 0;
async function handleThreadDelete(bot, data) {
    const payload = data.d;
    bot.events.threadDelete(bot, bot.transformers.channel(bot, { channel: payload }));
}
exports.handleThreadDelete = handleThreadDelete;
