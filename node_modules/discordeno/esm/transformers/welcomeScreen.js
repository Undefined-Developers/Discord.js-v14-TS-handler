export function transformWelcomeScreen(bot, payload) {
    const welcomeScreen = {
        description: payload.description ?? undefined,
        welcomeChannels: payload.welcome_channels.map((channel) => ({
            channelId: bot.transformers.snowflake(channel.channel_id),
            description: channel.description,
            emojiId: channel.emoji_id ? bot.transformers.snowflake(channel.emoji_id) : undefined,
            emojiName: channel.emoji_name ?? undefined,
        })),
    };
    return welcomeScreen;
}
