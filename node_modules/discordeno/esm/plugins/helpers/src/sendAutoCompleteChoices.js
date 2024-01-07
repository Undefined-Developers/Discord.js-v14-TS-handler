import { InteractionResponseTypes } from "../deps.js";
export async function sendAutocompleteChoices(bot, interactionId, interactionToken, choices) {
    await bot.helpers.sendInteractionResponse(interactionId, interactionToken, {
        type: InteractionResponseTypes.ApplicationCommandAutocompleteResult,
        data: {
            choices: choices,
        },
    });
}
