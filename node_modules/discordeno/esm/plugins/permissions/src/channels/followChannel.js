import { requireBotChannelPermissions } from "../permissions.js";
export default function followChannel(bot) {
    const followChannelOld = bot.helpers.followChannel;
    bot.helpers.followChannel = async function (sourceChannelId, targetChannelId) {
        const channel = bot.channels.get(targetChannelId);
        if (channel?.guildId) {
            requireBotChannelPermissions(bot, channel, ["MANAGE_WEBHOOKS"]);
        }
        return await followChannelOld(sourceChannelId, targetChannelId);
    };
}
