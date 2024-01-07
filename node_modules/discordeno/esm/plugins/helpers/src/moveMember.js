/**
 * Move a member from a voice channel to another.
 */
export function moveMember(bot, guildId, memberId, channelId) {
    return bot.helpers.editMember(guildId, memberId, { channelId });
}
