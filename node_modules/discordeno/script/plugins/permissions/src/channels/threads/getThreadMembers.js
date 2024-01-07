"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deps_js_1 = require("../../../deps.js");
function getThreadMembers(bot) {
    const getThreadMembersOld = bot.helpers.getThreadMembers;
    bot.helpers.getThreadMembers = async function (threadId) {
        const hasIntent = bot.intents & deps_js_1.GatewayIntents.GuildMembers;
        if (!hasIntent) {
            throw new Error("The get thread members endpoint requires GuildMembers intent.");
        }
        return await getThreadMembersOld(threadId);
    };
}
exports.default = getThreadMembers;
