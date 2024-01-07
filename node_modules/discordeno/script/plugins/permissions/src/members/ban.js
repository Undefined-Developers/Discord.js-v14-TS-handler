"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unbanMember = exports.banMember = void 0;
const permissions_js_1 = require("../permissions.js");
function banMember(bot) {
    const banMemberOld = bot.helpers.banMember;
    bot.helpers.banMember = async function (guildId, id, options) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["BAN_MEMBERS"]);
        return await banMemberOld(guildId, id, options);
    };
}
exports.banMember = banMember;
function unbanMember(bot) {
    const unbanMemberOld = bot.helpers.unbanMember;
    bot.helpers.unbanMember = async function (guildId, id) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["BAN_MEMBERS"]);
        return await unbanMemberOld(guildId, id);
    };
}
exports.unbanMember = unbanMember;
function setupBanPermChecks(bot) {
    banMember(bot);
    unbanMember(bot);
}
exports.default = setupBanPermChecks;
