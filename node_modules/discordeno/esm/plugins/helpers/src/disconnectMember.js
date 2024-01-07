/** Kicks a member from a voice channel */
export function disconnectMember(bot, guildId, memberId) {
    return bot.helpers.editMember(guildId, memberId, { channelId: null });
}
