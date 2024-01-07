"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChannelUpdate = void 0;
async function handleChannelUpdate(bot, data) {
    const payload = data.d;
    const channel = bot.transformers.channel(bot, { channel: payload });
    bot.events.channelUpdate(bot, channel);
}
exports.handleChannelUpdate = handleChannelUpdate;
