import { requireBotGuildPermissions } from "../permissions.js";
export default function swapChannels(bot) {
    const swapChannelsOld = bot.helpers.swapChannels;
    bot.helpers.swapChannels = async function (guildId, channelPositions) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_CHANNELS"]);
        return await swapChannelsOld(guildId, channelPositions);
    };
}
