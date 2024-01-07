import { GatewayIntents } from "../../../deps.js";
export default function getThreadMembers(bot) {
    const getThreadMembersOld = bot.helpers.getThreadMembers;
    bot.helpers.getThreadMembers = async function (threadId) {
        const hasIntent = bot.intents & GatewayIntents.GuildMembers;
        if (!hasIntent) {
            throw new Error("The get thread members endpoint requires GuildMembers intent.");
        }
        return await getThreadMembersOld(threadId);
    };
}
