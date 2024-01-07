"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStageInstance = void 0;
/** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
async function updateStageInstance(bot, channelId, data) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.STAGE_INSTANCE(channelId), {
        topic: data.topic,
    });
    return bot.transformers.stageInstance(bot, result);
}
exports.updateStageInstance = updateStageInstance;
