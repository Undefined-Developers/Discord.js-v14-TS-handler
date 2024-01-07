import { Bot } from "../../../bot.js";
import { Member, User } from "../../../transformers/member.js";
import { Collection } from "../../../util/collection.js";
export declare function getScheduledEventUsers(bot: Bot, guildId: bigint, eventId: bigint, options?: GetScheduledEventUsers & {
    withMember?: false;
}): Promise<Collection<bigint, User>>;
export declare function getScheduledEventUsers(bot: Bot, guildId: bigint, eventId: bigint, options?: GetScheduledEventUsers & {
    withMember: true;
}): Promise<Collection<bigint, {
    user: User;
    member: Member;
}>>;
export interface GetScheduledEventUsers {
    /** number of users to return (up to maximum 100), defaults to 100 */
    limit?: number;
    /** whether to also have member objects provided, defaults to false */
    withMember?: boolean;
    /** consider only users before given user id */
    before?: bigint;
    /** consider only users after given user id. If both before and after are provided, only before is respected. Fetching users in-between before and after is not supported. */
    after?: bigint;
}
