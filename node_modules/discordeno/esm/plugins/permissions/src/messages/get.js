import { requireBotChannelPermissions } from "../permissions.js";
export function getMessage(bot) {
    const getMessageOld = bot.helpers.getMessage;
    bot.helpers.getMessage = async function (channelId, messageId) {
        const channel = bot.channels.get(channelId);
        if (channel?.guildId) {
            requireBotChannelPermissions(bot, channel, [
                "READ_MESSAGE_HISTORY",
            ]);
        }
        return await getMessageOld(channelId, messageId);
    };
}
export function getMessages(bot) {
    const getMessagesOld = bot.helpers.getMessages;
    bot.helpers.getMessages = async function (channelId, options) {
        const channel = bot.channels.get(channelId);
        if (channel?.guildId) {
            requireBotChannelPermissions(bot, channel, [
                "READ_MESSAGE_HISTORY",
                "VIEW_CHANNEL",
            ]);
        }
        return await getMessagesOld(channelId, options);
    };
}
export default function setupGetMessagePermChecks(bot) {
    getMessage(bot);
    getMessages(bot);
}
