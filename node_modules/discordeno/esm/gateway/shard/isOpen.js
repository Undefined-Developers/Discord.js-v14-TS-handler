import * as dntShim from "../../_dnt.shims.js";
export function isOpen(shard) {
    return shard.socket?.readyState === dntShim.WebSocket.OPEN;
}
