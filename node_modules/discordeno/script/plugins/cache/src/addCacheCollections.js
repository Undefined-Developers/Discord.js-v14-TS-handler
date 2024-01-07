"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCacheCollections = void 0;
const deps_js_1 = require("../deps.js");
function addCacheCollections(bot) {
    const cacheBot = bot;
    cacheBot.guilds = new deps_js_1.Collection();
    cacheBot.users = new deps_js_1.Collection();
    cacheBot.members = new deps_js_1.Collection();
    cacheBot.channels = new deps_js_1.Collection();
    cacheBot.messages = new deps_js_1.Collection();
    cacheBot.presences = new deps_js_1.Collection();
    cacheBot.dispatchedGuildIds = new Set();
    cacheBot.dispatchedChannelIds = new Set();
    cacheBot.activeGuildIds = new Set();
    return cacheBot;
}
exports.addCacheCollections = addCacheCollections;
