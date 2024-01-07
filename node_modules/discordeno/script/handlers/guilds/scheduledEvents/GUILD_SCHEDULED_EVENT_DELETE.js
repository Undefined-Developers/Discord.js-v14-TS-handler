"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildScheduledEventDelete = void 0;
function handleGuildScheduledEventDelete(bot, data) {
    const payload = data.d;
    bot.events.scheduledEventDelete(bot, bot.transformers.scheduledEvent(bot, payload));
}
exports.handleGuildScheduledEventDelete = handleGuildScheduledEventDelete;
