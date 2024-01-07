"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleThreadUpdate = void 0;
async function handleThreadUpdate(bot, data) {
    const payload = data.d;
    bot.events.threadUpdate(bot, bot.transformers.channel(bot, { channel: payload }));
}
exports.handleThreadUpdate = handleThreadUpdate;
