"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function pruneMembers(bot) {
    const pruneMembersOld = bot.helpers.pruneMembers;
    bot.helpers.pruneMembers = async function (guildId, options) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["KICK_MEMBERS"]);
        return await pruneMembersOld(guildId, options);
    };
}
exports.default = pruneMembers;
