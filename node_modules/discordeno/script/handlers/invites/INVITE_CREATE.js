"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInviteCreate = void 0;
function handleInviteCreate(bot, data) {
    bot.events.inviteCreate(bot, bot.transformers.invite(bot, data.d));
}
exports.handleInviteCreate = handleInviteCreate;
