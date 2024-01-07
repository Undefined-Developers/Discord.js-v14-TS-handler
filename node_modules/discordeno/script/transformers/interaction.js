"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformInteractionDataResolved = exports.transformInteractionDataOption = exports.transformInteraction = void 0;
const collection_js_1 = require("../util/collection.js");
function transformInteraction(bot, payload) {
    const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;
    const user = bot.transformers.user(bot, payload.member?.user || payload.user);
    const interaction = {
        // UNTRANSFORMED STUFF HERE
        type: payload.type,
        token: payload.token,
        version: payload.version,
        locale: payload.locale,
        guildLocale: payload.guild_locale,
        // TRANSFORMED STUFF BELOW
        guildId,
        user,
        id: bot.transformers.snowflake(payload.id),
        applicationId: bot.transformers.snowflake(payload.application_id),
        appPermissions: payload.app_permissions ? bot.transformers.snowflake(payload.app_permissions) : undefined,
        message: payload.message ? bot.transformers.message(bot, payload.message) : undefined,
        channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
        member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, user.id) : undefined,
        data: payload.data
            ? {
                componentType: payload.data.component_type,
                customId: payload.data.custom_id,
                components: payload.data.components?.map((component) => bot.transformers.component(bot, component)),
                values: payload.data.values,
                id: payload.data.id ? bot.transformers.snowflake(payload.data.id) : undefined,
                name: payload.data.name,
                resolved: payload.data.resolved
                    ? transformInteractionDataResolved(bot, payload.data.resolved, guildId)
                    : undefined,
                options: payload.data.options?.map((opt) => bot.transformers.interactionDataOptions(bot, opt)),
                targetId: payload.data.target_id ? bot.transformers.snowflake(payload.data.target_id) : undefined,
                guildId: payload.data.guild_id ? bot.transformers.snowflake(payload.data.guild_id) : undefined,
            }
            : undefined,
    };
    return interaction;
}
exports.transformInteraction = transformInteraction;
function transformInteractionDataOption(bot, option) {
    const opt = {
        name: option.name,
        type: option.type,
        value: option.value,
        options: option.options,
        focused: option.focused,
    };
    return opt;
}
exports.transformInteractionDataOption = transformInteractionDataOption;
function transformInteractionDataResolved(bot, resolved, guildId) {
    const transformed = {};
    if (resolved.messages) {
        transformed.messages = new collection_js_1.Collection(Object.entries(resolved.messages).map(([id, value]) => {
            const message = bot.transformers.message(bot, value);
            return [message.id, message];
        }));
    }
    if (resolved.users) {
        transformed.users = new collection_js_1.Collection(Object.entries(resolved.users).map(([id, value]) => {
            const user = bot.transformers.user(bot, value);
            return [user.id, user];
        }));
    }
    if (guildId && resolved.members) {
        transformed.members = new collection_js_1.Collection(Object.entries(resolved.members).map(([id, value]) => {
            const member = bot.transformers.member(bot, value, guildId, bot.transformers.snowflake(id));
            return [member.id, member];
        }));
    }
    if (guildId && resolved.roles) {
        transformed.roles = new collection_js_1.Collection(Object.entries(resolved.roles).map(([id, value]) => {
            const role = bot.transformers.role(bot, { role: value, guildId });
            return [role.id, role];
        }));
    }
    if (resolved.channels) {
        transformed.channels = new collection_js_1.Collection(Object.entries(resolved.channels).map(([key, value]) => {
            const id = bot.transformers.snowflake(key);
            const channel = value;
            return [
                id,
                {
                    id,
                    name: channel.name,
                    type: channel.type,
                    permissions: bot.transformers.snowflake(channel.permissions),
                },
            ];
        }));
    }
    if (resolved.attachments) {
        transformed.attachments = new collection_js_1.Collection(Object.entries(resolved.attachments).map(([key, value]) => {
            const id = bot.transformers.snowflake(key);
            return [id, bot.transformers.attachment(bot, value)];
        }));
    }
    return transformed;
}
exports.transformInteractionDataResolved = transformInteractionDataResolved;
