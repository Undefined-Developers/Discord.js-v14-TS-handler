import { requireBotGuildPermissions } from "../permissions.js";
export default function getBans(bot) {
    const getBansOld = bot.helpers.getBans;
    bot.helpers.getBans = async function (guildId) {
        requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);
        return await getBansOld(guildId);
    };
}
