"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_js_1 = require("../permissions.js");
function getVanityUrl(bot) {
    const getVanityUrlOld = bot.helpers.getVanityUrl;
    bot.helpers.getVanityUrl = async function (guildId) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await getVanityUrlOld(guildId);
    };
}
exports.default = getVanityUrl;
