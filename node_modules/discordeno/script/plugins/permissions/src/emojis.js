"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editEmoji = exports.deleteEmoji = exports.createEmoji = void 0;
const permissions_js_1 = require("./permissions.js");
function createEmoji(bot) {
    const createEmojiOld = bot.helpers.createEmoji;
    bot.helpers.createEmoji = async function (guildId, id) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_EMOJIS"]);
        return await createEmojiOld(guildId, id);
    };
}
exports.createEmoji = createEmoji;
function deleteEmoji(bot) {
    const deleteEmojiOld = bot.helpers.deleteEmoji;
    bot.helpers.deleteEmoji = async function (guildId, id) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_EMOJIS"]);
        return await deleteEmojiOld(guildId, id);
    };
}
exports.deleteEmoji = deleteEmoji;
function editEmoji(bot) {
    const editEmojiOld = bot.helpers.editEmoji;
    bot.helpers.editEmoji = async function (guildId, id, options) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_EMOJIS"]);
        return await editEmojiOld(guildId, id, options);
    };
}
exports.editEmoji = editEmoji;
function setupEmojiPermChecks(bot) {
    createEmoji(bot);
    deleteEmoji(bot);
    editEmoji(bot);
}
exports.default = setupEmojiPermChecks;
