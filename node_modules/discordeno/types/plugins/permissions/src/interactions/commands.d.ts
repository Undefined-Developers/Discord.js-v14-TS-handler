import { ApplicationCommandOption, BotWithCache } from "../../deps.js";
export declare function validateApplicationCommandOptions(bot: BotWithCache, options: ApplicationCommandOption[]): ApplicationCommandOption[];
export declare function createApplicationCommand(bot: BotWithCache): void;
export declare function editInteractionResponse(bot: BotWithCache): void;
export default function setupInteractionCommandPermChecks(bot: BotWithCache): void;
