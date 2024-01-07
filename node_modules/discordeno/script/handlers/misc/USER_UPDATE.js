"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserUpdate = void 0;
async function handleUserUpdate(bot, data) {
    const payload = data.d;
    bot.events.botUpdate(bot, bot.transformers.user(bot, payload));
}
exports.handleUserUpdate = handleUserUpdate;
