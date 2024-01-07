import { requireBotGuildPermissions } from "../permissions.js";
export default function createRole(bot) {
    const createRoleOld = bot.helpers.createRole;
    bot.helpers.createRole = async function (guildId, options, reason) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);
        return await createRoleOld(guildId, options, reason);
    };
}
