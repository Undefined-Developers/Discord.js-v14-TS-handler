import { delay } from "../../util/utils.js";
export async function stop(gateway, code, reason) {
    gateway.manager.shards.forEach((shard) => shard.close(code, reason));
    await delay(5000);
}
