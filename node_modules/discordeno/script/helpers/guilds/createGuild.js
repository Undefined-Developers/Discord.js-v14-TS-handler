"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGuild = void 0;
/** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
async function createGuild(bot, options) {
    const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.GUILDS(), {
        name: options.name,
        afk_channel_id: options.afkChannelId,
        afk_timeout: options.afkTimeout,
        channels: options.channels,
        default_message_notifications: options.defaultMessageNotifications,
        explicit_content_filter: options.explicitContentFilter,
        icon: options.icon,
        roles: options.roles,
        system_channel_flags: options.systemChannelFlags,
        system_channel_id: options.systemChannelId,
        verification_level: options.verificationLevel,
    });
    return bot.transformers.guild(bot, { guild: result, shardId: 0 });
}
exports.createGuild = createGuild;
