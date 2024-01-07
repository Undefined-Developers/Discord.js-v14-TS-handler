"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deps_js_1 = require("../../deps.js");
const permissions_js_1 = require("../permissions.js");
function editGuild(bot) {
    const editGuildOld = bot.helpers.editGuild;
    bot.helpers.editGuild = async function (guildId, options, shardId) {
        if (options.features?.includes(deps_js_1.GuildFeatures.Community)) {
            (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["ADMINISTRATOR"]);
        }
        else {
            (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        }
        return await editGuildOld(guildId, options, shardId);
    };
}
exports.default = editGuild;
