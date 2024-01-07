"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function leaveThread(bot) {
    const leaveThreadOld = bot.helpers.leaveThread;
    bot.helpers.leaveThread = async function (threadId) {
        const channel = bot.channels.get(threadId);
        if (channel && !channel.archived) {
            throw new Error("You can not leave an archived channel.");
        }
        return await leaveThreadOld(threadId);
    };
}
exports.default = leaveThread;
