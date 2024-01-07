import { Bot } from "../deps.js";
import { BotWithCache } from "./addCacheCollections.js";
/** Enables sweepers for your bot but will require, enabling cache first. */
export declare function enableCacheSweepers<B extends Bot>(bot: BotWithCache<B>): void;
