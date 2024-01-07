"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishMessage = exports.editMessage = exports.sendMessage = void 0;
const deps_js_1 = require("../../deps.js");
const components_js_1 = require("../components.js");
const permissions_js_1 = require("../permissions.js");
function sendMessage(bot) {
    const sendMessageOld = bot.helpers.sendMessage;
    bot.helpers.sendMessage = async function (channelId, content) {
        if (typeof content === "string") {
            throw new Error("TODO");
        }
        const channel = bot.channels.get(channelId);
        if (channel &&
            [
                deps_js_1.ChannelTypes.GuildCategory,
                deps_js_1.ChannelTypes.GuildStageVoice,
                deps_js_1.ChannelTypes.GuildForum,
            ].includes(channel.type)) {
            throw new Error(`Can not send message to a channel of this type. Channel ID: ${channelId}`);
        }
        if (content.content &&
            !bot.utils.validateLength(content.content, { max: 2000 })) {
            throw new Error("The content should not exceed 2000 characters.");
        }
        if (content.allowedMentions) {
            if (content.allowedMentions.users?.length) {
                if (content.allowedMentions.parse?.includes(deps_js_1.AllowedMentionsTypes.UserMentions)) {
                    content.allowedMentions.parse = content.allowedMentions.parse.filter((p) => p !== "users");
                }
                if (content.allowedMentions.users.length > 100) {
                    content.allowedMentions.users = content.allowedMentions.users.slice(0, 100);
                }
            }
            if (content.allowedMentions.roles?.length) {
                if (content.allowedMentions.parse?.includes(deps_js_1.AllowedMentionsTypes.RoleMentions)) {
                    content.allowedMentions.parse = content.allowedMentions.parse.filter((p) => p !== "roles");
                }
                if (content.allowedMentions.roles.length > 100) {
                    content.allowedMentions.roles = content.allowedMentions.roles.slice(0, 100);
                }
            }
        }
        if (content.components) {
            (0, components_js_1.validateComponents)(bot, content.components);
        }
        if (channel) {
            const requiredPerms = [];
            if (channel.guildId) {
                requiredPerms.push("SEND_MESSAGES");
            }
            if (content.tts)
                requiredPerms.push("SEND_TTS_MESSAGES");
            if (content.messageReference)
                requiredPerms.push("READ_MESSAGE_HISTORY");
            if (requiredPerms.length) {
                (0, permissions_js_1.requireBotChannelPermissions)(bot, channel, requiredPerms);
            }
        }
        return await sendMessageOld(channelId, content);
    };
}
exports.sendMessage = sendMessage;
function editMessage(bot) {
    const editMessageOld = bot.helpers.editMessage;
    bot.helpers.editMessage = function (channelId, messageId, content) {
        if (typeof content === "string") {
            throw new Error("TODO");
        }
        const message = bot.messages.get(messageId);
        if (message) {
            if (message.authorId !== bot.id) {
                content = { flags: content.flags };
                (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, ["MANAGE_MESSAGES"]);
            }
        }
        if (content.allowedMentions) {
            if (content.allowedMentions.users?.length) {
                if (content.allowedMentions.parse?.includes(deps_js_1.AllowedMentionsTypes.UserMentions)) {
                    content.allowedMentions.parse = content.allowedMentions.parse.filter((p) => p !== "users");
                }
                if (content.allowedMentions.users.length > 100) {
                    content.allowedMentions.users = content.allowedMentions.users.slice(0, 100);
                }
            }
            if (content.allowedMentions.roles?.length) {
                if (content.allowedMentions.parse?.includes(deps_js_1.AllowedMentionsTypes.RoleMentions)) {
                    content.allowedMentions.parse = content.allowedMentions.parse.filter((p) => p !== "roles");
                }
                if (content.allowedMentions.roles.length > 100) {
                    content.allowedMentions.roles = content.allowedMentions.roles.slice(0, 100);
                }
            }
        }
        content.embeds?.splice(10);
        if (content.content &&
            !bot.utils.validateLength(content.content, { max: 2000 })) {
            throw new Error("A message content can not contain more than 2000 characters.");
        }
        return editMessageOld(channelId, messageId, content);
    };
}
exports.editMessage = editMessage;
function publishMessage(bot) {
    const publishMessageOld = bot.helpers.publishMessage;
    bot.helpers.publishMessage = function (channelId, messageId) {
        const message = bot.messages.get(messageId);
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, message?.authorId === bot.id ? ["SEND_MESSAGES"] : ["MANAGE_MESSAGES"]);
        return publishMessageOld(channelId, messageId);
    };
}
exports.publishMessage = publishMessage;
function setupCreateMessagePermChecks(bot) {
    sendMessage(bot);
    editMessage(bot);
    publishMessage(bot);
}
exports.default = setupCreateMessagePermChecks;
