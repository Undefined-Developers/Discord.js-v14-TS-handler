"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
const permissions_js_2 = require("../permissions.js");
function addRole(bot) {
    const addRoleOld = bot.helpers.addRole;
    bot.helpers.addRole = async function (guildId, memberId, roleId, reason) {
        const guild = bot.guilds.get(guildId);
        if (guild) {
            const role = guild.roles.get(roleId);
            if (role) {
                const botRole = (0, permissions_js_2.highestRole)(bot, guild, bot.id);
                if (!(0, permissions_js_1.higherRolePosition)(bot, guild, botRole.id, role.id)) {
                    throw new Error(`The bot can not add this role to the member because it does not have a role higher than the role ID: ${role.id}.`);
                }
            }
            (0, permissions_js_2.requireBotGuildPermissions)(bot, guild, ["MANAGE_ROLES"]);
        }
        return await addRoleOld(guildId, memberId, roleId, reason);
    };
}
exports.default = addRole;
