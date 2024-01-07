"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuildEmojisUpdate = void 0;
const collection_js_1 = require("../../util/collection.js");
async function handleGuildEmojisUpdate(bot, data) {
    const payload = data.d;
    bot.events.guildEmojisUpdate(bot, {
        guildId: bot.transformers.snowflake(payload.guild_id),
        emojis: new collection_js_1.Collection(payload.emojis.map((emoji) => [bot.transformers.snowflake(emoji.id), emoji])),
    });
}
exports.handleGuildEmojisUpdate = handleGuildEmojisUpdate;
