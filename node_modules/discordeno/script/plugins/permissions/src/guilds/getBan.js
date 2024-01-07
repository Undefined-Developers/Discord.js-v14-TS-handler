"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function getBan(bot) {
    const getBanOld = bot.helpers.getBan;
    bot.helpers.getBan = async function (guildId, memberId) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["BAN_MEMBERS"]);
        return await getBanOld(guildId, memberId);
    };
}
exports.default = getBan;
