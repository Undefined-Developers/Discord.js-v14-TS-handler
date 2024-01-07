"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("./permissions.js");
function editMember(bot) {
    const editMemberOld = bot.helpers.editMember;
    bot.helpers.editMember = async function (guildId, memberId, options) {
        const requiredPerms = new Set();
        if (options.nick) {
            if (options.nick.length > 32) {
                throw new Error("NICKNAMES_MAX_LENGTH");
            }
            requiredPerms.add("MANAGE_NICKNAMES");
        }
        if (options.roles)
            requiredPerms.add("MANAGE_ROLES");
        if (options.mute !== undefined || options.deaf !== undefined ||
            options.channelId !== undefined) {
            const memberVoiceState = (await bot.guilds.get(guildId))
                ?.voiceStates.get(memberId);
            if (!memberVoiceState?.channelId) {
                throw new Error("MEMBER_NOT_IN_VOICE_CHANNEL");
            }
            if (options.mute !== undefined) {
                requiredPerms.add("MUTE_MEMBERS");
            }
            if (options.deaf !== undefined) {
                requiredPerms.add("DEAFEN_MEMBERS");
            }
            if (options.channelId) {
                const requiredVoicePerms = new Set([
                    "CONNECT",
                    "MOVE_MEMBERS",
                ]);
                if (memberVoiceState) {
                    await (0, permissions_js_1.requireBotChannelPermissions)(bot, memberVoiceState?.channelId, [
                        ...requiredVoicePerms,
                    ]);
                }
                await (0, permissions_js_1.requireBotChannelPermissions)(bot, options.channelId, [
                    ...requiredVoicePerms,
                ]);
            }
        }
        await (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, [
            ...requiredPerms,
        ]);
        return await editMemberOld(guildId, memberId, options);
    };
}
exports.default = editMember;
