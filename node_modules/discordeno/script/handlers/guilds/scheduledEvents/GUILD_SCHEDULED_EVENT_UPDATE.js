"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildScheduledEventUpdate = void 0;
function handleGuildScheduledEventUpdate(bot, data) {
    const payload = data.d;
    bot.events.scheduledEventUpdate(bot, bot.transformers.scheduledEvent(bot, payload));
}
exports.handleGuildScheduledEventUpdate = handleGuildScheduledEventUpdate;
