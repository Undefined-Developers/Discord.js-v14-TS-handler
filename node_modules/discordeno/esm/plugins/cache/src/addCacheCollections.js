import { Collection, } from "../deps.js";
export function addCacheCollections(bot) {
    const cacheBot = bot;
    cacheBot.guilds = new Collection();
    cacheBot.users = new Collection();
    cacheBot.members = new Collection();
    cacheBot.channels = new Collection();
    cacheBot.messages = new Collection();
    cacheBot.presences = new Collection();
    cacheBot.dispatchedGuildIds = new Set();
    cacheBot.dispatchedChannelIds = new Set();
    cacheBot.activeGuildIds = new Set();
    return cacheBot;
}
