"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function kickMember(bot) {
    const editMemberOld = bot.helpers.kickMember;
    bot.helpers.kickMember = async function (guildId, memberId, reason) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["KICK_MEMBERS"]);
        return await editMemberOld(guildId, memberId, reason);
    };
}
exports.default = kickMember;
