import { requireBotChannelPermissions } from "../../permissions.js";
export default function addToThread(bot) {
    const addToThreadOld = bot.helpers.addToThread;
    bot.helpers.addToThread = async function (threadId, userId) {
        if (userId === bot.id) {
            throw new Error("To add the bot to a thread, you must use bot.helpers.joinThread()");
        }
        const channel = bot.channels.get(threadId);
        if (channel) {
            if (channel.archived) {
                throw new Error("Cannot add user to thread if thread is archived.");
            }
            await requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES"]);
        }
        return await addToThreadOld(threadId, userId);
    };
}
