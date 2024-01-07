"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deps_js_1 = require("../../../deps.js");
const permissions_js_1 = require("../../permissions.js");
function removeThreadMember(bot) {
    const removeThreadMemberOld = bot.helpers.removeThreadMember;
    bot.helpers.removeThreadMember = async function (threadId, userId) {
        if (userId === bot.id) {
            throw new Error("To remove the bot from a thread, you must use bot.helpers.leaveThread()");
        }
        const channel = bot.channels.get(threadId);
        if (channel) {
            if (channel.archived) {
                throw new Error("Cannot remove user from thread if thread is archived.");
            }
            if (!(bot.id === channel.ownerId &&
                channel.type === deps_js_1.ChannelTypes.GuildPrivateThread)) {
                await (0, permissions_js_1.requireBotChannelPermissions)(bot, channel, ["MANAGE_MESSAGES"]);
            }
        }
        return await removeThreadMemberOld(threadId, userId);
    };
}
exports.default = removeThreadMember;
