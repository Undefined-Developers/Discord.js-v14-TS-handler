import setupEventsPermChecks from "./events.js";
import setupWelcomeScreenPermChecks from "./welcomeScreen.js";
import setupWidgetPermChecks from "./widget.js";
import createGuild from "./createGuild.js";
import deleteGuild from "./deleteGuild.js";
import editGuild from "./editGuild.js";
import getAuditLogs from "./getAuditLogs.js";
import getBan from "./getBan.js";
import getBans from "./getBans.js";
import getPruneCount from "./getPruneCount.js";
import getVanityUrl from "./getVanityUrl.js";
export default function setupGuildPermChecks(bot) {
    setupEventsPermChecks(bot);
    createGuild(bot);
    deleteGuild(bot);
    editGuild(bot);
    setupWelcomeScreenPermChecks(bot);
    setupWidgetPermChecks(bot);
    getAuditLogs(bot);
    getBan(bot);
    getBans(bot);
    getPruneCount(bot);
    getVanityUrl(bot);
}
