import { GuildFeatures } from "../../deps.js";
import { requireBotGuildPermissions } from "../permissions.js";
export default function editGuild(bot) {
    const editGuildOld = bot.helpers.editGuild;
    bot.helpers.editGuild = async function (guildId, options, shardId) {
        if (options.features?.includes(GuildFeatures.Community)) {
            requireBotGuildPermissions(bot, guildId, ["ADMINISTRATOR"]);
        }
        else {
            requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
        }
        return await editGuildOld(guildId, options, shardId);
    };
}
