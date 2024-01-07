"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editDiscovery = exports.getDiscovery = exports.removeDiscoverySubcategory = exports.addDiscoverySubcategory = void 0;
const permissions_js_1 = require("./permissions.js");
function addDiscoverySubcategory(bot) {
    const addDiscoverySubcategoryOld = bot.helpers.addDiscoverySubcategory;
    bot.helpers.addDiscoverySubcategory = async function (guildId, categoryId) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await addDiscoverySubcategoryOld(guildId, categoryId);
    };
}
exports.addDiscoverySubcategory = addDiscoverySubcategory;
function removeDiscoverySubcategory(bot) {
    const removeDiscoverySubcategoryOld = bot.helpers.removeDiscoverySubcategory;
    bot.helpers.removeDiscoverySubcategory = async function (guildId, categoryId) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await removeDiscoverySubcategoryOld(guildId, categoryId);
    };
}
exports.removeDiscoverySubcategory = removeDiscoverySubcategory;
function getDiscovery(bot) {
    const getDiscoveryOld = bot.helpers.getDiscovery;
    bot.helpers.getDiscovery = async function (guildId) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await getDiscoveryOld(guildId);
    };
}
exports.getDiscovery = getDiscovery;
function editDiscovery(bot) {
    const editDiscoveryOld = bot.helpers.editDiscovery;
    bot.helpers.editDiscovery = async function (guildId, data) {
        (0, permissions_js_1.requireBotGuildPermissions)(bot, guildId, ["MANAGE_GUILD"]);
        return await editDiscoveryOld(guildId, data);
    };
}
exports.editDiscovery = editDiscovery;
function setupDiscoveryPermChecks(bot) {
    addDiscoverySubcategory(bot);
    editDiscovery(bot);
    getDiscovery(bot);
    removeDiscoverySubcategory(bot);
}
exports.default = setupDiscoveryPermChecks;
