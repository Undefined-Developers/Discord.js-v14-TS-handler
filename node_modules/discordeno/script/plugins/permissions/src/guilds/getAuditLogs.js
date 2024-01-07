"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function getAuditLogs(bot) {
    const getAuditLogsOld = bot.helpers.getAuditLogs;
    bot.helpers.getAuditLogs = async function (guildId, options) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["VIEW_AUDIT_LOG"]);
        return await getAuditLogsOld(guildId, options);
    };
}
exports.default = getAuditLogs;
