import { Bot } from "../../../bot.js";
import { ScheduledEvent } from "../../../transformers/scheduledEvent.js";
import { Collection } from "../../../util/collection.js";
/** Get a list of guild scheduled event for the given guild. */
export declare function getScheduledEvents(bot: Bot, guildId: bigint, options?: GetScheduledEvents): Promise<Collection<bigint, ScheduledEvent>>;
export interface GetScheduledEvents {
    /** include number of users subscribed to each event */
    withUserCount?: boolean;
}
