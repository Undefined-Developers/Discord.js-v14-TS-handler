/**
 * Create a new guild based on a template
 * NOTE: This endpoint can be used only by bots in less than 10 guilds.
 */
export async function createGuildFromTemplate(bot, templateCode, data) {
    if (data.icon) {
        data.icon = await bot.utils.urlToBase64(data.icon);
    }
    const createdGuild = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.TEMPLATE(templateCode), data);
    return bot.transformers.guild(bot, {
        guild: createdGuild,
        shardId: bot.utils.calculateShardId(bot.gateway, bot.transformers.snowflake(createdGuild.id)),
    });
}
