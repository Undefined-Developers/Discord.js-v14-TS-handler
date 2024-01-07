"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRole = void 0;
/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
async function createRole(bot, guildId, options, reason) {
    const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.GUILD_ROLES(guildId), {
        name: options.name,
        color: options.color,
        hoist: options.hoist,
        mentionable: options.mentionable,
        permissions: bot.utils.calculateBits(options?.permissions || []),
        icon: options.icon,
        unicode_emoji: options.unicodeEmoji,
        reason,
    });
    return bot.transformers.role(bot, {
        role: result,
        guildId,
    });
}
exports.createRole = createRole;
