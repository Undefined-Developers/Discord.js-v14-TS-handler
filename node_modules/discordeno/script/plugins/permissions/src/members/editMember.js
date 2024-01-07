"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function editMember(bot) {
    const editMemberOld = bot.helpers.editMember;
    bot.helpers.editMember = async function (guildId, memberId, options) {
        const requiredPerms = [];
        if (options.roles)
            requiredPerms.push("MANAGE_ROLES");
        // NULL IS ALLOWED
        if (options.nick !== undefined)
            requiredPerms.push("MANAGE_NICKNAMES");
        if (options.channelId !== undefined)
            requiredPerms.push("MOVE_MEMBERS");
        if (options.mute !== undefined)
            requiredPerms.push("MUTE_MEMBERS");
        if (options.deaf !== undefined)
            requiredPerms.push("DEAFEN_MEMBERS");
        if (options.communicationDisabledUntil) {
            const guild = bot.guilds.get(guildId);
            if (guild) {
                if (guild.ownerId === memberId)
                    throw new Error("You can not timeout the servers owner.");
            }
            if ((0, permissions_js_1.hasGuildPermissions)(bot, guildId, memberId, ["ADMINISTRATOR"])) {
                throw new Error("You can not timeout a server administrator.");
            }
        }
        if (requiredPerms.length) {
            (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, requiredPerms);
        }
        return await editMemberOld(guildId, memberId, options);
    };
}
exports.default = editMember;
