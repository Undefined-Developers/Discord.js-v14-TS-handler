import { requireBotGuildPermissions } from "../permissions.js";
export default function getVanityUrl(bot) {
    const getVanityUrlOld = bot.helpers.getVanityUrl;
    bot.helpers.getVanityUrl = async function (guildId) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
        return await getVanityUrlOld(guildId);
    };
}
