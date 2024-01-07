import type { Bot, DiscordGatewayPayload, Shard } from "../deps.js";
import { BotWithCache } from "./addCacheCollections.js";
export declare function dispatchRequirements<B extends Bot>(bot: BotWithCache<B>, data: DiscordGatewayPayload, shard: Shard): Promise<unknown>;
