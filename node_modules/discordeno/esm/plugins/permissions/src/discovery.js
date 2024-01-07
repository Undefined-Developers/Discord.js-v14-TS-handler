import { requireBotGuildPermissions } from "./permissions.js";
export function addDiscoverySubcategory(bot) {
    const addDiscoverySubcategoryOld = bot.helpers.addDiscoverySubcategory;
    bot.helpers.addDiscoverySubcategory = async function (guildId, categoryId) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
        return await addDiscoverySubcategoryOld(guildId, categoryId);
    };
}
export function removeDiscoverySubcategory(bot) {
    const removeDiscoverySubcategoryOld = bot.helpers.removeDiscoverySubcategory;
    bot.helpers.removeDiscoverySubcategory = async function (guildId, categoryId) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
        return await removeDiscoverySubcategoryOld(guildId, categoryId);
    };
}
export function getDiscovery(bot) {
    const getDiscoveryOld = bot.helpers.getDiscovery;
    bot.helpers.getDiscovery = async function (guildId) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
        return await getDiscoveryOld(guildId);
    };
}
export function editDiscovery(bot) {
    const editDiscoveryOld = bot.helpers.editDiscovery;
    bot.helpers.editDiscovery = async function (guildId, data) {
        requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);
        return await editDiscoveryOld(guildId, data);
    };
}
export default function setupDiscoveryPermChecks(bot) {
    addDiscoverySubcategory(bot);
    editDiscovery(bot);
    getDiscovery(bot);
    removeDiscoverySubcategory(bot);
}
