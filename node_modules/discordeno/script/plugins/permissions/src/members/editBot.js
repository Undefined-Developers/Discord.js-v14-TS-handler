"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function editBotNickname(bot) {
    const editBotNicknameOld = bot.helpers.editBotNickname;
    bot.helpers.editBotNickname = async function (guildId, options) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["CHANGE_NICKNAME"]);
        return await editBotNicknameOld(guildId, options);
    };
}
exports.default = editBotNickname;
