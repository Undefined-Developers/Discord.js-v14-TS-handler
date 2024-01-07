"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
const permissions_js_2 = require("../permissions.js");
function editRole(bot) {
    const editRoleOld = bot.helpers.editRole;
    bot.helpers.editRole = async function (guildId, id, options) {
        const guild = bot.guilds.get(guildId);
        if (guild) {
            const role = guild.roles.get(id);
            if (role) {
                const botRole = (0, permissions_js_2.highestRole)(bot, guild, bot.id);
                if (!(0, permissions_js_1.higherRolePosition)(bot, guild, botRole.id, role.id)) {
                    throw new Error(`The bot can not add this role to the member because it does not have a role higher than the role ID: ${role.id}.`);
                }
            }
            (0, permissions_js_2.requireBotGuildPermissions)(bot, guild, ["MANAGE_ROLES"]);
        }
        return await editRoleOld(guildId, id, options);
    };
}
exports.default = editRole;
