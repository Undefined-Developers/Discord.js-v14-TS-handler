"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editWebhookMessage = void 0;
const deps_js_1 = require("../../deps.js");
const components_js_1 = require("../components.js");
function editWebhookMessage(bot) {
    const editWebhookMessageOld = bot.helpers.editWebhookMessage;
    bot.helpers.editWebhookMessage = async function (webhookId, webhookToken, options) {
        if (options.content &&
            !bot.utils.validateLength(options.content, { max: 2000 })) {
            throw Error("The content can not exceed 2000 characters.");
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
        if (options.components)
            (0, components_js_1.validateComponents)(bot, options.components);
        return await editWebhookMessageOld(webhookId, webhookToken, options);
    };
}
exports.editWebhookMessage = editWebhookMessage;
function setupMessageWebhookPermChecks(bot) {
    editWebhookMessage(bot);
}
exports.default = setupMessageWebhookPermChecks;
