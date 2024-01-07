"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editThread = exports.unlockThread = exports.lockThread = exports.unarchiveThread = exports.archiveThread = void 0;
/** Sets a thread channel to be archived. */
async function archiveThread(bot, threadId) {
    return await editThread(bot, threadId, { archived: true });
}
exports.archiveThread = archiveThread;
/** Sets a thread channel to be unarchived. */
async function unarchiveThread(bot, threadId) {
    return await editThread(bot, threadId, { archived: false });
}
exports.unarchiveThread = unarchiveThread;
/** Sets a thread channel to be locked. */
async function lockThread(bot, threadId) {
    return await editThread(bot, threadId, { locked: true });
}
exports.lockThread = lockThread;
/** Sets a thread channel to be unlocked. */
async function unlockThread(bot, threadId) {
    return await editThread(bot, threadId, { locked: false });
}
exports.unlockThread = unlockThread;
/** Update a thread's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
async function editThread(bot, threadId, options, reason) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.CHANNEL(threadId), {
        name: options.name,
        archived: options.archived,
        auto_archive_duration: options.autoArchiveDuration,
        locked: options.locked,
        rate_limit_per_user: options.rateLimitPerUser,
        reason,
    });
    return bot.transformers.channel(bot, {
        channel: result,
        guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
    });
}
exports.editThread = editThread;
