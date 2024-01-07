"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvites = exports.getChannelInvites = exports.createInvite = void 0;
const permissions_js_1 = require("./permissions.js");
function createInvite(bot) {
    const createInviteOld = bot.helpers.createInvite;
    bot.helpers.createInvite = async function (channelId, options = {}) {
        if (options.maxAge && (options.maxAge < 0 || options.maxAge > 604800)) {
            throw new Error("The max age for an invite must be between 0 and 604800.");
        }
        if (options.maxUses && (options.maxUses < 0 || options.maxUses > 100)) {
            throw new Error("The max uses for an invite must be between 0 and 100.");
        }
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, ["CREATE_INSTANT_INVITE"]);
        return await createInviteOld(channelId, options);
    };
}
exports.createInvite = createInvite;
function getChannelInvites(bot) {
    const getChannelInvitesOld = bot.helpers.getChannelInvites;
    bot.helpers.getChannelInvites = async function (channelId) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, channelId, ["MANAGE_CHANNELS"]);
        return await getChannelInvitesOld(channelId);
    };
}
exports.getChannelInvites = getChannelInvites;
function getInvites(bot) {
    const getInvitesOld = bot.helpers.getInvites;
    bot.helpers.getInvites = async function (guildId) {
        (0, permissions_js_1.requireBotChannelPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await getInvitesOld(guildId);
    };
}
exports.getInvites = getInvites;
function setupInvitesPermChecks(bot) {
    createInvite(bot);
    getChannelInvites(bot);
    getInvites(bot);
}
exports.default = setupInvitesPermChecks;
