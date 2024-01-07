"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformApplicationCommand = void 0;
function transformApplicationCommand(bot, payload) {
    const applicationCommand = {
        id: bot.transformers.snowflake(payload.id),
        applicationId: bot.transformers.snowflake(payload.application_id),
        guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
        name: payload.name,
        nameLocalizations: payload.name_localizations ?? undefined,
        description: payload.description,
        descriptionLocalizations: payload.description_localizations ?? undefined,
        defaultMemberPermissions: payload.default_member_permissions
            ? bot.transformers.snowflake(payload.default_member_permissions)
            : undefined,
        dmPermission: payload.dm_permission ?? false,
        type: payload.type,
        version: payload.version,
        options: payload.options?.map((option) => bot.transformers.applicationCommandOption(bot, option)),
    };
    return applicationCommand;
}
exports.transformApplicationCommand = transformApplicationCommand;
