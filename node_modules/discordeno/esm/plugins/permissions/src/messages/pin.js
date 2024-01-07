import { requireBotChannelPermissions } from "../permissions.js";
export function pinMessage(bot) {
    const pinMessageOld = bot.helpers.pinMessage;
    bot.helpers.pinMessage = async function (channelId, messageId) {
        requireBotChannelPermissions(bot, channelId, [
            "MANAGE_MESSAGES",
        ]);
        return await pinMessageOld(channelId, messageId);
    };
}
export function unpinMessage(bot) {
    const unpinMessageOld = bot.helpers.unpinMessage;
    bot.helpers.unpinMessage = async function (channelId, messageId) {
        requireBotChannelPermissions(bot, channelId, [
            "MANAGE_MESSAGES",
        ]);
        return await unpinMessageOld(channelId, messageId);
    };
}
export default function setupPinMessagePermChecks(bot) {
    pinMessage(bot);
    unpinMessage(bot);
}
