"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformWidget = void 0;
function transformWidget(bot, payload) {
    const widget = {
        id: bot.transformers.snowflake(payload.id),
        name: payload.name,
        instant_invite: payload.instant_invite,
        channels: payload.channels.map((channel) => ({
            id: bot.transformers.snowflake(channel.id),
            name: channel.name,
            position: channel.position,
        })),
        members: payload.members.map((member) => ({
            id: bot.transformers.snowflake(member.id),
            username: member.username,
            discriminator: member.discriminator,
            avatar: member.avatar ? bot.utils.iconHashToBigInt(member.avatar) : undefined,
            status: member.status,
            avatarUrl: member.avatar_url,
        })),
        presenceCount: payload.presence_count,
    };
    return widget;
}
exports.transformWidget = transformWidget;
