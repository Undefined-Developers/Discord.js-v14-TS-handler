export function handleInviteCreate(bot, data) {
    bot.events.inviteCreate(bot, bot.transformers.invite(bot, data.d));
}
