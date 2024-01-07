import { DiscordGetGatewayBot } from "../types/discord.js";
export declare function transformGatewayBot(payload: DiscordGetGatewayBot): {
    url: string;
    shards: number;
    sessionStartLimit: {
        total: number;
        remaining: number;
        resetAfter: number;
        maxConcurrency: number;
    };
};
export interface GetGatewayBot extends ReturnType<typeof transformGatewayBot> {
}
