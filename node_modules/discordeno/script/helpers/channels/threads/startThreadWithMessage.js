"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startThreadWithMessage = void 0;
/** Creates a new public thread from an existing message. Returns a thread channel. */
async function startThreadWithMessage(bot, channelId, messageId, options) {
    const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.THREAD_START_PUBLIC(channelId, messageId), {
        name: options.name,
        auto_archive_duration: options.autoArchiveDuration,
    });
    return bot.transformers.channel(bot, { channel: result, guildId: bot.transformers.snowflake(result.guild_id) });
}
exports.startThreadWithMessage = startThreadWithMessage;
