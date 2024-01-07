import { ShardSocketCloseCodes, ShardState } from "./types.js";
export async function shutdown(shard) {
    shard.close(ShardSocketCloseCodes.Shutdown, "Shard shutting down.");
    shard.state = ShardState.Offline;
}
