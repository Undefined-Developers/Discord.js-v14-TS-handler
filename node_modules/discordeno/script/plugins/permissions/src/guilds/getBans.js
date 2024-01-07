"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function getBans(bot) {
    const getBansOld = bot.helpers.getBans;
    bot.helpers.getBans = async function (guildId) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["BAN_MEMBERS"]);
        return await getBansOld(guildId);
    };
}
exports.default = getBans;
