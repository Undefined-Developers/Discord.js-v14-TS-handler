"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDirectMessage = exports.dmChannelIds = void 0;
const deps_js_1 = require("../deps.js");
/** Maps the <userId, channelId> for dm channels */
exports.dmChannelIds = new deps_js_1.Collection();
/** Sends a direct message to a user. This can take two API calls. The first call is to create a dm channel. Then sending the message to that channel. Channel ids are cached as needed to prevent duplicate requests. */
async function sendDirectMessage(bot, userId, content) {
    if (typeof content === "string")
        content = { content };
    // GET CHANNEL ID FROM CACHE OR CREATE THE CHANNEL FOR THIS USER
    const cachedChannelId = exports.dmChannelIds.get(userId);
    // IF ID IS CACHED SEND MESSAGE DIRECTLY
    if (cachedChannelId)
        return bot.helpers.sendMessage(cachedChannelId, content);
    // CREATE A NEW DM CHANNEL AND PLUCK ITS ID
    const channel = (await bot.helpers.getDmChannel(userId));
    // CACHE IT FOR FUTURE REQUESTS
    exports.dmChannelIds.set(userId, channel.id);
    // CACHE CHANNEL IF NEEDED
    return bot.helpers.sendMessage(channel.id, content);
}
exports.sendDirectMessage = sendDirectMessage;
