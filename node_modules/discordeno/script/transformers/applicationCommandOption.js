"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformApplicationCommandOption = void 0;
function transformApplicationCommandOption(bot, payload) {
    return {
        type: payload.type,
        name: payload.name,
        nameLocalizations: payload.name_localizations ?? undefined,
        description: payload.description,
        descriptionLocalizations: payload.description_localizations ?? undefined,
        required: payload.required ?? false,
        choices: payload.choices?.map((choice) => bot.transformers.applicationCommandOptionChoice(bot, choice)),
        autocomplete: payload.autocomplete,
        channelTypes: payload.channel_types,
        minValue: payload.min_value,
        maxValue: payload.max_value,
        minLength: payload.min_length,
        maxLength: payload.max_length,
        options: payload.options?.map((option) => bot.transformers.applicationCommandOption(bot, option)),
    };
}
exports.transformApplicationCommandOption = transformApplicationCommandOption;
