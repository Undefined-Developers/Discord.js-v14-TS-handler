"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function deleteRole(bot) {
    const deleteRoleOld = bot.helpers.deleteRole;
    bot.helpers.deleteRole = async function (guildId, id) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_ROLES"]);
        return await deleteRoleOld(guildId, id);
    };
}
exports.default = deleteRole;
