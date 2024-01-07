import '../../_dnt.polyfills.js';
import setupChannelPermChecks from "./src/channels/mod.js";
import setupDiscoveryPermChecks from "./src/discovery.js";
import setupEditMember from "./src/editMember.js";
import setupEmojiPermChecks from "./src/emojis.js";
import setupGuildPermChecks from "./src/guilds/mod.js";
import setupIntegrationPermChecks from "./src/integrations.js";
import setupInteractionPermChecks from "./src/interactions/mod.js";
import setupInvitesPermChecks from "./src/invites.js";
import setupMemberPermChecks from "./src/members/mod.js";
import setupMessagePermChecks from "./src/messages/mod.js";
import setupMiscPermChecks from "./src/misc/mod.js";
import setupRolePermChecks from "./src/roles/mod.js";
import setupWebhooksPermChecks from "./src/webhooks/mod.js";
// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
export function enablePermissionsPlugin(bot) {
    // PERM CHECKS REQUIRE CACHE DUH!
    if (!bot.enabledPlugins?.has("CACHE")) {
        throw new Error("The PERMISSIONS plugin requires the CACHE plugin first.");
    }
    // MARK THIS PLUGIN BEING USED
    bot.enabledPlugins.add("PERMISSIONS");
    // BEGIN OVERRIDING HELPER FUNCTIONS
    setupChannelPermChecks(bot);
    setupDiscoveryPermChecks(bot);
    setupEmojiPermChecks(bot);
    setupEditMember(bot);
    setupGuildPermChecks(bot);
    setupIntegrationPermChecks(bot);
    setupInteractionPermChecks(bot);
    setupInvitesPermChecks(bot);
    setupMemberPermChecks(bot);
    setupMessagePermChecks(bot);
    setupMiscPermChecks(bot);
    setupRolePermChecks(bot);
    setupWebhooksPermChecks(bot);
    // PLUGINS MUST RETURN THE BOT
    return bot;
}
// EXPORT ALL UTIL FUNCTIONS
export * from "./src/permissions.js";
export * from "./src/components.js";
// DEFAULT MAKES IT SLIGHTLY EASIER TO USE
export default enablePermissionsPlugin;
