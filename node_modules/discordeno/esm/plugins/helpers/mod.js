import '../../_dnt.polyfills.js';
import { cloneChannel } from "./src/channels.js";
import { sendAutocompleteChoices } from "./src/sendAutoCompleteChoices.js";
import { sendDirectMessage } from "./src/sendDirectMessage.js";
import { suppressEmbeds } from "./src/suppressEmbeds.js";
import { archiveThread, editThread, lockThread, unarchiveThread, unlockThread } from "./src/threads.js";
import { disconnectMember } from "./src/disconnectMember.js";
import { getMembersPaginated } from "./src/getMembersPaginated.js";
import { moveMember } from "./src/moveMember.js";
import { fetchAndRetrieveMembers } from "./src/fetchAndRetrieveMembers.js";
import { sendTextMessage } from "./src/sendTextMessage.js";
import { sendPrivateInteractionResponse } from "./src/sendPrivateInteractionResponse.js";
export function enableHelpersPlugin(rawBot) {
    // FORCE OVERRIDE THE TYPE SO WE CAN SETUP FUNCTIONS
    const bot = rawBot;
    bot.helpers.fetchAndRetrieveMembers = (guildId) => fetchAndRetrieveMembers(bot, guildId);
    bot.helpers.sendDirectMessage = (userId, content) => sendDirectMessage(bot, userId, content);
    bot.helpers.sendTextMessage = (channelId, content) => sendTextMessage(bot, channelId, content);
    bot.helpers.sendPrivateInteractionResponse = (id, token, options) => sendPrivateInteractionResponse(bot, id, token, options);
    bot.helpers.suppressEmbeds = (channelId, messageId) => suppressEmbeds(bot, channelId, messageId);
    bot.helpers.archiveThread = (threadId) => archiveThread(bot, threadId);
    bot.helpers.unarchiveThread = (threadId) => unarchiveThread(bot, threadId);
    bot.helpers.lockThread = (threadId) => lockThread(bot, threadId);
    bot.helpers.unlockThread = (threadId) => unlockThread(bot, threadId);
    bot.helpers.editThread = (threadId, options, reason) => editThread(bot, threadId, options, reason);
    bot.helpers.cloneChannel = (channel, reason) => cloneChannel(bot, channel, reason);
    bot.helpers.sendAutocompleteChoices = (interactionId, interactionToken, choices) => sendAutocompleteChoices(bot, interactionId, interactionToken, choices);
    bot.helpers.disconnectMember = (guildId, memberId) => disconnectMember(bot, guildId, memberId);
    bot.helpers.getMembersPaginated = (guildId, options) => getMembersPaginated(bot, guildId, options);
    bot.helpers.moveMember = (guildId, memberId, channelId) => moveMember(bot, guildId, memberId, channelId);
    return bot;
}
// EXPORT EVERYTHING HERE SO USERS CAN OPT TO USE FUNCTIONS DIRECTLY
export * from "./src/channels.js";
export * from "./src/disconnectMember.js";
export * from "./src/fetchAndRetrieveMembers.js";
export * from "./src/getMembersPaginated.js";
export * from "./src/moveMember.js";
export * from "./src/sendAutoCompleteChoices.js";
export * from "./src/sendDirectMessage.js";
export * from "./src/sendPrivateInteractionResponse.js";
export * from "./src/sendTextMessage.js";
export * from "./src/suppressEmbeds.js";
export * from "./src/threads.js";
export default enableHelpersPlugin;
