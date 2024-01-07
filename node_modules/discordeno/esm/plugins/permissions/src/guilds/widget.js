import { requireBotGuildPermissions } from "../permissions.js";
export function editWidget(bot) {
    const editWidgetOld = bot.helpers.editWidget;
    bot.helpers.editWidget = async function (guildId, enabled, channelId) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
        return await editWidgetOld(guildId, enabled, channelId);
    };
}
export default function setupWidgetPermChecks(bot) {
    editWidget(bot);
}
