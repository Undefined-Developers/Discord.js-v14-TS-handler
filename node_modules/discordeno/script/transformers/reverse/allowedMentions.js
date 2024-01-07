"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAllowedMentionsToDiscordAllowedMentions = void 0;
function transformAllowedMentionsToDiscordAllowedMentions(bot, mentions) {
    return {
        parse: mentions.parse,
        replied_user: mentions.repliedUser,
        users: mentions.users?.map((id) => id.toString()),
        roles: mentions.roles?.map((id) => id.toString()),
    };
}
exports.transformAllowedMentionsToDiscordAllowedMentions = transformAllowedMentionsToDiscordAllowedMentions;
