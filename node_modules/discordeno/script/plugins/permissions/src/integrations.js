"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegrations = exports.deleteIntegration = void 0;
const permissions_js_1 = require("./permissions.js");
function deleteIntegration(bot) {
    const deleteIntegrationOld = bot.helpers.deleteIntegration;
    bot.helpers.deleteIntegration = async function (guildId, id) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await deleteIntegrationOld(guildId, id);
    };
}
exports.deleteIntegration = deleteIntegration;
function getIntegrations(bot) {
    const getIntegrationsOld = bot.helpers.getIntegrations;
    bot.helpers.getIntegrations = async function (guildId) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await getIntegrationsOld(guildId);
    };
}
exports.getIntegrations = getIntegrations;
function setupIntegrationPermChecks(bot) {
    deleteIntegration(bot);
    getIntegrations(bot);
}
exports.default = setupIntegrationPermChecks;
