export async function handleChannelCreate(bot, payload) {
    const channel = bot.transformers.channel(bot, { channel: payload.d });
    bot.events.channelCreate(bot, channel);
}
