import { requireBotChannelPermissions } from "../permissions.js";
export default function editChannelOverwrite(bot) {
    const editChannelOverwriteOld = bot.helpers.editChannelOverwrite;
    bot.helpers.editChannelOverwrite = async function (channelId, overwrite) {
        const channel = bot.channels.get(channelId);
        if (channel?.guildId) {
            requireBotChannelPermissions(bot, channelId, ["MANAGE_ROLES"]);
        }
        return await editChannelOverwriteOld(channelId, overwrite);
    };
}
