import setupThreadPermChecks from "./threads/mod.js";
import setupForumPermChecks from "./forums/mod.js";
import setupStagePermChecks from "./stage.js";
import deleteChannel from "./deleteChannel.js";
import deleteChannelOverwrite from "./deleteChannelOverwrite.js";
import editChannel from "./editChannel.js";
import editChannelOverwrite from "./editChannelOverwrite.js";
import followChannel from "./followChannel.js";
import getChannelWebhooks from "./getChannelWebhooks.js";
import swapChannels from "./swapChannels.js";
export default function setupChannelPermChecks(bot) {
    setupThreadPermChecks(bot);
    setupForumPermChecks(bot);
    setupStagePermChecks(bot);
    deleteChannel(bot);
    deleteChannelOverwrite(bot);
    editChannel(bot);
    editChannelOverwrite(bot);
    followChannel(bot);
    getChannelWebhooks(bot);
    swapChannels(bot);
}
