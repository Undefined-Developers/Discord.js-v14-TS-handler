"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStageInstance = void 0;
/** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
async function createStageInstance(bot, options) {
    const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.STAGE_INSTANCES(), {
        channel_id: options.channelId.toString(),
        topic: options.topic,
        send_start_notification: options.sendStartNotification,
    });
    return bot.transformers.stageInstance(bot, result);
}
exports.createStageInstance = createStageInstance;
