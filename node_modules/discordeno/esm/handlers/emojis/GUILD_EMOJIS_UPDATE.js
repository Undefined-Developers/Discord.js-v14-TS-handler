import { Collection } from "../../util/collection.js";
export async function handleGuildEmojisUpdate(bot, data) {
    const payload = data.d;
    bot.events.guildEmojisUpdate(bot, {
        guildId: bot.transformers.snowflake(payload.guild_id),
        emojis: new Collection(payload.emojis.map((emoji) => [bot.transformers.snowflake(emoji.id), emoji])),
    });
}
