/** Edit the member */
export async function editMember(bot, guildId, memberId, options) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_MEMBER(guildId, memberId), {
        nick: options.nick,
        roles: options.roles?.map((id) => id.toString()),
        mute: options.mute,
        deaf: options.deaf,
        channel_id: options.channelId?.toString(),
        communication_disabled_until: options.communicationDisabledUntil
            ? new Date(options.communicationDisabledUntil).toISOString()
            : undefined,
    });
    return bot.transformers.member(bot, result, guildId, memberId);
}
