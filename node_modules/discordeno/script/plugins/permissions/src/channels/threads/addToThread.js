"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../../permissions.js");
function addToThread(bot) {
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
            await (0, permissions_js_1.requireBotChannelPermissions)(bot, channel, ["SEND_MESSAGES"]);
        }
        return await addToThreadOld(threadId, userId);
    };
}
exports.default = addToThread;
