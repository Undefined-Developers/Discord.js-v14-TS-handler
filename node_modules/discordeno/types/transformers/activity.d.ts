import { Bot } from "../bot.js";
import { DiscordActivity } from "../types/discord.js";
export declare function transformActivity(bot: Bot, payload: DiscordActivity): {
    match?: string | undefined;
    join?: string | undefined;
    buttons?: {
        url: string;
        label: string;
    }[] | undefined;
    state?: string | undefined;
    url?: string | undefined;
    details?: string | undefined;
    flags?: number | undefined;
    emoji?: {
        id?: bigint | undefined;
        animated?: boolean | undefined;
        name: string;
    } | undefined;
    spectate?: string | undefined;
    startedAt?: number | undefined;
    endedAt?: number | undefined;
    applicationId?: bigint | undefined;
    partyId?: string | undefined;
    partyCurrentSize?: number | undefined;
    partyMaxSize?: number | undefined;
    largeImage?: string | undefined;
    largeText?: string | undefined;
    smallImage?: string | undefined;
    smallText?: string | undefined;
    instance?: boolean | undefined;
    type: import("../types/shared.js").ActivityTypes;
    name: string;
    createdAt: number;
};
export interface Activity extends ReturnType<typeof transformActivity> {
}
