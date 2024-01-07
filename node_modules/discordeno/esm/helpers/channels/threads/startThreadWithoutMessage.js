/** Creates a new private thread. Returns a thread channel. */
export async function startThreadWithoutMessage(bot, channelId, options) {
    const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.THREAD_START_PRIVATE(channelId), {
        name: options.name,
        auto_archive_duration: options.autoArchiveDuration,
    });
    return bot.transformers.channel(bot, {
        channel: result,
        guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
    });
}
