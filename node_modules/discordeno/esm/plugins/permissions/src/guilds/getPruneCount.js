import { requireBotGuildPermissions } from "../permissions.js";
export default function getPruneCount(bot) {
    const getPruneCountOld = bot.helpers.getPruneCount;
    bot.helpers.getPruneCount = async function (guildId, options) {
        requireBotGuildPermissions(bot, guildId, ["KICK_MEMBERS"]);
        return await getPruneCountOld(guildId, options);
    };
}
