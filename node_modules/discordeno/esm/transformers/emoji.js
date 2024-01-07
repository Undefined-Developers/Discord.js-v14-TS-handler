import { EmojiToggles } from "./toggles/emoji.js";
export function transformEmoji(bot, payload) {
    const emoji = {
        id: payload.id ? bot.transformers.snowflake(payload.id) : undefined,
        name: payload.name || undefined,
        roles: payload.roles?.map((id) => bot.transformers.snowflake(id)),
        user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
        toggles: new EmojiToggles(payload),
    };
    return emoji;
}
