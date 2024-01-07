"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function getPruneCount(bot) {
    const getPruneCountOld = bot.helpers.getPruneCount;
    bot.helpers.getPruneCount = async function (guildId, options) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["KICK_MEMBERS"]);
        return await getPruneCountOld(guildId, options);
    };
}
exports.default = getPruneCount;
