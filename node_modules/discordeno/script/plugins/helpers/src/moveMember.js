"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveMember = void 0;
/**
 * Move a member from a voice channel to another.
 */
function moveMember(bot, guildId, memberId, channelId) {
    return bot.helpers.editMember(guildId, memberId, { channelId });
}
exports.moveMember = moveMember;
