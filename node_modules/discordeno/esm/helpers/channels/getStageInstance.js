/** Gets the stage instance associated with the Stage channel, if it exists. */
export async function getStageInstance(bot, channelId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.STAGE_INSTANCE(channelId));
    return bot.transformers.stageInstance(bot, result);
}
