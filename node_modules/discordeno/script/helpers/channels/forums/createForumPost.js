"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForumPost = void 0;
/** Creates a new public thread from an existing message. Returns a thread channel. */
async function createForumPost(bot, channelId, options) {
    const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.FORUM_START(channelId), {
        name: options.name,
        auto_archive_duration: options.autoArchiveDuration,
        rate_limit_per_user: options.rateLimitPerUser,
        reason: options.reason,
        content: options.content,
        embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
        allowed_mentions: options.allowedMentions
            ? {
                parse: options.allowedMentions?.parse,
                roles: options.allowedMentions?.roles?.map((id) => id.toString()),
                users: options.allowedMentions?.users?.map((id) => id.toString()),
                replied_user: options.allowedMentions?.repliedUser,
            }
            : undefined,
        file: options.file,
        components: options.components?.map((component) => bot.transformers.reverse.component(bot, component)),
    });
    return bot.transformers.channel(bot, { channel: result, guildId: bot.transformers.snowflake(result.guild_id) });
}
exports.createForumPost = createForumPost;
