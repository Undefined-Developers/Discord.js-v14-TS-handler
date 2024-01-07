import { requireBotGuildPermissions } from "../permissions.js";
export default function getAuditLogs(bot) {
    const getAuditLogsOld = bot.helpers.getAuditLogs;
    bot.helpers.getAuditLogs = async function (guildId, options) {
        requireBotGuildPermissions(bot, guildId, ["VIEW_AUDIT_LOG"]);
        return await getAuditLogsOld(guildId, options);
    };
}
