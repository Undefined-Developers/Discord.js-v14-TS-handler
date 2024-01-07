"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStageInstance = exports.deleteStageInstance = exports.createStageInstance = void 0;
const permissions_js_1 = require("../permissions.js");
function createStageInstance(bot) {
    const createStageInstanceOld = bot.helpers.createStageInstance;
    bot.helpers.createStageInstance = async function (options) {
        if (!bot.utils.validateLength(options.topic, { max: 120, min: 1 })) {
            throw new Error("The topic length for creating a stage instance must be between 1-120.");
        }
        const perms = new Set([
            "MANAGE_CHANNELS",
            "MUTE_MEMBERS",
            "MOVE_MEMBERS",
        ]);
        if (options.sendStartNotification) {
            perms.add("MENTION_EVERYONE");
        }
        (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [...perms.values()]);
        return await createStageInstanceOld(options);
    };
}
exports.createStageInstance = createStageInstance;
function deleteStageInstance(bot) {
    const deleteStageInstanceOld = bot.helpers.deleteStageInstance;
    bot.helpers.deleteStageInstance = async function (channelId) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, [
            "MANAGE_CHANNELS",
            "MUTE_MEMBERS",
            "MOVE_MEMBERS",
        ]);
        return await deleteStageInstanceOld(channelId);
    };
}
exports.deleteStageInstance = deleteStageInstance;
function updateStageInstance(bot) {
    const updateStageInstanceOld = bot.helpers.updateStageInstance;
    bot.helpers.updateStageInstance = async function (channelId, data) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, [
            "MANAGE_CHANNELS",
            "MUTE_MEMBERS",
            "MOVE_MEMBERS",
        ]);
        return await updateStageInstanceOld(channelId, data);
    };
}
exports.updateStageInstance = updateStageInstance;
function setupStagePermChecks(bot) {
    createStageInstance(bot);
    deleteStageInstance(bot);
    updateStageInstance(bot);
}
exports.default = setupStagePermChecks;
