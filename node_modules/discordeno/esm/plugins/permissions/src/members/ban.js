import { requireBotGuildPermissions } from "../permissions.js";
export function banMember(bot) {
    const banMemberOld = bot.helpers.banMember;
    bot.helpers.banMember = async function (guildId, id, options) {
        requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);
        return await banMemberOld(guildId, id, options);
    };
}
export function unbanMember(bot) {
    const unbanMemberOld = bot.helpers.unbanMember;
    bot.helpers.unbanMember = async function (guildId, id) {
        requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);
        return await unbanMemberOld(guildId, id);
    };
}
export default function setupBanPermChecks(bot) {
    banMember(bot);
    unbanMember(bot);
}
