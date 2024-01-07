import { ApplicationCommandOptionChoice, Bot } from "../deps.js";
export declare function sendAutocompleteChoices(bot: Bot, interactionId: bigint, interactionToken: string, choices: ApplicationCommandOptionChoice[]): Promise<void>;
