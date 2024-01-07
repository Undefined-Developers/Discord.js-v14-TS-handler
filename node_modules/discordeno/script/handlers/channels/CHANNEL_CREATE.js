"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChannelCreate = void 0;
async function handleChannelCreate(bot, payload) {
    const channel = bot.transformers.channel(bot, { channel: payload.d });
    bot.events.channelCreate(bot, channel);
}
exports.handleChannelCreate = handleChannelCreate;
