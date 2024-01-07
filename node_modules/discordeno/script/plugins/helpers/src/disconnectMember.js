"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectMember = void 0;
/** Kicks a member from a voice channel */
function disconnectMember(bot, guildId, memberId) {
    return bot.helpers.editMember(guildId, memberId, { channelId: null });
}
exports.disconnectMember = disconnectMember;
