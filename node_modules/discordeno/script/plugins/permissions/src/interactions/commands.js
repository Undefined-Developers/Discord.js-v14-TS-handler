"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editInteractionResponse = exports.createApplicationCommand = exports.validateApplicationCommandOptions = void 0;
const deps_js_1 = require("../../deps.js");
function validateApplicationCommandOptions(bot, options) {
    const requiredOptions = [];
    const optionalOptions = [];
    for (const option of options) {
        option.name = option.name.toLowerCase();
        if (option.choices?.length) {
            if (option.choices.length > 25) {
                throw new Error("Too many application command options provided.");
            }
            if (option.type !== deps_js_1.ApplicationCommandOptionTypes.String &&
                option.type !== deps_js_1.ApplicationCommandOptionTypes.Integer) {
                throw new Error("Only string or integer options can have choices.");
            }
        }
        if (!bot.utils.validateLength(option.name, { min: 1, max: 32 })) {
            throw new Error("Invalid application command option name.");
        }
        if (!bot.utils.validateLength(option.description, { min: 1, max: 100 })) {
            throw new Error("Invalid application command description.");
        }
        option.choices?.every((choice) => {
            if (!bot.utils.validateLength(choice.name, { min: 1, max: 100 })) {
                throw new Error("Invalid application command option choice name. Must be between 1-100 characters long.");
            }
            if (option.type === deps_js_1.ApplicationCommandOptionTypes.String &&
                (typeof choice.value !== "string" || choice.value.length < 1 ||
                    choice.value.length > 100)) {
                throw new Error("Invalid slash options choice value type.");
            }
            if (option.type === deps_js_1.ApplicationCommandOptionTypes.Integer &&
                typeof choice.value !== "number") {
                throw new Error("A number must be set for Integer types.");
            }
        });
        if (option.required) {
            requiredOptions.push(option);
            continue;
        }
        optionalOptions.push(option);
    }
    return [...requiredOptions, ...optionalOptions];
}
exports.validateApplicationCommandOptions = validateApplicationCommandOptions;
function createApplicationCommand(bot) {
    const createApplicationCommandOld = bot.helpers.createApplicationCommand;
    bot.helpers.createApplicationCommand = async function (options, guildId) {
        const isChatInput = !options.type ||
            options.type === deps_js_1.ApplicationCommandTypes.ChatInput;
        if (!options.name) {
            throw new Error("A name is required to create a options.");
        }
        if (isChatInput) {
            if (!deps_js_1.SLASH_COMMANDS_NAME_REGEX.test(options.name)) {
                throw new Error("The name of the slash command did not match the required regex.");
            }
            // Only slash need to be lowercase
            options.name = options.name.toLowerCase();
            // Slash commands require description
            if (!options.description) {
                throw new Error("Slash commands require some form of a description be provided.");
            }
            else if (!bot.utils.validateLength(options.description, { min: 1, max: 100 })) {
                throw new Error("Application command descriptions must be between 1 and 100 characters.");
            }
            if (options.options?.length) {
                if (options.options.length > 25) {
                    throw new Error("Only 25 options are allowed to be provided.");
                }
                options.options = validateApplicationCommandOptions(bot, options.options);
            }
        }
        else {
            if (!deps_js_1.CONTEXT_MENU_COMMANDS_NAME_REGEX.test(options.name)) {
                throw new Error("The name of the context menu did not match the required regex.");
            }
        }
        return await createApplicationCommandOld(options, guildId);
    };
}
exports.createApplicationCommand = createApplicationCommand;
function editInteractionResponse(bot) {
    const editInteractionResponseOld = bot.helpers.editInteractionResponse;
    bot.helpers.editInteractionResponse = async function (token, options) {
        if (options.content && options.content.length > 2000) {
            throw Error(bot.constants.Errors.MESSAGE_MAX_LENGTH);
        }
        if (options.embeds && options.embeds.length > 10) {
            options.embeds.splice(10);
        }
        if (options.allowedMentions) {
            if (options.allowedMentions.users?.length) {
                if (options.allowedMentions.parse?.includes(deps_js_1.AllowedMentionsTypes.UserMentions)) {
                    options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "users");
                }
                if (options.allowedMentions.users.length > 100) {
                    options.allowedMentions.users = options.allowedMentions.users.slice(0, 100);
                }
            }
            if (options.allowedMentions.roles?.length) {
                if (options.allowedMentions.parse?.includes(deps_js_1.AllowedMentionsTypes.RoleMentions)) {
                    options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "roles");
                }
                if (options.allowedMentions.roles.length > 100) {
                    options.allowedMentions.roles = options.allowedMentions.roles.slice(0, 100);
                }
            }
        }
        return await editInteractionResponseOld(token, options);
    };
}
exports.editInteractionResponse = editInteractionResponse;
function setupInteractionCommandPermChecks(bot) {
    createApplicationCommand(bot);
    editInteractionResponse(bot);
}
exports.default = setupInteractionCommandPermChecks;
