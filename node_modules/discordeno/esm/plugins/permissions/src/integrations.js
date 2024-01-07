import { requireBotGuildPermissions } from "./permissions.js";
export function deleteIntegration(bot) {
    const deleteIntegrationOld = bot.helpers.deleteIntegration;
    bot.helpers.deleteIntegration = async function (guildId, id) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
        return await deleteIntegrationOld(guildId, id);
    };
}
export function getIntegrations(bot) {
    const getIntegrationsOld = bot.helpers.getIntegrations;
    bot.helpers.getIntegrations = async function (guildId) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
        return await getIntegrationsOld(guildId);
    };
}
export default function setupIntegrationPermChecks(bot) {
    deleteIntegration(bot);
    getIntegrations(bot);
}
