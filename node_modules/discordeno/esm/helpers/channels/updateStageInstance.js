/** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
export async function updateStageInstance(bot, channelId, data) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.STAGE_INSTANCE(channelId), {
        topic: data.topic,
    });
    return bot.transformers.stageInstance(bot, result);
}
