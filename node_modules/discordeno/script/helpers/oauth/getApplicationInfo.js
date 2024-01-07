"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationInfo = void 0;
/** Get the applications info */
async function getApplicationInfo(bot) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.OAUTH2_APPLICATION());
    return bot.transformers.application(bot, result);
}
exports.getApplicationInfo = getApplicationInfo;
