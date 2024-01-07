export function calculateShardId(gateway, guildId) {
    if (gateway.manager.totalShards === 1)
        return 0;
    return Number((guildId >> 22n) % BigInt(gateway.manager.totalShards));
}
