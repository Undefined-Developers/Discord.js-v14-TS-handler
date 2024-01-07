"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInteractionResponse = void 0;
const commands_js_1 = __importDefault(require("./commands.js"));
const editFollowupMessage_js_1 = __importDefault(require("./editFollowupMessage.js"));
function sendInteractionResponse(bot) {
    const sendInteractionResponseOld = bot.helpers.sendInteractionResponse;
    bot.helpers.sendInteractionResponse = function (id, token, options) {
        if (options.data?.title !== undefined) {
            if (!bot.utils.validateLength(options.data.title, { min: 1, max: 45 })) {
                throw new Error("Invalid modal title. Must be between 1-45 characters long.");
            }
        }
        options.data?.choices?.every((choice) => {
            if (!bot.utils.validateLength(choice.name, { min: 1, max: 100 })) {
                throw new Error("Invalid application command option choice name. Must be between 1-100 characters long.");
            }
            if (typeof choice.value === "string" && (choice.value.length < 1 ||
                choice.value.length > 100)) {
                throw new Error("Invalid slash options choice value type.");
            }
        });
        return sendInteractionResponseOld(id, token, options);
    };
}
exports.sendInteractionResponse = sendInteractionResponse;
function setupInteractionPermChecks(bot) {
    (0, commands_js_1.default)(bot);
    (0, editFollowupMessage_js_1.default)(bot);
}
exports.default = setupInteractionPermChecks;
