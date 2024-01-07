export function transformApplicationCommandOptionChoice(bot, payload) {
    const applicationCommandChoice = {
        name: payload.name,
        nameLocalizations: payload.name_localizations ?? undefined,
        value: payload.value,
    };
    return applicationCommandChoice;
}
