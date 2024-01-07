"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editWidget = void 0;
const permissions_js_1 = require("../permissions.js");
function editWidget(bot) {
    const editWidgetOld = bot.helpers.editWidget;
    bot.helpers.editWidget = async function (guildId, enabled, channelId) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await editWidgetOld(guildId, enabled, channelId);
    };
}
exports.editWidget = editWidget;
function setupWidgetPermChecks(bot) {
    editWidget(bot);
}
exports.default = setupWidgetPermChecks;
