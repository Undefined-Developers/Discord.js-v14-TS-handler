"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editWelcomeScreen = exports.getWelcomeScreen = void 0;
const permissions_js_1 = require("../permissions.js");
function getWelcomeScreen(bot) {
    const getWelcomeScreenOld = bot.helpers.getWelcomeScreen;
    bot.helpers.getWelcomeScreen = async function (guildId) {
        const guild = bot.guilds.get(guildId);
        if (!guild?.welcomeScreen) {
            (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        }
        return await getWelcomeScreenOld(guildId);
    };
}
exports.getWelcomeScreen = getWelcomeScreen;
function editWelcomeScreen(bot) {
    const editWelcomeScreenOld = bot.helpers.editWelcomeScreen;
    bot.helpers.editWelcomeScreen = async function (guildId, options) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await editWelcomeScreenOld(guildId, options);
    };
}
exports.editWelcomeScreen = editWelcomeScreen;
function setupWelcomeScreenPermChecks(bot) {
    getWelcomeScreen(bot);
    editWelcomeScreen(bot);
}
exports.default = setupWelcomeScreenPermChecks;
