"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function createRole(bot) {
    const createRoleOld = bot.helpers.createRole;
    bot.helpers.createRole = async function (guildId, options, reason) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_ROLES"]);
        return await createRoleOld(guildId, options, reason);
    };
}
exports.default = createRole;
