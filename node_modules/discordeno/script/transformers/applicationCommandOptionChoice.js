"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformApplicationCommandOptionChoice = void 0;
function transformApplicationCommandOptionChoice(bot, payload) {
    const applicationCommandChoice = {
        name: payload.name,
        nameLocalizations: payload.name_localizations ?? undefined,
        value: payload.value,
    };
    return applicationCommandChoice;
}
exports.transformApplicationCommandOptionChoice = transformApplicationCommandOptionChoice;
