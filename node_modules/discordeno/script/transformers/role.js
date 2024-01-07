"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRole = void 0;
const role_js_1 = require("./toggles/role.js");
function transformRole(bot, payload) {
    const role = {
        name: payload.role.name,
        guildId: payload.guildId,
        position: payload.role.position,
        color: payload.role.color,
        toggles: new role_js_1.RoleToggles(payload.role),
        id: bot.transformers.snowflake(payload.role.id),
        botId: payload.role.tags?.bot_id ? bot.transformers.snowflake(payload.role.tags.bot_id) : undefined,
        integrationId: payload.role.tags?.integration_id
            ? bot.transformers.snowflake(payload.role.tags.integration_id)
            : undefined,
        permissions: bot.transformers.snowflake(payload.role.permissions),
        icon: payload.role.icon ? bot.utils.iconHashToBigInt(payload.role.icon) : undefined,
        unicodeEmoji: payload.role.unicode_emoji,
    };
    return role;
}
exports.transformRole = transformRole;
