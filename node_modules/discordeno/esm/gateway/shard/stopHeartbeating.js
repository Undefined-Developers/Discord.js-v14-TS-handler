export function stopHeartbeating(shard) {
    // Clear the regular heartbeat interval.
    clearInterval(shard.heart.intervalId);
    // It's possible that the Shard got closed before the first jittered heartbeat.
    // To go safe we should clear the related timeout too.
    clearTimeout(shard.heart.timeoutId);
}
