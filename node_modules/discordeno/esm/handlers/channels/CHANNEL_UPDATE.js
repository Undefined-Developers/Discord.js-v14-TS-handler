export async function handleChannelUpdate(bot, data) {
    const payload = data.d;
    const channel = bot.transformers.channel(bot, { channel: payload });
    bot.events.channelUpdate(bot, channel);
}
