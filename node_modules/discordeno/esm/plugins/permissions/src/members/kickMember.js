import { requireBotGuildPermissions } from "../permissions.js";
export default function kickMember(bot) {
    const editMemberOld = bot.helpers.kickMember;
    bot.helpers.kickMember = async function (guildId, memberId, reason) {
        requireBotGuildPermissions(bot, guildId, ["KICK_MEMBERS"]);
        return await editMemberOld(guildId, memberId, reason);
    };
}
