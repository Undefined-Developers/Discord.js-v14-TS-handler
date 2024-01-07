import { Shard, ShardSocketRequest } from "./types.js";
export declare function send(shard: Shard, message: ShardSocketRequest, highPriority: boolean): Promise<void>;
