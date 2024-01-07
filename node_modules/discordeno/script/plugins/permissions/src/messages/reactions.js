"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReactionEmoji = exports.removeAllReactions = exports.removeReaction = exports.addReactions = exports.addReaction = void 0;
const permissions_js_1 = require("../permissions.js");
function addReaction(bot) {
    const addReactionOld = bot.helpers.addReaction;
    bot.helpers.addReaction = async function (channelId, messageId, reaction) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, [
            "READ_MESSAGE_HISTORY",
            "ADD_REACTIONS",
        ]);
        return await addReactionOld(channelId, messageId, reaction);
    };
}
exports.addReaction = addReaction;
function addReactions(bot) {
    const addReactionsOld = bot.helpers.addReactions;
    bot.helpers.addReactions = async function (channelId, messageId, reactions, ordered) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, [
            "READ_MESSAGE_HISTORY",
            "ADD_REACTIONS",
        ]);
        return await addReactionsOld(channelId, messageId, reactions, ordered);
    };
}
exports.addReactions = addReactions;
function removeReaction(bot) {
    const removeReactionOld = bot.helpers.removeReaction;
    bot.helpers.removeReaction = async function (channelId, messageId, reactions, options) {
        // IF REMOVING OTHER USER PERMS MANAGE MESSAGES IS REQUIRED
        if (options?.userId) {
            (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, [
                "MANAGE_MESSAGES",
            ]);
        }
        return await removeReactionOld(channelId, messageId, reactions, options);
    };
}
exports.removeReaction = removeReaction;
function removeAllReactions(bot) {
    const removeAllReactionsOld = bot.helpers.removeAllReactions;
    bot.helpers.removeAllReactions = async function (channelId, messageId) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, [
            "MANAGE_MESSAGES",
        ]);
        return await removeAllReactionsOld(channelId, messageId);
    };
}
exports.removeAllReactions = removeAllReactions;
function removeReactionEmoji(bot) {
    const removeReactionEmojiOld = bot.helpers.removeReactionEmoji;
    bot.helpers.removeReactionEmoji = async function (channelId, messageId, reaction) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, [
            "MANAGE_MESSAGES",
        ]);
        return await removeReactionEmojiOld(channelId, messageId, reaction);
    };
}
exports.removeReactionEmoji = removeReactionEmoji;
function setupReactionsPermChecks(bot) {
    addReaction(bot);
    addReactions(bot);
    removeReaction(bot);
    removeAllReactions(bot);
    removeReactionEmoji(bot);
}
exports.default = setupReactionsPermChecks;
