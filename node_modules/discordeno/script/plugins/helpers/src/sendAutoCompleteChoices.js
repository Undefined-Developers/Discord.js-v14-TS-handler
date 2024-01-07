"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAutocompleteChoices = void 0;
const deps_js_1 = require("../deps.js");
async function sendAutocompleteChoices(bot, interactionId, interactionToken, choices) {
    await bot.helpers.sendInteractionResponse(interactionId, interactionToken, {
        type: deps_js_1.InteractionResponseTypes.ApplicationCommandAutocompleteResult,
        data: {
            choices: choices,
        },
    });
}
exports.sendAutocompleteChoices = sendAutocompleteChoices;
