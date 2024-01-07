import setupBanPermChecks from "./ban.js";
import editBotNickname from "./editBot.js";
import editMember from "./editMember.js";
import kickMember from "./kickMember.js";
import pruneMembers from "./pruneMembers.js";
export default function setupMemberPermChecks(bot) {
    setupBanPermChecks(bot);
    editBotNickname(bot);
    editMember(bot);
    kickMember(bot);
    pruneMembers(bot);
}
