"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRole = void 0;
/** Edit a guild role. Requires the MANAGE_ROLES permission. */
async function editRole(bot, guildId, id, options) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.GUILD_ROLE(guildId, id), {
        name: options.name,
        color: options.color,
        hoist: options.hoist,
        mentionable: options.mentionable,
        permissions: bot.utils.calculateBits(options?.permissions || []),
        icon: options.icon,
        unicode_emoji: options.unicodeEmoji,
    });
    return bot.transformers.role(bot, { role: result, guildId });
}
exports.editRole = editRole;
