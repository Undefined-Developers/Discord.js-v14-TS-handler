import addToThread from "./addToThread.js";
import getArchivedThreads from "./getArchivedThreads.js";
import getThreadMembers from "./getThreadMembers.js";
import joinThread from "./joinThread.js";
import leaveThread from "./leaveThread.js";
import removeThreadMember from "./removeThreadMember.js";
export default function setupThreadPermChecks(bot) {
    addToThread(bot);
    getArchivedThreads(bot);
    getThreadMembers(bot);
    joinThread(bot);
    leaveThread(bot);
    removeThreadMember(bot);
}
