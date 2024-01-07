"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPruneCount = void 0;
/** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
async function getPruneCount(bot, guildId, options) {
    if (options?.days && options.days < 1)
        throw new Error(bot.constants.Errors.PRUNE_MIN_DAYS);
    if (options?.days && options.days > 30)
        throw new Error(bot.constants.Errors.PRUNE_MAX_DAYS);
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_PRUNE(guildId));
    return result.pruned;
}
exports.getPruneCount = getPruneCount;
