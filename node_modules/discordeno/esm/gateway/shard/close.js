import * as dntShim from "../../_dnt.shims.js";
export function close(shard, code, reason) {
    if (shard.socket?.readyState !== dntShim.WebSocket.OPEN)
        return;
    return shard.socket?.close(code, reason);
}
