"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableHelpersPlugin = void 0;
require("../../_dnt.polyfills.js");
const channels_js_1 = require("./src/channels.js");
const sendAutoCompleteChoices_js_1 = require("./src/sendAutoCompleteChoices.js");
const sendDirectMessage_js_1 = require("./src/sendDirectMessage.js");
const suppressEmbeds_js_1 = require("./src/suppressEmbeds.js");
const threads_js_1 = require("./src/threads.js");
const disconnectMember_js_1 = require("./src/disconnectMember.js");
const getMembersPaginated_js_1 = require("./src/getMembersPaginated.js");
const moveMember_js_1 = require("./src/moveMember.js");
const fetchAndRetrieveMembers_js_1 = require("./src/fetchAndRetrieveMembers.js");
const sendTextMessage_js_1 = require("./src/sendTextMessage.js");
const sendPrivateInteractionResponse_js_1 = require("./src/sendPrivateInteractionResponse.js");
function enableHelpersPlugin(rawBot) {
    // FORCE OVERRIDE THE TYPE SO WE CAN SETUP FUNCTIONS
    const bot = rawBot;
    bot.helpers.fetchAndRetrieveMembers = (guildId) => (0, fetchAndRetrieveMembers_js_1.fetchAndRetrieveMembers)(bot, guildId);
    bot.helpers.sendDirectMessage = (userId, content) => (0, sendDirectMessage_js_1.sendDirectMessage)(bot, userId, content);
    bot.helpers.sendTextMessage = (channelId, content) => (0, sendTextMessage_js_1.sendTextMessage)(bot, channelId, content);
    bot.helpers.sendPrivateInteractionResponse = (id, token, options) => (0, sendPrivateInteractionResponse_js_1.sendPrivateInteractionResponse)(bot, id, token, options);
    bot.helpers.suppressEmbeds = (channelId, messageId) => (0, suppressEmbeds_js_1.suppressEmbeds)(bot, channelId, messageId);
    bot.helpers.archiveThread = (threadId) => (0, threads_js_1.archiveThread)(bot, threadId);
    bot.helpers.unarchiveThread = (threadId) => (0, threads_js_1.unarchiveThread)(bot, threadId);
    bot.helpers.lockThread = (threadId) => (0, threads_js_1.lockThread)(bot, threadId);
    bot.helpers.unlockThread = (threadId) => (0, threads_js_1.unlockThread)(bot, threadId);
    bot.helpers.editThread = (threadId, options, reason) => (0, threads_js_1.editThread)(bot, threadId, options, reason);
    bot.helpers.cloneChannel = (channel, reason) => (0, channels_js_1.cloneChannel)(bot, channel, reason);
    bot.helpers.sendAutocompleteChoices = (interactionId, interactionToken, choices) => (0, sendAutoCompleteChoices_js_1.sendAutocompleteChoices)(bot, interactionId, interactionToken, choices);
    bot.helpers.disconnectMember = (guildId, memberId) => (0, disconnectMember_js_1.disconnectMember)(bot, guildId, memberId);
    bot.helpers.getMembersPaginated = (guildId, options) => (0, getMembersPaginated_js_1.getMembersPaginated)(bot, guildId, options);
    bot.helpers.moveMember = (guildId, memberId, channelId) => (0, moveMember_js_1.moveMember)(bot, guildId, memberId, channelId);
    return bot;
}
exports.enableHelpersPlugin = enableHelpersPlugin;
// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
__exportStar(require("./src/channels.js"), exports);
__exportStar(require("./src/disconnectMember.js"), exports);
__exportStar(require("./src/fetchAndRetrieveMembers.js"), exports);
__exportStar(require("./src/getMembersPaginated.js"), exports);
__exportStar(require("./src/moveMember.js"), exports);
__exportStar(require("./src/sendAutoCompleteChoices.js"), exports);
__exportStar(require("./src/sendDirectMessage.js"), exports);
__exportStar(require("./src/sendPrivateInteractionResponse.js"), exports);
__exportStar(require("./src/sendTextMessage.js"), exports);
__exportStar(require("./src/suppressEmbeds.js"), exports);
__exportStar(require("./src/threads.js"), exports);
exports.default = enableHelpersPlugin;
