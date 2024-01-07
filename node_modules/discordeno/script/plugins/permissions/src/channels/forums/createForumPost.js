"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../../permissions.js");
function createForumPosts(bot) {
    const createForumPostsOld = bot.helpers.createForumPost;
    bot.helpers.createForumPost = async function (channelId, options) {
        const channel = bot.channels.get(channelId);
        if (channel) {
            (0, permissions_js_1.requireBotChannelPermissions)(bot, channel, ["SEND_MESSAGES"]);
        }
        return await createForumPostsOld(channelId, options);
    };
}
exports.default = createForumPosts;
