"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildScheduledEventCreate = void 0;
function handleGuildScheduledEventCreate(bot, data, shardId) {
    const payload = data.d;
    bot.events.scheduledEventCreate(bot, bot.transformers.scheduledEvent(bot, payload));
}
exports.handleGuildScheduledEventCreate = handleGuildScheduledEventCreate;
