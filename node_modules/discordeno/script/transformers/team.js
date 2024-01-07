"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTeam = void 0;
function transformTeam(bot, payload) {
    const id = bot.transformers.snowflake(payload.id);
    const team = {
        name: payload.name,
        id,
        icon: payload.icon ? bot.utils.iconHashToBigInt(payload.icon) : undefined,
        ownerUserId: bot.transformers.snowflake(payload.owner_user_id),
        members: payload.members.map((member) => ({
            membershipState: member.membership_state,
            permissions: member.permissions,
            teamId: id,
            user: bot.transformers.user(bot, member.user),
        })),
    };
    return team;
}
exports.transformTeam = transformTeam;
