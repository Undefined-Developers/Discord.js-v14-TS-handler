import { requireBotChannelPermissions } from "../../permissions.js";
export default function getArchivedThreads(bot) {
    const getArchivedThreadsOld = bot.helpers.getArchivedThreads;
    bot.helpers.getArchivedThreads = async function (channelId, options) {
        const channel = await bot.channels.get(channelId);
        if (channel) {
            await requireBotChannelPermissions(bot, channel, options?.type === "private" ? ["READ_MESSAGE_HISTORY", "MANAGE_THREADS"] : ["READ_MESSAGE_HISTORY"]);
        }
        return await getArchivedThreadsOld(channelId, options);
    };
}
