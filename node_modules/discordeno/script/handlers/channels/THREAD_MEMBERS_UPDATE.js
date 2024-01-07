"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleThreadMembersUpdate = void 0;
async function handleThreadMembersUpdate(bot, data) {
    const payload = data.d;
    bot.events.threadMembersUpdate(bot, {
        id: bot.transformers.snowflake(payload.id),
        guildId: bot.transformers.snowflake(payload.guild_id),
        addedMembers: payload.added_members?.map((member) => bot.transformers.threadMember(bot, member)),
        removedMemberIds: payload.removed_member_ids?.map((id) => bot.transformers.snowflake(id)),
    });
}
exports.handleThreadMembersUpdate = handleThreadMembersUpdate;
