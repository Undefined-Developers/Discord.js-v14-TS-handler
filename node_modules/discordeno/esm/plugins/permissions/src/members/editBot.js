import { requireBotGuildPermissions } from "../permissions.js";
export default function editBotNickname(bot) {
    const editBotNicknameOld = bot.helpers.editBotNickname;
    bot.helpers.editBotNickname = async function (guildId, options) {
        requireBotGuildPermissions(bot, guildId, ["CHANGE_NICKNAME"]);
        return await editBotNicknameOld(guildId, options);
    };
}
