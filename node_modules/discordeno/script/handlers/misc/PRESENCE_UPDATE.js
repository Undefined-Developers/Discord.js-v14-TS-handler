"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePresenceUpdate = void 0;
async function handlePresenceUpdate(bot, data) {
    bot.events.presenceUpdate(bot, bot.transformers.presence(bot, data.d));
}
exports.handlePresenceUpdate = handlePresenceUpdate;
